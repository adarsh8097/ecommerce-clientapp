import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
function Loginform(){
     let item = JSON.parse(localStorage.getItem('UserData'));
      
      const navigate = useNavigate();
    const [data,setisData] = useState({
         userName:"",
         password:"",
    });

    const handleInput = (e)=>{
         const{name,value} = e.target;
         setisData({
            ...data,
            [name]:value,
         });
    }

      const handledata = (e)=>{
         e.preventDefault();
         if(data.userName !=="" && data.password !==""){
            if(item === null){
                alert("Please create account..!");
                return ;
           }
            if(data.userName === item.email && data.password === item.password){
                    alert("Login Success");
                    navigate("/item");
                    return ;
             }
               alert("Invalide credational..!");
              
         }else{
             alert("Please fill all details..");
         }
      }

    return(
       <>
        
        <div class="wrapper">
        <div class="logo">
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt=""/>
        </div>
        <div class="text-center mt-4 name">
           Login
        </div>
        <form class="p-3 mt-3" onSubmit={handledata}>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Username" value={data.userName} onChange={handleInput}/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" value={data.password} onChange={handleInput}/>
            </div>
            <button class="btn mt-3" type="submit">Login</button>
        </form>
        <div class="text-center fs-6">
            <Link to="#">Forget password?</Link> or <Link to="/sign">Sign up</Link>
        </div>

    </div>
         
       </>

    )
}

export default Loginform;