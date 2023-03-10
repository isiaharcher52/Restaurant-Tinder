import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../../Redux/actionCreators'
import {baseUrl} from '../../../Shared/baseUrl'
import axios from 'axios'
import '../login-register.css'
import logo from '../../../logo/Restaurant-Tinder-1.png'


const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            invalid: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        try{
            const data = { username: this.state.username, password: this.state.password };
        

        const userWithToken = await axios.post(baseUrl + '/login', data)

        
        await this.props.dispatch(addToken(userWithToken.data.token))
        await this.props.dispatch(addUser(userWithToken.data.user));
        }
        catch(error){
            this.setState(prev => ({...prev, invalid: true}))
        }
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className='login'>
                <img className='logo' src={logo} />
                <h1 className='create-login'>Please Sign In</h1>
                <div className='login-register'>
                    {this.state.invalid && <p id='invalid-login'>Invalid username/Password</p>}
                    <label id="username--box" class="sr-only">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        class="form-control"
                        placeholder="Username"
                        v-model="user.username"
                        onChange={this.handleInputChange}
                        required
                    />
                    <label id="password--box" class="sr-only">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="user.password"
                        onChange={this.handleInputChange}
                        required
                    />
                    <div id="sign-in--register">
                        <Link className='register-btn' to="/register">Need an account?</Link>       
                        <button id='sign-in-btn' type="submit" onClick={this.handleLogin}>Sign in</button>
                    </div>
                </div>                
            </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));