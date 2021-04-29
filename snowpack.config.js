/** @type {import('snowpack').SnowpackConfig} */
module.exports = {
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' }
    },
    plugins: ['@snowpack/plugin-react-refresh','@snowpack/plugin-typescript','@snowpack/plugin-postcss']
}