import { jest } from '@jest/globals';
import { signin } from '../controlers/auth.controler.js'; 
import pool from '../db.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';

// Mock dependencies
jest.mock('../db.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../utils/createError.js');

describe('Signin Function', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 if the user is not found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await signin(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(404, 'User Not Found!'));
  });

  it('should return 401 if the password is incorrect', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', password: 'hashedpassword' }] });
    bcryptjs.compareSync.mockReturnValueOnce(false);

    await signin(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(401, 'Invalid email or password'));
  });

  it('should respond with user data and set cookie if signin is successful', async () => {
    const user = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
    pool.query.mockResolvedValueOnce({ rows: [user] });
    bcryptjs.compareSync.mockReturnValueOnce(true);
    jwt.sign.mockReturnValueOnce('jwt_token');

    await signin(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('access_token', 'jwt_token', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    expect(res.json).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
  });

  it('should pass any other errors to the next middleware', async () => {
    const error = new Error('Unexpected Error');
    pool.query.mockRejectedValueOnce(error);

    await signin(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
