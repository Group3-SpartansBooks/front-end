import React, { Component } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Mainpage from './Mainpage';
import Adminpage from './admin-container';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';
import spartanlogo from '../static/finallogo.png';
import './app.css';

class App extends Component{ 
    constructor() {
        super();
        this.state = {
            signedin: false,
            authenticated: false,
            signuperror: '',
            loginerror: '',
            token: '',
            admin: false
        }
    }

    login = (email, password) => {
        if(!email || !password){
            this.setState({loginerror: 'all the fields are required, please fill all of them'})
        }else{
            this.setState({loginerror: 'l o a d i n g . . . .'})

            const returninguser = {email: email, password: password}

            axios.post(`https://spartanbooks-api.herokuapp.com/user/login`,  returninguser )
            .then(res => {
                const authtoken = res.data.token

                if(email === "admin@spartanbooks.com"){

                    const twofa = Math.floor(Math.random() * 90000) + 10000

                    console.log(twofa)

                    const otp = prompt("Enter the code sent to your device")
                    
                    
                    if(otp !== '99999'){
                        alert("admin login failed!")
                        this.setState({loginerror: 'login failed, try again', signuperror: ''});
                    }else{
                        this.setState({loginerror: '', signuperror: '', token: authtoken, admin: true});
                    }
                }else{
                    this.setState({signedin: true, authenticated: true, loginerror: '', signuperror: '', token: authtoken});
                }
            }).catch(err => {
                this.setState({loginerror: 'there seems to be a problem with your credentials'})
            })
        }
    }

    logout = () => {
        this.setState({signedin: false, authenticated: false, token: '', signuperror: '', loginerror: '', admin: false});
    }

    deleteacc = () => {
        this.setState({signedin: false, authenticated: false, token: '', signuperror: '', loginerror: ''});
        alert("Your account has been successfully deleted")
    }

    signup = (name, email, password, retypepassword) => { 
        if(password !== retypepassword){
            this.setState({signuperror: 'your passwords dont match, please check and try again'})
        }else if(!name || !email || !password || !retypepassword){
            this.setState({signuperror: 'all the fields are required, please fill all of them'})
        }
        else{
            this.setState({signuperror: 'l o a d i n g . . . .'})

            const newuser = {name: name, email: email, password: password}
            
            axios.post(`https://spartanbooks-api.herokuapp.com/user`,  newuser )
            .then(res => {
                const authtoken = res.data.token

                this.setState({signedin: true, authenticated: true, signuperror: '', loginerror: '', token: authtoken});
            }).catch(err => {
                this.setState({signuperror: 'there seems to be a problem with your credentials'})
            })
            
        }
    }

    render(){
        const { signedin, admin } = this.state;
        return (
            <div style={{width: '100vw'}}>
                {/* Conditional Rendering */}
                {
                    signedin === false && admin === false
                    ? 
                    <div>
                        <Container>
                            <Row>
                                <Col><img src={spartanlogo} alt="logo" style={{float: 'center'}}/></Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row> 
                                <Col ><Login login={this.login}/><br></br><h4>{this.state.loginerror}</h4></Col>
                                <Col > <Signup signup={this.signup}/><br></br><h4>{this.state.signuperror}</h4></Col>
                            </Row>
                        </Container>
                    </div>    
                    : signedin === false && admin === true
                    ?
                    <Adminpage logout={() => this.logout()} token={this.state.token}/>
                    :
                    <Mainpage logout={() => this.logout()} token={this.state.token} deleteacc={() => this.deleteacc()}/>
                    
                }
            </div>
        );
    }
}

export default App;