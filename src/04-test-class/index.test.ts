import {
  InsufficientFundsError,
  getBankAccount,
  TransferFailedError,
  BankAccount,
  SynchronizationFailedError,
} from '.';

const mockLodash = jest.requireActual('lodash');

describe('BankAccount', () => {
  const balance = 100000;
  const bankAccount = getBankAccount(balance);
  const transferBankAccount = getBankAccount(balance);

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    return expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withDrawing = balance + 1;
    return expect(() => bankAccount.withdraw(withDrawing)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferring = balance + 1;
    expect(transferBankAccount).toBeInstanceOf(BankAccount);
    return expect(() =>
      bankAccount.transfer(transferring, transferBankAccount),
    ).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring to the same account', () => {
    return expect(() => bankAccount.transfer(balance, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const money = 500;
    expect(bankAccount.deposit(money)).toBeDefined();
    return expect(bankAccount.getBalance()).toBe(money + balance);
  });

  test('should withdraw money', () => {
    const withdraw = 200;
    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBeDefined();
    expect(bankAccount.withdraw(withdraw)).toBeDefined();

    expect(bankAccount.getBalance()).toBe(currentBalance - withdraw);
  });

  test('should transfer money', () => {
    const money = 2000;
    const currentBalance = bankAccount.getBalance();
    expect(currentBalance).toBeDefined();
    expect(bankAccount.transfer(money, transferBankAccount)).toBeDefined();
    expect(bankAccount.getBalance()).toBe(currentBalance - money);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    mockLodash.random = jest.fn(() => 500);
    const data = await bankAccount.fetchBalance();
    expect(data).toEqual(500);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 30000;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
