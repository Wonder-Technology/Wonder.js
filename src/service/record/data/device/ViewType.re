type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type viewRecord = {
  canvas: option(DomType.htmlElement),
  contextConfig: option(contextConfig)
};