import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchContainer from './';
import Search from '../../components/Search';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../api/', () => {
  return jest.fn().mockImplementation(() => Promise.resolve({
    response: { results: [1,2,3,4,5,6,7,8,9,0] }
  }));
});

describe('Search Container', () => {
  test('Renders', () => {
    const wrapper = shallow(<SearchContainer />);

    expect(wrapper.exists()).toBe(true);
  });

  test('Should render Search component', () => {
    const wrapper = mount(<SearchContainer />);

    expect(wrapper.children(Search).length).toEqual(1);
  });

  test('Should update articles state', async () => {
    const wrapper = mount(<SearchContainer />);

    expect(wrapper.state().articles).toEqual([]);

    const wrapperProps = wrapper.find(Search).props();

    await wrapperProps.performSearch();
    expect(wrapper.state().articles).toHaveLength(10);
  });
});