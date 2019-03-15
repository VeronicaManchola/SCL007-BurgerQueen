import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('orders');
    this.state = {
      menu: '',
      total: '',
      customer: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { menu, total, customer } = this.state;

    this.ref.add({
      menu,
      total,
      customer
    }).then((docRef) => {
      this.setState({
        menu: '',
        total: '',
        customer: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { menu, total, customer } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Editar orden
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Lista de ordenes</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Menu:</label>
                <input type="text" className="form-control" name="menu" value={menu} onChange={this.onChange} placeholder="Orden" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Total:</label>
                <input type="text" className="form-control" name="total" onChange={this.onChange} placeholder="Total" value={total} />
              </div>
              <div className="form-group">
                <label htmlFor="author">Cliente:</label>
                <input type="text" className="form-control" name="customer" value={customer} onChange={this.onChange} placeholder="Cliente" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;