// next.config.js
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
// const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['antd']); // pass the modules you would like to see transpiled
const withImages = require('next-images');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent.js');
module.exports = withBundleAnalyzer(
  withTM(
    withImages(
      withCSS(
        withLess({
          compress: true,
          lessLoaderOptions: {
            javascriptEnabled: true
          },
          cssModules: true,
          cssLoaderOptions: {
            mportLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]',
            getLocalIdent: (context, localIdentName, localName, options) => {
              const hz = context.resourcePath.replace(context.rootContext, '');
              // global.css 不参与cssModule
              if (/node_modules/.test(hz) || !/\.module\.*$/.test(hz)) {
                return localName;
              }
              return cssLoaderGetLocalIdent(context, localIdentName, localName, options);
            }
          },
          webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            if (!dev && !isServer) {
              config.externals = [{ swiper: 'Swiper' }].concat(config.externals || []);
              config.optimization.minimizer = config.optimization.minimizer || [];
              config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
            }
            return config;
          },
          exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
            return {
              '/404': { page: '/export/404' },
              '/500': { page: '/export/500' }
            };
          },
          env: {
            ENV: process.env.NODE_ENV
          },
          api: {
            bodyParser: {
              sizeLimit: '1mb'
            }
          }
        })
      )
    )
  )
);
