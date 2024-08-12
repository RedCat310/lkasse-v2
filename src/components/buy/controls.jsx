import React, { Component } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Modal, Button } from 'react-bootstrap';
import CartList from './cartList';

class Actions extends Component {
    state = { 
      addToCart: "",
      checkCode: "",
      checkName: "",
      checkPrice: "",
      list: false,
      error: false,
      errorText: "",
      sale: 0,
    } 
    
    setAdmin = () =>{
     if(this.props.currentAdmin){
      this.props.setAdmin(false)
     }else{
      this.props.setAdmin(true)
     }
    }
    addToCart = async() => {
      let id = this.state.addToCart
      this.setState({addToCart: ""})
      if(id){
        let existingEntry = await getDoc(doc(db, "cart", id))
        if(existingEntry.exists()){
          let number = existingEntry.data().number
          number ++
          updateDoc(doc(db, "cart", id), { number: number })
        }else{
          let product = await getDoc(doc(db, "products", id))
          if(product.exists()){
            let productData = product.data()
            setDoc(doc(db, "cart", id), {
              id: id,
              name: productData.name,
              price: productData.price,
              number: 1,
            })
          }else{
            this.error("Der angegebene Code existiert in der Datenbank nicht.")
          }
        }
      }else{
        this.error("Nichts eingetragen")
      }
    }
    error = (text) =>{
      this.setState({error: true, errorText: text})
    }
    checkPrice = async () =>{
      if(this.state.checkCode){
        let data = await getDoc(doc(db, "products", this.state.checkCode))
        if(data.exists()){
          let product = data.data()
          this.setState({
            checkName: product.name,
            checkPrice: product.price,
          })
        }else{
          this.error("Produkt existiert nicht!");
        }
      }else{
        this.error("Bitte etwas eingeben!")
      }
      this.setState({
        checkCode: ""
      })
    }
    handleCloseList = () => {
      this.setState({list: false})
    }
    handleCloseError = () =>{
      this.setState({error: false})
    }
    render() { 
        return          <div className="col">
          <Modal scrollable show={this.state.list} onHide={this.handleCloseList} size='xl'>
                <Modal.Header closeButton>
                <Modal.Title>Produkte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CartList close={this.handleCloseList}></CartList>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseList}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.error} onHide={this.handleCloseError}>
                <Modal.Header closeButton>
                <Modal.Title>Fehler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.errorText}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseError}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        <div className="buttons">
          <div className="card m-3">
            <div className="card-header">
              Aktionen
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input type="text" value={this.state.addToCart} onChange={(e) => this.setState({addToCart: e.target.value})} onKeyDown={(e) => {if (e.key === "Enter") this.addToCart()}} className="form-control" placeholder="Code"/>
                  <button onClick={() => this.addToCart()} type="button" className="btn btn-primary">Produkt hinzufügen</button>
                  <button className='btn btn-secondary' onClick={() => this.setState({list: true})}>Von der Liste Hinzufügen</button>
                </div>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input value={this.state.checkCode} onChange={(e) => this.setState({checkCode: e.target.value})} onKeyDown={(e) => {if (e.key === "Enter") this.checkPrice()}} className="form-control" placeholder="Code"/>
                  <button onClick={() => this.checkPrice()}  type="button" className="btn btn-primary">Preis Checken</button>
                </div>
                <br/>
                <span>{this.state.checkName}</span><br/>
                <span>{this.state.checkPrice}</span>
              </li>
              <li className="list-group-item">
                <input className="form-control" type="number"/>
                <div className="input-group flex-nowrap mt-3">
                  <button type="button" className="btn btn-primary" >Rabatt hinzufügen</button>
                  <button type="button" className="btn btn-secondary">prozentualen Rabatt hinzufügen</button>
                </div>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input placeholder="Aufladung" className="form-control" type="number"/>
                  <input placeholder="Karte" className="form-control" type="number"/>
                  <button className="btn btn-primary">Neue Geschenkkarte</button>
                </div>
                <br/>
                <div className="input-group flex-nowrap">
                  <input className="form-control" type="number" placeholder="code"/>
                  <button className="btn btn-primary" >Geschenkkarte hinzufügen</button>
                </div>
                <div className="input-group flex-nowrap mt-3">
                  <input className="form-control" type="number" placeholder="code"/>
                  <button className="btn btn-primary" >Geschenkkarte überprüfen</button>
                </div>
                <span className="mt-2"></span>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <button onClick={() => this.props.pay()} type="button" className="btn btn-success">Bezahlen</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>;
    }
}
 
export default Actions;