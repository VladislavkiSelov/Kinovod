import axios from "axios";
const url = `http://localhost:7000`;

async function get(path) {
  try {
    const result = await axios.get(`${url}/${path}`);
    return result.data;
  } catch (error) {
      console.error("Error:", error);
      return [];
  }
}

export const client = {
  async getMoviesNowPlaying(path) {
    return await get(path);
  },
  async getMoviesPopular(path) {
    return await get(path);
  },
  async getSerialPopular(path) {
    return await get(path);
  },
};
