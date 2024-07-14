import express from 'express'
import { CreateTask , deleteTask , updateTask , getUserTasks} from '../controlers/tasks.controler.js'
import verifyToken from '../utils/verifyToken.js'


const router = express.Router()

//create task
/**
 * @swagger
 * /api/createtask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *               created_by:
 *                 type: integer
 *               assigned_to:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Unable to connect to the server
 */
router.post('/createtask' ,  CreateTask)

//delete task
/**
 * @swagger
 * /api/deleteTask/{Taskid}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: Taskid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Unable to connect to the server
 */
router.delete('/deleteTask/:Taskid' ,verifyToken ,  deleteTask)

//uppdate Task

/**
 * @swagger
 * /api/updateTask/{Taskid}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: Taskid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *               assigned_to:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Unable to connect to the server
 */
router.put('/updateTask/:Taskid' ,verifyToken ,  updateTask)



//get user task
/**
 * @swagger
 * /api/getUserTasks:
 *   get:
 *     summary: Get tasks created by or assigned to the user
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status (true or false)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort tasks by date (latest or oldest)
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Unable to connect to the server
 */
router.get('/getUserTasks' , verifyToken, getUserTasks)


export default router