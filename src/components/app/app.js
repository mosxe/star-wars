import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ItemDetails, {Record} from '../item-details';
import SwapiService from '../../services/swapi-service';
import './app.css';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import ItemList from '../item-list';
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

    const {getPerson, getStarship, getPersonImage, getStarshipImage
      ,getPlanetImage, getAllPeople} = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender"/>
        <Record field="eyeColor" label="Eye Color"/>
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
        <Record field="modal" label="Model"/>
        <Record field="length" label="Length"/>
        <Record field="costInCreadits" label="Cost"/>
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div>
          <Header />
          <ItemList
            getData={getAllPeople}
            onItemSelected={() => {}}>

            { ({name}) => <span>{name}</span> }
          </ItemList>
          {/* <Row
            left={personDetails}
            right={starshipDetails}
          /> */}
        </div>
      </ErrorBoundry>
    );
  }
}
