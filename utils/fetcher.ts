import axios from "axios";

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "602e664841195d1c7624918c";

const fetcher = (url: string) =>
  axios
    .get(`${BASE_URL}${url}`, {
      headers: { "app-id": APP_ID },
    })
    .then((res) => res.data);

export default fetcher;
