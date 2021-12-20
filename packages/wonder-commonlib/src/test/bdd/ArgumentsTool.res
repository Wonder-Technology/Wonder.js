let getArgumentsArr = %raw("
function(args){
return Array.prototype.slice.call(args);
}
")
