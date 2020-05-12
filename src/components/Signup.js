import React, {Component} from 'react';
import { Container, Form, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            retypepassword: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleRetypeChange = this.handleRetypeChange.bind(this)
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
        // console.log(event.target.value)
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
        // console.log(event.target.value)
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
        // console.log(event.target.value)
    }

    handleRetypeChange(event) {
        this.setState({retypepassword: event.target.value})
        // console.log(event.target.value)
    }

    renderTooltip(props) {
        return (
          <Tooltip id="button-tooltip" {...props}>
            Enter a valid email address
          </Tooltip>
        );
    }

    renderPassTip(props) {
        return (
          <Tooltip id="button-tooltip" {...props}>
            Password must be 8 characters or more
          </Tooltip>
        );
    }

    render(){
        return(
            <Container>
                <h3>Signup</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleNameChange}/>
                    </Form.Group>
    
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip}>
                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
                        </Form.Group>
                    </OverlayTrigger>
    

                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={this.renderPassTip}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassChange}/>
                        </Form.Group>
                    </OverlayTrigger>
                    <Form.Group >
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" value={this.state.retypepassword} onChange={this.handleRetypeChange}/>
                    </Form.Group>
                    <Button variant="primary" onClick={() => this.props.signup(
                        this.state.name,
                        this.state.email,
                        this.state.password,
                        this.state.retypepassword
                    )}>
                        Signup
                    </Button>
                </Form>
             </Container>   
        );
    }

}


export default Signup;