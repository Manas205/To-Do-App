const express=require('express')
const router=express.Router()//mini app inside main app
const{
    getAllTask,
    createTask,
    updateTask,
    deleteTask
}=require('../Controllers/tasksControllers')
const authMiddleware=require('../middleware/authentication')
router.use(authMiddleware)
router.get('/',getAllTask)
router.post('/',createTask)
router.put('/:id',updateTask)
router.delete('/:id',deleteTask)
module.exports = router;