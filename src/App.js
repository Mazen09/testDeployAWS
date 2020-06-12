import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NewPost from "./components/newPost";
import Home from "./components/home";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import Account from "./components/account";
import SearchResults from "./components/searchResults";
import Post from "./components/post";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import Review from "./components/review";
import Profile from "./components/profile";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/post/:id" component={Post} />
            <Route path="/profile/:user" component={Profile} />
            <Route path="/search/:query" component={SearchResults} />
            <ProtectedRoute path="/account" component={Account} />
            <ProtectedRoute path="/review" component={Review} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/newpost" component={NewPost} />
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
