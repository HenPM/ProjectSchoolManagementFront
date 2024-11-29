const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true, // Isso permite que o Vue Router funcione corretamente
  },
  devServer: {
    proxy: 'http://localhost:8888',
  },
});

