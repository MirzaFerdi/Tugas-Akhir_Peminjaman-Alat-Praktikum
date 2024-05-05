import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPage, ForgotPasswordPage, HomePage, LoginPage, MahasiswaPage } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mahasiswa" element={<MahasiswaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="/forgot-password/auth/:email" element={<EmailAuth />} />
        <Route path="/forgot-password/auth/:email/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/forgot-password/auth/:email/reset-password/:token/success/:success"
          element={<ResetPasswordDetail />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
