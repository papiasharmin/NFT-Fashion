const webpack = require('webpack'); 
const path = require("path");

module.exports = function override(webpackConfig) {
    webpackConfig.module.rules.push({
        test: /.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
    });

    const fallback = webpackConfig.resolve.fallback || {}; 

    Object.assign(fallback, { 
        "crypto": require.resolve("crypto-browserify"), 
        "stream": require.resolve("stream-browserify"), 
        "assert": require.resolve("assert"), 
        "http": require.resolve("stream-http"), 
        "https": require.resolve("https-browserify"), 
        "os": require.resolve("os-browserify"), 
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib") 


    }) 

    webpackConfig.resolve.fallback = fallback; 
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([ 
        new webpack.ProvidePlugin({ 
            process: 'process/browser', 
            Buffer: ['buffer', 'Buffer'] 
        }) 
    ]);
    webpackConfig.ignoreWarnings = [/Failed to parse source map/];
    webpackConfig.module.rules.push({
    loader: require.resolve("source-map-loader"),
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    resolve: {
        alias: {
            "magic-sdk": path.resolve(
              __dirname,
              "node_modules/magic-sdk/dist/cjs/index.js"
            ),
            
          },
 
      fullySpecified: false,
 
    },
  });
 
    return webpackConfig;
};