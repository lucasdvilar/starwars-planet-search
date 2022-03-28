import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const Filters = () => {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const { handleInput, onFilterBtnClick } = useContext(PlanetsContext);

  const handleInputChange = ({ target: { value: targetValue, name } }) => {
    if (name === 'column') {
      setColumn(targetValue);
    }
    if (name === 'comparison') {
      setComparison(targetValue);
    }
    if (name === 'value') {
      setValue(targetValue);
    }
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        onChange={ handleInput }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleInputChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleInputChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ handleInputChange }
        value={ value }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => onFilterBtnClick(column, comparison, value) }
      >
        Filtrar
      </button>
    </div>
  );
};

export default Filters;
