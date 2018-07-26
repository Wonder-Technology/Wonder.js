


var newBlobFromArrayBuffer = function (arrayBuffer,type_){
return new Blob([arrayBuffer], {type: type_})
  };

var createObjectURL = function (blob){
     return URL.createObjectURL( blob )
    };

var revokeObjectURL = function (blob){
     URL.revokeObjectURL( blob );
    };

export {
  newBlobFromArrayBuffer ,
  createObjectURL ,
  revokeObjectURL ,
  
}
/* No side effect */
