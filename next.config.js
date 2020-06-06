const withImages = require("next-images");

const debug = process.env.NODE_ENV !== "production";

module.exports = withImages({
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
    };
  },
  assetPrefix: !debug ? "/reservation" : "",
  webpack(config, options) {
    return config;
  },
});
