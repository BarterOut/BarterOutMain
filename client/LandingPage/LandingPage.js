import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './landingpage.css';
import regularFont from './sylesheetOrkneyRegular.css';
import lightFont from './sylesheetOrkneyLight.css';
import mediumFont from './sylesheetOrkneyMedium.css';
import boldfont from './sylesheetOrkneyBold.css';
import animations from './animate.css';

import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png'

import picOne from '../images/overtheShoulderCompressed.jpg'
import picTwo from '../images/groupMeetingCompressed.jpg'
import picThree from '../images/outdoorsCompressed.jpg'

import teamOne from '../images/vladCazacu.jpg'
import teamTwo from '../images/pavelStan.jpg'
import teamThree from '../images/melissaKagaju.jpg'

import adviserOne from '../images/meyerElizabeth.jpg'
import waypointJS from './noframework.waypoints.min.js'
import jQuery from './jquery-3.3.1.min.js'

const LandingPage = () => {
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
                        <a className="preRegisterLink" id="landingPageLink" href="#registrationPage">Pre-Register</a>
                    </div>
                </nav>
                <div className="mainText animated fadeIn" id="mainText">
                    <h1>EVERY BOOK
                        <br/>
                        YOU WILL EVER NEED,
                        <br/>
                        HASSLE-FREE</h1>
                    <a href="#registrationPage" id="buttonLink"><button className="barterOutButton">JOIN NOW FREE</button></a>
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
                                We match buyers and sellers at the best price handle the textbook delivery for you. All the payments
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
                            <div className="slideInPhotoRight animated"  id="fastCheapEasyBlockPhoto">
                                <img src={picThree}></img>
                            </div>
                        </div>
                    </div>
                    <div className="blurbBlock">
                        <a href="#registrationPage" id="buttonLink"><button className="barterOutButton animated" id="joinTodayButton" href="#registrationPage">JOIN TODAY</button></a>
                    </div>
                </div>
                <div className="teamPage" id="teamPage">
                    <div>
                        <h2 className="animated" id="meetOurTeamHeader">MEET OUR TEAM</h2>
                        <div className="teamPageText" id="teamPageText">
                            <div className="teamTextTop animated">
                                <br/>
                                A company created by students with the help of other students, all to benefit... well... students
                            </div>
                                <table className="staffPhotos animated">
                                    <td>
                                        <div id="profile">
                                            <img id="team" src={teamOne}></img>
                                            <br/>
                                            <div id="profileName">Vlad Cuzacu</div>
                                            Co-founder & CEO
                                        </div>
                                    </td>
                                    <td>
                                        <div id="profile">
                                            <img id="team" src={teamTwo}></img>
                                            <br/>
                                            <div id="profileName">Pavel Stan</div>
                                            Co-founder & Director
                                            <br/>
                                            of External Relations
                                        </div>
                                    </td>
                                    <td>
                                        <div id="profile">
                                            <img id="team" src={teamThree}></img>
                                            <br/>
                                            <div id="profileName">Melissa Kagaju</div>
                                            Mobile Software Developer

                                        </div>
                                    </td>
                                </table>
                                <div className="teamTextBottom animated">
                                    <br/>
                                    Interested in working with us?
                                    <br/>
                                    <button className="barterOutButton animated" id="applyButtonOne">Apply Now</button>
                                </div>
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
                                <td>
                                    <div id="profile">
                                        <img id="team" src={adviserOne}></img>
                                        <br/>
                                        <div id="profileName">Elizabeth Meyer</div>
                                        Strategy Advisor
                                        <br/>
                                    </div>
                                </td>
                            </table>
                            <div className="adviserTextBottom animated">
                                <br/>
                                Interested in helping us grow?
                                <br/>
                                <button className="barterOutButton animated" id="applyButtonTwo">Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="registrationPage" id="registrationPage">
                    <div className="registrationPageOverlay">
                        <div className="registrationPageInfo" id="registrationPageInfo">
                            <div className="registrationPageText animated">
                                <h2 className="registrationPageHeader animated">IT'S GOING TO BE BIG, JOIN NOW</h2>
                                <div className="registrationPageBodyText">
                                    <p>
                                        Our algorithm is currently under construction and should be live in late May 2018. Take one
                                        task out of you to-do list and create a pre-account for FREE today!
                                    </p>
                                </div>
                            </div>
                            <div className="registrationForm animated">
                                <div className="formTitle">
                                    Sign Up Today
                                </div>
                                <div className="formSubTitle">
                                    Be one of the first to use BarterOut
                                </div>
                                <form>
                                    <div className="formSubTitle">
                                        First Name
                                    </div>
                                    <input type="text" name="firstName" className="firstName">
                                    </input>
                                    <div className="formSubTitle">
                                        Last Name
                                    </div>
                                    <input type="text" name="lastName" className="lastName">
                                    </input>
                                    <div className="formSubTitle">
                                        Email Address
                                    </div>
                                    <input type="text" name="email" className="email">
                                    </input>
                                    <div className="formSubTitle" id="agreement">
                                        By clicking "Pre-Register", you agree to the
                                        <a href="#"> Terms of Service </a>
                                        and
                                        <a href="#"> Privacy Policy </a>
                                    </div>
                                </form>
                                <a href="#registrationPage" id="buttonLink"><button className="barterOutButton animated" id="registerButton">Pre-Register</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landingPageBottom">
                    <div id="bottomLinksCol1">
                        <div id="bottomLinkHeader">Company</div>
                        <a href="#" id="bottomPageLink">Careers</a>
                        <br/>
                        <a href="#" id="bottomPageLink">Contact</a>
                        <br/>
                    </div>
                    <div id="bottomLinksCol2">
                        <div id="bottomLinkHeader">Legal</div>
                        <a href="#" id="bottomPageLink">Terms of Service</a>
                        <br/>
                        <a href="#" id="bottomPageLink">Privacy Policy</a>
                    </div>
                </div>
                <div id="copyright">
                    Copyright © 2018 All Rights Reserved.
                </div>
            </div>
        </div>
    )
}


