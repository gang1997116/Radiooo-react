import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const {state}=this.props.location;
      window.location=state? state.from.pathname:'/shop';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to='/shop'/>
    return (
      <div className="page">
      <div className="form">
        <h1 style={{textAlign:"center",marginBottom:"3vh" }}>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("LOG IN")}
          <Link to="/register" className="log-link">Register</Link>
        </form>
      </div>
      </div>
    );
  }
}

export default LoginForm;
