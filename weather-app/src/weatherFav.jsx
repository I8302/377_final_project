import React, { useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState('');

  const handleAddFavorite = () => {
    setFavorites([...favorites, newFavorite]);
    setNewFavorite('');
  };

  return (
    <div className="favorites">
      <h1>Your Favorite Cities</h1>
      
      <input
        type="text"
        value={newFavorite}
        onChange={(e) => setNewFavorite(e.target.value)}
        placeholder="Add a favorite city"
      />
      <button onClick={handleAddFavorite}>Add to Favorites!!</button>
      
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
