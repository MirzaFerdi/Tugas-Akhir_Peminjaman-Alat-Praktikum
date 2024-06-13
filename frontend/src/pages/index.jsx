import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchOnMount } from "../hooks/useFetchOnMount";

const Home = () => {
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("user_payloads"));

  const { data: getUserData } = useFetchOnMount({
    url: `/user/${users?.userId}`,
    method: "GET",
  });

  useEffect(() => {
    if (!users) {
      return navigate("/login");
    }

    if (getUserData?.role?.id == 1) {
      return navigate("/admin");
    }

    if (getUserData?.role?.id == 2) {
      return navigate("/mahasiswa");
    }
  }, [getUserData?.role?.id, navigate, users]);
};

export default Home;
