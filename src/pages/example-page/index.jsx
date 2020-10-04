import React from 'react';
import { fetch } from '@/request';
import ErrorBoundary from '@/components/ErrorBoundary';
import Error from '@/components/Error';
import singleton from '@/hocComs/singleton';

import STYLES from './index.module.less';

const TestCom = () => {
  return <div>TestCom</div>;
};

export default function ExamplePage(props) {
  console.log('props', props);
  return (
    <ErrorBoundary>
      <div className={STYLES.wrap}>
        <div className={STYLES.box}>
          <div className={STYLES.left}>
            <div className={STYLES.active}></div>
            {singleton(<TestCom></TestCom>)}
            {singleton(<TestCom></TestCom>)}
          </div>
          <div className={STYLES.search}></div>
          <div className={STYLES.right}></div>
        </div>
        <Error></Error>
        <button
          onClick={() => {
            singleton.destroy();
          }}>
          destroy
        </button>
      </div>
    </ErrorBoundary>
  );
}

// ExamplePage.getInitialProps = async context => {
//   const { req, res } = context;
//   const json = await fetch('https://api.github.com/repos/vercel/next.js', { method: 'GET' });
//   const data = await json.json();
//   return { data: data };
// };
