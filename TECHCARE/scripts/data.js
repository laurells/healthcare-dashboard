// fetchData.js
import { API_CONFIG } from '../config.js';

export const fetchData = async (url) => {
  try {
    const { username, password } = API_CONFIG;
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
