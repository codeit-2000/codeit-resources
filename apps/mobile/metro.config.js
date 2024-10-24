const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  // Find the project and workspace directories
  // eslint-disable-next-line no-undef
  const projectRoot = __dirname;
  // This can be replaced with `find-yarn-workspace-root`
  const monorepoRoot = path.resolve(projectRoot, "../..");

  const config = getDefaultConfig(projectRoot);

  // 1. Watch all files within the monorepo
  config.watchFolders = [monorepoRoot];
  // 2. Let Metro know where to resolve packages and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
  ];

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
