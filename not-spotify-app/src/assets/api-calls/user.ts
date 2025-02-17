import axios from "axios";

const BASE_URL = "https://api.spotify.com/v1";

export const getUserProfile = async (token: string) => {
  console.log(token);
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};