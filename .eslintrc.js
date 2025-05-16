module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"]
      }
    ]
  }
};
