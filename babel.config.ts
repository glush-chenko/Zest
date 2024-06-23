module.exports = {
    presets: [
        ["@babel/preset-env", { "modules": false }],
        "@babel/react",
        // ['@babel/preset-env', {targets: {node: 'current'}}],
        ['@babel/preset-react', {runtime: 'automatic'}],
        '@babel/preset-typescript',
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-modules-commonjs",
        "require-context-hook",
    ],
    "env": {
        "test": {
            "plugins": ["require-context-hook"]
        }
    }
};