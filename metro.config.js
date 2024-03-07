/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        module: true,
        ecma: 2017,
        // reduce_funcs inlines single-use functions, which cause perf regressions.
        reduce_funcs: false,
      },
      mangle: {
        module: true,
      },
    },
  },
};
