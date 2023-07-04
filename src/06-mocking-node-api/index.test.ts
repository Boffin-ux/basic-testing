import path from 'path';
import fs from 'fs';
import fsPromise from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const cb = jest.fn();
  const timeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenLastCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const cb = jest.fn();
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);

    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';

  test('should call join with pathToFile', async () => {
    const mockedPath = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(mockedPath).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const data = await readFileAsynchronously(pathToFile);

    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const textContent = 'Some data...';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromise, 'readFile')
      .mockImplementation(() => Promise.resolve(textContent));

    const data = await readFileAsynchronously(pathToFile);
    expect(data).toBe(textContent);
  });
});
