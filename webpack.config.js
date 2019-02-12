var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // main root file of our application:
    entry: './app/Badge.js',
    /**
      * when webpack creates the single file for our app, it's going to output our code
      * - in the root of our project (`__dirname`)
      * - under the `dist` directory that it will create
      * - in the file that it will create with the name `index_bundle.js`
      */
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    /**
      * and we tell webpack what transformations to perform on our different file types
      * before it rolls them all up into one.
      */
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' }, // any js file/module is run through `babel-loader`
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    // and then tell webpack which mode to run in
    mode: 'development',
    /**
      * finally, since we're going to use an `index.html` file found under the `dist`
      * directory that webpack is going to create for us, we need to tell it how to do it,
      * which template to use. that's what `HtmlWebpackPlugin` will do for us.
      */
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}