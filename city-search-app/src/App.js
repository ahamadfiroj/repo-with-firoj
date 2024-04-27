import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';

const API_KEY = 'AIzaSyDpLG9KL3ShzWYNNJfQM0v3tXx8r5BcDUE';
const API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

const getSuggestions = async (value) => {
  try{
    const response = await fetch(`${API_URL}?input=${value}&types=(cities)&key=${API_KEY}`);
  const data = await response.json();
  console.log("datadata", data)
  return data.predictions?.map((prediction) => prediction?.description);
  }catch{
    console.log("error")
  }
};

const App = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    console.log("value", value)
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: 'Search cities...',
    value,
    onChange: onChange
  };

  return (
    <div className="App">
      <h1>City Search</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default App;
