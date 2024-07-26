import { jest } from '@jest/globals';
import pool from "../../db";
import { createError } from '../../utils/createError';
import { deleteTask } from "../../controlers/tasks.controler.js";


jest.mock('../../db')
jest.mock('../../utils/createError')

describe('delete task',()=>{
    
    let req , res , next;
    beforeEach(() => {
        req = {
            params: {
                'TaskId': 1
            },
            user: {
                'id': 2
            }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });


   it('should return task not found when there is no task with the given id ',async()=>{
     
    //mock stub
    pool.query.mockReturnValueOnce({rows:[]})
     
    //call the function
    await deleteTask(req ,res , next)

    //Asseriton
  
    expect(next).toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(createError(404, 'Task Not Found'))

   })

   it('should retun with an error when not the owner try to delete a tesk ' ,async()=>{
     pool.query.mockReturnValueOnce({rows:[{
        'id': 1,
        'title': 'testTitle',
        'description': 'testDescription',
        'status': false,
        'assigned_to': 2,
        'created_by': 1,
        'createdAt': '1:30'
    }]})
    await deleteTask(req,res,next)
  
    expect(next).toHaveBeenCalledWith(createError(401, 'You can only delete your task'))
    expect(pool.query).toHaveBeenCalledTimes(1);

   })


   it('should delete the task and return status 200 with the message Task deleted successfully', async()=>{
    pool.query.mockReturnValueOnce({rows:[{
        'id': 1,
        'title': 'testTitle',
        'description': 'testDescription',
        'status': false,
        'assigned_to': 2,
        'created_by': 2,
        'createdAt': '1:30'
    }]})
    await deleteTask(req,res,next)

    //assertion
    expect(pool.query).toHaveBeenCalledTimes(2);
     expect(res.status).toHaveBeenCalledWith(200)
     expect(res.json).toHaveBeenCalledWith({message:'Task deleted successfully'})


   })

   it('should return any other error ',async()=>{
     pool.query.mockRejectedValueOnce(new Error ('other error'))

     //call function
     await deleteTask(req,res,next)

     //assertion
     expect(next).toHaveBeenCalledWith(createError(500 , 'Unable to connect to the server. Please check your network connection and try again.'))
   })


})