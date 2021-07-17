import React, {Component} from 'react';
import ItemList from '../item-list'
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import './people-page.css';



export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 3,
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson: selectedPerson
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        { i => (
          
          `${i.name} (${i.birthYear})`
        )}
      </ItemList>
    );

    const personDetails = (
      <ItemDetails personId={this.state.selectedPerson}/>
    );

    return (
      <ErrorBoundry> 
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    )
  }
}