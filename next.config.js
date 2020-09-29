// next.config.js
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const localeSubpaths = {};

// const cssLoaderGetLocalIdent = require("css-loader/lib/getLocalIdent.js");
module.exports = withBundleAnalyzer(
  withImages(
    withCSS(
      withLess({
        compress: true,
        publicRuntimeConfig: {
          localeSubpaths
        },
        lessLoaderOptions: {
          javascriptEnabled: true
        },
        cssModules: true,
        cssLoaderOptions: {
          mportLoaders: 1,
          localIdentName: '[local]__[hash:base64:5]'
          // ,
          // getLocalIdent: (context, localIdentName, localName, options) => {
          //   const hz = context.resourcePath.replace(context.rootContext, '');
          //   if (/node_modules/.test(hz)) {
          //     return localName;
          //   }
          //   return cssLoaderGetLocalIdent(context, localIdentName, localName, options);
          // },
        },
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
          // console.log('---config.externals--', config.module.rules, '----isServer----', isServer, '----optimization---', JSON.stringify(config.optimization));
          if (!dev && !isServer) {
            config.externals = [{ swiper: 'Swiper' }].concat(config.externals || []);
            config.optimization.minimizer = config.optimization.minimizer || [];
            config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
          }
          // console.log('---after config.externals--', config.externals);
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
);
