import { jest } from '@jest/globals';
import { createError } from '../../utils/createError';
import pool from '../../db';
import { CreateTask } from '../../controlers/tasks.controler';

// Mock dependencies 
jest.mock('../../db');
jest.mock('../../utils/createError');

describe('create task', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                'title': 'testTitle',
                'description': 'testDescription',
                'status': false,
                'assigned_to': 2,
                'created_by': 1,
                'createdAt': '1:30'
            }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis() //mockreturnthis return res object and it helps for methcod chainign
        };
        next = jest.fn();
    });

    it('creates the requested task and returns the created task back', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                'id': 1,
                'title': 'testTitle',
                'description': 'testDescription',
                'status': false,
                'assigned_to': 2,
                'created_by': 1,
                'createdAt': '1:30'
            }]
        });

        // Call the function
        await CreateTask(req, res, next);

        // Assertion
        expect(res.json).toHaveBeenCalledWith({
            'id': 1,
            'title': 'testTitle',
            'description': 'testDescription',
            'status': false,
            'assigned_to': 2,
            'created_by': 1,
            'createdAt': '1:30'
        });
        expect(res.status).toHaveBeenCalledWith(201)
       
    });

    it('should return unable to connect to the internet when there is an error',async()=>{
        // create stub
     const error  = new Error('database error')
         //Mock Stub
        pool.query.mockRejectedValueOnce(error)
        //call the funcion
        await CreateTask(req, res , next)
        //Assertion
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(createError(500, 'Unable to connect to the server. Please check your network connection and try again.'));
        
    })
});
