import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Home from "./Home";
import {Nav} from "react-bootstrap";
import CsvParser from "./components/csvParser";


function App() {
  return (
    <div className="App">
      <Router>
          <Nav className="justify-content-center" activeKey="/">
              <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="/topics">Topics</Nav.Link>
              </Nav.Item>
          </Nav>
        <div>
          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>

    </div>
  );
}

function Home() {
    return (
        <CsvParser></CsvParser>
    );
}


function About() {
  return (
      <div>
        <h2>About</h2>
      </div>
  );
}

function Topics({ match }) {
  return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.path}
            render={() => <h3>Please select a topic.</h3>}
        />
      </div>
  );
}

function Topic({ match }) {
  return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
  );
}

export default App;
