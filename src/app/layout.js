import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/authProvider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "./loading/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Master",
  description: "Manage your tasks here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
          
            <Suspense fallback={<Loading />}>
              <Header />
              {children}
              <Footer />
            </Suspense>
            <Toaster/>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          
          </AuthProvider>
        
      </body>
    </html>
  );
}
