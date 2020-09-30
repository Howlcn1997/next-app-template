import React from 'react';
import { Affix, Button } from 'antd';
import Test from '@/components/Test';
import STYLES from './index.less';

export default function Home() {
  return (
    <div className={STYLES.wrap}>
      <Affix>
        <nav className={STYLES.nav}>nav</nav>
      </Affix>
      <div className={STYLES.container}>
        <Test></Test>
        
        <Button type="primary">xxxxx</Button>
      </div>
    </div>
  );
}
