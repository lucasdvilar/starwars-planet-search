import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetsData = await response.json();
      setData(planetsData.results);
    };
    fetchData();
  }, []);

  const handleInput = ({ target: { value } }) => {
    setName(value);
  };

  const onFilterBtnClick = (column, comparison, value) => {
    setFilters([...filters, { column, comparison, value }]);
  };

  useEffect(() => {
    const filterPlanets = () => {
      if (filters.length > 0) {
        const filterValue = Number(filters[0].value);
        if (filters[0].comparison === 'maior que') {
          const test = data
            .filter((planet) => Number(planet[filters[0].column]) > filterValue);
          setFilteredPlanets(test);
        }
        if (filters[0].comparison === 'menor que') {
          const test = data
            .filter((planet) => Number(planet[filters[0].column]) < filterValue);
          setFilteredPlanets(test);
        }
        if (filters[0].comparison === 'igual a') {
          const test = data
            .filter((planet) => Number(planet[filters[0].column]) === filterValue);
          setFilteredPlanets(test);
        }
      } else {
        setFilteredPlanets(data);
      }
    };
    filterPlanets();
  }, [filters, name]);

  const context = {
    data,
    handleInput,
    filterByName: {
      name,
    },
    onFilterBtnClick,
    filterByNumericValues: filters,
    filteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
