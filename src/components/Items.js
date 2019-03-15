import React, { Component } from 'react';
import firebase from '../Firebase';

class Items extends Component {
  constructor(props) {
    super(props);
    this.breakfast = firebase.firestore().collection('items').doc('desayuno');
    this.lunch = firebase.firestore().collection('items').doc('dia')
    this.unsubscribe = null;
    this.state = {
      breakfastItems: [],
      lunchItems: [],
    };
  };

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
      console.log(this.state),
      <div className="container">
        <div className="row">
          {this.state.breakfastItems.map((order, index) =>
            <div >
              <button type="button" id={"item-" + index} className="btn btn-secondary order">{order[0]} {order[1]}</button>
            </div>
          )}
        </div>
        <div className="row">
          {this.state.lunchItems.map((order, index) =>
            <div >
              <button type="button" id={"lunch-" + index} className="btn btn-secondary order">{order[0]} {order[1]}</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Items;
