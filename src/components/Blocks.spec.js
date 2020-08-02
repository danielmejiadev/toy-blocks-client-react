import React from 'react';
import { shallow } from 'enzyme';
import {
  Typography,
  CircularProgress,
} from "@material-ui/core";
import * as Hook from '../hooks/useBlocks';
import Boxes from './Blocks';

describe('<Boxes />', () => {
  const nodeUrl = 'http://mytestingserver';

  it('should render loader', () => {
    jest.spyOn(Hook, 'useBlocks').mockReturnValue([[], true, null]);
    const wrapper = shallow(<Boxes nodeUrl={nodeUrl} />);

    const progress = wrapper
      .find(CircularProgress)
      .exists();

    expect(progress).toBeTruthy();
  });

  it('should render error', () => {
    jest.spyOn(Hook, 'useBlocks').mockReturnValue([[], false, { status: 400 }]);
    const wrapper = shallow(<Boxes nodeUrl={nodeUrl} />);

    const { children: errorMessage } = wrapper
      .find(Typography)
      .props();

    expect(errorMessage).toEqual('Something went wrong fetching data');
  });

  it('should render empty blocks response', () => {
    jest.spyOn(Hook, 'useBlocks').mockReturnValue([[], false, null]);
    const wrapper = shallow(<Boxes nodeUrl={nodeUrl} />);

    const { children: emptyMessage } = wrapper
      .find(Typography)
      .props();

    expect(emptyMessage).toEqual('Node does not have blocks');
  });

  it('should render blocks content', () => {
    const blocks = [
      {
        id: 1,
        attributes: {
          data: 'Test',
        },
      },
    ];
    jest.spyOn(Hook, 'useBlocks').mockReturnValue([blocks, false, null]);
    const wrapper = shallow(<Boxes nodeUrl={nodeUrl} />);

    const { children: identifier } = wrapper
      .find(Typography)
      .at(0)
      .props();

    const { children: data } = wrapper
      .find(Typography)
      .at(1)
      .props();

      expect(identifier).toBe('001');
      expect(data).toBe('Test');
    });
});
