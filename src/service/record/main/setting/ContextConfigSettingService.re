open SettingType;

let convertContextConfigDataToJsObj =
    (
      {
        alpha,
        depth,
        stencil,
        antialias,
        premultipliedAlpha,
        preserveDrawingBuffer,
      },
    ) => {
  "alpha": alpha,
  "depth": depth,
  "stencil": stencil,
  "antialias": antialias,
  "premultipliedAlpha": premultipliedAlpha,
  "preserveDrawingBuffer": preserveDrawingBuffer,
};