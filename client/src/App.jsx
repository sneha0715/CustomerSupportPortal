import HomePage from "./pages/HomePage"
import SignUp from './pages/SignUp'
import Login from "./pages/Login"
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
  
    
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signUp" element={<SignUp/>}></Route>
      </Routes>
    

  )
}

export default App
