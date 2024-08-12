import React, { Component } from 'react';
import * as Paho from 'paho-mqtt'
import { getDocs, collection, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { onAuthStateChanged } from 'firebase/auth';


const client = new Paho.Client(
    "test.mosquitto.org",
    Number(8081),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
  );

class Pay extends Component {
    state = {
        pay1: true,
        pay2: false,
        pay3: false,
        mqttStatus: "zum Kartengerät verbinden...",
        message: "",
        msgStatus: 0,
        card: null,
        back: 0,
        give: null,
        pay2step: false,
        zws: 0,
        user:  null,
    }
    

    componentDidMount() {
        client.connect( {
            useSSL: true,
            onSuccess: () => { 
                this.setState({mqttStatus: "mit Kartengerät verbunden"})
                client.subscribe("kartengeraet2");
                client.onMessageArrived = this.newMsg;
            },
            onFailure: (error) => {
            console.log(error); 
          }
        });
        onAuthStateChanged(auth, (user) =>{
            this.setState({user: user})
        })
    }
    newMsg = (msg) => {
        var value = msg.payloadString;
        if(this.state.msgStatus === 0){
            this.setState({message: "Karte erkannt", card: value, msgStatus: 1})
        }else if(value === "wrong"){
            this.setState({message: "PIN falsch eingegeben"})
        }else if(value === "correct"){
            this.setState({message: "PIN richtig & verarbeitung läuft..."})
        }else if(value === "done"){
            this.setState({message: "Feritg!", pay3: true})
        }
    }
    pay1 = async(elem) =>{
        
        if(elem === true){
            this.setState({pay1: false, message: "auf Karte Warten..."})
            client.publish("kartengeraet", "new")
            let rawData = await getDocs(collection(db, "cart"))
            let cart = rawData.docs.map((doc) => ({...doc.data()}))
            let num = 0
            cart.forEach((item) => {num = num + (item.price * item.number)})
            client.publish("kartengeraet", Number.parseFloat(num).toFixed(2))
        }else{
            this.setState({pay1: false, pay2: true})
        }
    }
    financial = (x) => {
        return Number.parseFloat(x).toFixed(2);
    }
    pay2 = async (step) =>{
        if(step){
            if(this.state.give){
                let rawData = await getDocs(collection(db, "cart"))
                let cart = rawData.docs.map((doc) => ({...doc.data()}))
                let num = 0
                cart.forEach((item) => {num = num + (item.price * item.number)})
                this.setState({zws: this.financial(num)})
                let back = this.state.give - this.financial(num)
                this.setState({back: this.financial(back), pay2step: true})
            }else{
                
            }
        }else{
            this.setState({pay3: true, pay2step: false, pay2: false})
        }
    }
    pay3 = async(print) => { 
        let rawData = await getDocs(collection(db, "cart"))
        let cart = rawData.docs.map((doc) => ({...doc.data()}))
        if(print){
            client.publish("kartengeraet", "print")
            client.publish("kartengeraet", auth?.currentUser.displayName)
            cart.forEach((item) =>{
                client.publish("kartengeraet", item.number + "x " + item.name)
                client.publish("kartengeraet", item.price)
            })
            client.publish("kartengeraet", "next")
            let num = 0
            cart.forEach((item) => {num = num + (item.price * item.number)})
            client.publish("kartengeraet", this.financial(num))
            if(this.state.card){
                let card = parseInt(this.state.card)
                card++
                client.publish("kartengeraet", "Karte " + card + "/2")
            }else{
                client.publish("kartengeraet", "bar")
                client.publish("kartengeraet", this.state.give)
                client.publish("kartengeraet", this.state.back)
            }
        }
        client.disconnect()
        let date = new Date()
        let dateText = date.getDay() + ". " + date.getDate() + ". " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        if(this.state.card){
            await addDoc(collection(db, this.state.user.uid), {
                name: this.state.user.displayName,
                products: cart,
                card: this.state.card,
                date: dateText,
                zws: this.state.zws
            })
        }else{
            await addDoc(collection(db, this.state.user.uid), {
                name: this.state.user.displayName,
                products: cart,
                give: this.state.give,
                back: this.state.back,
                date: dateText,
                zws: this.state.zws,
            })
        }
        cart.forEach((item) =>{
            deleteDoc(doc(db, "cart", item.id))
        })
        this.props.done()
        
    }
    render() {
        return <div className="card">
        <div className="card-header">
          Bezahlen
        </div>
        <div className="card-body">
            <p>{this.state.mqttStatus}</p>
            <p>{this.state.message}</p>
            {this.state.pay1 ? <div className="input-group flex-nowrap" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <button onClick={() => this.pay1(false)} type="button" className="btn btn-outline-primary">Bar</button>
                  <button className="btn btn-outline-primary" onClick={() => this.pay1(true)}>Karte</button>
                </div> : null}
            {this.state.pay2 ? <div>
                {this.state.pay2step ? <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1" >Rückgeld</InputGroup.Text>
                    <Form.Control type="number" disabled value={this.state.back} />
                    <Button onClick={() => this.pay2(false)}>Weiter</Button>
                </InputGroup> : <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Der Kunde gab</InputGroup.Text>
                    <Form.Control placeholder="€" onChange={(e) => this.setState({give: e.target.value})} type="number" />
                    <Button onClick={() => this.pay2(true)}>OK</Button>
                </InputGroup>}
                
            </div> : null}
            {this.state.pay3 ? <div className="input-group flex-nowrap" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <button onClick={() => this.pay3(true)} type="button" className="btn btn-outline-primary">Kassenzettel drucken & beenden</button>
                  <button className="btn btn-outline-primary" onClick={() => this.pay3(false)}>ohne Kassenzettel beenden</button>
                </div> : null}
        </div>
      </div>;
    }
}
 
export default Pay;