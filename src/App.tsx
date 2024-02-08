import {
  ParentPage,
  LogInPage,
  SignUpPage,
  Error404,
  TeacherDashboard,
  VerifyEmailPage,
  ForgotPasswordPage,
} from "./scripts/ImportRoutes";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./scripts/ImportRoutes";

function App() {
  return (
    <Box position="relative" marginBottom="10rem">
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="*" element={<Error404 />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/verifyEmail" element={<VerifyEmailPage />} />
          <Route path="/parentdashboard" element={<ParentPage />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
