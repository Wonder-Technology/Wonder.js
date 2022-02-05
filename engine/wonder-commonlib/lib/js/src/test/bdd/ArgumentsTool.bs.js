'use strict';


var getArgumentsArr = (function(args){
return Array.prototype.slice.call(args);
});

exports.getArgumentsArr = getArgumentsArr;
/* No side effect */
