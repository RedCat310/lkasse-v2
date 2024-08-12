import React, { Component } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { doc, updateDoc } from 'firebase/firestore';


class Login extends Component {
    state = {  
        email: "",
        password: "",
        error: "",
        user: null,
        show: false,
        username: ""
    } 
    async componentDidMount(){
        onAuthStateChanged(auth, (user) =>{
            this.setState({user: user, username: user?.displayName})
        });
    };
    signInEmailPassword = async () => {
        try{
            await signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        }catch(error){
            if(error.code === "auth/invalid-email"){
                this.setState({error: "E-Mail Fehlerhaft", show: true})
            }else if(error.code === "auth/missing-password"){
                this.setState({error: "Passwort fehlt", show: true})   
            }else if(error.code === "auth/invalid-credential"){
                this.setState({error: "E-Mail oder Passwort falsch", show: true})
            }else{
                console.error(error)
                this.setState({error: "Unbekannter Fehler aufgetreten", show: true})
            }
        }
        
    }
    setUsername = () =>{
        updateProfile(auth.currentUser, {displayName: this.state.username})
        updateDoc(doc(db, this.state.user.uid, "userdata"), {name: this.state.username})
    }
    handleClose = () => this.setState({show: false})
    render() { 
        return <div className='m-5'>
            <Modal centered show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Login Fehler</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.error}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            {this.state.user ? <Form>
                <Form.Group className='mb-3' controlId="form-group-Username">
                    <Form.Label>Benutzername Bearbeiten</Form.Label>
                    <Form.Control value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} className='mb-1' type="text" placeholder="Benutzername eingeben" />
                    <Button className='me-1' onClick={() => this.setUsername()}>Speichern</Button>
                    <Button variant='warning' onClick={() => this.setState({username: this.state.user.displayName})}>Zurücksetzen</Button>
                </Form.Group>
                <Button variant='danger' onClick={() => signOut(auth)}>Ausloggen</Button>
            </Form> : <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>E-Mail Adresse</Form.Label>
                    <Form.Control onChange={(e) => this.setState({email: e.target.value})} type="email" placeholder="E-Mail eingeben" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control type="password" onChange={(e) => this.setState({password: e.target.value})} placeholder="Passwort eingeben" />
                </Form.Group>
                <Button onClick={() => this.signInEmailPassword()} variant="primary">
                    Anmelden
                </Button>
            </Form>}
        </div>;
    }
}
 
export default Login;