import { jest } from '@jest/globals';
import { register } from '../controllers/auth.controller.js';
import pool from '../db.js';
import bcryptjs from 'bcryptjs';
import { createError } from '../utils/createError.js';

jest.mock('../db.js');
jest.mock('bcryptjs');
jest.mock('../utils/createError.js');

describe('register function', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should create a user successfully', async () => {
    const hashedPass = 'hashedPassword';
    bcryptjs.hashSync.mockReturnValue(hashedPass);
    pool.query.mockResolvedValue({ rows: [{ username: 'testuser', email: 'test@example.com' }] });

    await register(req, res, next);

    expect(bcryptjs.hashSync).toHaveBeenCalledWith('password123', 10);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      ['testuser', 'test@example.com', hashedPass]
    );
    expect(res.json).toHaveBeenCalledWith('user Created Successfully');
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle duplicate username error', async () => {
    const error = { code: '23505', constraint: 'users_username_key' };
    pool.query.mockRejectedValue(error);

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(409, 'Username is already taken'));
  });

  it('should handle duplicate email error', async () => {
    const error = { code: '23505', constraint: 'users_email_key' };
    pool.query.mockRejectedValue(error);

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(409, 'Email is already registered'));
  });

  it('should handle other errors', async () => {
    const error = new Error('Some other error');
    pool.query.mockRejectedValue(error);

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe('Some other error');
  });
});
