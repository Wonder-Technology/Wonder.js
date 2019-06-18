open StateDataMainType;

open TextureType;

open CubemapTextureType;

let createCubemapTexture = state =>
  CreateCubemapTextureMainService.create(. state);

let unsafeGetCubemapTexturePXSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.unsafeGetPXSource(texture, state);

let setCubemapTexturePXSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPXSource(texture, source, state);

let unsafeGetCubemapTextureNXSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.unsafeGetNXSource(texture, state);

let setCubemapTextureNXSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNXSource(texture, source, state);

let unsafeGetCubemapTexturePYSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.unsafeGetPYSource(texture, state);

let setCubemapTexturePYSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPYSource(texture, source, state);

let unsafeGetCubemapTextureNYSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.unsafeGetNYSource(texture, state);

let setCubemapTextureNYSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNYSource(texture, source, state);

let unsafeGetCubemapTexturePZSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.unsafeGetPZSource(texture, state);

let setCubemapTexturePZSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPZSource(texture, source, state);

let unsafeGetCubemapTextureNZSource =
    (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.unsafeGetNZSource(texture, state);

let setCubemapTextureNZSource =
    (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNZSource(texture, source, state);

let getCubemapTextureWrapS = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getWrapS(texture, state) |> uint8ToWrap;

let setCubemapTextureWrapS = (texture, wrapS, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setWrapS(
    texture,
    wrapS |> wrapToUint8,
    state,
  );

let getCubemapTextureWrapT = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getWrapT(texture, state) |> uint8ToWrap;

let setCubemapTextureWrapT = (texture, wrapT, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setWrapT(
    texture,
    wrapT |> wrapToUint8,
    state,
  );

let getCubemapTextureMagFilter = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getMagFilter(texture, state)
  |> uint8ToFilter;

let setCubemapTextureMagFilter =
    (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setMagFilter(
    texture,
    filter |> filterToUint8,
    state,
  );

let getCubemapTextureMinFilter = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getMinFilter(texture, state)
  |> uint8ToFilter;

let setCubemapTextureMinFilter =
    (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setMinFilter(
    texture,
    filter |> filterToUint8,
    state,
  );

let getCubemapTexturePXFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getPXFormat(texture, state)
  |> uint8ToFormat;

let setCubemapTexturePXFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPXFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getCubemapTextureNXFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getNXFormat(texture, state)
  |> uint8ToFormat;

let setCubemapTextureNXFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNXFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getCubemapTexturePYFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getPYFormat(texture, state)
  |> uint8ToFormat;

let setCubemapTexturePYFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPYFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getCubemapTextureNYFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getNYFormat(texture, state)
  |> uint8ToFormat;

let setCubemapTextureNYFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNYFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getCubemapTexturePZFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getPZFormat(texture, state)
  |> uint8ToFormat;

let setCubemapTexturePZFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPZFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getCubemapTextureNZFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getNZFormat(texture, state)
  |> uint8ToFormat;

let setCubemapTextureNZFormat =
    (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNZFormat(
    texture,
    format |> formatToUint8,
    state,
  );

let getCubemapTexturePXType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getPXType(texture, state);

let setCubemapTexturePXType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPXType(texture, type_, state);

let getCubemapTextureNXType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getNXType(texture, state);

let setCubemapTextureNXType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNXType(texture, type_, state);

let getCubemapTexturePYType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getPYType(texture, state);

let setCubemapTexturePYType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPYType(texture, type_, state);

let getCubemapTextureNYType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getNYType(texture, state);

let setCubemapTextureNYType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNYType(texture, type_, state);

let getCubemapTexturePZType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getPZType(texture, state);

let setCubemapTexturePZType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setPZType(texture, type_, state);

let getCubemapTextureNZType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getNZType(texture, state);

let setCubemapTextureNZType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setNZType(texture, type_, state);

let getCubemapTextureFlipY = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.getFlipY(texture, state);

let setCubemapTextureFlipY = (texture, flipY, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateCubemapTextureMainService.setFlipY(texture, flipY, state);

let getCubemapTextureName = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  NameCubemapTextureMainService.getName(texture, state);

let unsafeGetCubemapTextureName = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  NameCubemapTextureMainService.unsafeGetName(texture, state);

let setCubemapTextureName = (texture, name, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordCubemapTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  NameCubemapTextureMainService.setName(texture, name, state);

let getAllTextures = state => {
  let {index, disposedIndexArray} =
    RecordCubemapTextureMainService.getRecord(state);

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let disposeCubemapTexture = (texture, isRemoveTexture, state) =>
  DisposeCubemapTextureMainService.handleDisposeTexture(
    texture,
    isRemoveTexture,
    state,
  );