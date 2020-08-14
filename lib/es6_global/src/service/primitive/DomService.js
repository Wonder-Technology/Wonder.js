

import * as DomExtend$Wonderjs from "../../external/DomExtend.js";

function buildDom(domStr) {
  return DomExtend$Wonderjs.getFirstChild(DomExtend$Wonderjs.setInnerHtml(domStr, document.createElement("div")));
}

function buildCanvas() {
  return document.createElement("canvas");
}

export {
  buildDom ,
  buildCanvas ,
  
}
/* No side effect */
