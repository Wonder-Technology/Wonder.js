open DeviceManagerType;

let create = () => {
  gl: None,
  side: None,
  depthTest: None,
  scissorTest: None,
  depthWrite: None,
  colorWrite: None,
  clearColor: None,
  viewport: None,
  scissor: None,
};

let deepCopyForRestore =
    (
      {
        depthWrite,
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
  depthWrite,
  colorWrite,
  clearColor,
  side,
  depthTest,
  scissorTest,
  viewport,
  scissor,
};