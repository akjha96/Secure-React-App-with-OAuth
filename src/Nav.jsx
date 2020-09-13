import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    const { isAuthenticated, logout, login } = this.props.auth;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public API</Link>
          </li>
          <li>
            <Link to="/private">Private API</Link>
          </li>
          <li>
            {isAuthenticated() ? <Link to="/profile">Profile</Link> : null}
          </li>
          <li>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
