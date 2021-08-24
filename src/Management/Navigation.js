import React from "react";
import '../App.css';

import MainScreen from "../Screens/Fedex/MainScreen";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Navigation() {
  return (
    <div>
    <Router>
      <div className = "row"  >
        {/**Side bar Area  style={{backgroundColor: '#2d3744', height: '100%', margin: 0, padding: 0, float: "left", position: 'fixed', width: '200px', overflowX:'hidden', top: 0, left: 0 }}*/}
        <div className="sidenav" >
            <div  >
                <nav >
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/fedex">fedex</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        {/**Main Area */}
        <div className="main">
            
                <Switch>
                <Route path="/fedex">
                    <MainScreen />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                </Switch>
            
        </div>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  return <h2 style={{}}>Home</h2>;
}


function Fedex() {
  return <h2>Fedex</h2>;
}