import React, { Component } from 'react';
import Actions from './admin/actions';
import List from './admin/list';

class Admin extends Component {
    state = {  } 
    render() { 
        return <div>
            <div className="container text-center">
                <div className="row">
                    <List></List>
                    <Actions></Actions>
                </div>
            </div>
        </div>;
    }
}
 
export default Admin;