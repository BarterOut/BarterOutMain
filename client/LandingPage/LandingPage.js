/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.2
 */

import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import AuthService from '../services/AuthService';

import './landingpage.css';
import '../res/sylesheetOrkneyRegular.css';
import '../res/sylesheetOrkneyLight.css';
import '../res/sylesheetOrkneyMedium.css';
import '../res/sylesheetOrkneyBold.css';
import '../res/animate.css';

import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';

import picOne from '../images/overtheShoulderCompressed.jpg';
import picTwo from '../images/groupMeetingCompressed.jpg';
import picThree from '../images/outdoorsCompressed.jpg';

import vlad from '../images/vladCazacu.jpg';
import annie from '../images/annieHamburgen.png';
import pavel from '../images/pavelStan.jpg';
import melissa from '../images/melissaKagaju.jpg';
import duncan from '../images/duncanGrubbs.jpg';
import shawn from '../images/zixuChen.jpg';
import nikolai from '../images/Nikolai.jpg';
import genessis from '../images/genessisGalindo.jpg';
import logo from '../images/barterOutProfilePhotoWebPage.png';
import zacqueline from '../images/zacquelineBaldwin.jpg';

import adviserOne from '../images/meyerElizabeth.jpg';

import linkedInLogo from '../images/linkedIn.png';
import facebookLogo from '../images/facebook.png';

