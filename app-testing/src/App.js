import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BookPost from './BookPost';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      posts: [],
      searchResults: [],
      searchQuery: ''
    }
  }

  componentDidMount() {
    this.callApi('/api/displayAllBooks')
      .then(res => {
        console.log(res);
        this.setState({ posts: res });
      })
      .catch(err => console.log(err));
  }

  callApi = async (url) => {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    if (query == '') {
      this.callApi(`/api/displayAllBooks`)
      .then(res => {
        this.setState({ posts: res });
      })
      .catch(err => console.log(err));
      return;
    }
    this.callApi(`/api/searchBook/${query}`)
      .then(res => {
        this.setState({ posts: res });
      })
      .catch(err => console.log(err));
  }

  render() {
    let posts = [];
    if (this.state) {
      posts = this.state.posts;
    }
    return (
      <div className="big-wrapper-custom">
        <div className="wrapper-custom">
          <h2>Add a new Textbook:</h2>
          <form className="inputs" method="POST" action="/api/postBook">
            <input className="inputForTextbook" placeholder="Name" type="text" name="name" required />
            <input className="inputForTextbook" placeholder="Edition" type="text" name="edition" required />
            <input className="inputForTextbook" placeholder="Subject" type="text" name="subject" required />
            <input className="inputForTextbook" placeholder="Course Number" type="number" name="courseNumber" required />
            <input className="inputForTextbook" placeholder="Price" type="number" name="price" required />
            <input className="inputForTextbook" placeholder="ISBN" type="number" name="ISBN" />
            <input className="inputForTextbook" placeholder="Condition" type="text" name="condition" required />
            <input className="inputForTextbook" placeholder="Email" type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$" name="owner" required />
            <input className="inputForTextbook" placeholder="Comments" type="text" name="comments" />

            <button className="button" type="submit">Submit</button>
          </form>
        </div>

        <input className="inputForTextbook" onChange={this.updateInputValue.bind(this)}placeholder="Search Books (basic)" type="text" name="name" />
        <button onClick={this.search.bind(this)}>Search</button>

        <h2>Books</h2>
        <div className="post-list">
          {posts.map(post => (
            <BookPost
              key={post._id}
              name={post.name}
              subject={post.subject}
              edition={post.edition}
              courseNumber={post.courseNumber}
              price={post.price}
              ISBN={post.ISBN}
              condition={post.condition}
              owner={post.owner}
              comments={post.comments}>
            </BookPost>
          ))}
        </div>
      </div>
    )
  }
}

export default App;
