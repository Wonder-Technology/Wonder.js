open DeviceManagerType;

let create = () => {
  gl: None,
  side: None,
  depthTest: None,
  colorWrite: None,
  clearColor: None,
  viewport: None
};

let deepCopyForRestore = ({colorWrite, clearColor, side, depthTest, viewport}) => {
  gl: None,
  colorWrite,
  clearColor,
  side,
  depthTest,
  viewport
};