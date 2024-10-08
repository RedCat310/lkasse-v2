import React, { Component } from 'react';
import { db } from '../../config/firebase'
import { collection, deleteDoc, doc, getDocs, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';

class Cart extends Component {
    state = { 
      pay1: false,
      pay2: false,
      pay3: false,
      cart: [],
      price: 0.00,
     }
    componentDidMount() {
      onSnapshot(collection(db, "cart"), () => {
        this.updateList()
      })
    }
    financial = (x) => {
      return Number.parseFloat(x).toFixed(2);
    }
    updateList = async () =>{
      let rawData = await getDocs(collection(db, "cart"))
      let cart = rawData.docs.map((doc) => ({...doc.data()}))
      this.setState({cart: cart})
      let num = 0
      cart.forEach((item) => {num = num + (item.price * item.number)})
      this.setState({price: this.financial(num)})
    }
    deleteItem = async (id) =>{
      deleteDoc(doc(db, "cart", id))
      let product = await getDoc(doc(db, "products", id))
      let productData = product.data()
      let string = "Glöscht: " + productData.name
      updateDoc(doc(db, "screen", "data"), {text: string})
    }
    render() { 
        return<div className="products">
          <div className="card m-3">
            <div className="card-header"><h3>Einkaufswagen</h3></div>
            <div className="card-body">
              <table id="cart" className="table table-striped">
                <thead>
                    <tr>
                        <th>Anzahl</th>
                        <th>Produkt</th>
                        <th>Preis</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.number}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td><button className='btn btn-danger' onClick={() => this.deleteItem(item.id)}>Entfernen</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2>Zwischensumme:</h2>
              <h1>{this.state.price}€</h1>
            </div>
          </div>
        </div>;
    }
}
 
export default Cart;