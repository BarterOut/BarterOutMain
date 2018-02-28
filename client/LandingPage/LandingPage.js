import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './landingpage.css';

const LandingPage = () => {
    return (
        <div className="app">
            <div className="landingpage">
                <nav className="headerBar">
                    BarterOut
                </nav>
                <div className="mainText">
                    <h1>EVERY BOOK
                        YOU WILL EVER NEED,
                        HASSLE-FREE</h1>
                    <button className="firstButton">JOIN NOW FREE</button>
                </div>
                <div className="madeSimple">
                    <div className="madeSimpleText">
                        BUYING AND SELLING MADE SIMPLE
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
                <div className="howItWorks">
                    <div className="howItWorksText">
                        HOW IT WORKS
                        <br/>
                        STEP 1
                        <p>
                        Tell us a little about you. Where do you go to school, what classes are you taking and what classes
                        you plan to take next semester.
                        </p>

                        <br/>
                        STEP 2
                        <p>
                        We tell you which books you need for that courses and you tell us which of those you already have
                        and which you want to buy. The books you have from last semester? Let us know if you are willing to
                        sell them.
                        </p>

                        <br/>
                        STEP 3
                        <p>
                        We match buyers and sellers at the best price and delver the textbooks for you. All the payments
                        are made securely online.
                        </p>
                    </div>
                </div>
                <div className="whatWereAbout">
                    <div className="whatWereAboutText">
                        WHAT WE'RE ABOUT
                        <br/>
                        SMART BOOK-SHOPPING FOR SMART PEOPLE
                        <p>
                        Leave it to our smart search system to meet your needs and do the work for you. Why? So you can have
                        more time to spend living that beautiful college life!
                        </p>

                        <br/>
                        WHILE HELPING OTHERS
                        <p>
                        Every book sold or bought on BarterOut turns into an opportunity for an underprivileged student. We
                        give back 30% of our profits as free credit on the platform for financially disadvantaged students so
                        they can get textbooks for FREE.
                        </p>

                        <br/>
                        EASY, FAST & CHEAP
                        <p>
                        Because we care about you, we have built an easy-to-use system capable of providing you with the
                        textbooks you need as fast as possible. In order to make this dream a reality we take a small share
                        of every transaction to keep our servers running.
                        </p>
                    </div>
                </div>
                <div className="teamPage">
                    <div className="teamPageText">
                        MEET OUR TEAM
                        <br/>
                        A company created by students with the help of other students, all to benefit... well... students
                        <br/>
                        Interested in working with us? Apply now!

                        <br/>
                        AND OUR ADVISERS
                        <br/>
                        Because any team needs some guidance from time to time
                        <br/>
                        Interested in helping us grow? Apply now!
                    </div>
                </div>
                <div className="registrationPage">
                    <div className="registrationPageText">
                        THE WAIT IS OVER, JOIN NOW
                        <p>
                            Our algorithm is currently under construction and should be live in late May 2018. Take one
                            task out of you to-do list and create a pre-account for FREE today!
                        </p>
                    </div>
                </div>
                <div className="landingPageBottom">
                </div>
            </div>
        </div>
    )
}


export default LandingPage;