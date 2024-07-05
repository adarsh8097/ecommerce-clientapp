import React, { useState } from "react";
import "./SignUpPage.css";
import { json, Link, useNavigate } from "react-router-dom";
 function SignUpform(){
    const navigate = useNavigate();
    
       const[data,setisData] = useState({
          fullname:"",
          email:"",
          password:"",
          cnfpassword:"",
       }); 

       const handleInput =(e)=>{
        const{name,value} = e.target;
        setisData({
            ...data,
            [name]:value,
       });

       }

       const handleData =(e)=>{
          e.preventDefault();
            const{fullname,email,password,cnfpassword} = data;
            if(fullname !=="" && email !== "" && password !=="" && cnfpassword !==""){
                if(password !== cnfpassword){
                     alert("Please check your password once again..!");
                     return;
                } 

                  localStorage.setItem("UserData", JSON.stringify(data));
                 console.log("UserData",data);
                alert("Register Successfully");
                navigate('/');
            }else{
                 alert("Please fill all detailes");
            } 
       }

     return(

        <>
        {/* <section class="vh-200 bg-image"
  style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: "15px"}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleData}>

                <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example1cg">Your Name</label>
                <input type="text" name="fullname" id="form3Example1cg" class="form-control form-control-lg" placeholder="Enter your name" value={data.fullname} onChange={handleInput}/>
                   </div>

                <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example3cg">Your Email</label>
                  <input type="email" name="email" id="form3Example3cg" class="form-control form-control-lg" placeholder="Enter your email" value={data.email} onChange={handleInput}/>
                 
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Password</label>
                  <input type="password" name="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Enter your password" value={data.password} onChange={handleInput}/>
                 
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                  <input type="password" name="cnfpassword" id="form3Example4cdg" class="form-control form-control-lg" placeholder="Enter your cnf-password" value={data.cnfpassword} onChange={handleInput}/>
                  
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label" for="form2Example3g">
                    I agree all statements in <Link to="#!" class="text-body"><u>Terms of service</u></Link>
                  </label>
                </div>

                <div class="d-flex justify-content-center">
                  <button  type="submit" data-mdb-button-init
                    data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100">Submit</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/"
                    class="fw-bold text-body"><u>Login here</u></Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}
          <div class="wrapper">
        <div class="logo">
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt=""/>
        </div>
        <div class="text-center mt-4 name">
           SignUp
        </div>
        <form class="p-3 mt-3" onSubmit={handleData}>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text"  name="fullname" id="userName" placeholder="Enter your name" value={data.fullname} onChange={handleInput}/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="email" name="email" id="pwd" placeholder="Your email" value={data.email} onChange={handleInput}/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Your password" value={data.password} onChange={handleInput}/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="cnfpassword" id="pwd" placeholder="cnf-Password" value={data.cnfpassword} onChange={handleInput}/>
            </div>
            <button class="btn mt-3" type="submit">Submit</button>

        </form>
        <div class="text-center fs-6">
            <Link to="#">Have already an account? </Link> or <Link to="/">Login here</Link>
        </div>

    </div>
        </>
     );

 }

 export default SignUpform;