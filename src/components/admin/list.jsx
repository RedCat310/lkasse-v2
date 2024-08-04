import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { getDocs, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'

class List extends Component {
    componentDidMount(){
        onSnapshot(collection(db, "products"), (doc) => {
            this.updateList()
          });
    }
    state = { 
        products: [],
     } 
    updateList = async () => {
        let data = await getDocs(collection(db, "products"))
        let filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        this.setState({products: filteredData})
    }
    deleteProduct = async(product) =>{
        deleteDoc(doc(db, "products", product))
    }
    render() { 
        return <div className="col">
            <div className="card m-3">
                <div className="card-header"><h3>Produkte</h3></div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Preis</th>
                                <th>Code</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}€</td>
                                    <td>{product.id}</td>
                                    <td><button onClick={() => this.deleteProduct(product.id)} className='btn btn-danger'>Löschen</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>;
    }
}
 
export default List;