import axios from "axios";
const url = `http://localhost:7000`;
const urlTMDB = `https://api.themoviedb.org`;

async function get(path) {
  try {
    const result = await axios.get(`${url}/${path}`);
    return result.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function getApiTMDB(path) {
  try {
    const result = await axios.get(`${urlTMDB}/${path}`, {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN_TMDB}`, "Content-Type": "application/json" },
    });
    return result.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export const client = {
  async getMoviesNowPlaying(path) {
    return await getApiTMDB(path);
  },
  async getMoviesPopular(path) {
    return await getApiTMDB(path);
  },
  async getSerialPopular(path) {
    return await getApiTMDB(path);
  },
  async getMovie(path) {
    return await getApiTMDB(path);
  },
};
