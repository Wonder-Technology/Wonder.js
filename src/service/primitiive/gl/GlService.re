let getContext = (canvas, options) => Gl.getWebgl1Context(canvas, options);

let createGl = (contextConfig: ContextType.contextConfigJsObj, canvas) =>
  getContext(canvas, contextConfig);