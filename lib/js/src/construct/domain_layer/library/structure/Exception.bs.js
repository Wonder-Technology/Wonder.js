'use strict';


var throwErr = ((err) => {
    throw err;
});

var buildErr = ((message) => {
return new Error(message);
});

exports.throwErr = throwErr;
exports.buildErr = buildErr;
/* No side effect */
