import React, { Component } from 'react';
import {Login} from './components/login';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import Actions from './components/controls';
import Cart from './components/cart';
import Admin from './components/admin';
import CartList from './components/cartList';
class App extends Component {
    state = { 
        user: null,
        admin: false,
        list: false,
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
    render() { 
        return <div>{this.state.user ? <div className="container text-center">
                <div className="row">
                    <Cart></Cart>
                    <Actions currentAdmin={this.state.admin} setAdmin={this.setAdmin} setList={this.setList}></Actions>
                </div>
            </div> : <Login setUser={this.setUser}></Login>} 
            {this.state.admin ? <Admin></Admin> : null}
            {this.state.list ? <CartList></CartList> : null}
        </div>;
    }
}
 
export default App;