import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  AdminPage,  
  LoginPage,
  MahasiswaPage,
  ForgotPasswordPage,  
  ResetPassword,
  ForgotPasswordResult,
  EmailAuthResult,
  RekapDocuments,
  ForbiddenPage,
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/rekap/:month/:year" element={<RekapDocuments />} />
        <Route path="/mahasiswa" element={<MahasiswaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />        
        <Route path="/forgot-password/auth/:result" element={<EmailAuthResult />} />
        <Route path="/reset-password/:email/token/:resetToken" element={<ResetPassword />} />
        <Route
          path="/forgot-password-result/:email/result/:result"
          element={<ForgotPasswordResult />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
