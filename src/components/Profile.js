import React, { Component } from 'react';
import { Container, Button, Modal, Row, Col} from 'react-bootstrap';
import Userbook from './Userbook';
import axios from 'axios';

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            userbooks: [],
            show: false
        }
    }

    handleClose() { 
        this.setState({show: false})
    }
    handleShow()  { 
        this.setState({show: true})
        this.refresh()
    }

    getmybooks() {
        const authtoken = this.props.token
    
        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };
    
        axios.get( 
            'https://spartanbooks-api.herokuapp.com/book/me',
            config
        ).then(res => {
            this.setState({userbooks: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    refresh(){
        this.getmybooks()
    }

    componentDidMount() {
        this.getmybooks()
    }

    render(){
        return(
            <Container>
                <Button variant="primary" onClick={() => this.handleShow()} style={{height: '40px', width: '120px'}}>My Profile</Button>
                <Modal show={this.state.show} onHide={() => this.handleClose()} size="xl">
                    <Modal.Header closeButton>
                        <h4>{this.props.name}, these are your added books</h4>
                    </Modal.Header>
                    <Container>
                        {this.state.userbooks.length === 0
                            ? <h3>You have not added any books</h3>
                            : <Row>
                        
                            {
                                this.state.userbooks.map((value, index) => {
                                    return <Col key = {index}><Userbook 
                                    key = {index}
                                    name={value.name} 
                                    classname={value.classname}
                                    classnumber={value.classnumber}
                                    price={value.price}
                                    condition={value.condition}
                                    description={value.description}
                                    imagelink = {value.imagelink}
                                    />
                                    </Col>
                                })
                            }
                            </Row>
                        }
                        <br></br>
                    </Container>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                    <Button variant="danger" onClick={() => this.props.deleteacc()}>
                        Delete Account
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container> 
        );
    }

}


export default Profile;