open StateDataMainType;

let setFlipY = (gl, flipY, browserRecord) =>
  gl
  |> WonderWebgl.Gl.pixelStorei(
       WonderWebgl.Gl.getUnpackFlipYWebgl(gl),
       flipY,
     );

let clearNeedAddedSourceArr = state => {
  ...state,
  basicSourceTextureRecord:
    Some({
      ...RecordBasicSourceTextureMainService.getRecord(state),
      needAddedSourceArray: [||],
    }),
  arrayBufferViewSourceTextureRecord:
    Some({
      ...RecordArrayBufferViewSourceTextureMainService.getRecord(state),
      needAddedSourceArray: [||],
    }),
};