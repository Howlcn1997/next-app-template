import isomorphicFetch from 'isomorphic-fetch';

// 待优化：
//     http长链接配置

// 预置fetch query
const defaultQuery = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const getHost = () => {
  return 'https://api.51ifonts.com';
};

const HOST = getHost();

/**
 * @param {String} url
 * @param {Object} query 请求参数
 * @param {string} responseType json: 处理json数据，text：处理text类型数据（.html）
 */
const _baseRequest = (url, query, responseType = 'json') => {
  return new Promise(function (resolve, reject) {
    isomorphicFetch(url, query)
      .then(async response => {
        if (response.status > 400) {
          throw new Error('Bad response from server');
        } else {
          const _response = await response[responseType]();
          // 处理text类型数据
          if (responseType === 'text') return resolve(_response);

          if (+_response.code !== 1) {
            console.error(_response.msg);
            return reject(_response);
          }
          resolve(_response);
        }
      }, reject)
      .catch(() => {});
  });
};

const request = _baseRequest.bind(null);

// JSON POST
request.post = (url, params = {}, ...rest) => _baseRequest(HOST + url, { ...defaultQuery, body: JSON.stringify(params) }, ...rest);

// JSON GET
request.get = (url, params = {}, ...rest) => {
  const _query = Object.keys(params)
    .map(key => {
      return key + '=' + params[key];
    })
    .join('&');
  return _baseRequest(HOST + url + (_query ? '/?' + _query : ''), { ...defaultQuery, method: 'GET' }, ...rest);
};

// FORM POST
request.form = (url, form, ...rest) => {
  const _data = new FormData(form);
  return _baseRequest(HOST + url, { ...defaultQuery, body: _data }, ...rest);
};
// 使用示例
// var form = document.querySelector('form')
// request.form('/user',form)

// FILE POST
request.file = (url, { file, params = {} }) => {
  const _data = new FormData();
  data.append('file', file);
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  });
  return _baseRequest(HOST + url, { ...defaultQuery, body: _data });
};
// 使用示例
// var input = document.querySelector('input[type="file"]');
// request.file('/user', { file: input.files[0], params: { userName: 'user' } });

export { isomorphicFetch as fetch };
export default request;
