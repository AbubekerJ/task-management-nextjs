import { jest } from '@jest/globals';
import { signOut } from '../../controlers/auth.controler.js'; 
import { createError } from '../../utils/createError.js';

// Mock the dependencies
jest.mock('../../utils/createError.js');

describe('SignOut Function', () => {
  let req, res, next;

  beforeEach(() => {
  
    res = {
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear the access_token cookie and respond with a success message', () => {
    signOut(req, res, next);

    expect(res.clearCookie).toHaveBeenCalledWith('access_token');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ "message": "sign out successfull " });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors properly', () => {
    const error = new Error('Unexpected Error');
    jest.spyOn(res, 'clearCookie').mockImplementation(() => {
      throw error;
    });

    signOut(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(500, 'Unable to connect to the server. Please check your network connection and try again.'));
  });
});
