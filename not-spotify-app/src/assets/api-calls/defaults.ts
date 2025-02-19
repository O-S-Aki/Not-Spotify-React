import axios from "axios";

export const makeGetRequest = async (requestUrl: string, accessToken: string) => {
  const response = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })

  return response;
}