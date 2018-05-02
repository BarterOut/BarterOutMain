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
    this.setState({ [evt.target.name]: evt.target.value });
  }

  close() {
    window.location.reload();
  }

  postToDatabase() {
    console.log('Posting Book To Sell');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const ID = user._id;
    const payload = {
      name: this.state.name,
      edition: this.state.edition,
      course: this.state.course,
      price: this.state.price,
      status: 0,
      ISBN: this.state.ISBN,
      condition: this.state.condition,
      comments: this.state.comments,
      owner: ID,
    };

    const data = new FormData();

    data.append('json', JSON.stringify(payload));
    fetch(
      '/api/sellBook',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ payload }),
      },
    )
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="wrapper-custom">
        <div className="modalContent">
          <h2>What's your book?</h2>
          <form className="input-wrapper">
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="Name"
              type="text"
              name="name"
              onChange={this.onChange.bind(this)}
              required
            />
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="Edition"
              type="number"
              name="edition"
              onChange={this.onChange.bind(this)}
              required
            />
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="Course e.g. MTH 101"
              type="text"
              pattern="^[A-Z]{3} \d{3}$"
              name="course"
              onChange={this.onChange.bind(this)}
              required
            />
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="Price"
              type="number"
              name="price"
              onChange={this.onChange.bind(this)}
              required
            />
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="ISBN"
              type="number"
              pattern="^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$"
              onChange={this.onChange.bind(this)}
              name="ISBN"
            />
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="Condition"
              type="text"
              name="condition"
              onChange={this.onChange.bind(this)}
              required
            />
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="Comments"
              type="text"
              onChange={this.onChange.bind(this)}
              name="comments"
            />
            <div>
              <button
                className="button"
                onClick={this.close.bind(this)}
              >Cancel
              </button>
              <button
                className="button"
                onClick={this.postToDatabase.bind(this)}
              >Sell Book
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SellBook;
