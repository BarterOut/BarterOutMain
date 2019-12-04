/**
 * @file LandingPage.js
 * @description React component for the landing page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.4
 */

import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import AuthService from '../../services/AuthService';
import FetchService from '../../services/FetchService';
import ErrorService from '../../services/ErrorService';

import './landingpage.css';
import '../../res/sylesheetOrkneyRegular.css';
import '../../res/sylesheetOrkneyLight.css';
import '../../res/sylesheetOrkneyMedium.css';
import '../../res/sylesheetOrkneyBold.css';

import logo from '../../images/logo-orange.png';

import picOne from '../../images/overtheShoulderCompressed.jpg';
import picTwo from '../../images/groupMeetingCompressed.jpg';
import picThree from '../../images/outdoorsCompressed.jpg';

import Footer from '../../components/Footer/Footer';

import LandingBookPost from '../../components/Posts/LandingBookPost/LandingBookPost';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      posts: [],
      page: 1,
      loading: false,
    };
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    this.setRedirect();
    this.getPosts();
    const booksSection = document.getElementById('landing-books');
    booksSection.addEventListener('scroll', this.updatePagePosition.bind(this));
  }

  setRedirect() {
    if (!AuthService.isTokenExpired(AuthService.getToken())) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  getPosts() {
    this.setState({ loading: true });
    FetchService.GET('/api/books/getBooksNoToken')
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(error => ErrorService.parseError(error));
  }

  updatePagePosition(evt) {
    const percent = ((evt.target.scrollTop + 124) / evt.target.scrollHeight) * 100;
    if (percent > 45 && percent < 80) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
      // this.getPosts();
    }
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    this.setState({ loading: true });
    this.setState({ posts: [] });
    if (query === '') {
      FetchService.GET('/api/books/getBooksNoToken')
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ posts: data });
        })
        .catch(error => ErrorService.parseError(error));
      return;
    }

    FetchService.GET(`/api/books/search/${query}`)
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(error => ErrorService.parseError(error));
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/home" />);
    }

    return (
      <div className="app">
        <div className="landingpage">
          <div className="photo-bg">
            <nav className="headerBar">
              <div className="logo">
                <a href="/" className="buttonLink"><img alt="logo" className="logo" src={logo} /></a>
              </div>
              <div className="pageLinks">
                <Link className="landingPageLink" to="/" href="/">Home</Link>
                <Link className="landingPageLink" to="/about" href="/about">About</Link>
                <Link className="landingPageLink" to="/login" href="/login">Login</Link>
                <Link className="landingPageLink" to="/signup" href="/signup">Sign Up</Link>
              </div>
            </nav>
            <div className="mainText" id="mainText">
              <h1>
                YOUR TEXTBOOKS,
                <br />
                HASSLE-FREE
              </h1>
              <div id="search-wrapper">
                <input id="landing-search" placeholder="Find your book..." onChange={this.updateInputValue} />
                <div id="landing-books">
                  {
                    this.state.loading
                    && <div className="loading" />
                  }
                  {this.state.posts.map(post => (
                    <LandingBookPost
                      key={post._id}
                      id={post._id}
                      name={post.name}
                      subject={post.course}
                      edition={post.edition}
                      inCart={post.inCart}
                      price={post.price}
                      status={post.status}
                      condition={post.condition}
                      comments={post.comments}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="landing-section" id="product">
            <div className="text-content-landing left">
              <h2 className="landing-header-title">Our Products</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
                BarterOut is an ed-tech organization that offers a collection of applications for
                universities empowering them to leverage technology in order to improve the lives
                of their students. One of them, our book trading app, enables students to buy and
                sell previously owned textbooks in an organized and efficient way, delivery and
                payment included.
              </p>
            </div>
            <div className="img-content right">
              <img className="landing-img" src={picTwo} alt="Group Meeting" />
            </div>
          </div>
          <div className="landing-section purple">
            <div className="img-content left">
              <img className="landing-img" src={picThree} alt="Group Meeting" />
            </div>
            <div className="text-content-landing right">
              <h2 className="landing-header-title">For Students</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
                As college students ourselves, we understand the difficulties&nbsp;
                <b>you</b>
                &nbsp;face.
                We are building applications to solve problems that we see in our everyday
                lives. We work everyday to create tools that help you get the best price
                textbooks, find courses your friends are taking, make comments on courses
                and professors at your school, and so much more.
              </p>
              <div className="landing-bullets">
                <span className="landing-bullet">Simple</span>
                <span className="landing-bullet--middle">Affordable</span>
                <span className="landing-bullet">Local</span>
              </div>
            </div>
          </div>
          <div className="landing-section">
            <div className="text-content-landing left">
              <h2 className="landing-header-title">For Universities</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
                At BarterOut, we know textbooks can get very expensive and finding second-hand ones
                can be a hassle. We also know how hard it is to create up-to-date systems for
                students to find and create their schedules.
                That&apos;s why we make it easier for your students to get their
                books and go to class, coordinate with friends to find the best course schedules,
                and so much more.
                We empower forward-thinking universities, just like yours, to use our technology to
                create better experiences for their students.
                <br />
              </p>
              <div className="landing-bullets">
                <span className="landing-bullet">Safe</span>
                <span className="landing-bullet--middle">Sustainable</span>
                <span className="landing-bullet">Efficient</span>
              </div>
            </div>
            <div className="img-content right">
              <img className="landing-img" src={picOne} alt="Group Meeting" />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default LandingPage;
