import express from 'express'
import { CreateTask , deleteTask , updateTask , getUserTasks} from '../controlers/tasks.controler.js'
import verifyToken from '../utils/verifyToken.js'


const router = express.Router()


router.post('/createtask' ,  CreateTask)
router.delete('/deleteTask/:Taskid' ,verifyToken ,  deleteTask)
router.put('/updateTask/:Taskid' ,verifyToken ,  updateTask)
router.get('/getUserTasks' , verifyToken, getUserTasks)


export default router