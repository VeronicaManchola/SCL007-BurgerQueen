import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('orders');
    this.unsubscribe = null;
    this.state = {
      orders: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      const { menu, total, customer } = doc.data();
      orders.push({
        key: doc.id,
        doc, // DocumentSnapshot
        menu,
        total,
        customer,
      });
    });
    this.setState({
      orders
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Lista de ordenes
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Agregar orden</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Total</th>
                  <th>Cliente</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map((order, index) =>
                  <tr id={"list-"+index}>
                    <td><Link to={`/show/${order.key}`}>{order.menu}</Link></td>
                    <td>{order.total}</td>
                    <td>{order.customer}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
