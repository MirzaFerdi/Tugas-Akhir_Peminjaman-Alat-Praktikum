import { ArrowLeft } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { resetPasswordValidation } from "../../utils/validations";
import { useNavigate, useParams } from "react-router-dom";
import { FormField } from "../../components";
import { useFetchOnClick } from "../../hooks/useFetchOnClick";
import { useCallback } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { email, resetToken } = useParams();

  const initialValues = {
    email: email,
    token: resetToken,
    password: "",
    confPassword: "",
  };

  const { fetchData: resetPassword } = useFetchOnClick();

  const handleResetPasswordSuccessResponse = useCallback(
    (resetPasswordSuccessResponse) => {
      if (resetPasswordSuccessResponse?.success === true) {
        navigate(`/forgot-password-result/${email}/result/${resetPasswordSuccessResponse?.success}`);
      }
    },
    [email, navigate]
  );

  const handleResetPasswordErrorResponse = useCallback((resetPasswordErrorResponse) => {
    if (resetPasswordErrorResponse?.success === false) {
      navigate(`/forgot-password-result/${email}/result/${resetPasswordErrorResponse?.success}`);
    }
  }, [email, navigate]);

  const handleResetPassword = (values) => {
    resetPassword({
      url: "/reset-password",
      method: "POST",
      body: {
        email: values?.email,
        token: values?.token,
        password: values?.password,
        password_confirmation: values?.confPassword,
      },
      onSuccess: handleResetPasswordSuccessResponse,
      onError: handleResetPasswordErrorResponse,
    });
  };

  return (
    <div className="relative w-screen h-screen bg-slate-100 bg-forgot-password bg-no-repeat bg-cover">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[30%] bg-[#ffffff32] backdrop-blur-sm rounded-md px-6 lg:px-8 py-4 lg:py-12 shadow-md">
        <a
          href="/login"
          className="flex justify-end items-center text-xs underline mb-8 text-blue-600 hover:text-blue-700 transition-colors duration-150">
          <ArrowLeft />
          <span>Kembali ke halaman login</span>
        </a>

        <div className="mb-7">
          <h1 className="text-center text-2xl font-bold tracking-wider leading-none">PENGIRIMAN FORMULIR</h1>
          <h2 className="text-center font-bold tracking-wider text-2xl">RESET PASSWORD</h2>
        </div>
        <div className="mb-6">
          <Formik initialValues={initialValues} validate={resetPasswordValidation} onSubmit={handleResetPassword}>
            {({ isValid }) => (
              <Form>
                <div className="mb-4">
                  <FormField formName="password" formType="password" labelText="Password Baru" />
                </div>
                <div className="mb-5">
                  <FormField formName="confPassword" formType="password" labelText="Konfirmasi Password Baru" />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="w-1/2 py-3 px-5 disabled:bg-zinc-400 bg-main hover:bg-main-hover transition-colors duration-150 rounded-sm leading-none text-sm tracking-wide font-medium text-white">
                    Reset Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="relative pb-4">
          <div className="absolute w-1/4 h-[0.08rem] bg-zinc-400 left-1/2 -translate-x-1/2" />
        </div>
        <p className="text-xs text-center italic text-zinc-700 mb-5">
          {`" Tetaplah teguh, jangan tergoda untuk reset. Kenanglah sandi, kunci akses dunia digitalmu dengan mantap dan pasti. "`}
        </p>
        <p className="text-xs text-center text-zinc-700">Note By : </p>
        <p className="text-sm text-center italic text-zinc-700">Mirza dan Rafly</p>
      </div>
      <p className="text-xs text-center italic text-zinc-600 absolute bottom-5 left-1/2 -translate-x-1/2">
        Copyrights&copy; & All Rights Reserved By Polinema PSDKU Lumajang 2024.
      </p>
    </div>
  );
};

export default ResetPassword;
