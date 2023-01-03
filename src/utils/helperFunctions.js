import cookie from "react-cookies";

export function setToken(token) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  cookie.save("token", token, { path: "/", expires });
}

export function Token() {
  let token = cookie.load("token");
  if (token === "undefined") {
    return undefined;
  } else {
    return token;
  }
}

export function removeToken() {
  cookie.remove("token", { path: "/" });
  cookie.remove("refresh");
}
