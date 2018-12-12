/**
 * @file React component for landing page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.4
 */

import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import AuthService from '../services/AuthService';
import FetchService from '../services/FetchService';
import ErrorService from '../services/ErrorService';

import './landingpage.css';
import '../res/sylesheetOrkneyRegular.css';
import '../res/sylesheetOrkneyLight.css';
import '../res/sylesheetOrkneyMedium.css';
import '../res/sylesheetOrkneyBold.css';

import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';

import picOne from '../images/overtheShoulderCompressed.jpg';
import picTwo from '../images/groupMeetingCompressed.jpg';
import picThree from '../images/outdoorsCompressed.jpg';

import linkedInLogo from '../images/linkedIn.png';
import facebookLogo from '../images/facebook.png';

import LandingBookPost from '../components/Posts/LandingBookPost/LandingBookPost';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      posts: [],
      loading: false,
    };
    this.Auth = new AuthService();
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    this.setRedirect();
    this.getPosts();
  }

  setRedirect() {
    if (!this.Auth.isTokenExpired(this.Auth.getToken())) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  getPosts() {
    FetchService.GET('/api/books/getAllBooksNoToken')
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(error => ErrorService.parseError(error));
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    this.setState({ loading: true });
    this.setState({ posts: [] });
    if (query === '') {
      FetchService.GET('/api/books/getAllBooksNoToken')
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ posts: data });
        })
        .catch(error => ErrorService.parseError(error));
      return;
    }

    FetchService.GET(`/api/books/searchNoToken/${query}`)
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
                <a href="/" className="buttonLink"><img alt="logo" id="logoPic" src={logoPic} /></a>
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
                YOUR TEXTBOOKS, <br />
                HASSLE-FREE
              </h1>
              <div id="search-wrapper">
                <input id="landing-search" placeholder="Find your book..." onChange={this.updateInputValue} />
                <div id="landing-books">
                  {
                    this.state.loading &&
                    <div className="loading" />
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
              <h2 className="landing-header-title">Our Product</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
              BarterOut is an ed-tech company that offers a collection of software products for universities empowering them to leverage technology
              in order to improve the lives of their students. One of thme, our book trading app, enables students to buy and sell previously
              owned textbooks in an organized and efficient way, delivery and payment included.
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
                Because we care about you, we have built an easy-to-use system capable
                of providing you with the right textbooks you need as fast as possible
                as well as giving you the opportunity to sell the ones you are not using anymore.
                We handle delivery and payments so you don&apos;t have to worry about it.
                In order to make this dream a reality we take a very small share of every
                transaction to keep our operations up and running. <br />
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
                At BarterOut, we know textbooks can get very expensive and finding second-hand ones can be a hassle.
                That&apos;s why we make it easier for your students to get their books and go to class, all with just a couple clicks on our platform.
                We empower forward thinking universities, just like yours, to set up textbooks exchanges for their students using our customisable software. <br/>
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
          <div className="footer">
            <div className="bottomLinksCol">
              <div className="bottomLinkHeader">Company</div>
              <a to="/about" href="/about" className="bottomPageLink">About</a>
              <br />
              <a to="/careers" href="/careers" className="bottomPageLink">Careers</a>
              <br />
              <a to="/contact" href="/contact" className="bottomPageLink">Contact</a>
              <br />
            </div>
            <div className="bottomLinksCol">
              <div className="bottomLinkHeader">Legal</div>
              <a href="/termsOfService" className="bottomPageLink">Terms of Service</a>
              <br />
              <a href="/privacyPolicy" className="bottomPageLink">Privacy Policy</a>
            </div>
            <div className="bottomLinksCol">
              <div className="bottomLinkHeader">Developer</div>
              <a href="https://github.com/BarterOut/api-docs" className="bottomPageLink">API Documentation</a>
              <br />
              <a href="https://github.com/BarterOut/" className="bottomPageLink">GitHub</a>
            </div>
          </div>
          <div id="socialMedia">
            <a href="https://www.linkedin.com/company/18490388/" rel="noopener noreferrer" target="_blank">
              <img alt="logo" className="logoImage" src={linkedInLogo} />
            </a>
            <a href="https://www.facebook.com/BarterOut/" rel="noopener noreferrer" target="_blank">
              <img alt="facebook logo" className="logoImage" src={facebookLogo} />
            </a>
          </div>
          <div id="copyright">
            © 2018 BarterOut. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;

