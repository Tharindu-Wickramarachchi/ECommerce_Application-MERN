import Home from "./pages/Home";
import Access from "./pages/AccessPage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Verification from "./pages/VerificationPage"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Navigate to="/pages/verification" replace />,
      },
      {
        path: '/pages/access',
        element: <Access />
      },
      {
        path: '/pages/verification',
        element: <Verification />
      },
      {
        path: '/pages/register',
        element: <Register />,
      },
      {
        path: '/pages/login',
        element: <Login />
      },
      {
        path: '/pages/home',
        element: <Home />,
      },
    ]
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;




// import Navbar from "./components/Navbar"
// import Register from "./pages/RegisterPage"
// import Home from "./pages/Home"

// function App() {

//   return (
//     <>
//     <Home/>
//     {/* <Navbar/>     */}
//     </>
//   )
// }

// export default App
