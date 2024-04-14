const koa = require( 'koa' );
const serve = require( 'koa-static' );
const http = require( 'http' );
const app = new koa();
const httpPort = process.env.PORT || 6222;

app.use( serve( __dirname + '/build', {
    maxage: 365 * 24 * 60 * 60
} ) );

http.createServer( app.callback() ).listen( httpPort, () => console.log( `server is listening on ${httpPort}` ) );