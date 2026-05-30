import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const BASE = "https://to-do-app-i0ay.onrender.com";



function Taskpage() {
    const navigator = useNavigate()
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [editId, seteditId] = useState(null)
    const [editTitle, seteditTitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")

    useEffect(()=>{
        fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${BASE}/api/tasks/`, { withCredentials:true })
            setTasks(res.data)
        } catch (error) {
            navigator('/')
        } finally {
            setLoading(false);
        }
    }

    const addTask = async () => {
        try {
            const res = await axios.post(`${BASE}/api/tasks`, { title }, { withCredentials:true })
            setTasks([...tasks, res.data])
            setTitle("")
        } catch(error) {
            console.log(error)
        }
    }

    const breakTask = async () => {
        if (!title) return;
        try {
            const res = await axios.post(`${BASE}/api/ai/suggest`, { task: title }, { withCredentials: true })
            const subtasks = res.data.steps;
            for (const step of subtasks) {
                const r = await axios.post(`${BASE}/api/tasks`, { title: step }, { withCredentials: true })
                setTasks(prev => [...prev, r.data])
            }
            setTitle("")
        } catch (error) {
            console.log(error)
        }
    }

    const logoutScreen = async () => {
        const res = await axios.post(`${BASE}/api/auth/logout`, {}, { withCredentials:true })
        if(res.status===200) navigator("/")
    }

    const updateTask = async (id) => {
        await axios.put(`${BASE}/api/tasks/${id}`, { title:editTitle }, { withCredentials:true })
        fetchTasks()
        seteditId(null)
    }

    const deleteTask = async (id) => {
        await axios.delete(`${BASE}/api/tasks/${id}`, { withCredentials: true });
        setTasks(tasks.filter((task) => task._id !== id));
    };

    const toggleTask = async (id, currentStatus) => {
        await axios.put(`${BASE}/api/tasks/${id}`, { completed:!currentStatus }, { withCredentials:true })
        fetchTasks()
    }

    if(loading) return <h2>Loading...</h2>

    return(
        <div className="taskContainer">
            <h2>My Tasks</h2>
            <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
            </div>
            <div className="addTask">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" />
                <button onClick={addTask}>Add</button>
                <button onClick={breakTask}>✨ Break it</button>
            </div>
            <ul className="taskList">
                {tasks.filter((task) => {
                    if (filter === "active") return !task.completed;
                    if (filter === "completed") return task.completed;
                    return true;
                }).map((task) => (
                    <li className="taskItem" key={task._id}>
                        {editId===task._id ? (
                            <>
                                <input value={editTitle} onChange={(e)=>seteditTitle(e.target.value)} />
                                <button onClick={()=>updateTask(task._id)}>Done</button>
                                <button onClick={()=>seteditId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <div className="taskInfo">
                                    <input type="checkbox" checked={task.completed} onChange={()=>toggleTask(task._id,task.completed)}/>
                                    {task.title}
                                </div>
                                <div className="taskButtons">
                                    <button onClick={()=>{ seteditId(task._id); seteditTitle(task.title) }}>Edit</button>
                                    <button onClick={()=>deleteTask(task._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={logoutScreen}>Logout</button>
        </div>
    )
}
export default Taskpage