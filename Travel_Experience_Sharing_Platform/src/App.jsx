import React, { useEffect,useState } from 'react'

import './App.css'
import { Header,Footer,Container } from './exports'
import {authService} from './exports'
import { useDispatch, useSelector } from 'react-redux'
import {login,logout} from "./store/authSlice"
import { useNavigate } from 'react-router-dom'


function App({children}) {

  const authStatus=useSelector((state)=>state.auth.status)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  //below useEffect is doing very imp. task -> we stores the use Login detains in 
  //our store but when user reloads page then that data is erased and user will no be 
  //able to go on any route even though it was loggedin so to handle that.
  //this app.jsx will render in 2 cases first->user navigating between routes and 
  //second->user reloaded page.in first case date will be present in store no worries.
  //but in second case to get the currently logged in user data we have to make calls which
  //is in useEffect hook

  useEffect(()=>{

      if(!authStatus){

        const prom=authService.getCurrentUser()
        prom.then((data)=>{

          dispatch(login(data))
          console.log(data)
           //if user logged in and reloaded page

        }).catch(()=>{
          navigate("/")
        })
        
      }
      else{
        console.log("user is logged in already")
      }

},[])   //depedencies are empty because when this app.jsx render then only it will be executed

  return   (
    < div className='flex flex-col'>
      <Header />
      <Container>
          {children}
      </Container>
      <Footer/>
    </div>
  )
}

export default App
