import React, {Component} from 'react';
import { Container, Button, Modal, Row, Col} from 'react-bootstrap';
import Deletebook from './Deletebook';
import axios from 'axios';

class Delete extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            userbooks: []
        }
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
        this.getmybooks()
    }

    refresh(){
        this.props.bookRefresh()
        this.getmybooks()
        
    }

    handelDel(bookid) {
        const delurl = 'https://spartanbooks-api.herokuapp.com/book/' + bookid

        const authtoken = this.props.token

        const config = {
            headers: { Authorization: `Bearer ${authtoken}` }
        };

        axios.delete( 
            delurl,
            config
        ).then(res => {
            this.refresh()
        }).catch(err => {
            console.log(err)
        })
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

    componentDidMount() {
        this.getmybooks()
    }

    render(){
        return(
            <Container>
                <Button variant="primary" onClick={() => this.handleShow()} style={{height: '40px', width: '120px'}}>Delete Book</Button>
                <Modal show={this.state.show} onHide={() => this.handleClose()} size="xl">
                    <Modal.Header closeButton>
                        <h4>Select the book you want to delete</h4>
                    </Modal.Header>
                    <Modal.Body>
                    <Container>
                        {this.state.userbooks.length === 0
                                ? <h3>You have not added any books</h3>
                                : <Row>
                            
                                {
                                    this.state.userbooks.map((value, index) => {
                                        return <Col key = {index}><Deletebook 
                                        key = {index}
                                        name={value.name} 
                                        classname={value.classname}
                                        classnumber={value.classnumber}
                                        price={value.price}
                                        condition={value.condition}
                                        description={value.description}
                                        imagelink = {value.imagelink}
                                        _id = {value._id}
                                        token = {this.props.token}
                                        handelDel = {(bookid) => this.handelDel(bookid)}
                                        />
                                        </Col>
                                    })
                                }
                                </Row>
                            }
                    </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container> 
        );
    }
}

export default Delete;