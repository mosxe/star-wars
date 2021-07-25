import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import './app.css';
import ErrorBoundry from '../error-boundry';
import {SwapiServiceProvider} from '../swapi-service-context';

import {
  PersonList, PlanetList, StarshipList,
  PersonDetails, PlanetDetails, StarshipDetails
} from '../sw-components';

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

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const {getPerson, getStarship, getPersonImage, getStarshipImage
      ,getPlanetImage, getAllPeople} = this.swapiService;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider.Provider  value={this.swapiService}>
          <div>
            <Header />
            <PersonDetails itemId={11}/>
            <PlanetDetails itemId={5}/>
            <StarshipDetails itemId={11}/>
            <PersonList />
            <StarshipList />
            <PlanetList />
          </div>
        </SwapiServiceProvider.Provider>
      </ErrorBoundry>
    );
  }
}
