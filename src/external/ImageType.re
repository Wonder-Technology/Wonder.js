type error;

type image = {
  .
  "width": int,
  "height": int,
  "src": string,
  "onload": unit => unit,
  "onerror": error => unit,
};


external imageToDomExtendImageElement : image => WonderWebgl.DomExtendType.imageElement = "%identity";