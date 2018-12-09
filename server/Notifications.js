/**
 * @file Notification functions for returning various types of notifications.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import moment from 'moment';

module.exports = {
  thanksForPosting: function thanksForPosting(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `Thanks for posting ${bookName} up for sale.`,
    };
  },

  thanksForSigningUp: function thanksForSigningUp() {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: 'Thank you for signing up!',
    };
  },

  boughtYourBook: function boughtYourBook(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `Someone purchased ${bookName} from you! Please drop the book to us for inspection. Check your email and see the track page for more details.`,
    };
  },

  paymentReceived: function paymentReceived() {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: 'Payment has been received and sent your way! Thank you for using BarterOut.',
    };
  },

  postedRequest: function postedRequest(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `Your request for ${bookName} has been recorded, and you will be notified if we find a match.`,
    };
  },

  matchFound: function matchFound(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `We found a match for ${bookName}! See the Buy page for more details.`,
    };
  },

  thanksForPurchase: function thaksForPurchase(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `Thank you for purchasing ${bookName}! We will let you know as soon as the book is ready for pick-up! See the track page for more details.`,
    };
  },

  bookChecked: function bookChecked(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `${bookName} checked and ready for delivery. Please make payment through Venmo!`,
    };
  },

  thanksForPayment: function thanksForPayment(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `Thank you for your payment! ${bookName} is ready for pick-up (or has been delivered, depends on the school)! Check your email and see the track page for more details.`,
    };
  },

  adminNewTransaction: function adminNewTransaction(bookName, price) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `New Transaction: ${bookName} for ${price}!`,
    };
  },

  adminBookInspected: function adminNewTransaction(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `${bookName} inspected and awaiting payment.`,
    };
  },

  adminPaymentRecieved: function adminNewTransaction(bookName) {
    return {
      date: moment().format('MMM. Do, YYYY'),
      message: `Payment received for ${bookName}. The book is ready for delivery!`,
    };
  },
};
