module.exports = {
  configureWebpack: {
    // plugins: [
    //   new MyAwesomeWebpackPlugin()
    // ]
    externals:{
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex':'Vuex',
      'axios':'axios',
      'moment':'moment'
    }
  }
}