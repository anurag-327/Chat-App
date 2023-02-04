import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import {createBrowserRouter,RouterProvider,BrowserRouter} from "react-router-dom";

// import { Usercontext } from './context/usercontext'
// import Userprovider from './context/usercontext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Userprovider>
  
  <React.StrictMode>
     <App />
  </React.StrictMode>
  // </Userprovider>,
)
