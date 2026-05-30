const tasks=require('../models/taskModels')
const createTask=async(req,res,next)=>{
  try{
    const {title}=req.body
    console.log(req.body)
    if(!title) return res.status(400).json({message:"Title wrong"})
    console.log(req.userId);
    
    //if(!user) return res.status(400).json({message:"user dne"})
    const newTask=await tasks.create({title,user:req.userId})
    //tasks.push(newTask)
    return res.status(201).json(newTask)
  }catch(error)
  {
    return res.status(401).json({message:"Task creation error"})
  }
}

const deleteTask=async(req,res)=>{
  try{
    const deleteTask=await tasks.findOneAndDelete({_id:req.params.id,user:req.userId})
    if(!deleteTask) return res.status(404).json({message:"Id does not exist"})
    return res.status(200).json({message:"Deleted successfully"})
  }catch(error)
  {
    return res.status(404).json({message:"Task deletion problem"})
  }
}

const updateTask=async(req,res,next)=>
{
  try{
  const {completed,title}=req.body
  const updateData={}
  if(title!==undefined)
  {
    if(typeof title!=="string")
    {
      return res.status(400).json({message:"Type of title not string"})
    }
    updateData.title=title
  }
  if(completed!==undefined)
  {
    if(typeof completed!=="boolean")
    {
      return res.status(400).json({message:"Type of completed not boolean"})
    }
    updateData.completed=completed
  }
 if (Object.keys(updateData).length === 0) {
  return res.status(400).json({ message: "Nothing to update" });
  }

  const updatedTask=await tasks.findOneAndUpdate({_id:req.params.id,user:req.userId},updateData,{new:true})
  if (!updatedTask) return res.status(404).json({ message: "Task does not exist" });
  return res.status(200).json(updatedTask);
  }catch(error)
  {
    return res.status(401).json({message:"Updation error"})
  }
}
const getAllTask=async(req,res,next)=>{
  try{

    const Tasks=await tasks.find({user:req.userId})
    console.log(typeof Tasks);
    console.log("tasks",typeof tasks);
    
    res.json(Tasks)
  }catch(error)
  {
    return res.status(400).json({message:"Getting all error"})
  }
}

module.exports={
    getAllTask,
    createTask,
    updateTask,
    deleteTask
}