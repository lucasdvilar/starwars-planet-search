import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetsData = await response.json();
      setData(planetsData.results);
    };
    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider value={ data }>
      {children}
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
