import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../../services/userService";
//import { addUser } from '../services/firebase';
import auth from '../../services/authService';
import {Link} from "react-router-dom";

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
      <div className="form">
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
    );
  }
}

export default RegisterForm;