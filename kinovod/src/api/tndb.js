import axios from "axios";
const urlTMDB = `https://api.themoviedb.org`;

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
  async getActors(path) {
    return await getApiTMDB(path);
  },
  async getDirectors(path) {
    return await getApiTMDB(path);
  },
  async getTrailer(path) {
    return await getApiTMDB(path);
  },
  async ComingSoon(path) {
    return await getApiTMDB(path);
  },
  async getListGenres(path) {
    return await getApiTMDB(path);
  },
  async getListCountry(path) {
    return await getApiTMDB(path);
  },
  async getFilterListMovie(path) {
    return await getApiTMDB(path);
  },
  async getSearchListMovie(path) {
    return await getApiTMDB(path);
  },
};
