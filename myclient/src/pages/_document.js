// import { tree } from "next/dist/build/templates/app-page";
import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/footer"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
        <Footer></Footer>
      </body>
    </Html>
  );
}
