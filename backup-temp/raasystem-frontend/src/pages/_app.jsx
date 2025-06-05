// src/pages/_app.jsx
import "@/styles/globals.css"; // or your CSS path
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </>
  );
}
