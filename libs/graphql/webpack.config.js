const { merge } = require('webpack-merge');
const commonConfig = require('../../webpack.lib.config');
const { join } = require('path');

module.exports = merge(commonConfig, {
  output: {
    path: join(__dirname, '../../dist/libs/graphql'),
  },
});
