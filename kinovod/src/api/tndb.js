import axios from "axios";
import { tmdbConfig } from "../config";

async function getApiTMDB(path) {
  try {
    const result = await axios.get(`${tmdbConfig.URL}/${path}`, {
      headers: { Authorization: `Bearer ${tmdbConfig.token}`, "Content-Type": "application/json" },
    });
    return result.data;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

async function postApiTMDB({ path, body }) {
  try {
    const result = await axios.post(`${tmdbConfig.URL}/${path}`, body, {
      headers: { Authorization: `Bearer ${tmdbConfig.token}`, "Content-Type": "application/json" },
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
  async getMovieFavorite(path) {
    return await getApiTMDB(path);
  },
  async addRating({ path, body }) {
    return await postApiTMDB({ path, body });
  },
};
