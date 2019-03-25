import React, { Component } from 'react';
import firebase from '../Firebase';
import '../App.css';

class Items extends Component {
  constructor(props) {
    super(props);
    this.breakfast = firebase.firestore().collection('items').doc('desayuno');
    this.lunch = firebase.firestore().collection('items').doc('dia')
    this.unsubscribe = null;
    this.state = {
      breakfastItems: [],
      lunchItems: [],
      fullOrder: [],
      total: [0]
    };
  };

  handleClick = (name, value) => {
    const joinedValues = this.state.total.concat(value);
    const joinedOrder = this.state.fullOrder.concat([name])
    this.setState({ fullOrder: joinedOrder, total: joinedValues });
  }

  componentDidMount() {
    this.unsubscribe = this.breakfast.get()
      .then((doc) => {
        let eachItem = Object.entries(doc.data())
        this.setState({ breakfastItems: eachItem });
      })
      .catch(console.error);
    this.unsubscribe = this.lunch.get()
      .then((doc) => {
        let eachItem = Object.entries(doc.data())
        this.setState({ lunchItems: eachItem });
      })
  };

  render() {
    return (
      <div>
        <div>
          <h4>Desayuno: </h4>
        </div>
        <div className="row">
          {this.state.breakfastItems.map((order, index) =>
            <div id={"bDiv-" + index}>
              <button type="button" id={"breakfast-" + index} onClick={() => this.handleClick(order, order[1])} className="btn btn-secondary order">{order[0]} ${order[1]}</button>
            </div>
          )}
        </div>
        <div>
          <h4>Almuerzo: </h4>
        </div>
        <div className="row">
          {this.state.lunchItems.map((order, index) =>
            <div id={"lDiv-" + index}>
              <button type="button" id={"lunch-" + index} onClick={() => this.handleClick(order, order[1])} className="btn btn-secondary order">{order[0]} {order[1]}</button>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="total">Total:</label>
          <div>{this.state.fullOrder.map((item, index) => {
            return <p>{item[0]} <button type="button" id={"remove-" + index}>X</button></p>
          })}</div>
          <p>${this.state.total.reduce((acc, currValue) => {
            return acc + currValue
          })}</p>
        </div>
      </div>
    );
  }
}

export default Items;
