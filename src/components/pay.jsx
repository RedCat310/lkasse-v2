import React, { Component } from 'react';
import * as Paho from 'paho-mqtt'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

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
        this.setState({pay1: false, message: "auf Karte Warten..."})
        if(elem === true){
            client.publish("kartengeraet", "new")
            let rawData = await getDocs(collection(db, "cart"))
            let cart = rawData.docs.map((doc) => ({...doc.data()}))
            let num = 0
            cart.forEach((item) => {num = num + (item.price * item.number)})
            client.publish("kartengeraet", Number.parseFloat(num).toFixed(2))
        }
    }
    financial = (x) => {
        return Number.parseFloat(x).toFixed(2);
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
            if(this.state.card){
                client.publish("kartengeraet", this.financial(num))
                let card = parseInt(this.state.card)
                card++
                client.publish("kartengeraet", "Karte " + card + "/2")
            }else{
                //do something
            }
        }
        client.disconnect()
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
            {this.state.pay3 ? <div className="input-group flex-nowrap" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <button onClick={() => this.pay3(true)} type="button" className="btn btn-outline-primary">Kassenzettel drucken & beenden</button>
                  <button className="btn btn-outline-primary" onClick={() => this.pay3(false)}>ohne Kassenzettel beenden</button>
                </div> : null}
        </div>
      </div>;
    }
}
 
export default Pay;