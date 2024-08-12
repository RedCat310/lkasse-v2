import React, { Component } from 'react';
import Login from './components/login';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import Admin from './components/admin';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import NavBar from './components/navbar';
import Home from './components/home';
import DataViewer from './components/dataViewer';



class App extends Component {
    state = {    }
    render() { 
        return <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/verkäufe" element={<DataViewer />} />
            </Routes>
            
        </BrowserRouter>;
        // return <div>{this.state.user ? <div className="container text-center">
        //         <div className="row">
        //             <div className="col">
        //                 <Cart></Cart>
        //                 {this.state.pay ? <Pay done={this.payDone}></Pay> : null}
        //             </div>
        //             <Actions pay={this.pay} currentAdmin={this.state.admin} setAdmin={this.setAdmin} setList={this.setList}></Actions>
        //         </div>
        //     </div> : <Login setUser={this.setUser}></Login>} 
        //     {this.state.admin ? <Admin></Admin> : null}
        //     {this.state.list ? <CartList></CartList> : null}
        // </div>;
    }
}
 
export default App;