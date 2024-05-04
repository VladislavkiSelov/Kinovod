import { client } from "../api/tndb";

function addTypeMediaContent(content, type) {
  const newContent = content.map((item) => ({ ...item, type }));

  return newContent;
}

function getParamsFilter(value) {
  const getParams = new URLSearchParams(value);
  const paramsObject = Object.fromEntries(getParams.entries());
  return paramsObject;
}

async function getFavoriteMovieTMDB(movies) {
  const moviePromises = movies.map(async (item) => {
    if (item.type === "movie") {
      const movie = await client.getMovieFavorite(`3/movie/${item.movie_id}?language=ru`);
      movie.type = "movie";
      return movie;
    }

    if (item.type === "serial") {
      const serial = await client.getMovieFavorite(`3/tv/${item.movie_id}?language=ru`);
      serial.type = "serial";
      return serial;
    }
  });

  const data = await Promise.all(moviePromises);
  return data;
}

export { addTypeMediaContent, getParamsFilter, getFavoriteMovieTMDB };
