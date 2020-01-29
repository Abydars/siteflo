import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Jumbotron, Container, Row, Col,Alert} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import welcome from './../assets/Welcome.png';
import store from "../store/store";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Signup extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            username: '',
            password: '',
            error: false,
            errMessage: '',
        }
    }

    componentDidMount() {
        if(reactLocalStorage.get('id',false,true))
        {
            this.props.history.push('/website');
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
        const studentObject = {
            username: this.state.username,
            password: this.state.password,
        };
        axios.post('http://localhost:4000/users/authenticate', studentObject)
            .then(response => {
                // console.log(response.data._id)
                reactLocalStorage.set('id', <response className="data _id"></response>);
                this.setState({
                    username: '',
                    password:''
                })
                this.props.history.push('/website');
            })
            .catch(error => {
                this.setState({
                    error:true,
                    username:'',
                    password: '',
                    errMessage:error.response.data.message
                })
            });


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
                                {this.state.error &&
                                <Alert variant={'danger'}>
                                    {this.state.errMessage}
                                </Alert>
                                }
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label className={'form-label'}>Username</Form.Label>
                                        <Form.Control type="text" value={this.state.username}
                                                      placeholder={'Type Your Username'}
                                                      onChange={this.onChangeUsername} className={'form-input'}/>
                                    </Form.Group>
                                    <Form.Group controlId="Name">
                                        <Form.Label className={'form-label'}>Password</Form.Label>
                                        <Form.Control type="password" value={this.state.password}
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
