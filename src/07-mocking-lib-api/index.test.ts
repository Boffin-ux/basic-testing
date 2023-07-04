import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyCreate = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Post' });

    await throttledGetDataFromApi('/endpoint');

    expect(spyCreate).toHaveBeenLastCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const endpointApi = '/endpoint';

    const spyGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Post' });

    await throttledGetDataFromApi(endpointApi);
    jest.runOnlyPendingTimers();

    expect(spyGet).toBeCalledWith(endpointApi);
  });

  test('should return response data', async () => {
    const usersData = [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ];

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: usersData });

    const data = await throttledGetDataFromApi('/users');
    expect(data).toBe(usersData);
  });
});