import './noframework.waypoints.min.js';
import '../res/jquery-3.3.1.min.js';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.setRedirect();
  }

  setRedirect() {
    if (!this.Auth.isTokenExpired(this.Auth.getToken())) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/home" />);
    }

    return (
        <div className="app">
            <div className="landingpage">
                <nav className="headerBar animated slideInDown">
                    <div className="logo">
                        <a href="#" id="buttonLink"><img id="logoPic" src={logoPic}></img></a>
                    </div>
                    <div className="pageLinks">
                        <a className="productLink" id="landingPageLink" href="#madeSimple">Our Product</a>
                        <a className="missionLink" id="landingPageLink" href="#whatWereAbout">Our Mission</a>
                        <a className="teamLink" id="landingPageLink" href="#teamPage">Our Team</a>
                        {/* <a className="preRegisterLink" id="landingPageLink" href="#registrationPage">Pre-Register</a> */}
                        <Link id="landingPageLink" className="preRegisterLink" to="/login" href="login">Login</Link>
                    </div>
                </nav>
                <div className="mainText animated fadeIn" id="mainText">
                    <h1>TEXTBOOK SHOPPING
                        <br/>
                        MADE EASY</h1>
                    <a href="/signup" id="buttonLink"><button className="barterOutButton">JOIN NOW FREE</button></a>
                </div>
                <div className="madeSimple" id="madeSimple">
                    <div className="madeSimpleInfo animated" id="madeSimpleInfo">
                        <h2 className="madeSimpleHeader animated">
                            BUYING AND SELLING MADE SIMPLE
                        </h2>
                        <div className="madeSimpleText animated">
                            <p>
                                At BarterOut, we know textbooks can get very expensive and finding second-hand ones can be a hassle.
                                That's why we make it easier for you to get your books and get to class, all with just a couple
                                clicks on our platform. Enter some simple information and let our automated matching algorithm do
                                the magic!
                            </p>
                            <br/>
                            Buy and sell with us in minutes!
                        </div>
                    </div>
                </div>
                <div className="howItWorks">
                    <div className="howItWorksText animated" id="howItWorksInfo">
                        <h2 className="howItWorksHeader animated">HOW IT WORKS</h2>
                        <div className="howItWorksBodyText">
                            <br/>
                            <div className="steps">
                                STEP 1
                            </div>
                            <p>
                                Tell us a little about you. Where do you go to school? What classes are you taking and what classes
                                do you want to take next semester?
                            </p>
                            <br/>
                            <div className="steps">
                                STEP 2
                            </div>
                            <p>
                                We tell you which books you need for your courses, and you tell us which ones you already have
                                and which ones you want to buy. Those books you still have from last semester? Let us know
                                if you want to to sell them.
                            </p>
                            <br/>
                            <div className="steps">
                                STEP 3
                            </div>
                            <p>
                                We match buyers and sellers at the best price, and handle the textbook delivery for you. All payments
                                are made securely online.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="whatWereAbout" id="whatWereAbout">
                    <div className="whatWereAboutInfo" id="whatWereAboutInfo">
                        <h2 className="whatWereAboutHeader animated" id="whatWereAboutHeader">WHAT WE'RE ALL ABOUT</h2>
                        <br/>
                        <div className="blurbBlock" id="smartPeopleBlock">
                            <div className="smartPeopleBlock animated">
                                <h2 className="smartPeopleBlockHeader animated">SMART SHOPPING FOR SMART PEOPLE</h2>
                                <div className="whatWereAboutText" >
                                    <p>
                                        Leave it to our smart search system to meet your needs and do the work for you. Why? So you can have
                                        more time to spend living that beautiful college life!
                                    </p>
                                </div>
                            </div>
                            <div className="slideInPhotoRight animated" id="smartPeopleBlockPhoto">
                                <img src={picOne}></img>
                            </div>
                        </div>

                        <br/>
                        <div className="blurbBlock" id="helpingOthersBlock">
                            <div className="helpingOthersBlock animated">
                                <h2 className="helpingOthersBlockHeader animated">WHILE HELPING OTHERS</h2>
                                <div className="whatWereAboutText">
                                    <p>
                                        Every book sold or bought on BarterOut turns into an opportunity for an underprivileged student. We
                                        give back 30% of our profits as free credit on the platform for financially disadvantaged students so
                                        they can get textbooks for FREE.
                                    </p>
                                </div>
                            </div>
                            <div className="slideInPhotoLeft animated" id="helpingOthersBlockPhoto">
                                <img src={picTwo}></img>
                            </div>
                        </div>

                        <br/>
                        <div className="blurbBlock" id="fastCheapEasyBlock">
                            <div className="fastCheapEasyBlock animated">
                                <h2 className="fastCheapEasyBlockHeader animated">EASY, FAST & CHEAP</h2>
                                <div className="whatWereAboutText">
                                    <p>
                                        Because we care about you, we have built an easy-to-use system capable of providing you with the
                                        textbooks you need as fast as possible. In order to make this dream a reality we take a small share
                                        of every transaction to keep our servers running.
                                    </p>
                                </div>
                            </div>
                            <div className="slideInPhotoRight animated" id="fastCheapEasyBlockPhoto">
                                <img src={picThree}></img>
                            </div>
                        </div>
                    </div>
                    <div className="blurbBlock">
                        <a href="/signup" id="buttonLink"><button className="barterOutButton animated" id="joinTodayButton" href="/signup">JOIN TODAY</button></a>
                    </div>
                </div>
                <div className="teamPage" id="teamPage">
                    <div>
                        <h2 className="animated" id="meetOurTeamHeader">MEET OUR TEAM</h2>
                            <div className="teamTextTop animated">
                                <br/>
                                A company created by students with the help of other students, all to benefit... well... students
                            </div>
                            <table className="staffPhotos">
                                <tbody>
                                    <tr className="animated" id="rowOne">
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/vladcazacu/" target="_blank"><img id="team" src={vlad}></img></a>
                                                <br/>
                                                <div id="profileName">Vlad Cazacu</div>
                                                Co-founder & CEO
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/pavel-stan-232911140/" target="_blank"><img id="team" src={pavel}></img></a>
                                                <br/>
                                                <div id="profileName">Pavel Stan</div>
                                                Co-founder & Director
                                                <br/>
                                                of External Relations
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/annmarie-hamburgen-9ab65a12b/" target="_blank"><img id="team" src={annie}></img></a>
                                                <br/>
                                                <div id="profileName">Annie Hamburgen</div>
                                                CMO
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/duncan-grubbs-01979a14a/" target="_blank"><img id="team" src={duncan}></img></a>
                                                <br/>
                                                <div id="profileName">Duncan Grubbs</div>
                                                CTO
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="animated" id="rowTwo">
                                          <td>
                                            <div id="profile">
                                                <img id="staff" src={logo}></img>
                                                <br/>
                                                <div id="profileName">Daniel Munoz</div>
                                                Full-Stack Developer
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/zixu-chen/" target="_blank"><img id="team" src={shawn}></img></a>
                                                <br/>
                                                <div id="profileName">Zixu (Shawn) Chen</div>
                                                Backend Developer
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/melissa-k-7080ba103/" target="_blank"><img id="team" src={melissa}></img></a>
                                                <br/>
                                                <div id="profileName">Melissa Kagaju</div>
                                                Android Developer
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/genessis-galindo/" target="_blank"><img id="team" src={genessis}></img></a>
                                                <br/>
                                                <div id="profileName">Genessis Galindo</div>
                                                Marketing Analyst
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="animated" id="rowThree">
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/sam-hirschhorn-03029a7a/" target="_blank"><img id="team" src={logo}></img></a>
                                                <br/>
                                                <div id="profileName">Sam Hirschhorn</div>
                                                Video Marketer
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <img id="staff" src={logo}></img>
                                                <br/>
                                                <div id="profileName">Tristan De Lange</div>
                                                Frontend Developer
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/nikolai-draganov-314986161/" target="_blank"><img id="team" src={nikolai}></img></a>
                                                <br/>
                                                <div id="profileName">Nikolai Draganov</div>
                                                Marketing Strategist
                                            </div>
                                        </td>
                                        <td>
                                            <div id="profile">
                                                <img id="staff" src={zacqueline}></img>
                                                <br/>
                                                <div id="profileName">Zacqueline Baldwin (ZQ)</div>
                                                Marketing Intern
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                                <div className="teamTextBottom animated" id="teamTextBottom">
                                    <br/>
                                    Interested in working with us?
                                    <br/>
                                    <a id="buttonLink" href="/careers"><button className="barterOutButton animated" id="applyButtonOne">Apply Now</button></a>
                                </div>
                            </div>
                        <br/>
                    <div>
                        <h2 className="animated" id="meetOurAdvisersHeader">AND OUR ADVISERS</h2>
                        <div className="adviserPageText" id="adviserPageText">
                            <div className="adviserTextTop animated">
                                <br/>
                                Because any team needs some guidance from time to time
                            </div>
                            <table className="adviserPhotos animated">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div id="profile">
                                                <a href="https://www.linkedin.com/in/elizabeth-meyer-3483411b/" target="_blank"><img id="team" src={adviserOne}></img></a>
                                                <br/>
                                                <div id="profileName">Elizabeth Meyer</div>
                                                Strategy Advisor
                                                <br/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="adviserTextBottom animated">
                                <br/>
                                Interested in helping us grow?
                                <br/>
                                <a id="buttonLink" href="https://goo.gl/forms/tAXa5huk9hAcaNSH2" target="_blank"><button className="barterOutButton animated" id="applyButtonTwo">Apply Now</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landingPageBottom">
                    <div id="bottomLinksCol1">
                        <div id="bottomLinkHeader">Company</div>
                        <a href="/careers" id="bottomPageLink">Careers</a>
                        <br/>
                        <a href="/contact" id="bottomPageLink">Contact</a>
                        <br/>
                    </div>
                    <div id="bottomLinksCol2">
                        <div id="bottomLinkHeader">Legal</div>
                        <a href="/termsOfService" id="bottomPageLink">Terms of Service</a>
                        <br/>
                        <a href="/privacyPolicy" id="bottomPageLink">Privacy Policy</a>
                    </div>
                </div>
                <div id="socialMedia">
                    <a href="https://www.linkedin.com/company/18490388/" target="_blank"><img id="logoImage" src={linkedInLogo}></img></a>
                    <a href="https://www.facebook.com/BarterOut/" target="_blank"><img id="logoImage" src={facebookLogo}></img></a>
                </div>
                <div id="copyright">
                    Copyright © 2018 All Rights Reserved.
                </div>
            </div>
        </div>
    )
}
}


