

import * as Most from "most";
import * as Blob$Wonderjs from "../../external/Blob.js";
import * as LoadImageSystem$Wonderjs from "../loader/LoadImageSystem.js";

function buildLoadImageStream(arrayBuffer, mimeType, errorMsg) {
  var blob = Blob$Wonderjs.newBlobFromArrayBuffer(arrayBuffer, mimeType);
  return Most.tap((function (image) {
                return Blob$Wonderjs.revokeObjectURL(blob);
              }), LoadImageSystem$Wonderjs.loadBlobImage(Blob$Wonderjs.createObjectURL(blob), errorMsg));
}

export {
  buildLoadImageStream ,
  
}
/* most Not a pure module */
