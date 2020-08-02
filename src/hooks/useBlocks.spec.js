import React from 'react';
import fetch from 'cross-fetch';

import { useBlocks } from './useBlocks';

jest.mock('cross-fetch');

describe('useBlocks', () => {
  let effectCallback;
  const nodeUrl = 'http://localhost:3043';
  const setBoxes = jest.fn();
  const setLoading = jest.fn();
  const setError = jest.fn();

  beforeEach(() => {
    jest.spyOn(React, 'useState')
      .mockReturnValueOnce([[], setBoxes])
      .mockReturnValueOnce([false, setLoading])
      .mockReturnValueOnce([null, setError]);

    jest.spyOn(React, 'useEffect').mockImplementation((callback) => {
      effectCallback = callback;
    });
  });

  it('should use custom hooks to fetch blocks', async () => {
    const blocks = [
      {
        id: 1,
        attributes: {
          data: 'Test',
        },
      }
    ];
    const response = {
      json: () => ({ data: blocks }),
    };
    fetch.mockReturnValue(Promise.resolve(response))

    const [boxes, loading, error] = useBlocks(nodeUrl);
    expect(boxes).toEqual([]);
    expect(loading).toBeFalsy();
    expect(error).toBeNull();

    await effectCallback();
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3043/api/v1/blocks')
  });

  it('should use custom hooks to fetch blocks and catch error', async () => {
    const errorResponse = {
      status: 400,
    };

    fetch.mockReturnValue(Promise.reject(errorResponse))

    const [boxes, loading, error] = useBlocks(nodeUrl);
    expect(boxes).toEqual([]);
    expect(loading).toBeFalsy();
    expect(error).toBeNull();

    await effectCallback();
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3043/api/v1/blocks');
    expect(setError).toHaveBeenCalledWith(errorResponse);
  });
});