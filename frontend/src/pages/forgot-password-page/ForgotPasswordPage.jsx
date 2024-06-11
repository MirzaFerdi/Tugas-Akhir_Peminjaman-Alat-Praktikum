import { Form, Formik } from "formik";
import { FormField } from "../../components";
import { ArrowLeft } from "@mui/icons-material";
import { forgotPasswordValidation } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useFetchOnClick } from "../../hooks/useFetchOnClick";
import { useAlert } from "../../hooks/useAlert";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const { fetchData: checkEmail } = useFetchOnClick();
  const { openAlertComponent } = useAlert();

  const handleCheckEmailSuccessResponse = useCallback(
    (checkEmailSuccessResponse) => {
      if (checkEmailSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: checkEmailSuccessResponse?.message,
        });

        setTimeout(() => {          
          navigate(`/forgot-password/auth/${checkEmailSuccessResponse?.success}`);
        }, 2000);
      }
    },
    [navigate, openAlertComponent]
  );

  const handleCheckEmailErrorResponse = useCallback(
    (checkEmailErrorResponse) => {
      if (checkEmailErrorResponse?.success === false) {
        openAlertComponent({
          alertType: "error",
          alertTitle: "ERROR!",
          alertMessage: checkEmailErrorResponse?.message,
        });

        setTimeout(() => {          
          navigate(`/forgot-password/auth/${checkEmailErrorResponse?.success}}`);
        }, 2000);
      }
    },
    [navigate, openAlertComponent]
  );

  const handleCheckEmail = (values) => {
    checkEmail({
      url: "/forgot-password",
      method: "POST",
      body: {
        email: values?.email,
      },
      onSuccess: handleCheckEmailSuccessResponse,
      onError: handleCheckEmailErrorResponse,
    });
  };

  return (
    <div className="relative w-screen h-screen bg-slate-100 bg-forgot-password bg-no-repeat bg-cover">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[30%] bg-[#ffffff32] backdrop-blur-sm rounded-md px-4 lg:px-6 py-4 lg:pt-6 pb-8 shadow-md">
        <a
          href="/login"
          className="flex justify-end items-center text-xs underline mb-8 text-blue-600 hover:text-blue-700 transition-colors duration-150">
          <ArrowLeft />
          <span>Kembali ke halaman login</span>
        </a>

        <div className="mb-7">
          <h1 className="text-center text-2xl font-bold tracking-wider leading-none">PENGIRIMAN FORMULIR</h1>
          <h2 className="text-center font-bold tracking-wider text-2xl">LUPA PASSWORD</h2>
        </div>
        <div className="mb-6">
          <Formik
            initialValues={{
              email: "",
            }}
            validate={forgotPasswordValidation}
            onSubmit={handleCheckEmail}>
            {({ isValid }) => (
              <Form>
                <div className="mb-5">
                  <FormField formName="email" formType="email" labelText="E-Mail" />
                </div>
                <div className="flex justify-center">
                  <button
                    className="w-1/2 text-xs text-white tracking-wide leading-none rounded-md py-3 px-5 disabled:bg-zinc-400 bg-main hover:bg-main-hover"
                    type="submit"
                    disabled={!isValid}>
                    Dapatkan Token
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
          {`" Lupa adalah pelajaran lembut yang mengajarkan kita untuk memaafkan diri sendiri dan orang lain. Dalam setiap kehilangan ingatan, kita menemukan kesempatan untuk membangun kembali hubungan yang lebih kuat dan dewasa. "`}
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

export default ForgotPasswordPage;
