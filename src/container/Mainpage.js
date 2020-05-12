import React, { Component } from 'react';
import Book from '../components/Book';
import Delete from '../components/Delete';
import Addbook from '../components/Addbook';
import Profile from '../components/Profile';
import axios from 'axios';
import { Container, Row, Col, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import spartanlogo from '../static/spartanlogo.png'
import textlogo from '../static/textlogo.jpg'

class Mainpage extends Component{ 
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            allbooks: [],
            searchinput: ''
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)

    }

    handleSearchChange(event){
        this.setState({searchinput: event.target.value})
    }

    bookRefresh(){
        const authtoken = this.props.token
    
        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };

        axios.get( 
            'https://spartanbooks-api.herokuapp.com/book/allbooks',
            config
        ).then(res => {
            this.setState({allbooks: res.data.reverse()})
        }).catch(err => {
            console.log(err)
        })
    }

    userlogout(event){
        event.preventDefault();

        const authtoken = this.props.token

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${authtoken}` }
        };
        fetch('https://spartanbooks-api.herokuapp.com/user/logout', requestOptions)
            .then(response => this.logout())
            .then(data => console.log('There was a problem in logging out, try again'));
    }

    deleteacc(){
        const authtoken = this.props.token
    
        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };

        axios.delete( 
            'https://spartanbooks-api.herokuapp.com/user/me',
            config
        ).then(res => {
            this.props.deleteacc()
        }).catch(err => {
            console.log('There was a problem in deleting your account, try again')
        })
    }

    logout(){
        this.props.logout()
    }

    componentDidMount() {
        const authtoken = this.props.token
    
        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };
    
        axios.get( 
            'https://spartanbooks-api.herokuapp.com/user/me',
            config
        ).then(res => {
            this.setState({name: res.data.name})
            this.setState({email: res.data.email})
        }).catch(err => {
            console.log(err)
        })

        axios.get( 
            'https://spartanbooks-api.herokuapp.com/book/allbooks',
            config
        ).then(res => {
            this.setState({allbooks: res.data.reverse()})
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        const filteredBooks = this.state.allbooks.filter(book => {
            return book.name.toLowerCase().includes(this.state.searchinput.toLowerCase())
        })

        return (
                <Container style={{width: '87%'}} className='tc' fluid>
                    <Row>
                        <Col>
                            <br></br>
                            <h1><img src={spartanlogo} alt="logo" style={{width: '130px', height: '130px'}}/><img src={textlogo} alt="logo" style={{width: '275px', height: '130px'}}/></h1>
                        </Col>
                        <Col>
                            <br></br>
                            <Button variant="info" onClick={(event) => this.userlogout(event)} style={{height: '40px', width: '120px'}}>Logout</Button><hr></hr>
                            <Profile name={this.state.name} email={this.state.email} token={this.props.token} bookRefresh={() => this.bookRefresh()} deleteacc={() => this.deleteacc()}/>
                        </Col>
                        <Col>
                            <br></br>
                            <Addbook token={this.props.token} bookRefresh={() => this.bookRefresh()}/><hr></hr>
                            <Delete token={this.props.token} bookRefresh={() => this.bookRefresh()}/>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col md={{ span: 8}}>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Search by book name"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={this.state.searchinput}
                                onChange={this.handleSearchChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        {
                            this.state.allbooks.length === 0
                            ?
                            <div>
                                <Spinner animation="border" role="status" >
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                            :
                                filteredBooks.map((value, index) => {
                                    return <Col key = {index}><Book 
                                    key = {index}
                                    name={value.name} 
                                    classname={value.classname}
                                    classnumber={value.classnumber}
                                    price={value.price}
                                    condition={value.condition}
                                    description={value.description}
                                    imagelink={value.imagelink}
                                    id={value._id}
                                    owner={value.owner}
                                    email={value.email}
                                    />
                                    </Col>
                                })
                        }
                    </Row>
                </Container>
        );
    }
}

export default Mainpage;