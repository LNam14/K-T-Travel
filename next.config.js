const TerserPlugin = require("terser-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Ensure optimization object exists
        if (!config.optimization) {
            config.optimization = {};
        }

        // Ensure minimizer array exists
        if (!config.optimization.minimizer) {
            config.optimization.minimizer = [];
        }

        // Add TerserPlugin with custom options
        config.optimization.minimizer.push(
            new TerserPlugin({
                terserOptions: {
                    mangle: false, // Example option, customize as needed
                },
                parallel: false, // Limit parallelism to reduce memory usage
            })
        );

        // Disable default minimization
        config.optimization.minimize = false;

        return config;
    },
};

module.exports = nextConfig;
