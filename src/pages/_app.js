import '../styles/globals.css';
import { withRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps, router, err }) {
  // 此处做全局的header设置
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {err ? 'Something was wrong' : <Component {...pageProps} _router={router} />}
    </>
  );
}

export default withRouter(MyApp);
