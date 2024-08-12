import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { db } from '../config/firebase';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';


class DataViewer extends Component {
    state = { 
        users: [],
        selUser: true,
        list: [],
     }
    async componentDidMount() {
        let snap = await getDoc(doc(db, "userdata", "userList"))
        if(snap.exists()){
            let users = snap.data()
            let userList = users.userList
            this.setState({users: userList})
        }else{
            alert("ne")
        }
    }
    selUser = async (uid) => {
        let data = await getDocs(collection(db, uid))
        let filteredData = data.docs.map((doc) => ({...doc.data()}))
        this.setState({list: filteredData})
        console.log(filteredData)
        console.log(new Date (filteredData[0].date.seconds * 1000 + filteredData[0].date.nanoseconds / 1000000,))
    } 
    render() { 
        return <div>
            <Navbar>
                <Container>
                    <Navbar.Brand>Benutzer Auswählen</Navbar.Brand>
                    <Nav className="me-auto">
                        {this.state.users.map((user) => (
                            <Nav.Link onClick={() => this.selUser(user.uid)} key={user.uid}>{user.name}</Nav.Link>
                        ))}
                    </Nav>
                </Container>
            </Navbar>
            <Accordion className='m-4' defaultActiveKey="0">
                {this.state.list.map((entry) => (<Accordion.Item key={entry.date} eventKey={entry.date}>
                    <Accordion.Header>{entry.date}</Accordion.Header>
                    <Accordion.Body>
                        <h3>Summe: {entry.zws}€</h3>
                        <h3>Gegeben: {entry.give}€</h3>
                        <h3>Zurück: {entry.back}€</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Anzahl</th>
                                    <th>Name</th>
                                    <th>Preis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entry.products.map((product) => (<tr key={product.id}>
                                    <td>{product.number}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}€</td>
                                </tr>))}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion>
        </div>;
    }
}
 
export default DataViewer;