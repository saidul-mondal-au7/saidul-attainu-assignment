import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AddUser } from "./components/crud/AddUser";
import { EditUser } from "./components/crud/EditUser";
import { GlobalProvider } from "./context/GlobalState";
import {Home} from './components/Home'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={AddUser} />
          <Route path="/edit/:id" component={EditUser} />
        </Switch>
    </Router>
  </GlobalProvider>
    </div>
  );
}

export default App;
