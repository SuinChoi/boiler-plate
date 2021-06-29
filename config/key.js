if(process.nextTick.NODE_ENX === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}