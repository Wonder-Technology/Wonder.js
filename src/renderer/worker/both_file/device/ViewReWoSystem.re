open Gl;

let getContext = (canvas, options: MessageDataType.contextConfigJsObj) =>
  getWebgl1Context(canvas, options);