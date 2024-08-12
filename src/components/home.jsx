import React, { Component } from 'react';
import Cart from './buy/cart';
import Actions from './buy/controls';
import Pay from './pay'
import CartList from './buy/cartList';

class Home extends Component {
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
        return <div className="container text-center">
                 <div className="row">
                     <div className="col">
                         <Cart></Cart>
                         {this.state.pay ? <Pay done={this.payDone}></Pay> : null}
                     </div>
                     <Actions pay={this.pay} currentAdmin={this.state.admin} setAdmin={this.setAdmin} setList={this.setList}></Actions>
                 </div>
                 {this.state.list ? <CartList></CartList> : null}
             </div>;
    }
}
 
export default Home;