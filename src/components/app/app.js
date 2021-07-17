﻿import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import './app.css';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }
   
  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const marginRight = {
      marginRight: '20px'
    };

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const {getPerson, getStarship, getPersonImage, getStarshipImage, getPlanetImage} = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      />
    );

    const starshipDetails = (
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      />
    );

    return (
      <ErrorBoundry>
        <div>
          <Header />
          <Row
            left={personDetails}
            right={starshipDetails}
          />
        </div>
      </ErrorBoundry>
    );
  }
}
