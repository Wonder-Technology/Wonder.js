let getContext = (canvas, options) => Gl.getWebgl1Context(canvas, options);

let createGl = (contextConfig: ContextShareType.contextConfigJsObj, canvas) =>
  getContext(canvas, contextConfig);