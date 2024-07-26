
import pool from "../db.js";
import { createError } from "../utils/createError.js";



//Create task 



export const CreateTask=async(req, res ,next)=>{

  
    const { title, description, status, created_by, assigned_to } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, created_by, assigned_to, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *',
      [title, description, status, created_by, assigned_to]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(createError(500 , 'Unable to connect to the server. Please check your network connection and try again.'));
  }
}


//delete Task 


export const deleteTask = async (req, res, next) => {
  const { Taskid } = req.params;

  try {

    const taskQuery = await pool.query('SELECT * FROM tasks WHERE id = $1', [Taskid]);
    const task = taskQuery.rows[0];

    if (!task) {
      return next(createError(404, 'Task Not Found'));
    }

    if (req.user.id !== task.created_by ) {
      return next(createError(401, 'You can only delete your task'));
    }

    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [Taskid]);

    

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(createError(500 , 'Unable to connect to the server. Please check your network connection and try again.'));
  }
};



//update task
export const updateTask = async (req, res, next) => {
  const { Taskid } = req.params;
  const { title, description, status, assigned_to } = req.body;

  try {
  
    const taskQuery = await pool.query('SELECT * FROM tasks WHERE id = $1', [Taskid]);
    const task = taskQuery.rows[0];

    if (!task) {
      return next(createError(404, 'Task Not Found'));
    }

  
 if (req.user.id !== task.created_by ) {
  return next(createError(401, 'You can only update your task'));
}


    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, assigned_to = $4 WHERE id = $5 RETURNING *',
      [title, description, status, assigned_to, Taskid]
    );


    res.status(200).json(result.rows[0]);
  
    
  } catch (error) {
  
      next(error);
    
  }
};




// Fetch tasks created by or assigned to the user, optionally filtered by status and sorted by date
export const getUserTasks = async (req, res, next) => {
  const userId = req.user.id;
  const { status, sort } = req.query;
  
  let query = `
    SELECT tasks.*, users.username as assigned_to_username 
    FROM tasks 
    LEFT JOIN users ON tasks.assigned_to = users.id 
    WHERE (tasks.created_by = $1 OR tasks.assigned_to = $1)
  `;
  const params = [userId];

  // status filter if provided
  if (status === 'true' || status === 'false') {
    query += ' AND tasks.status = $2';
    params.push(status === 'true');
  }

  // sorting if provided
  if (sort === 'oldest') {
    query += ' ORDER BY tasks.created_at ASC';
  } else if (sort === 'latest') {
    query += ' ORDER BY tasks.created_at DESC';
  }

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
   
  } catch (error) {
    next(createError(500, 'Unable to connect to the server. Please check your network connection and try again.'));
  }
};