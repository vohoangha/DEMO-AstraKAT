
import { User } from '../types';

const COOKIE_NAME = 'astra_user_session';
const EXPIRY_DAYS = 30;

export const saveUserToCookie = (user: User) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + (EXPIRY_DAYS * 24 * 60 * 60 * 1000));
    
    // Encode value to handle special characters safely
    const jsonString = JSON.stringify(user);
    const encodedValue = encodeURIComponent(jsonString);
    
    document.cookie = `${COOKIE_NAME}=${encodedValue};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  } catch (e) {
    console.error("Failed to save user cookie", e);
  }
};

export const getUserFromCookie = (): User | null => {
  try {
    const nameEQ = COOKIE_NAME + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const encodedValue = c.substring(nameEQ.length, c.length);
        const decodedValue = decodeURIComponent(encodedValue);
        return JSON.parse(decodedValue);
      }
    }
    return null;
  } catch (e) {
    console.error("Failed to parse user cookie", e);
    return null;
  }
};

export const removeUserCookie = () => {
  document.cookie = `${COOKIE_NAME}=; Max-Age=-99999999; path=/;SameSite=Strict`;
};
