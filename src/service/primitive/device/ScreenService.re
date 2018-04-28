let queryFullScreenData = () => {
  let root = Root.root;
  (0., 0., root##innerWidth, root##innerHeight, "100%", "100%")
};

let _setAbsolutePosition = (canvas) => {
  canvas##style##position#="absolute";
  canvas
};

let setX = (x, canvas) => {
  canvas##style##left#={j|$(x)px|j};
  canvas
};

let setY = (y, canvas) => {
  canvas##style##top#={j|$(y)px|j};
  canvas
};

let setWidth = (width, canvas) => {
  canvas##width#=width;
  canvas
};

let setHeight = (height, canvas) => {
  canvas##height#=height;
  canvas
};

let setStyleWidth = (width, canvas) => {
  canvas##style##width#=width;
  canvas
};

let setStyleHeight = (height, canvas) => {
  canvas##style##height#=height;
  canvas
};

let _setBodyMargin = (document) =>
  switch (Dom.querySelectorAll(document, "body")) {
  | bodies when Js.Array.length(bodies) === 0 => ()
  | bodies =>
    Dom.setBatchStyle(bodies[0], "margin:0");
    ()
  };

let setToFullScreen = ((x, y, width, height, styleWidth, styleHeight), canvas) => {
  _setBodyMargin(Dom.document);
  canvas
  |> _setAbsolutePosition
  |> setX(x)
  |> setY(y)
  |> setWidth(width)
  |> setHeight(height)
  |> setStyleWidth(styleWidth)
  |> setStyleHeight(styleHeight)
  |> Obj.magic
};