import { useState } from 'react';

export const getUsername = () => {
    const username = sessionStorage.getItem('username');
    return username
};

export function useUsername() {
    const [username, setUsername] = useState(getUsername());
    const saveUsername = username => {
        console.log("zapisywanie", username)
        sessionStorage.setItem('username', username);
        setUsername(username);
    };



  return {
    setUsername: saveUsername, username
  }

}