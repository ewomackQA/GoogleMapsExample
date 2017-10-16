module.exports = {
  // Identify the entry file
  entry: './scripts/main.js',
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Set up the webpack-dev-server for use
  devServer: {
    inline: true,   // Auto-refresh page on the fly
    port: 8080      // Arbitrarily chosen for demo
  },
  module: {
    loaders: [
      {
        // All files that end with '.js'
        test: /\.jsx?$/,
        // Do not include files in the node_modules folder
        exclude: /node_modules/,
        // Use babel as the loader
        loader: 'babel-loader',
        // Pass arguments and queries to the loader
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
