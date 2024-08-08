import { Route, createBrowserRouter, Navigate,createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import User from "./routes/User/User";
import NotFound from "./NotFound/NotFound";
import HomePage from "./routes/HomePage/HomePage";


function App() {

  const router = createBrowserRouter(createRoutesFromElements(

    <>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path="register" element={<Register/>}></Route>
      <Route path="user" element={<User/>}></Route>
      
      <Route path="*" element={<NotFound/>}></Route>
    </>
    
    
  ))
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
