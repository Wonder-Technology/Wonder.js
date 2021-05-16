

import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";

function getAllSources(texture, param) {
  var match = TextureSourceMapService$Wonderjs.getSource(texture, param[0]);
  var match$1 = TextureSourceMapService$Wonderjs.getSource(texture, param[1]);
  var match$2 = TextureSourceMapService$Wonderjs.getSource(texture, param[2]);
  var match$3 = TextureSourceMapService$Wonderjs.getSource(texture, param[3]);
  var match$4 = TextureSourceMapService$Wonderjs.getSource(texture, param[4]);
  var match$5 = TextureSourceMapService$Wonderjs.getSource(texture, param[5]);
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined && match$3 !== undefined && match$4 !== undefined && match$5 !== undefined) {
    return /* tuple */[
            Caml_option.valFromOption(match),
            Caml_option.valFromOption(match$1),
            Caml_option.valFromOption(match$2),
            Caml_option.valFromOption(match$3),
            Caml_option.valFromOption(match$4),
            Caml_option.valFromOption(match$5)
          ];
  }
  
}

export {
  getAllSources ,
  
}
/* No side effect */
