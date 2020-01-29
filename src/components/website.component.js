import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Jumbotron, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import space from './../assets/Space Discovery.png';
import {IoIosArrowRoundForward} from 'react-icons/io';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Link} from 'react-router-dom'

export default class Website extends Component {

    constructor(props) {
        super(props)

        // Setting up functions

        // Setting up state
        this.state = {
            id: '',
            websites: undefined,
            new: false,
            name: '',
            validate: true
        }
    }

    componentDidMount() {
        this.checkAuth();
        this.getWebsite();

    }

    addNew = () => {
        this.setState({
            new: true
        })
    }

    saveNew = () => {
        if (this.state.name !== '') {
            const studentObject = {
                name: this.state.name,
            };
            axios.post('http://localhost:4000/websites/create', studentObject)
                .then(response => {
                    this.getWebsite();
                    this.setState({
                        new: false,
                        validate: true,
                        name: ''
                    })
                })
                .catch(error => {
                    console.log(error.resonse);
                });
        } else {
            this.setState({
                validate: false
            })
        }
    }
    getWebsite = () => {
        axios.get('http://localhost:4000/websites/').then(response => {
            this.setState({
                websites: response.data
            })
        })
            .catch(error => {
                console.log(error.response)
            });
    }

    checkAuth = () => {
        if (reactLocalStorage.get('id', false, true)) {
            this.setState({
                id: reactLocalStorage.get('id')
            })
        } else {
            this.props.history.push('/');
        }
    }

    onChangeName = (e) => {
        this.setState({name: e.target.value})
    }

    webInfo = (id) => {
        this.props.history.push({
            pathname: '/websiteDetails',
            state: {detail: id}
        })
    }


    render() {
        var that = this;
        if (this.state.websites) {
            var website = this.state.websites.map(function (website, id) {
                return (<Button size="lg" block={'block'} className={'websiteButton'} onClick={that.webInfo.bind(that,website.id)}>
                            <span className={'website-text'}>
                                    {website.name}
                                </span>
                        <IoIosArrowRoundForward className={'icon-text'}/>
                    </Button>
                )
            })
        }
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
                            {website}
                            {this.state.new &&
                            <div className={'addnew'}>
                                {this.state.validate &&
                                <input type={'text'} className={'addnew-input'} onChange={this.onChangeName}
                                       value={this.state.name}/>
                                }
                                {!this.state.validate &&
                                <input type={'text'} placeholder={'Enter Website Name'}
                                       className={'addnew-input validate'} onChange={this.onChangeName}
                                       value={this.state.name}/>
                                }
                                <Button className={'addnew-button'} onClick={this.saveNew}>
                                    Save
                                </Button>
                            </div>
                            }
                            <Button size="lg" className={'submit-button-website'} onClick={this.addNew}>
                                Add New
                            </Button>
                        </Col>

                    </Row>
                </Container>
                <img src={space} alt="welcome" align={'right'}/>
            </div>);
    }
}
