import React, { useRef, useState } from 'react';
import { fetch } from '@/request';
import ErrorBoundary from '@/components/ErrorBoundary';
import Error from '@/components/Error';
import singleton from '@/hocComs/singleton';

import SignatureCanvas from 'react-signature-canvas';

import STYLES from './index.module.less';

const TestCom = () => {
  return <div>TestCom</div>;
};

export default function ExamplePage(props) {
  const signRef = useRef(null);
  const [imageData, setImageData] = useState('');

  const canvasToImg = () => {
    if (signRef.current) {
      const base64Url = signRef.current.toDataURL();
      setImageData(base64Url);
    }
  };

  return (
    <ErrorBoundary>
      <div className={STYLES.wrap}>
        <div className={STYLES.box}>
          <div className={STYLES.left}>
            <div className={STYLES.active}></div>
          </div>
          <div className={STYLES.search}></div>
          <div className={STYLES.right}></div>
        </div>
        <SignatureCanvas
          ref={signRef}
          penColor="black"
          canvasProps={{ style: { border: '1px solid black', background: '#fff' }, width: 500, height: 200, className: 'sigCanvas' }}
        />
        <img src={imageData} alt="" />
        <button onClick={canvasToImg}>ToImage</button>
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
