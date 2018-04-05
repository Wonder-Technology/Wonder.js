open DeviceManagerType;

let create = () => {gl: None, side: None, colorWrite: None, clearColor: None, viewport: None};

let deepCopyForRestore = ({colorWrite, clearColor, side, viewport}) => {
  gl: None,
  colorWrite,
  clearColor,
  side,
  viewport
};