open Dom;

open StateDataType;

open GlType;

external getWebgl1Context : htmlElement => _ [@bs.as "webgl"] => options => webgl1Context =
  "getContext" [@@bs.send];