import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Items from './Items'

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
                <div className="row">
                    <div className="col">
                        <h2>Nueva orden</h2>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="order">Orden:</label>
                        <div>{<Items/>}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="total">Total:</label>
                        <input type="text" className="form-control" id="total" name="total" onChange={this.onChange} placeholder="Total" value={total} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cliente">Cliente:</label>
                        <input type="text" className="form-control" id="cliente" name="customer" onChange={this.onChange} placeholder="Cliente" value={customer} />
                    </div>
                    <div className="row">
                        <div className='col'>
                            <h4><Link to="/" className="btn btn-primary">Lista de ordenes</Link></h4>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Create;