import React, { useEffect, useState } from "react";
import Books from '../../assets/book-stack.png'
import {Link, useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './login.css'


export default function Login(){

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  }) 
  
  function handleChange(e){
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}) )
  }

   const navigate = useNavigate()

    async function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+response.credential)
    var userObject = jwt_decode(response.credential)
    const {email} = userObject
    try{
      const data = await fetch('http://localhost:4000/api/user/find', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
      })
      if(data.status==404){
        alert('User not registered')
        navigate('/register')
      }else{
        alert('Success')
      navigate('/')
      }
     }catch(err){
      console.log(err)
     }
   } 

    useEffect(()=>{
      /* global google */
      google.accounts.id.initialize({
        client_id: "451868079952-0n9a0jnfiqioms8fm9sbhh9vcmus2djv.apps.googleusercontent.com",
        callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(
        document.getElementById('sign'),
        {theme: "outline", size: "large"}
      )
      //preciso por o comentario acima
    }, [])//como tem uma empty array so vai rodar uma vez ao carregar

    async function handleSumbit(e){
      e.preventDefault()
      const data = {
        email: inputs.username,
        password: inputs.password
      }
      try{
      const res = await fetch('http://localhost:4000/api/user/login', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      console.log(res)
      if(res.status==404){
        alert('Username or password wrong')
      }else{
        alert('Success')
        navigate('/')

      }
    }catch(err){
      console.log(err)
    }
    }

    return(
        <div className="login">
            <div className="header">
            <h1>Login</h1>
            </div>
            <form className="form">
            <div className="user">
              <label>Username or email:</label>
              <input type="text" name="username" onChange={handleChange} value={inputs.username}/>
            </div>
            <div className="pass">
              <label>Password:</label>
              <input type="password"name="password" onChange={handleChange} value={inputs.password}/>
            </div>   
            <div id="sign">

              </div>
              <button onClick={handleSumbit}>Login</button>
              
              <Link to ="/register">
              <button >Don't have an account?</button>
              </Link>
            </form>
            <div className="img"><img src={Books}/></div>
            
        </div>
    )
}