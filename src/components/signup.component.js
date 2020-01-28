import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Jumbotron, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import welcome from './../assets/Welcome.png';

export default class Signup extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        // Setting up state
        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        return <Redirect to={'/website'} />
        // const studentObject = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     rollno: this.state.rollno
        // };
        // axios.post('http://localhost:4000/students/create-student', studentObject)
        //     .then(res => console.log(res.data));
        //
        // this.setState({username: '', password: ''})
    }

    render() {
        return (
            <div className={'page-wrapper'}>
                <Container>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <h1>Welcome Back</h1>
                        </Col>
                    </Row>
                    <Row className={'form-row'}>
                        <Col md={{span: 6, offset: 3}}>
                            <div className="form-wrapper">
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label className={'form-label'}>Username</Form.Label>
                                        <Form.Control type="text" value={this.state.username}
                                                      placeholder={'Type Your Username'}
                                                      onChange={this.onChangeUsername} className={'form-input'}/>
                                    </Form.Group>
                                    <Form.Group controlId="Name">
                                        <Form.Label className={'form-label'}>Password</Form.Label>
                                        <Form.Control type="password" value={this.state.name}
                                                      placeholder={'Type Your Password'}
                                                      onChange={this.onChangePassword} className={'form-input'}/>
                                    </Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Button size="lg" className={'submit-button'} type="submit">
                                                Sign In
                                            </Button>
                                        </Col>
                                        <Col md={6}>
                                            <p className={'forget-text'}>Forgot Password?</p>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <img src={welcome} alt="welcome" align={'right'}/>
            </div>);
    }
}
