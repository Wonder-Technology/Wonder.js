open StateDataMainType;

open SourceTextureType;

open ArrayBufferViewSourceTextureType;

let createArrayBufferViewSourceTexture = state =>
  CreateArrayBufferViewSourceTextureMainService.create(. state);

let unsafeGetArrayBufferViewSourceTextureSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.unsafeGetSource(
    texture,
    state,
  );

let setArrayBufferViewSourceTextureSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setSource(
    texture,
    source,
    state,
  );

let getArrayBufferViewSourceTextureWidth =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWidth(texture, state);

let getArrayBufferViewSourceTextureHeight =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getHeight(texture, state);

let getArrayBufferViewSourceTextureWrapS =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWrapS(texture, state)
  |> uint8ToWrap;

let setArrayBufferViewSourceTextureWrapS =
    (texture, wrapS, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setWrapS(
    texture,
    wrapS |> wrapToUint8,
    state,
  );

let getArrayBufferViewSourceTextureWrapT =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWrapT(texture, state)
  |> uint8ToWrap;

let setArrayBufferViewSourceTextureWrapT =
    (texture, wrapT, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setWrapT(
    texture,
    wrapT |> wrapToUint8,
    state,
  );

let getArrayBufferViewSourceTextureMagFilter =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getMagFilter(texture, state)
  |> uint8ToFilter;

let setArrayBufferViewSourceTextureMagFilter =
    (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setMagFilter(
    texture,
    filter |> filterToUint8,
    state,
  );

let getArrayBufferViewSourceTextureMinFilter =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getMinFilter(texture, state)
  |> uint8ToFilter;

let setArrayBufferViewSourceTextureMinFilter =
    (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setMinFilter(
    texture,
    filter |> filterToUint8,
    state,
  );

let getArrayBufferViewSourceTextureFormat =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getFormat(texture, state)
  |> uint8ToFormat;

let setArrayBufferViewSourceTextureFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getArrayBufferViewSourceTextureType =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getType(texture, state);

let setArrayBufferViewSourceTextureType =
    (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setType(
    texture,
    type_,
    state,
  );

let getArrayBufferViewSourceTextureFlipY =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getFlipY(texture, state);

let setArrayBufferViewSourceTextureFlipY =
    (texture, flipY, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setFlipY(
    texture,
    flipY,
    state,
  );

let getArrayBufferViewSourceTextureWidth =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWidth(texture, state);

let setArrayBufferViewSourceTextureWidth =
    (texture, width, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setWidth(
    texture,
    width,
    state,
  );

let getArrayBufferViewSourceTextureHeight =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getHeight(texture, state);

let setArrayBufferViewSourceTextureHeight =
    (texture, height, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setHeight(
    texture,
    height,
    state,
  );

let unsafeGetArrayBufferViewSourceTextureName =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  NameArrayBufferViewSourceTextureMainService.unsafeGetName(texture, state);

let setArrayBufferViewSourceTextureName =
    (texture, name, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  NameArrayBufferViewSourceTextureMainService.setName(. texture, name, state);