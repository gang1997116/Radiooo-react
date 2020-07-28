import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../../services/userService";
import auth from '../../services/authService';
import {Link} from "react-router-dom";
import {addUser} from '../../services/firebase';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try{
      addUser(this.state.data.username);
      const response= await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location='/shop';
    }
    catch(ex){
      if(ex.response&&ex.response.status===400){
        const errors = {...this.state.errors};
        errors.username= ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div className="page">
      <div className="hidescrollbar" style={{overflowY:"scroll",height:"80vh",marginTop:"10vh",position:"relative"}}>
      <div className="form" style={{marginBottom:"5vh",top:"5vh"}}>
        <h1 style={{textAlign:"center",marginBottom:"3vh"}}>Register</h1>
        {/* <button onClick={addUser}>send to firebase</button> */}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
          <Link to="/login" className="log-link">Log in</Link>
        </form>
      </div>
      </div>
      </div>
    );
  }
}

export default RegisterForm;
