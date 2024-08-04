import React, { Component } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

class Login extends Component {
    state = {  
        email: "",
        password: "",
        error: "",
    } 
    async componentDidMount(){
        onAuthStateChanged(auth, (user) =>{
            this.props.setUser(user)
            console.log(user)
        })
    }
    signInEmailPassword = async () => {
        try{
            await signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        }catch(error){
            if(error.code === "auth/invalid-email"){
                this.setState({error: "E-Mail Fehlerhaft"})
            }else if(error.code === "auth/missing-password"){
                this.setState({error: "Passwort fehlt"})   
            }else if(error.code === "auth/invalid-credential"){
                this.setState({error: "E-Mail oder Passwort falsch"})
            }else{
                console.error(error)
                this.setState({error: "Unbekannter Fehler aufgetreten"})
            }
        }
        
    }
    render() { 
        return <div className='m-5'>
            <form>
                <div className="mb-3">
                    <label htmlFor="input" className="form-label">E-Mail</label>
                    <input type="email" className="form-control" onChange={(e) => this.setState({email: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="input" className="form-label">Passwort</label>
                    <input type="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})}/>
                </div>
                <p style={{color: "rgba(var(--bs-danger-rgb))"}}>{this.state.error}</p>
                <button type="button" onClick={() => this.signInEmailPassword()} className="btn btn-primary">Einloggen</button>
            </form>
        </div>;
    }
}

class Logout extends Component {
    state = {  }
    logout = () => {
        signOut(auth)
    } 
    render() { 
        return <button className="btn btn-danger" onClick={() => this.logout()}>Logout</button>;
    }
}
 
export {Login, Logout};
