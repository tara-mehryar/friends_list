import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');

  const getSavedFriends = async () => {
    const res = await axios.get('/api/friends');
    setFriends(res.data);
  };

  useEffect (() => {
    getSavedFriends();
  }, []);

  const addFriend = () => {
    const newFriends = [...friends];
    newFriends.push({picture: picture, name: name});
    setFriends(newFriends);

    setPicture('');
    setName('');
  };

  const friendInfo = friends.map((friend) => {
    return(
      <div>
        <img width="100px" src={friend.picture} alt={friend.name} />
        <span>{friend.name}</span>
      </div>
    )
  })

  return (
    <div>
      <label htmlFor="picture">Picture:</label>
      <input id="picture" type="text" value={picture} onChange={(e) => setPicture(e.target.value)}/>

      <label htmlFor="name">Name:</label>
      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      <button type="button" onClick={addFriend}>
        Add Friend
      </button>

      {friendInfo}
    </div>
  );
}

export default App
