import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { FloatingShape } from "./components/floating-shape";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { type ReactNode } from "react";
import "./index.css";
import { LogInPage } from "./pages/log-in-page.tsx";
import { SignUpPage } from "./pages/sign-up-page.tsx";
import { EmailVerify } from "./pages/email-verify-page.tsx";
import { useAuthStore } from "./auth/authStore";
import { Loader } from "lucide-react";
import { Home } from "./pages/home.tsx";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user && !user.isVerified) {
    return <Navigate to="/otpverify" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // if(isCheckingAuth){
  //   return <div>loading .....</div>
  // }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-sky-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape
          color="bg-blue-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-sky-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-indigo-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />
        <Routes>
          <Route
            path="/"
            element={
              isCheckingAuth ? <Loader className="animate-spin" size={48}/>:
              <ProtectRoute>
                {/* <p>this is my home </p> */}
                <Home/>
              </ProtectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LogInPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/otpverify"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerify />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;