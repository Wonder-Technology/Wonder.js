open DeviceManagerType;

let create = () => {
  gl: None,
  side: None,
  depthTest: None,
  scissorTest: None,
  colorWrite: None,
  clearColor: None,
  viewport: None,
  scissor: None,
};

let deepCopyForRestore =
    (
      {
        colorWrite,
        clearColor,
        side,
        depthTest,
        scissorTest,
        viewport,
        scissor,
      },
    ) => {
  gl: None,
  colorWrite,
  clearColor,
  side,
  depthTest,
  scissorTest,
  viewport,
  scissor,
};