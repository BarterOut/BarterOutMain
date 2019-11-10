import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

import Footer from '../../components/Footer/Footer';
import SellBook from '../../components/SellBook/SellBook';
import SideNav from '../../components/SideNav/SideNav';
import RequestBook from '../../components/RequestBook/RequestBook';

describe('components', () => {
  it('footer should render', () => {
    shallow(<Footer />);
  });

  it('sellbook should render', () => {
    shallow(<SellBook />);
  });

  it('sidenav should render', () => {
    shallow(<SideNav />);
  });

  it('requestbook should render', () => {
    shallow(<RequestBook />);
  });
});