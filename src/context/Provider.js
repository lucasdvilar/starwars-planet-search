import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filtersNum, setFiltersNum] = useState(0);
  const [columnSelect, setColumnSelect] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
    setFiltersNum(filtersNum + 1);
  };

  useEffect(() => {
    const filterPlanets = () => {
      if (filters.length > 0) {
        const index = filtersNum - 1;
        const filterValue = Number(filters[index].value);
        const base = index === 0 ? data : filteredPlanets;
        if (filters[index].comparison === 'maior que') {
          const test = base
            .filter((planet) => Number(planet[filters[index].column]) > filterValue);
          setFilteredPlanets(test);
        }
        if (filters[index].comparison === 'menor que') {
          const test = base
            .filter((planet) => Number(planet[filters[index].column]) < filterValue);
          setFilteredPlanets(test);
        }
        if (filters[index].comparison === 'igual a') {
          const test = base
            .filter((planet) => Number(planet[filters[index].column]) === filterValue);
          setFilteredPlanets(test);
        }
        const newColumn = columnSelect.filter((opt) => opt !== filters[index].column);
        setColumnSelect(newColumn);
      } else {
        setFilteredPlanets(data);
      }
    };
    filterPlanets();
  }, [filtersNum, name]);

  const context = {
    data,
    handleInput,
    filterByName: {
      name,
    },
    onFilterBtnClick,
    filterByNumericValues: filters,
    filteredPlanets,
    columnSelect,
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
