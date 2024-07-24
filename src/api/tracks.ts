// import { title } from "process";
// const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE";

const apiUrl = "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/";
const apiUrPlaylist =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/";

export async function getTracks() {
  const response = await fetch(apiUrl + "all/");

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();

  return data.data;
}
//Функция для получения избранных треков
export async function fetchFavoritesTracks(access: string) {
  const response = await fetch(apiUrl + "favorite/all/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();

  return data.data;
}

export async function getPlaylistTracks(id: string) {
  const response = await fetch(apiUrPlaylist + id);

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return { items: data.items, title: data.name };
}

// // Обратите внимание, что функция компонента также является асинхронной
// export default async function HomePage() {
//   const data = await getData();

//   return <main>/* Некий контент */</main>;
// }

//Поставить лайк
export async function setLike(token: string, id: number) {
  const response = await fetch(apiUrl + id + `/favorite/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data;
}

//Убрать лайк
export async function setDislike(token: string, id: number) {
  const response = await fetch(apiUrl + id + `/favorite/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data;
}
