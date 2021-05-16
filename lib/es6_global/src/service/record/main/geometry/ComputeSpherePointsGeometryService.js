

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";

function compute(radius, bands) {
  var vertices = /* array */[];
  var normals = /* array */[];
  var texCoords = /* array */[];
  var indices = /* array */[];
  for(var latNumber = 0; latNumber <= bands; ++latNumber){
    var theta = latNumber * Math.PI / bands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    for(var longNumber = 0; longNumber <= bands; ++longNumber){
      var phi = longNumber * 2 * Math.PI / bands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = radius * cosPhi * sinTheta;
      var y = radius * cosTheta;
      var z = radius * sinPhi * sinTheta;
      var u = 1 - longNumber / bands;
      var v = 1 - latNumber / bands;
      ArrayService$Wonderjs.push(z, ArrayService$Wonderjs.push(y, ArrayService$Wonderjs.push(x, vertices)));
      ArrayService$Wonderjs.push(z, ArrayService$Wonderjs.push(y, ArrayService$Wonderjs.push(x, normals)));
      ArrayService$Wonderjs.push(v, ArrayService$Wonderjs.push(u, texCoords));
    }
  }
  for(var latNumber$1 = 0 ,latNumber_finish = bands - 1 | 0; latNumber$1 <= latNumber_finish; ++latNumber$1){
    for(var longNumber$1 = 0 ,longNumber_finish = bands - 1 | 0; longNumber$1 <= longNumber_finish; ++longNumber$1){
      var first = Caml_int32.imul(latNumber$1, bands + 1 | 0) + longNumber$1 | 0;
      var second = (first + bands | 0) + 1 | 0;
      ArrayService$Wonderjs.push(second, ArrayService$Wonderjs.push(second + 1 | 0, ArrayService$Wonderjs.push(first + 1 | 0, ArrayService$Wonderjs.push(first, ArrayService$Wonderjs.push(second, ArrayService$Wonderjs.push(first + 1 | 0, indices))))));
    }
  }
  return /* tuple */[
          vertices,
          texCoords,
          normals,
          indices
        ];
}

export {
  compute ,
  
}
/* ArrayService-Wonderjs Not a pure module */