export default LandingPage;

$(document).ready(function() {
    $('.madeSimpleInfo').css('opacity', 0);
    $('.howItWorksText').css('opacity', 0);
    $('.whatWereAboutHeader').css('opacity', 0);
    $('#smartPeopleBlock').css('opacity', 0);
    $('#helpingOthersBlock').css('opacity', 0);
    $('#fastCheapEasyBlock').css('opacity', 0);
    $('#joinTodayButton').css('opacity', 0);
    $('#joinTodayButton').css('opacity', 0);
    $('#meetOurTeamHeader').css('opacity', 0);
    $('#teamPageText').css('opacity', 0);
    $('#meetOurAdvisersHeader').css('opacity', 0);
    $('#adviserPageText').css('opacity', 0);
    $('#registrationPageInfo').css('opacity', 0);


    var madeSimpleAnimations = new Waypoint({
        element:  document.getElementById('madeSimpleInfo'),
        handler: function() {
            $('.madeSimpleInfo').css('opacity', 100);
            $('.madeSimpleHeader').addClass('fadeIn');
            $('.madeSimpleText').addClass('fadeInUp');
        },
        offset: '70%'
    })

    var howItWorksAnimations = new Waypoint({
        element:  document.getElementById('howItWorksInfo'),
        handler: function() {
            $('.howItWorksText').css('opacity', 100);
            $('.howItWorksHeader').addClass('fadeInLeft');
            $('.howItWorksText').addClass('fadeInLeft');
        },
        offset: '50%'
    })

    var whatWereAboutHeaderAnimations = new Waypoint({
        element: document.getElementById('whatWereAboutHeader'),
        handler: function () {
            $('#whatWereAboutHeader').css('opacity', 100);
            $('#whatWereAboutHeader').addClass('fadeIn')
        },
        offset: '50%'
    })

    var smartPeopleBlockAnimations = new Waypoint({
        element:  document.getElementById('smartPeopleBlock'),
        handler: function() {
            $('#smartPeopleBlock').css('opacity', 100);
            $('.smartPeopleBlock').addClass('fadeInLeft');
            $('.smartPeopleBlockHeader').addClass('fadeInLeft');
            $('#smartPeopleBlockPhoto').addClass('fadeInRight');
        },
        offset: '50%'
    })

    var helpingOthersBlockAnimations = new Waypoint({
        element:  document.getElementById('helpingOthersBlock'),
        handler: function() {
            $('#helpingOthersBlock').css('opacity', 100);
            $('.helpingOthersBlock').addClass('fadeInRight');
            $('.helpingOthersBlockHeader').addClass('fadeInRight');
            $('#helpingOthersBlockPhoto').addClass('fadeInLeft');
        },
        offset: '15%'
    })

    var fastCheapEasyBlockAnimations = new Waypoint({
        element:  document.getElementById('fastCheapEasyBlock'),
        handler: function() {
            $('#fastCheapEasyBlock').css('opacity', 100);
            $('.fastCheapEasyBlock').addClass('fadeInLeft');
            $('.fastCheapEaskBlockHeader').addClass('fadeInLeft');
            $('#fastCheapEasyBlockPhoto').addClass('fadeInRight');
        },
        offset: '1%'
    })

    var joinTodayButtonAnimations = new Waypoint({
        element: document.getElementById('joinTodayButton'),
        handler: function() {
            $('#joinTodayButton').css('opacity', 100);
            $('#joinTodayButton').addClass('fadeIn');
        },
        offset: '85%'
    })

    var meetOurTeamHeaderAnimations = new Waypoint({
        element: document.getElementById('meetOurTeamHeader'),
        handler: function() {
            $('#meetOurTeamHeader').css('opacity', 100);
            $('#meetOurTeamHeader').addClass('fadeIn');
        },
        offset: '50%'
    })

    var meetOurTeam = new Waypoint({
        element: document.getElementById('meetOurTeamHeader'),
        handler: function() {
            $('#meetOurTeamHeader').css('opacity', 100);
            $('#meetOurTeamHeader').addClass('fadeIn');
        },
        offset: '50%'
    })

    var teamInfo = new Waypoint({
        element: document.getElementById('teamPageText'),
        handler: function() {
            $('#teamPageText').css('opacity', 100);
            $('.teamTextTop').addClass('fadeInDown');
            $('.staffPhotos').addClass('fadeIn');
            $('.teamTextBottom').addClass('fadeInUp');
            $('.applyButtonOne').addClass('fadeIn');
        },
        offset: '50%'
    })

    var meetOurAdvisers = new Waypoint({
        element: document.getElementById('meetOurAdvisersHeader'),
        handler: function() {
            $('#meetOurAdvisersHeader').css('opacity', 100);
            $('#meetOurAdvisersHeader').addClass('fadeIn');
        },
        offset: '50%'
    })

    var adviserInfo = new Waypoint({
        element: document.getElementById('adviserPageText'),
        handler: function() {
            $('#adviserPageText').css('opacity', 100);
            $('.adviserTextTop').addClass('fadeInDown');
            $('.adviserPhotos').addClass('fadeIn');
            $('.adviserTextBottom').addClass('fadeInUp');
            $('.applyButtonTwo').addClass('fadeIn');
        },
        offset: '50%'
    })

    var registrationPageAnimations = new Waypoint({
        element: document.getElementById('registrationPageInfo'),
        handler: function() {
            $('#registrationPageInfo').css('opacity', 100);
            $('.registrationPageText').addClass('fadeInLeft');
            $('.registrationPageHeader').addClass('fadeInLeft');
            $('.registrationForm').addClass('fadeIn');
            $('#registerButton').addClass('fadeIn');
        },
        offset: '50%'
    })

});