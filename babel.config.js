module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];

  const plugins = [
    "@babel/plugin-transform-class-properties",
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
        assumptions: {
          setPublicClassFields: true,
          privateFieldsAsSymbols: true,
        },
      },
    ],
    process.env.NODE_ENV === "development" && "react-refresh/babel",
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
