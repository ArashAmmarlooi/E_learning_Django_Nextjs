// module.export = withSass({
//     cssModules :true,
//     cssLoaderOptions: {
//         importLoaders: 1,
//         localIdentName: "[name]__[local]___[hash:base64:5]"
//     },
//     webpack: (config, options) => {
//         config.module.rules.map(rule => {
//             if (
//                 rule.test.source.includes("scss") ||
//                 rule.test.source.includes("sass")
//             ) {
//                 rule.use.push(resourcesLoader);
//             }
//         });
//         return config;
//     }
// })/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  images: {
    domains: ["localhost"],
    // formats: ["image/webp"],

    // path: "/_next/image",
    loader: "default",
    // disableStaticImages: false,
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // webpack(config) {
  //   config.resolve.alias.pages = path.join(__dirname, 'pages');
  //   config.resolve.alias.components = path.join(__dirname, 'components');
  //   config.resolve.alias.lib = path.join(__dirname, 'lib');
  //   config.resolve.alias.styles = path.join(__dirname, 'styles');
  //   return config;
  // },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});
