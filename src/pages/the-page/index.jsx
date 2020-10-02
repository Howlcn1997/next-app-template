import React from 'react';
import request, { fetch } from '@/request';
import ErrorBoundary from '@/components/ErrorBoundary';
import Error from '@/components/Error';

import STYLES from './index.module.less';

export default function TestPage(props) {
  return (
    <ErrorBoundary>
      <div
        className={STYLES.wrap}
        onClick={() => {
          // request('/font/font-category/web-most-category-list/', { site_type: 'web' }).then(res => console.log(res));
          fetch('https://api.github.com/repos/vercel/next.js', { method: 'GET' })
            .then(res => res.json())
            .then(res => console.log(res));
        }}>
        This is a Testing Page
      </div>
      <Error></Error>
      <div className={STYLES.box}>
        <div className={STYLES.left}>
          <div className={STYLES.active}></div>
        </div>
        <div className={STYLES.search}></div>
        <div className={STYLES.right}></div>
      </div>
    </ErrorBoundary>
  );
}

TestPage.getInitialProps = async ctx => {
  const { req, res } = ctx;
  //   if (req) {
  //     // res.writeHead(302, { Location: path });
  //     console.log(ctx);
  //     res.end();
  //   } else {
  //     console.log('----', ctx);
  //     // 客户端跳转方式
  //     // Router.push(path);
  //   }

  return { userInfo: 1 };
};
