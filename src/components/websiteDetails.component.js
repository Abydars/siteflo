import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Jumbotron, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import space from './../assets/Project Management.png';
import {IoIosArrowRoundBack} from 'react-icons/io';
import {reactLocalStorage} from 'reactjs-localstorage';
import {MdDelete} from 'react-icons/md';
import {FaExternalLinkAlt,FaBars,FaCaretDown} from 'react-icons/fa';
import Nestable from 'react-nestable';

export default class Website extends Component {

    constructor(props) {
        super(props)

        // Setting up functions

        // Setting up state
        this.state = {
            id: '',
            websiteId: '',
            website: undefined,
            new: false,
            name: '',
            validate: true
        }
    }

    componentDidMount() {
        this.checkAuth();
        this.getWebsite(this.props.location.state.detail);

    }
    goBack = () => {
        this.props.history.goBack();
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
    getWebsite = (id) => {
        axios.get('http://localhost:4000/websites/' + id).then(response => {
            this.setState({
                website: response.data
            })
        })
            .catch(error => {
                console.log(error.response)
            });
    }

    checkAuth = () => {
        if (reactLocalStorage.get('id', false, true) && this.props.location.state.detail) {
            this.setState({
                id: reactLocalStorage.get('id'),
                websiteId: this.props.location.state.detail
            })
        } else {
            this.props.history.push('/website');
        }
    }

    onChangeName = (e) => {
        this.setState({name: e.target.value})
    }


    render() {
        const items = [
            { id: 0, text: 'Andy' },
            {
                id: 1, text: 'Harry',
                children: [
                    { id: 2, text: 'David' }
                ]
            },
            { id: 3, text: 'Lisa' }
        ];

        const renderItem = ({ item }) => {
            return (
              <div>
                  <div className={'bar-div'}>
                      <FaBars className={'bar-icon'} />
                  </div>
                  <div className={'nestable-text'}>
                      <p>{item.text}</p>
                  </div>
                  <div className={'down-div'}>
                      <FaCaretDown className={'down-icon'} />
                  </div>
              </div>
            );
        };
        return (
            <div className={'page-wrapper'}>
                <Container>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <Button size="lg" block={'block'} className={'backButton'} onClick={this.goBack}>
                                <IoIosArrowRoundBack className={'back-icon'}/>
                                <span className={'website-text'}>
                                    Back to Sitemap
                            </span>
                            </Button>
                            <div className={'weboption'}>
                                <MdDelete class={'delete'}/>
                                <FaExternalLinkAlt class={'link'} />
                            </div>
                        </Col>
                        <Col md={{span: 6, offset: 3}}>
                            {this.state.website &&
                            <h1>{this.state.website.name} Website</h1>
                            }
                        </Col>
                    </Row>
                    <Row className={'form-row'}>
                        <Col md={{span: 6, offset: 3}}>
                            <Nestable
                                items={items}
                                renderItem={renderItem}
                            />
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
                                Add New Page
                            </Button>
                        </Col>

                    </Row>
                </Container>
                <img src={space} alt="welcome" align={'right'}/>
            </div>);
    }
}
