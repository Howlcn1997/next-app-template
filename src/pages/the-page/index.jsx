import React from 'react';
import { Affix, Button } from 'antd';
import request from '@/request';
import STYLES from './index.module.less';

export default function TestPage(props) {
  return (
    <div
      className={STYLES.wrap}
      // onClick={() => {
      //   request.get('/font/font-category/web-most-category-list/', { site_type: 'web' }).then(res => console.log(res));
      // }}
    >
      <Affix>
        <nav className={STYLES.nav}>nav</nav>
      </Affix>
      <div style={{ height: '1200px' }}>
        <Button type="primary">xxxxx</Button>
      </div>
    </div>
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
