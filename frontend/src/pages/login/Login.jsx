import React, { useEffect } from "react";
import Books from '../../assets/book-stack.png'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './login.css'

export default function Login(){

   function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
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

    return(
        <div className="login">
            <div className="header">
            <h1>Login</h1>
            </div>
            <form className="form">
            <div className="user">
              <label>Username or email:</label>
              <input type="text"/>
            </div>
            <div className="pass">
              <label>Password:</label>
              <input type="password"/>
            </div>   
            <div id="sign">

              </div>
              <button>Login</button>
              
              <Link to ="/register">
              <button >Don't have an account?</button>
              </Link>
            </form>
            <div className="img"><img src={Books}/></div>
            
        </div>
    )
}