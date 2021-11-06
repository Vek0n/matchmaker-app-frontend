import { useState } from 'react';

export const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    return tokenString
};

export function useToken() {
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        console.log("zapisywanie", userToken)
        sessionStorage.setItem('token', userToken);
        setToken(userToken);
    };

  return {
    setToken: saveToken,
    token
  }

}