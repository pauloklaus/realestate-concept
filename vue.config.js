module.exports = {
    productionSourceMap: false,
    publicPath: process.env.BASE_URL,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_NAME
                return args
            })
    },
    devServer: {
        disableHostCheck: true
    }
}
