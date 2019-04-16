import React, { Component } from 'react';
import PersonForm from "./components/PersonForm"
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <PersonForm/>
      </div>
    );
  }
}

export default App;
