/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';

const Help = () => (
  <div>
    <NavBar page="help" />
    <div className="container my-2">
      <h3 className="mt-5 mb-4">FAQ:</h3>
      <h5 className="mt-4">How do I sell a book?</h5>
      On the
      <Link to="home" href="home">Home</Link>
      Page, click &apos;Post Your Book&apos; on the
      right hand side. After filling out all of the required information, click post.
      When someone purchases your book, you will recieve and email with the dropoff
      schedule. Then come to one of our specified locations at one of the specified times
      and drop it off. Once we verify the condition of the book, you will be payed.

      <h5 className="mt-4">What happens if I forget to deliver a book I sold?</h5>
      If you forget to deliver within the two day period, you will be emailed as a
      reminder. If you fail to bring the book in the next two days, your transaction will be
      canceled. In order to sell the book again, you will have to make a new post on BarterOut.

      <h5 className="mt-4">I bought a book but it was never delivered, what do I do?</h5>
      Just email office@barterout.com with your name and vemno and we
      will resolve the issue.

      <h5 className="mt-4">I don’t have Venmo. Can I still use BarterOut?</h5>
      Unfortunately, at this time we only have this payment methods available.
      We are hoping to add a credit card option to the site in the future. However,
      we highly recommend making a Venmo account -- it&apos;s an awesome service and so useful!

      <h4 className="mt-5 mb-4">Still have questions? Contact Us</h4>
      <p className="mb-4">
        If you have any question or simply wanna say Hi,<br />
        please feel free to reach out to us.
      </p>
      <p>
        office@barterout.com |
        <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/BarterOut/"> Facebook</a>
        |
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/company/18490388/"> LinkedIn</a>
      </p>
    </div>
  </div>
);

export default Help;
