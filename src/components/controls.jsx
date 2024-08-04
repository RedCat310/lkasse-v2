import React, { Component } from 'react';
import { Logout } from './login';

class Actions extends Component {
    state = {  } 
    setAdmin = () =>{
     if(this.props.currentAdmin){
      this.props.setAdmin(false)
     }else{
      this.props.setAdmin(true)
     }
    }
    render() { 
        return          <div className="col">
        <div className="buttons">
          <div className="card m-3">
            <div className="card-header">
              Aktionen
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input id="add-input" type="text" className="form-control" placeholder="Code"/>
                  <button id="add-button" type="button" className="btn btn-primary">Produkt hinzufügen</button>
                  <button className='btn btn-secondary' onClick={this.props.setList}>Von der Liste Hinzufügen</button>
                </div>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input id="price-input" type="text" className="form-control" placeholder="Code"/>
                  <button id="price-button" type="button" className="btn btn-primary">Preis Checken</button>
                </div>
                <br/>
                <span id="price-name"></span><br/>
                <span id="price-price"></span>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input id="remove-input" className="form-control" placeholder="Code" type="text"/>
                  <button id="remove-button" type="button" className="btn btn-primary">Produkt Stornieren</button>
                </div>
              </li>
              <li className="list-group-item">
                <input id="sale-input" className="form-control" type="number"/>
                <div className="input-group flex-nowrap mt-3">
                  <button id="sale-button" type="button" className="btn btn-primary">Rabatt hinzufügen</button>
                  <button id="sale-button-p" type="button" className="btn btn-secondary">prozentualen Rabatt hinzufügen</button>
                </div>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <input id="gift-input" placeholder="Aufladung" className="form-control" type="number"/>
                  <input id="card-input" placeholder="Karte" className="form-control" type="number"/>
                  <button id="gift-button" className="btn btn-primary">Neue Geschenkkarte</button>
                </div>
                <br/>
                <div className="input-group flex-nowrap">
                  <input className="form-control" id="gift-code" type="number" placeholder="code"/>
                  <button className="btn btn-primary" id="gift-code-button">Geschenkkarte hinzufügen</button>
                </div>
                <div className="input-group flex-nowrap mt-3">
                  <input className="form-control" id="gift-check" type="number" placeholder="code"/>
                  <button className="btn btn-primary" id="gift-check-button">Geschenkkarte überprüfen</button>
                </div>
                <span id="gift-check-output" className="mt-2"></span>
              </li>
              <li className="list-group-item">
                <div className="input-group flex-nowrap">
                  <button id="pay" type="button" className="btn btn-success">Bezahlen</button>
                  <button id="update" className="btn btn-secondary">Aktualisieren</button>
                  <button className="btn btn-warning" onClick={this.setAdmin}>Admin</button>
                  <Logout>Ausloggen</Logout>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>;
    }
}
 
export default Actions;