import { useState } from 'react';

export const getUserId = () => {
    const userId = sessionStorage.getItem('userId');
    // const userToken = JSON.parse(tokenString);
    return userId
};

export function useUserId() {
    const [userId, setUserId] = useState(getUserId());
    const saveUserId = userId => {
        console.log("zapisywanie", userId)
        sessionStorage.setItem('userId', userId);
        setUserId(userId);
    };



  return {
    setUserId: saveUserId, userId
  }

}