import React, { Component } from 'react';
import { setDoc, doc } from 'firebase/firestore';

class Actions extends Component {
    state = {  } 
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
                        <input id="add-input" type="text" className="form-control" placeholder="Code"/>
                        <input type="text" className="form-control" placeholder='Name'/>
                        <input type="number" className="form-control" placeholder='Preis'/>
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