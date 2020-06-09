import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme/theme";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <>
        <Html lang="en">
          <Head>
            <meta name="theme-color" content={theme.palette} />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
        <style jsx global>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: linear-gradient(to right, #757f9a, #d7dde8);
          }
        `}</style>
      </>
    );
  }
}

export default MyDocument;
