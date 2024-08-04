import React, { Component } from 'react';

class Cart extends Component {
    state = { 
      pay1: false,
      pay2: false,
      pay3: false,
     } 
    render() { 
        return <div className="col">
        <div className="products">
          <div className="card m-3">
            <div className="card-header"><h3>Einkaufswagen</h3></div>
            <div className="card-body">
              <table id="cart" className="table table-striped">
                <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Preis</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
              <h2>Zwischensumme:</h2>
              <h1 id="zws">0.00€</h1>
              {this.state.pay1 ? <div className="container2" id="pay-div">
                <input id="cust-input" placeholder="Der Kunde Gab" className="form-control" type="number"/>
                <br/>
                <div className="input-group flex-nowrap">
                  <button id="cust-button" className="btn btn-primary">OK</button>
                  <button id="card" className="btn btn-secondary">Karte(ohne Geld eingeben)</button>
                </div>
              </div> : null}
              <br/>
              { this.state.pay2 ? <div className="input-group flex-nowrap" id="pay-div2">
                <input type="text" id="money" disabled className="form-control"/>
                <button id="finish-button" className="btn btn-primary">Fertig</button>
              </div> : null}
            </div>
          </div>
        </div>
      </div>;
    }
}
 
export default Cart;