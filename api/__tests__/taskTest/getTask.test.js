
import { jest } from '@jest/globals';
import pool from '../../db';
import { createError } from '../../utils/createError';
import { getUserTasks } from '../../controlers/tasks.controler';

jest.mock('../../db');
jest.mock('../../utils/createError');

describe('getUserTasks', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      query: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });


  it('should fetch tasks created by or assigned to the user', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', created_by: 1, assigned_to: 2 },
      { id: 2, title: 'Task 2', created_by: 2, assigned_to: 1 }
    ];
    pool.query.mockResolvedValue({ rows: mockTasks });

    await getUserTasks(req, res, next);

   
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('should filter tasks by status if provided', async () => {
    req.query.status = 'true';
    const mockTasks = [
      { id: 1, title: 'Task 1', created_by: 1, assigned_to: 2, status: true }
    ];
    pool.query.mockResolvedValue({ rows: mockTasks });

    await getUserTasks(req, res, next);

  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('should sort tasks by date if provided', async () => {
    req.query.sort = 'latest';
    const mockTasks = [
      { id: 1, title: 'Task 1', created_by: 1, assigned_to: 2 },
      { id: 2, title: 'Task 2', created_by: 2, assigned_to: 1 }
    ];
    pool.query.mockResolvedValue({ rows: mockTasks });

    await getUserTasks(req, res, next);

  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('should handle errors and call next with error', async () => {
    const error = new Error('Database error');
    pool.query.mockRejectedValue(error);

    await getUserTasks(req, res, next);

   
    expect(next).toHaveBeenCalledWith(
      createError(500, 'Unable to connect to the server. Please check your network connection and try again.')
    );
  });
});
