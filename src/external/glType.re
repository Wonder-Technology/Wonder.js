type webgl1Context;

type program;

type shader;

type buffer;

type attributeLocation = int;

type uniformLocation;

type options = {
  .
  "alpha": Js.boolean,
  "depth": Js.boolean,
  "stencil": Js.boolean,
  "antialias": Js.boolean,
  "premultipliedAlpha": Js.boolean,
  "preserveDrawingBuffer": Js.boolean
};