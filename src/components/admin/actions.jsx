import React, { Component } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase'

class Actions extends Component {
    state = {
        newName: "",
        newCode: "",
        newPrice: 0,
    } 

    addNewProduct = async() => {
        if(this.state.newCode && this.state.newName && this.state.newPrice){
            let existingEntry = await getDoc(doc(db, "proctucts", this.state.newCode))
            if(existingEntry.exists()){
                alert("Produkt existiert schon, bitte vorher löschen")
            }else{
                setDoc(doc(db, "products", this.state.newCode), {
                    name: this.state.newName,
                    price: this.state.newPrice,
                })
            }
        }
    }

    render() { 
        return <div className="col">
            <div className="buttons">
                <div className="card m-3">
                    <div className="card-header">
                    Aktionen
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="input-group flex-nowrap">
                        <input value={this.state.newName} id="add-input" type="text" className="form-control" placeholder="Name"/>
                        <input value={this.state.newCode} type="text" className="form-control" placeholder='Code'/>
                        <input value={this.state.newPrice} type="number" className="form-control" placeholder='Preis'/>
                        <button id="add-button" type="button" className="btn btn-primary">Produkt hinzufügen</button>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
 
export default Actions;