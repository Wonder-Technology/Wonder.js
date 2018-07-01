open StateDataMainType;

let isBasicSourceTexture = (texture, state) =>
  texture
  < IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
      state,
    );

let isArrayBufferViewSourceTexture = (texture, state) =>
  texture
  >= IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
       state,
     );