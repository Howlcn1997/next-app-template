import React from 'react';
import { Affix, Button } from 'antd';
import STYLES from './index.less';

export default function Home() {
  return (
    <div className={STYLES.wrap}>
      <Affix>
        <nav className={STYLES.nav}>nav</nav>
      </Affix>
      <div className={STYLES.container}>
        <Button type="primary">xxxxx</Button>
      </div>
    </div>
  );
}
