import axios from "axios";
import { mydbConfig } from "../config";

async function getApiMydb(path, token, params) {
  const result = await axios.get(`${mydbConfig.URL}/${path}`, {
    params,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return result;
}

async function postApiMydb({ path, token, body }) {
  const result = await axios.post(`${mydbConfig.URL}/${path}`, body, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return result;
}

async function deleteApiMydb({ path, token, params }) {
  const result = await axios.delete(`${mydbConfig.URL}/${path}`, {
    params,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return result;
}

export const clientMyDB = {
  async getMovieFavorite(path, token, params) {
    return await getApiMydb(path, token, params);
  },

  async addMovieFavorite({ path, token, body }) {
    return await postApiMydb({ path, token, body });
  },

  async deleteMovieFavorite({ path, token, params }) {
    return await deleteApiMydb({ path, token, params });
  },

  async resetPassword({ path, token, body }) {
    return await postApiMydb({ path, token, body });
  },
  async setPassword({ path, token, body }) {
    return await postApiMydb({ path, token, body });
  },
};
