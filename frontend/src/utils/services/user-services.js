import { api } from "../api";

export const currentUser = async () => {
  const { userId } = await JSON.parse(localStorage.getItem("user_payloads"));

  try {
    const users = await api.get(`/user/${userId}`);

    return users?.data;
  } catch (error) {
    console.log(error);
  }
}