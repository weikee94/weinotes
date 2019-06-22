const path = require("path"); // 用来找path

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: "file-loader"
        }
      }
    ]
  },
  output: {
    filename: "bundle.js", //dest file name
    path: path.resolve(__dirname, "dist") //dest folder name
  }
};
