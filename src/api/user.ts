import {SigninFormType} from "@/types"

const apiUrl = "https://webdev-music-003b5b991590.herokuapp.com/user/";

export  async function fetchUser({email, password}: SigninFormType) {
  const response = await fetch (apiUrl + "login/",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
  if (response.status === 400) {
    throw new Error ("Неверный пароль или логин");
  } else if (!response.ok) {
    throw new Error ("Заполните поля");
  }
  const responseData = await response.json();
  return responseData.data; 

}

export  async function fetchToken({email, password}: SigninFormType) {
  const response = await fetch (apiUrl + "token/",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
  if (response.status === 400) {
    throw new Error ("Неверный пароль или логин");
  } else if (!response.ok) {
    throw new Error ("Заполните поля");
  }
  const responseData = await response.json();
  return responseData; 
}