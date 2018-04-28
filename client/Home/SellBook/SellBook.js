import React, { Component } from 'react';

class SellBook extends Component {
  constructor() {
    super();
    this.state = {
      name: String,
      edition: Number,
      course: String,
      price: Number,
      ISBN: String,
      condition: String,
      comments: String,
    };
  }

  onChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  postToDatabase() {
    console.log('posting sell');
    let user = JSON.parse(sessionStorage.getItem('user'));
    let ID = user._id;
    let payload = {
      name: this.state.name,
      edition: this.state.edition,
      course: this.state.course,
      price: this.state.price,
      status: 0,
      ISBN: this.state.ISBN,
      condition: this.state.condition,
      comments: this.state.comments,
      owner: ID
    };
    
    let data = new FormData();
    let token;
    data.append( 'json', JSON.stringify( payload ) );
    fetch('/api/sellBook',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ payload })
    });
  }

  render() {
    return (
      <div className="wrapper-custom">
        <h2>Book to Sell:</h2>
        <form>
          <input
            className="inputForTextbook"
            placeholder="Name"
            type="text"
            name="name"
            onChange={this.onChange.bind(this)}
            required />
          <input
            className="inputForTextbook"
            placeholder="Edition"
            type="number"
            name="edition"
            onChange={this.onChange.bind(this)}
            required />
          <input
            className="inputForTextbook"
            placeholder="Course e.g. MTH 101"
            type="text" pattern="^[A-Z]{3} \d{3}$"
            name="course"
            onChange={this.onChange.bind(this)}
            required />
          <input
            className="inputForTextbook"
            placeholder="Price"
            type="number"
            name="price"
            onChange={this.onChange.bind(this)}
            required />
          <input
            className="inputForTextbook"
            placeholder="ISBN"
            type="number"
            pattern="^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$"
            onChange={this.onChange.bind(this)}
            name="ISBN" />
          <input
            className="inputForTextbook"
            placeholder="Condition"
            type="text"
            name="condition"
            onChange={this.onChange.bind(this)}
            required />
          <input
            className="inputForTextbook"
            placeholder="Comments"
            type="text"
            onChange={this.onChange.bind(this)}
            name="comments" />
          <button className="button" onClick={this.postToDatabase.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SellBook;