import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/layout/Main';
import Login from './components/Login/Login';
import RegisterReactBoots from './components/RegisterReactBoots/RegisterReactBoots';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main> , 
    children:[
      {
        path: '/',
        element: <RegisterReactBoots></RegisterReactBoots>
      },
      {
        path: '/register',
        element: <RegisterReactBoots></RegisterReactBoots>
      },
      {
        path: '/login',
        element:<Login></Login>
      },
    ]
  }
])

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
