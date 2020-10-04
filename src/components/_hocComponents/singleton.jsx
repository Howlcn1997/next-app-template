import React, { useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

let _instance = null;
let _dom = null;

/**
 * 需待优化，需要支持不同组件类型。。。
 * @param {ReactElement} ReactElementInstance 
 * @param {DOM} rootNode 
 */
const singleton = (ReactElementInstance, rootNode = null) => {
  useEffect(() => {
    if (!_dom) {
      console.log('create dom');
      _dom = rootNode || document.createElement('div');
      document.body.appendChild(_dom);
    }

    console.log('render dom');
    render((_instance = ReactElementInstance), _dom);

    if (_dom && !singleton.hasOwnProperty('destroy')) {
      console.log('bind destroy');
      singleton.destroy = () => {
        unmountComponentAtNode(_dom);
      };
    }

    return () => {
      console.log('unmountComponentAtNode');
      _instance = null;
      _dom = null;
    };
  }, []);

  return _instance;
};

export default singleton;
