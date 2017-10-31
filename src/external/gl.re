open Dom;

open GlType;

[@bs.send]
external getWebgl1Context : (htmlElement, [@bs.as "webgl"] _, options) => webgl1Context =
  "getContext";
