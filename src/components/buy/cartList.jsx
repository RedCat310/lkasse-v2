import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { getDocs, collection, onSnapshot, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

class CartList extends Component {
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
    addToCart = async(id, name, price) => {
        try {
            let item = await getDoc(doc(db, "cart", id))
            if(item.exists()){
                let newNumber = item.data().number
                newNumber++
                updateDoc(doc(db, "cart", id), {
                    number: newNumber
                })
                let string = newNumber + "x " + name + "  " + price
                updateDoc(doc(db, "screen", "data"), {text: string})
            }else{
                await setDoc(doc(db, "cart", id), {
                    name: name,
                    id: id,
                    price: price,
                    number: 1
                })
                let string = "1x " + name + "  " + price
                updateDoc(doc(db, "screen", "data"), {text: string})
            }
        } catch (error) {
            console.error(error)
        }
        this.props.close()
    }
    render() { 
        return  <div>
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
                                    <td><button onClick={() => this.addToCart(product.id, product.name, product.price)} className='btn btn-success'>Hinzufügen</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>;
    }
}
 
export default CartList;