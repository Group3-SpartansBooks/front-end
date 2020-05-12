import React, { Component} from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, InputGroup, FormControl, DropdownButton, Dropdown, Spinner} from 'react-bootstrap';
import spartanlogo from '../static/spartanlogo.png'
import textlogo from '../static/textlogo.jpg'
import Bookmodal from '../components/bookmodal';

class Adminpage extends Component{ 
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            allbooks: [],
            allusers: [],
            booksearch: '',
            usersearch: ''
        }

        this.handleBookSearchChange = this.handleBookSearchChange.bind(this)

        this.handleUserSearchChange = this.handleUserSearchChange.bind(this)
    }

    handleBookSearchChange(event){
        this.setState({booksearch: event.target.value})
    }

    handleUserSearchChange(event){
        this.setState({usersearch: event.target.value})
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

    userRefresh(){
        const authtoken = this.props.token

        const config = {
            headers: {Authorization: `Bearer ${authtoken}` }
        }

        axios.get( 
            'https://spartanbooks-api.herokuapp.com/user/admin/allusers',
            config
        ).then(res => {
            this.setState({allusers: res.data.reverse()})
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

    deleteUser(userid){
        const authtoken = this.props.token

        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };

        const url = 'https://spartanbooks-api.herokuapp.com/user/admin/' + userid
        
        axios.delete(
            url,
            config
        ).then(res => {
            this.userRefresh()
        }).catch(err => {
            console.log('There was a problem in deleting the user, try again')
        })
    }

    deleteBook(bookid){
        const authtoken = this.props.token

        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };

        const url = 'https://spartanbooks-api.herokuapp.com/book/admin/' + bookid
        
        axios.delete(
            url,
            config
        ).then(res => {
            this.bookRefresh()
        }).catch(err => {
            console.log('There was a problem in deleting the book, try again')
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

        axios.get( 
            'https://spartanbooks-api.herokuapp.com/user/admin/allusers',
            config
        ).then(res => {
            this.setState({allusers: res.data.reverse()})
        }).catch(err => {
            console.log(err)
        })
    }

    render(){

        const filteredBooks = this.state.allbooks.filter(book => {
            return book.name.toLowerCase().includes(this.state.booksearch.toLowerCase())
        })

        const filteredUsers = this.state.allusers.filter(user => {
            return user.name.toLowerCase().includes(this.state.usersearch.toLowerCase())
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
                            <h3>Admin Page</h3><hr></hr>
                            <DropdownButton id="dropdown-basic-button" title="Menu" >
                                <Dropdown.Item> <Button variant="info" onClick={(event) => this.userlogout(event)} style={{height: '40px', width: '120px'}}>Logout</Button></Dropdown.Item>
                                <Dropdown.Item><Button style={{height: '40px', width: '120px'}}>Refresh Data</Button></Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Search for book"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={this.state.booksearch}
                                onChange={this.handleBookSearchChange}
                                />
                            </InputGroup>
                        {
                                this.state.allbooks.length === 0
                                ?
                                <div>
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                                :
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Details?</th>
                                                <th>Delete?</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredBooks.map((value, index) => {
                                                    return <tr key={index}>
                                                        <td>{index}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.price}$</td>
                                                        <td><Bookmodal 
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
                                                        /></td>
                                                        <td><Button variant="danger" onClick={() => this.deleteBook(value._id)}>Delete</Button></td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                
                            }
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Search for user"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={this.state.usersearch}
                                onChange={this.handleUserSearchChange}
                                />
                            </InputGroup>
                            {
                                this.state.allusers.length === 0
                                ?
                                <div>
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                                :
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Delete?</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredUsers.map((value, index) => {
                                                    return <tr key={index}>
                                                        <td>{index}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.email}</td>
                                                        <td><Button variant="danger" onClick={() => this.deleteUser(value._id)}>Delete</Button></td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                
                            }
                        </Col>
                    </Row>
                </Container>
        );
    }
}

export default Adminpage;