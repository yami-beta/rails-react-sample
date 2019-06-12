const path = require("path");

module.exports = (env, argv) => {
  // webpack --mode {モード}
  // で渡された値を取得
  const mode = argv.mode || "development";

  return {
    mode,
    entry: {
      index: [path.join(__dirname, "frontend", "src", "index.ts")]
    },
    output: {
      // webpack でコンパイルしたコードを Asset Pipeline に渡す
      path: path.join(__dirname, "frontend", "dist"),
      filename: "[name].js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: ["ts-loader"],
          exclude: /node_modules/
        }
      ]
    },
    // --mode development 時はデフォルトで `devtool: "eval"` になる(https://webpack.js.org/configuration/mode/#mode-development)
    // TypeScript のコンパイル済みコードへの sourcemap になってしまい見にくいので "source-map" を指定
    devtool: mode === "development" ? "source-map" : false
  };
};
