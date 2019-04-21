
let prepare = sandbox => {
  open GLBTool;

  ConvertTool.buildFakeLoadImage(.);
  buildFakeTextDecoder(convertUint8ArrayToBuffer);
  buildFakeTextEncoder(.);
  buildFakeURL(sandbox);
};
