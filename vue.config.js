const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/home/": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/home/": "/home/",
        },
      },
      "/area/": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/area/": "/area/",
        },
      },
      "/houses": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/houses": "/houses",
        },
      },
      "/user": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/user": "/user",
        },
      },
    },
  },
});
