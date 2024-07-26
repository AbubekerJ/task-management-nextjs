import { jest } from '@jest/globals';
import { createError} from '../../utils/createError';
import pool from '../../db';
import { updateTask } from '../../controlers/tasks.controler';


jest.mock('../../db')
jest.mock('../../utils/createError')

describe('update task' , ()=>{

let req,res ,next
beforeEach(()=>{
    req = {
        body:{
            'title': 'testTitle',
            'description': 'testDescription',
            'status': false,
            'assigned_to': 2,
            'created_by': 1,
           
        },
        params:{
            'TaskId':1
        },
        user:{
            id:1
        }
    }

    res={
        json:jest.fn(),
        status:jest.fn().mockReturnThis()
    }
    next=jest.fn()
})


it('should retun task not found if there is no task with the given taskid',async()=>{
pool.query.mockReturnValueOnce({rows:[]})

//call the function
await updateTask(req,res,next)

//Assertion
expect(next).toHaveBeenCalledWith(createError(404, 'Task Not Found'))

})

it('should return error when not the owner or assigned to person trying to update the task',async()=>{
    pool.query.mockReturnValueOnce({rows:[{
        'id': 1,
        'title': 'testTitle',
        'description': 'testDescription',
        'status': false,
        'assigned_to': null,
        'created_by': 2,
        'createdAt': '1:30'
    }]})
    //call function
    await updateTask(req, res, next)

    //Asserion
    expect(next).toHaveBeenCalledWith(createError(401, 'You can only update your task'))
})


it('should return with status code 200 and the updated task when the person who created the task updates the task', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        title: 'testTitle',
        description: 'testDescription',
        status: false,
        assigned_to: null,
        created_by: 1,
        created_at: '1:30',
      }],
    });

    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        title: 'updatedTitle',
        description: 'updatedDescription',
        status: true,
        assigned_to: 2,
        created_by: 1,
        created_at: '1:30',
      }],
    });

    // Call the function
    await updateTask(req, res, next);

    // Assertion
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'updatedTitle',
      description: 'updatedDescription',
      status: true,
      assigned_to: 2,
      created_by: 1,
      created_at: '1:30',
    });
  });
});