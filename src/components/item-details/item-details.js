import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
}

export {
  Record
}

export default class ItemDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
    loading: true,
    image: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    });

    getData(itemId).then(item => {
      this.setState({
        item: item,
        loading: false,
        image: getImageUrl(item)
      })
    });
  }

  render() {
    const {item, image} = this.state;
    if (!item) {
      return (
        <span>Selected a item from left list</span>
      )
    }

    if (this.state.loading) {
      return <Spinner/>;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.item;
    return (
      <div className="item-details card">
        <img className="person-image"
          src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item});
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}