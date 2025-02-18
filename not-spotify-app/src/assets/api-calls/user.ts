import axios from "axios";
import { getCredentials } from "./authenticator";

const baseUrl = getCredentials().BaseUrl;

export const getUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(`${baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    
    return response.data;

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};