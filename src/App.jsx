import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'bootstrap';
import './App.css';

const KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [destination, setDestination] = useState({ display_name: 'location info' });
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  async function getDestination() {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${search}&format=json`;

      const response = await axios.get(API);
      const data = response.data[0];

      setDestination(data);
      setError(null);
    } catch (error) {
      setError('Error took place when fetching API');
    }
  }

  function onSearchChange(event) {
    setSearch(event.target.value);
  }

  function searchDestination(event) {
    event.preventDefault();
    getDestination();
    setSearch(search);
  }

  function generateMap(lat, lon) {
    const API2 = `https://maps.locationiq.com/v3/staticmap?key=${KEY}&center=${lat},${lon}&zoom=10`;
    return API2;
  }

  return (
    <>
      <input onChange={onSearchChange} />
      <button onClick={searchDestination}>Search</button>
      <h2>The city is:{destination.display_name}</h2>
      <h2>Latitude:{destination.lat}</h2> <h2>Longitude:{destination.lon}</h2>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {destination.lat && destination.lon && (
        <img
          src={generateMap(destination.lat, destination.lon)}
          alt="map"
          style={{ maxWidth: '80%' }}
        />
      )}
    </>
  );
}
