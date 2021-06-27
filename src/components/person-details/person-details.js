﻿import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
    loading: true
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      // this.setState({
      //   loading: true
      // });
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.setState({
      loading: true
    });

    this.swapiService.getPerson(personId).then(person => {
      this.setState({
        person: person,
        loading: false
      })
    })
  }
  render() {
    console.log('render component');
    if (!this.state.person) {
      return (
        <span>Selected a person from left list</span>
      )
    }

    if (this.state.loading) {
      return <Spinner/>;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
       
      </div>
     
    )
  }
}