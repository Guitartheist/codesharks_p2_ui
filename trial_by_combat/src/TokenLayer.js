import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import './login_form.css';
import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import UserDashboard from './components/UserDashboard';
import Header from './Header';

class TokenLayer extends React.Component {
    
    state = {
        username:"",
        userid:"",
        token:"",
        visibleComponent:"LoginForm",
        server:"http://localhost:3000"    
    }

    handleLogin = (childData) => {
        this.setState({token: childData.token});
        this.getUsername();
        this.setState({visibleComponent:"UserDashboard"});
    }

    handleRegistration = (childData) => {
        this.setState({visibleComponent:"LoginForm"});
        alert(`Successfully registered ${childData.email} as ${childData.username}`);
    }

    clickRegister = () => {
        this.setState({visibleComponent:"RegistrationForm"});
    }

    clickLogin = () => {
        this.setState({visibleComponent:"LoginForm"});
    }

    clickLogout = () => {
        this.setState({visibleComponent:"LoginForm"});
        this.setState({token:""});
        this.setState({username:""});
    }

    clickDashboard = () => {
        this.setState({visibleComponent:"UserDashboard"});
    }

    dashboardRedirect = (childData) => {
        this.setState({visibleComponent:childData});
    }

    getUsername() {
        (async () => {
            const settings = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.state.token}`
                }
            };
            try {
                const fetchResponse = await fetch(`${this.state.server}/trial-by-combat/player/me`, settings);
                const data = await fetchResponse.json();
                this.setState(data);
            } catch (e) {
                console.log(e);
                //return e;
            }  
        })();  
    }
    
    render() {
        const {name} = this.state;
        return (
            <>
                <Header username = {this.state.username} 
                    loginCallback = {this.clickLogin} 
                    registerCallback = {this.clickRegister}    
                    logoutCallback = {this.clickLogout}
                    dashboardCallback = {this.clickDashboard}
                /> 
                <LoginForm server = {this.state.server} parentCallback = {this.handleLogin} visibleComponent = {this.state.visibleComponent} />  
                <RegistrationForm server = {this.state.server} parentCallback = {this.handleRegistration} visibleComponent = {this.state.visibleComponent} />
                <UserDashboard authToken = {this.state.token} server = {this.state.server} parentCallback = {this.dashboardRedirect} visibleComponent = {this.state.visibleComponent} />
            </>
        );
    }


}

export default TokenLayer;
