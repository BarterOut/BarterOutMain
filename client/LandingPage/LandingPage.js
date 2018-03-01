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
import picOne from '../images/overtheShoulder.jpg'
import picTwo from '../images/groupMeeting.jpg'
import picThree from '../images/outdoors.jpg'

const LandingPage = () => {
    return (
        <div className="app">
            <div className="landingpage">
                <nav className="headerBar">
                    BarterOut
                </nav>
                <div className="mainText animated fadeIn" >
                    <h1>EVERY BOOK
                        <br/>
                        YOU WILL EVER NEED,
                        <br/>
                        HASSLE-FREE</h1>
                    <button className="barterOutButton">JOIN NOW FREE</button>
                </div>
                <div className="madeSimple">
                    <div class="animated fadeIn">
                        <h2>BUYING AND SELLING MADE SIMPLE</h2>
                        <div className="madeSimpleText animated fadeInUp">
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
                    <div className="howItWorksText animated fadeInLeft">
                        <h2 class="animated fadeInLeft">HOW IT WORKS</h2>
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
                <div className="whatWereAbout">
                    <div>
                        <h2 class="animated fadeIn" id="whatWereAboutHeader">WHAT WE'RE ABOUT</h2>
                        <br/>
                        <div className="blurbBlock">
                            <div className="smartPeopleBlock animated fadeInLeft">
                                <h2 className="animated fadeInLeft">SMART SHOPPING FOR SMART PEOPLE</h2>
                                <div className="whatWereAboutText">
                                    <p>
                                        Leave it to our smart search system to meet your needs and do the work for you. Why? So you can have
                                        more time to spend living that beautiful college life!
                                    </p>
                                </div>
                            </div>
                            <div className="slideInPhotoRight animated fadeInRight">
                                <img src={picOne}></img>
                            </div>
                        </div>

                        <br/>
                        <div className="blurbBlock">
                            <div className="helpingOthersBlock animated fadeInRight">
                                <h2 className=" animated fadeInRight">WHILE HELPING OTHERS</h2>
                                <div className="whatWereAboutText">
                                    <p>
                                        Every book sold or bought on BarterOut turns into an opportunity for an underprivileged student. We
                                        give back 30% of our profits as free credit on the platform for financially disadvantaged students so
                                        they can get textbooks for FREE.
                                    </p>
                                </div>
                            </div>
                            <div className="slideInPhotoLeft animated fadeInLeft">
                                <img src={picTwo}></img>
                            </div>
                        </div>

                        <br/>
                        <div className="blurbBlock">
                            <div className="fastCheapEasyBlock animated fadeInLeft">
                                <h2 className=" animated fadeInLeft">EASY, FAST & CHEAP</h2>
                                <div className="whatWereAboutText">
                                    <p>
                                        Because we care about you, we have built an easy-to-use system capable of providing you with the
                                        textbooks you need as fast as possible. In order to make this dream a reality we take a small share
                                        of every transaction to keep our servers running.
                                    </p>
                                </div>
                            </div>
                            <div className="slideInPhotoRight animated fadeInRight">
                                <img src={picThree}></img>
                            </div>
                        </div>
                    </div>
                    <div className="blurbBlock">
                        <button className="barterOutButton animated fadeIn">JOIN TODAY</button>
                    </div>
                </div>
                <div className="teamPage">
                    <div class="animated fadeIn">
                        <h2>MEET OUR TEAM</h2>
                        <div className="teamPageText">
                            <div class="animated fadeInUp">
                                A company created by students with the help of other students, all to benefit... well... students
                                <br/>
                                Interested in working with us? Apply now!
                            </div>
                        </div>

                        <br/>
                        <h2>AND OUR ADVISERS</h2>
                        <div className="teamPageText">
                            <div class="animated fadeInUp">
                                Because any team needs some guidance from time to time
                                <br/>
                                Interested in helping us grow? Apply now!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="registrationPage">
                    <div className="registrationPageOverlay">
                        <div className="registrationPageText animated fadeInLeft">
                            <h2>THE WAIT IS OVER, JOIN NOW</h2>
                            <div className="registrationPageBodyText">
                                <p>
                                    Our algorithm is currently under construction and should be live in late May 2018. Take one
                                    task out of you to-do list and create a pre-account for FREE today!
                                </p>
                            </div>
                        </div>
                        <div className="registrationForm animated fadeIn">
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
                                    Tell us a little about you!
                                </div>
                                <textarea type="text" name="about" rows="3" className="about">
                                </textarea>
                            </form>
                            <button className="barterOutButton animated fadeIn" id="registerButton">Pre-Register</button>
                        </div>
                    </div>
                </div>
                <div className="landingPageBottom">
                </div>
            </div>
        </div>
    )
}


export default LandingPage;