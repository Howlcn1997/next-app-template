// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const path = require('path');
export default (req, res) => {
  console.log('--req--', req.query, req.url);
  const requirePath = path.join(__dirname, req.url.split("?")[0].replace(/^\/api\/?/, ''));
  const result = require(requirePath);
  console.log('JSON', result);
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
