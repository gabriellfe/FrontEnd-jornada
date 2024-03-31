const proxy = [
    {
      context: ['/api'],
      target: 'http://localhost:80',
      pathRewrite: {'^/api' : ''},
      secure: false,
      changeOrigin:true
    }
  ];
  module.exports = proxy;
  