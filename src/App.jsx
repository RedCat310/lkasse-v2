import React, { Component } from 'react';
import Login from './components/login';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import Admin from './components/admin';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import NavBar from './components/navbar';
import Home from './components/home';
import DataViewer from './components/dataViewer';
import Screen from './components/screen';



class App extends Component {
    state = {
        screen: false,
    }
    setScreen = () => {
        if(this.state.screen){
            this.setState({screen: false})
        }else{
            this.setState({screen: true})
        }
    }
    toggleFullscreen = () => {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) { 
            if (document.documentElement.requestFullscreen) {
               document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
               document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
               document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    render() { 
        return <div>
            {this.state.screen ? <Screen screen={this.setScreen}/> :  <BrowserRouter>
                <NavBar screen={this.setScreen}></NavBar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verkäufe" element={<DataViewer />} />
                </Routes>
            </BrowserRouter>}
            <img src="fullscreen.png" alt="ne" style={{width: "50px", position: 'fixed', left: '1px', bottom: '1px'}} onClick={this.toggleFullscreen}/>
        </div>;
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