export default LandingPage;

// $(document).ready(() => {
//   $('.madeSimpleInfo').css('opacity', 0);
//   $('.howItWorksText').css('opacity', 0);
//   $('.whatWereAboutHeader').css('opacity', 0);
//   $('#smartPeopleBlock').css('opacity', 0);
//   $('#helpingOthersBlock').css('opacity', 0);
//   $('#fastCheapEasyBlock').css('opacity', 0);
//   $('#joinTodayButton').css('opacity', 0);
//   $('#joinTodayButton').css('opacity', 0);
//   $('#meetOurTeamHeader').css('opacity', 0);
//   $('.teamTextTop').css('opacity', 0);
//   $('#rowOne').css('opacity', 0);
//   $('#rowTwo').css('opacity', 0);
//   $('#rowThree').css('opacity', 0);
//   $('#rowFive').css('opacity', 0);
//   $('.teamTextBottom').css('opacity', 0);
//   $('#meetOurAdvisersHeader').css('opacity', 0);
//   $('#adviserPageText').css('opacity', 0);
//   $('#registrationPageInfo').css('opacity', 0);

//   const madeSimpleAnimations = new Waypoint({
//     element: document.getElementById('madeSimpleInfo'),
//     handler: () => {
//       $('.madeSimpleInfo').css('opacity', 100);
//       $('.madeSimpleHeader').addClass('fadeIn');
//       $('.madeSimpleText').addClass('fadeInUp');
//     },
//     offset: '75%',
//   });
//   const howItWorksAnimations = new Waypoint({
//     element: document.getElementById('howItWorksInfo'),
//     handler: () => {
//       $('.howItWorksText').css('opacity', 100);
//       $('.howItWorksHeader').addClass('fadeInLeft');
//       $('.howItWorksText').addClass('fadeInLeft');
//     },
//     offset: '50%',
//   });
//   const whatWereAboutHeaderAnimations = new Waypoint({
//     element: document.getElementById('whatWereAboutHeader'),
//     handler: () => {
//       $('#whatWereAboutHeader').css('opacity', 100);
//       $('#whatWereAboutHeader').addClass('fadeIn');
//     },
//     offset: '70%',
//   });
//   const smartPeopleBlockAnimations = new Waypoint({
//     element: document.getElementById('smartPeopleBlock'),
//     handler: () => {
//       $('#smartPeopleBlock').css('opacity', 100);
//       $('.smartPeopleBlock').addClass('fadeInLeft');
//       $('.smartPeopleBlockHeader').addClass('fadeInLeft');
//       $('#smartPeopleBlockPhoto').addClass('fadeInRight');
//     },
//     offset: '60%',
//   });
//   const helpingOthersBlockAnimations = new Waypoint({
//     element: document.getElementById('helpingOthersBlock'),
//     handler: () => {
//       $('#helpingOthersBlock').css('opacity', 100);
//       $('.helpingOthersBlock').addClass('fadeInRight');
//       $('.helpingOthersBlockHeader').addClass('fadeInRight');
//       $('#helpingOthersBlockPhoto').addClass('fadeInLeft');
//     },
//     offset: '60%',
//   });
//   const fastCheapEasyBlockAnimations = new Waypoint({
//     element: document.getElementById('fastCheapEasyBlock'),
//     handler: () => {
//       $('#fastCheapEasyBlock').css('opacity', 100);
//       $('.fastCheapEasyBlock').addClass('fadeInLeft');
//       $('.fastCheapEaskBlockHeader').addClass('fadeInLeft');
//       $('#fastCheapEasyBlockPhoto').addClass('fadeInRight');
//     },
//     offset: '60%',
//   });
//   const joinTodayButtonAnimations = new Waypoint({
//     element: document.getElementById('joinTodayButton'),
//     handler: () => {
//       $('#joinTodayButton').css('opacity', 100);
//       $('#joinTodayButton').addClass('fadeIn');
//     },
//     offset: '85%',
//   });
//   const meetOurTeamHeaderAnimations = new Waypoint({
//     element: document.getElementById('meetOurTeamHeader'),
//     handler: () => {
//       $('#meetOurTeamHeader').css('opacity', 100);
//       $('#meetOurTeamHeader').addClass('fadeIn');
//       $('.teamTextTop').css('opacity', 100);
//       $('.teamTextTop').addClass('fadeInDown');
//       $('#rowOne').css('opacity', 100);
//       $('#rowOne').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
//   const teamRowTwoAnimation = new Waypoint({
//     element: document.getElementById('rowTwo'),
//     handler: () => {
//       $('#rowTwo').css('opacity', 100);
//       $('#rowTwo').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
//   const teamRowThreeAnimation = new Waypoint({
//     element: document.getElementById('rowThree'),
//     handler: () => {
//       $('#rowThree').css('opacity', 100);
//       $('#rowThree').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
//   const teamTextBottomAnimation = new Waypoint({
//     element: document.getElementById('teamTextBottom'),
//     handler: () => {
//       $('.teamTextBottom').css('opacity', 100);
//       $('.teamTextBottom').addClass('fadeInUp');
//     },
//     offset: '80%',
//   });
//   const meetOurAdvisers = new Waypoint({
//     element: document.getElementById('meetOurAdvisersHeader'),
//     handler: () => {
//       $('#meetOurAdvisersHeader').css('opacity', 100);
//       $('#meetOurAdvisersHeader').addClass('fadeIn');
//       $('#adviserPageText').css('opacity', 100);
//       $('.adviserTextTop').addClass('fadeInDown');
//       $('.adviserPhotos').addClass('fadeIn');
//       $('.adviserTextBottom').addClass('fadeInUp');
//       $('.applyButtonTwo').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
// });
