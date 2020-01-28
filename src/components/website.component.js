import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Jumbotron, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import space from './../assets/Space Discovery.png';
import {IoIosArrowRoundForward} from 'react-icons/io';

export default class Website extends Component {

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

        const studentObject = {
            name: this.state.name,
            email: this.state.email,
            rollno: this.state.rollno
        };
        axios.post('http://localhost:4000/students/create-student', studentObject)
            .then(res => console.log(res.data));

        this.setState({username: '', password: ''})
    }

    render() {
        return (
            <div className={'page-wrapper'}>
                <Container>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <h1>My Sitemaps</h1>
                        </Col>
                    </Row>
                    <Row className={'form-row'}>
                        <Col md={{span: 6, offset: 3}}>
                            <Button size="lg" block={'block'} className={'websiteButton'}>
                                <span className={'website-text'}>
                                   Example Sitemap Name
                                </span>
                                <IoIosArrowRoundForward className={'icon-text'}/>
                            </Button>
                            <Button size="lg" block={'block'} className={'websiteButton'}>
                                <span className={'website-text'}>
                                   Example Sitemap Name
                                </span>
                                <IoIosArrowRoundForward className={'icon-text'}/>
                            </Button>
                            <Button size="lg" block={'block'} className={'websiteButton'}>
                                <span className={'website-text'}>
                                   Example Sitemap Name
                                </span>
                                <IoIosArrowRoundForward className={'icon-text'} size={12}/>
                            </Button>
                            <Button size="lg" className={'submit-button-website'} >
                                Add New
                            </Button>
                        </Col>

                    </Row>
                </Container>
                <img src={space} alt="welcome" align={'right'}/>
            </div>);
    }
}
