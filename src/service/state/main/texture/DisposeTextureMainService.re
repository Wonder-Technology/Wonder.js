open StateDataMainType;

let disposeBasicSourceTextureGlTextureMap = (texture, state) =>
  BasicSourceTextureType.(
    WorkerDetectMainService.isUseWorker(state) ?
      {
        let {needDisposedTextureIndexArray} as basicSourceTextureRecord =
          RecordBasicSourceTextureMainService.getRecord(state);

        {
          ...state,
          basicSourceTextureRecord:
            Some({
              ...basicSourceTextureRecord,
              needDisposedTextureIndexArray:
                needDisposedTextureIndexArray |> ArrayService.push(texture),
            }),
        };
      } :
      {
        let {glTextureMap} as basicSourceTextureRecord =
          RecordBasicSourceTextureMainService.getRecord(state);

        DisposeTextureService.needDisposeGlTextureMap(texture, glTextureMap) ?
          {
            /* TODO optimize: add gl texture to pool? */
            let gl =
              DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

            {
              ...state,
              basicSourceTextureRecord:
                Some({
                  ...basicSourceTextureRecord,
                  glTextureMap:
                    DisposeTextureService.disposeGlTextureMap(
                      texture,
                      gl,
                      glTextureMap,
                    ),
                }),
            };
          } :
          state;
      }
  );

let disposeArrayBufferViewSourceTextureGlTextureMap = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let (
            {needDisposedTextureIndexArray}: ArrayBufferViewSourceTextureType.arrayBufferViewSourceTextureRecord
          ) as arrayBufferViewSourceTextureRecord =
        RecordArrayBufferViewSourceTextureMainService.getRecord(state);

      {
        ...state,
        arrayBufferViewSourceTextureRecord:
          Some({
            ...arrayBufferViewSourceTextureRecord,
            needDisposedTextureIndexArray:
              needDisposedTextureIndexArray |> ArrayService.push(texture),
          }),
      };
    } :
    {
      let (
            {glTextureMap}: ArrayBufferViewSourceTextureType.arrayBufferViewSourceTextureRecord
          ) as arrayBufferViewSourceTextureRecord =
        RecordArrayBufferViewSourceTextureMainService.getRecord(state);

      DisposeTextureService.needDisposeGlTextureMap(texture, glTextureMap) ?
        {
          /* TODO optimize: add gl texture to pool? */
          let gl =
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

          {
            ...state,
            arrayBufferViewSourceTextureRecord:
              Some({
                ...arrayBufferViewSourceTextureRecord,
                glTextureMap:
                  DisposeTextureService.disposeGlTextureMap(
                    texture,
                    gl,
                    glTextureMap,
                  ),
              }),
          };
        } :
        state;
    };

let disposeNeedAddedSourceArray = (texture, needAddedSourceArray) =>
  needAddedSourceArray
  |> Js.Array.filter(((needAddedSourceTexture, _)) =>
       needAddedSourceTexture !== texture
     );

let disposeNeedInitedSourceArray = (texture, needInitedTextureIndexArray) =>
  needInitedTextureIndexArray
  |> Js.Array.filter(needInitedTexture => needInitedTexture !== texture);

let clearNeedDisposedTextureIndexArray = state => {
  ...state,
  basicSourceTextureRecord:
    Some({
      ...RecordBasicSourceTextureMainService.getRecord(state),
      needDisposedTextureIndexArray: [||],
    }),
  arrayBufferViewSourceTextureRecord:
    Some({
      ...RecordArrayBufferViewSourceTextureMainService.getRecord(state),
      needDisposedTextureIndexArray: [||],
    }),
};

let disposeBindTextureUnitCacheMap = (texture, bindTextureUnitCacheMap) =>
  switch (
    bindTextureUnitCacheMap
    |> WonderCommonlib.MutableSparseMapService.getValidDataArr
    |> Js.Array.filter(((unit, bindedTexture)) => bindedTexture === texture)
  ) {
  | arr when Js.Array.length(arr) > 0 =>
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. bindTextureUnitCacheMap, (unit, texture)) =>
           bindTextureUnitCacheMap
           |> DisposeComponentService.disposeSparseMapData(unit),
         bindTextureUnitCacheMap,
       )
  | _ => bindTextureUnitCacheMap
  };