const TerserPlugin = require("terser-webpack-plugin")

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Remove TerserPlugin if not needed for minification
        if (!config.optimization) {
            config.optimization = {}
        }
        if (!config.optimization.minimizer) {
            config.optimization.minimizer = []
        }

        // Add TerserPlugin with optimized options
        config.optimization.minimizer.push(
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                },
                // Limit parallelism to reduce memory usage
                parallel: false,
            })
        )

        config.optimization.minimize = false

        return config
    },
}
module.exports = nextConfig
