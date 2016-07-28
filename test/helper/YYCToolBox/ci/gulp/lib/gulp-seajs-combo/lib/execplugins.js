var through = require( 'through2' ),
    gs = require( 'glob-stream' ),
    gfs = require( 'graceful-fs' ),
    vinylFile = require( 'vinyl' ),
    stripBom = require( 'strip-bom' );

var bufferFile = function( file, callback ){
    gfs.readFile( file.path, function (err, data) {
        if( err ){
            return callback( err );
        }
        file.contents = stripBom( data );
        callback( null, file );
    });
};

var getContents = function(){
    return through.obj(function( file, enc, callback ){
        return bufferFile( file, callback );
    });
};

var fetchStats = function( file, enc, callback ){
    gfs.lstat( file.path, function (err, stat){
        if( stat ){
            file.stat = stat;
        }

        callback( err, file );
    });
};

var getStats = function(){
    return through.obj( fetchStats );
};

var createFile = function(){
    return through.obj(function( file, enc, callback ){
        callback( null, new vinylFile(file) );
    });
};

var execPlugins = function( path, plugins ){
    var pass = through.obj(),
        outputStream, globStream;

    globStream = gs.create( path, {
        read : true,
        buffer : true
    });

    outputStream = globStream
        .pipe( createFile() )
        .pipe( getStats() )
        .pipe( getContents() );

    plugins.forEach(function( item ){
        if( item.param ){
            outputStream = outputStream.pipe( item.plugin.apply(null, item.param) );
        }
        else{
            outputStream = outputStream.pipe( item.plugin() );
        }
    });

    return outputStream.pipe( pass );
};

module.exports = execPlugins;
