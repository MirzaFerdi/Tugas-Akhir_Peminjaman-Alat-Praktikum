import { useCallback } from "react";
import { loginThumbnailImage, waveImage, waveImage2 } from "../../assets";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { FormField } from "../../components";
import { loginFormValidation } from "../../utils/validations";
import { useFetchOnClick } from "../../hooks/useFetchOnClick";
import { useAlert } from "../../hooks/useAlert";

const LoginPage = () => {
  const navigate = useNavigate();

  const { openAlertComponent } = useAlert();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSuccessLogin = useCallback(
    (loginSuccessResponse) => {
      localStorage.setItem(
        "user_payloads",
        JSON.stringify({
          token: loginSuccessResponse?.token,
          userId: loginSuccessResponse?.user?.id,
        })
      );

      if (loginSuccessResponse?.user?.role?.id === 1) {
        navigate("/admin");
      }

      if (loginSuccessResponse?.user?.role?.id === 2) {
        navigate("/mahasiswa");
      }
    },
    [navigate]
  );

  const handleErrorLogin = useCallback(
    (loginErrorResponse) => {
      openAlertComponent({
        alertType: "error",
        alertTitle: "ERROR!",
        alertMessage: loginErrorResponse?.error,
      });
    },
    [openAlertComponent]
  );

  const handleSubmit = (values) => {
    fetchLogin({
      url: "/login",
      method: "POST",
      body: values,
      onError: handleErrorLogin,
      onSuccess: handleSuccessLogin,
    });
  };

  const { fetchData: fetchLogin } = useFetchOnClick();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] lg:w-[80%] shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="hidden lg:block col-span-3">
          <img src={loginThumbnailImage} alt="Login Thumbnail Image" className="h-full" />
        </div>
        <div className="col-span-2 p-8 shadow-lg mx-4 my-5 lg:m-5 lg:mx-14 lg:my-8 rounded-lg relative">
          <img src={waveImage2} alt="Wave Top Image" className="absolute w-1/2 top-0 left-0 h-1/4 rounded-tl-lg" />
          <h1 className="text-4xl tracking-wider font-extrabold text-center mb-10">LOGIN</h1>
          <div className="mb-8">
            <Formik initialValues={initialValues} validate={loginFormValidation} onSubmit={handleSubmit}>
              {({ isValid }) => (
                <Form>
                  <div className="mb-4 bg-white">
                    <FormField formType="text" formName="username" labelText="NIP/NIM" />
                  </div>
                  <div className="mb-6 bg-white">
                    <FormField formType="password" formName="password" labelText="Password" />
                  </div>
                  <div className="mb-8 flex justify-end">
                    <a href="/forgot-password" className="text-blue-600 text-sm tracking-wide underline">
                      Lupa password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    disabled={isValid ? false : true}
                    className={`${
                      isValid ? "bg-[#3F72AF] hover:bg-[#39628f]" : "bg-zinc-500"
                    } tracking-wider py-3 px-5 transition-colors duration-150 text-white rounded-md leading-none w-full`}>
                    LOGIN
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <p className="text-xs lg:text-sm text-center tracking-wider text-gray-600 mb-24 leading-snug">
            Selamat datang di Aplikasi Peminjaman Alat dan Bahan Praktikum Bengkel Teknologi Rekayasa Otomotif.
          </p>

          <img
            src={waveImage}
            alt="Wave Bottom Image"
            className="absolute w-full left-0 bottom-0 h-1/4 rounded-b-lg z-[2]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
