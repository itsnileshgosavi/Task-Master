import { httpAxios } from "@/helper/httpHelper";

export async function currentUser() {
    const result = await httpAxios
      .get("/api/current-user")
      .then((response) => response.data);
    return result;
  };



  export async function logout() {
    const result = await httpAxios
      .post("/api/logout")
      .then((response) => response.data);
    return result;
  };