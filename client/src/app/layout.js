import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./Context/UserContext";
import { Toaster } from "react-hot-toast";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management",
  description: "Manage Your Tasks Efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </head>
    <body className={inter.className}>
      <UserProvider>
        <Toaster position="top-center" />
        {children}
      </UserProvider>
    </body>
  </html>
);
}
