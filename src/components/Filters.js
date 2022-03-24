import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const Filters = () => {
  const { handleInput } = useContext(PlanetsContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        onChange={ handleInput }
      />
    </div>
  );
};

export default Filters;
