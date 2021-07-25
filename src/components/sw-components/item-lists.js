﻿import React from 'react';
import ItemList from '../item-list';
import {withData} from '../hoc-helper';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();

const {getAllPeople, getAllStarships, getAllPlanets} = swapiService;

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props} >
        {fn}
      </Wrapped>
    );
  }
};

const renderName = ({name}) => <span>{name}</span>;

const renderModelAndName = ({modal, name}) => <span>{name} ({modal})</span>;

const PersonList = withData(withChildFunction(ItemList, renderName), getAllPeople);

const PlanetList = withData(withChildFunction(ItemList, renderName), getAllPlanets);

const StarshipList = withData(withChildFunction(ItemList, renderModelAndName), getAllStarships);

export {
  PersonList, PlanetList, StarshipList
}