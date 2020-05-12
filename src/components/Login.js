import React, { Component } from 'react';
import { Container, Form, Button} from 'react-bootstrap';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    render(){
        return (
            <Container>
                <h3>Login</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassChange}/>
                    </Form.Group>
                    <Button variant="primary" onClick={() => this.props.login(this.state.email, this.state.password)}>
                        Login
                    </Button>
                </Form>
            </Container>   
        );
    }
}

export default Login;