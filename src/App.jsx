// import { useState, useEffect } from 'react';
// import WeatherDisplay from './component/WeatherDisplay';
// import MapDisplay from './component/MapDisplay';
// import { GoogleApiWrapper } from 'google-maps-react';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import PropTypes from 'prop-types';

// const App = ({ google }) => {
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [unit, setUnit] = useState('celsius');
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [address, setAddress] = useState('');

//   const handleLocationChange = (lat, lng) => {
//     setLatitude(lat);
//     setLongitude(lng);
//   };

//   const handleUnitChange = (e) => {
//     setUnit(e.target.value);
//   };

//   const handleSearch = (address) => {
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ address }, (results, status) => {
//       if (status === 'OK') {
//         const { lat, lng } = results[0].geometry.location;
//         setLatitude(lat);
//         setLongitude(lng);
//         const newLocation = { address, latitude: lat, longitude: lng };
//         setSearchHistory((prevHistory) => [...prevHistory, newLocation]);
//         localStorage.setItem('searchHistory', JSON.stringify([...searchHistory, newLocation]));
//         setAddress('');
//       } else {
//         console.error('Geocode was not successful for the following reason:', status);
//       }
//     });
//   };

//   const handleHistoryClick = (location) => {
//     setLatitude(location.latitude);
//     setLongitude(location.longitude);
//   };

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem('searchHistory'));
//     if (storedHistory) {
//       setSearchHistory(storedHistory);
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Weather App</h1>
//       <form onSubmit={(e) => { e.preventDefault(); handleSearch(address); }}>
//         <PlacesAutocomplete
//           value={address}
//           onChange={setAddress}
//           onSelect={handleSearch}
//           googleApiKey={YOUR_GOOGLE_MAPS_API_KEY}
//         >
//           {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//             <div>
//               <input {...getInputProps({ placeholder: 'Search for a location...' })} />
//               <div>
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => (
//                   <div {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
//                     {suggestion.description}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       </form>
//       <label>
//         Temperature Unit:
//         <select value={unit} onChange={handleUnitChange}>
//           <option value="celsius">Celsius</option>
//           <option value="fahrenheit">Fahrenheit</option>
//         </select>
//       </label>
//       <MapDisplay
//         latitude={latitude}
//         longitude={longitude}
//         onLocationChange={handleLocationChange}
//       />
//       <WeatherDisplay latitude={latitude} longitude={longitude} unit={unit} />
//       <div>
//         <h3>Recent Searches</h3>
//         {searchHistory.map((location, index) => (
//           <div key={index} onClick={() => handleHistoryClick(location)}>
//             {location.address}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// App.propTypes = {
//   google: PropTypes.object.isRequired,
// };

// export default GoogleApiWrapper({
//   apiKey: YOUR_GOOGLE_MAPS_API_KEY,
// })(App);

// import { useState, useEffect } from 'react';
// import WeatherDisplay from './component/WeatherDisplay';
// import MapDisplay from './component/MapDisplay';
// import "./App.css"
// import { RequestType, geocode, setKey } from 'react-geocode';

// // Initialize the Geocode library
// setKey("57d7f862509fad9fdbf6e938538012f1");
// // Geocode.enableDebug();

// const App = () => {
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [unit, setUnit] = useState('celsius');
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [address, setAddress] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const handleLocationChange = (lat, lng) => {
//     setLatitude(lat);
//     setLongitude(lng);
//   };

//   const handleUnitChange = (e) => {
//     setUnit(e.target.value);
//   };

//   const handleSearch = (address) => {
//     geocode(RequestType.ADDRESS, address)
//     .then(({ results }) => {
//       const { lat, lng } = results[0].geometry.location;
//       setLatitude(lat);
//       setLongitude(lng);
//       const newLocation = { address, latitude: lat, longitude: lng };
//       setSearchHistory((prevHistory) => [...prevHistory, newLocation]);
//       localStorage.setItem('searchHistory', JSON.stringify([...searchHistory, newLocation]));
//       setAddress('');
//       setSuggestions([]);
//     })
//     .catch(console.error);
//   };

//   const handleAddressChange = async (e) => {
//     const input = e.target.value;
//     setAddress(input);

//     if (input.length > 2) {
//       try {
//         const response = await geocode(RequestType.ADDRESS, input);
//         const suggestions = response.results.map((result) => result.formatted_address);
//         setSuggestions(suggestions);
//       } catch (error) {
//         console.error('Error fetching suggestions:', error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleHistoryClick = (location) => {
//     setLatitude(location.latitude);
//     setLongitude(location.longitude);
//   };

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem('searchHistory'));
//     if (storedHistory) {
//       setSearchHistory(storedHistory);
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Weather App</h1>
//       <form onSubmit={(e) => { e.preventDefault(); handleSearch(address); }}>
//         <input
//           type="text"
//           value={address}
//           onChange={handleAddressChange}
//           list="suggestions"
//           placeholder="Search for a location..."
//         />
//         <datalist id="suggestions">
//           {suggestions.map((suggestion, index) => (
//             <option key={index} value={suggestion} />
//           ))}
//         </datalist>
//       </form>
//       <label>
//         Temperature Unit:
//         <select value={unit} onChange={handleUnitChange}>
//           <option value="celsius">Celsius</option>
//           <option value="fahrenheit">Fahrenheit</option>
//         </select>
//       </label>
//       <MapDisplay
//         latitude={latitude}
//         longitude={longitude}
//         onLocationChange={handleLocationChange}
//       />
//       <WeatherDisplay latitude={latitude} longitude={longitude} unit={unit} />
//       <div>
//         <h3>Recent Searches</h3>
//         {searchHistory.map((location, index) => (
//           <div key={index} onClick={() => handleHistoryClick(location)}>
//             {location.address}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState, useEffect } from 'react';
// import WeatherDisplay from './components/WeatherDisplay';
import WeatherDisplay from './component/WeatherDisplay';
// import MapDisplay from './components/MapDisplay';
import MapDisplay from './component/MapDisplay';
import "./App.css"

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [unit, setUnit] = useState('celsius');
  const [searchHistory, setSearchHistory] = useState([]);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSearch = (address) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
      .then(response => response.json())
      .then(results => {
        const { lat, lon } = results[0];
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));
        const newLocation = { address, latitude: parseFloat(lat), longitude: parseFloat(lon) };
        setSearchHistory((prevHistory) => [...prevHistory, newLocation]);
        localStorage.setItem('searchHistory', JSON.stringify([...searchHistory, newLocation]));
        setAddress('');
        setSuggestions([]);
      })
      .catch(console.error);
  };

  const handleAddressChange = (e) => {
    const input = e.target.value;
    setAddress(input);

    if (input.length > 2) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`)
        .then(response => response.json())
        .then(results => {
          const suggestions = results.map(result => result.display_name);
          setSuggestions(suggestions);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleHistoryClick = (location) => {
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  };

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (storedHistory) {
      setSearchHistory(storedHistory);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        })
      }
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(address); }}>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          list="suggestions"
          placeholder="Search for a location..."
        />
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
      </form>
      <label>
        Temperature Unit:
        <select value={unit} onChange={handleUnitChange}>
          <option value="celsius">Celsius</option>
          <option value="fahrenheit">Fahrenheit</option>
        </select>
      </label>
      <div className="map-container">
        <MapDisplay
          latitude={latitude}
          longitude={longitude}
          onLocationChange={handleLocationChange}
        />
      </div>
      <div className="weather-display">
        <WeatherDisplay latitude={latitude} longitude={longitude} unit={unit} />
      </div>
      <div className="recent-searches">
        <h3>Recent Searches</h3>
        {searchHistory.map((location, index) => (
          <div className='recent-search' key={index} onClick={() => handleHistoryClick(location)}>
            {location.address}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
