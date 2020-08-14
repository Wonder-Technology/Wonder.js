


function newBlobFromArrayBuffer (arrayBuffer,type_){
return new Blob([arrayBuffer], {type: type_})
  };

function createObjectURL (blob){
     return URL.createObjectURL( blob )
    };

function revokeObjectURL (blob){
     URL.revokeObjectURL( blob );
    };

export {
  newBlobFromArrayBuffer ,
  createObjectURL ,
  revokeObjectURL ,
  
}
/* No side effect */
