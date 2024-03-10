import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store/store.js"
import { Provider } from "react-redux"
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import {Home,Login,Signup,Search,MyPosts,Post,AddPost,EditPost,Dashboard} from "./exports.js"



const router=createBrowserRouter(

  createRoutesFromElements(


     <Route>
      <Route path="/" element={<App> <Home/> </App> } />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/search" element={<App> <Search/> </App>} />
      <Route path="/my-posts" element={<App> <MyPosts/> </App> } />
      <Route path="/post/:slug" element={<App>  <Post/> </App> } />
      <Route path="/add-post" element={<App> <AddPost/> </App> } />
      <Route path="/edit-post/:slug" element={<App> <EditPost/> </App> } />
      <Route path="/user/dashboard" element={<App> <Dashboard/>  </App> } />
      <Route path="/user/edit" element={<App>  </App> } />
      <Route path="/user/settings" element={<App> </App> } />

      </Route>

  )


)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)
