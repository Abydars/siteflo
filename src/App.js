import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Signup from "./components/signup.component";
import Website from "./components/website.component";
import websiteDetails from "./components/websiteDetails.component";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Stoke', 'sans-serif']
    }
});


function App() {
    return (<Router>
        <div className="App">
            <header className="App-header">
                <Navbar variant="dark" className={'color-nav'}>
                    <Container>

                        <Navbar.Brand>
                            <Link to={"/create-student"} className="nav-link">
                                Siteflo
                            </Link>
                        </Navbar.Brand>


                    </Container>
                </Navbar>
            </header>

            <div className="wrapper">
                <Switch>
                    <Route exact path='/' component={Signup}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/website" component={Website}/>
                    <Route path="/websiteDetails" component={websiteDetails}/>
                </Switch>
            </div>
        </div>
    </Router>);
}

export default App;
