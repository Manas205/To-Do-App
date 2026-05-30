import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import RegisterForm from './components/registerForm'

import LoginUser from "./components/loginForm";
import TaskPage from "./pages/Taskpage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginUser/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/tasks" element={<TaskPage/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
