import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { db } from '../config/firebase'
import { collection, doc, onSnapshot, getDocs } from 'firebase/firestore';

class Screen extends Component {
    state = { 
        data: "",
        zws: 0.00,
        cart: [],
     } 
    componentDidMount() {
        onSnapshot(doc(db, "screen", "data"), (rawData) => {
            let data = rawData.data()
            this.setState({data: data})
            console.log(data)
        })
        onSnapshot(collection(db, "cart"), () => {
            this.updateList()
        })
    }
    updateList = async () =>{
        let rawData = await getDocs(collection(db, "cart"))
        let cart = rawData.docs.map((doc) => ({...doc.data()}))
        this.setState({cart: cart})
        let num = 0
        cart.forEach((item) => {num = num + (item.price * item.number)})
        this.setState({zws: Number.parseFloat(num).toFixed(2)})
    }
    render() { 
        return <div className='m-5'><Button style={{position: 'fixed', right: "1px", bottom: "1px"}} variant="secondary" onClick={() => this.props.screen()}>
                Exit
            </Button>
            <h3>{this.state.data.text}</h3>
            <h2 style={{position: 'fixed', marginLeft: 'auto', textAlign: 'center', bottom: "1px", left: '0px', right: '0px'}}>ZWS: {this.state.zws}€</h2>     
            <hr />  
            <Table striped>
                <thead>
                    <tr>
                    <th>Anzahl</th>
                    <th>Produkt</th>
                    <th>Preis einzeln</th>
                    <th>Preis gesamt</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.cart.map((product) => (
                        <tr>
                            <td>{product.number}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{Number.parseFloat(product.price * product.number).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
       </div>;
    }
}
 
export default Screen;