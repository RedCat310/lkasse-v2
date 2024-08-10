import React, { Component } from 'react';
import {Login} from './components/login';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import Actions from './components/buy/controls';
import Cart from './components/buy/cart';
import Admin from './components/admin';
import CartList from './components/buy/cartList';
import Pay from './components/pay';

class App extends Component {
    state = { 
        user: false,
        admin: false,
        list: false,
        pay: false
     }
    setUser = (user) => {
        this.setState({user: user})
    }
    setAdmin = (data) => {
        this.setState({admin: data})
    }
    setList = () =>{
        if(this.state.list === false){
            this.setState({list: true})
        }else{
            this.setState({list: false})
        }
        
    }
    pay = () =>{
        this.setState({pay: true})
    }
    payDone = () =>{
        this.setState({pay: false})
    }
    render() { 
        return <div>{this.state.user ? <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <Cart></Cart>
                        {this.state.pay ? <Pay done={this.payDone}></Pay> : null}
                    </div>
                    <Actions pay={this.pay} currentAdmin={this.state.admin} setAdmin={this.setAdmin} setList={this.setList}></Actions>
                </div>
            </div> : <Login setUser={this.setUser}></Login>} 
            {this.state.admin ? <Admin></Admin> : null}
            {this.state.list ? <CartList></CartList> : null}
        </div>;
    }
}
 
export default App;