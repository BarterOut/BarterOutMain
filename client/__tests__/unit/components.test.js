import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

import post from '../mocks/postMock';

import Footer from '../../components/Footer/Footer';
import SellBook from '../../components/SellBook/SellBook';
import SideNav from '../../components/SideNav/SideNav';
import NavBar from '../../components/NavBar/NavBar';
import RequestBook from '../../components/RequestBook/RequestBook';

// Types of Posts
import BookPost from '../../components/Posts/BookPost/BookPost';
import CartBookPost from '../../components/Posts/CartBookPost/CartBookPost';
import LandingBookPost from '../../components/Posts/LandingBookPost/LandingBookPost';
import PersonalBookPost from '../../components/Posts/PersonalBookPost/PersonalBookPost';
import RequestBookPost from '../../components/Posts/RequestBookPost/RequestBookPost';
import TrackBookPost from '../../components/Posts/TrackBookPost/TrackBookPost';

describe('components', () => {
  it('Footer should render', () => {
    shallow(<Footer />);
  });

  it('SellBook should render', () => {
    shallow(<SellBook />);
  });

  it('SideNav should render', () => {
    shallow(<SideNav />);
  });

  it('RequestBook should render', () => {
    shallow(<RequestBook />);
  });

  it('BookPost should render', () => {
    shallow(<BookPost
              key={post._id}
              id={post._id}
              name={post.name}
              date={post.date}
              subject={post.course}
              edition={post.edition}
              inCart={post.inCart}
              price={post.price}
              status={post.status}
              condition={post.condition}
              comments={post.comments}
            />);
  });

  it('CartBookPost should render', () => {
    shallow(<CartBookPost
              key={post._id}
              id={post._id}
              name={post.name}
              date={post.date}
              subject={post.course}
              edition={post.edition}
              inCart={post.inCart}
              price={post.price}
              status={post.status}
              condition={post.condition}
              comments={post.comments}
            />);
  });

  it('LandingBookPost should render', () => {
    shallow(<LandingBookPost
              key={post._id}
              id={post._id}
              name={post.name}
              date={post.date}
              subject={post.course}
              edition={post.edition}
              inCart={post.inCart}
              price={post.price}
              status={post.status}
              condition={post.condition}
              comments={post.comments}
            />);
  });

  it('PersonalBookPost should render', () => {
    shallow(<PersonalBookPost
              key={post._id}
              id={post._id}
              name={post.name}
              date={post.date}
              subject={post.course}
              edition={post.edition}
              inCart={post.inCart}
              price={post.price}
              status={post.status}
              condition={post.condition}
              comments={post.comments}
            />);
  });

  it('RequestBookPost should render', () => {
    shallow(<RequestBookPost
              key={post._id}
              id={post._id}
              name={post.name}
              date={post.date}
              subject={post.course}
              edition={post.edition}
              inCart={post.inCart}
              price={post.price}
              status={post.status}
              condition={post.condition}
              comments={post.comments}
            />);
  });

  it('TrackBookPost should render', () => {
    shallow(<TrackBookPost
              key={post._id}
              id={post._id}
              type={post.type}
              name={post.name}
              date={post.date}
              subject={post.course}
              edition={post.edition}
              inCart={post.inCart}
              price={post.price}
              status={post.status}
              condition={post.condition}
              comments={post.comments}
            />);
  });
});