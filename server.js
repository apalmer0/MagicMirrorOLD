const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));
} else {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: '/',
    stats: { colors: true },
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });

  const server = app.listen(8080, () => {
    const host = server.address().address;
    const { port } = server.address();

    console.log('Gnareact is listening at http://%s:%s', host, port);
  });
}
