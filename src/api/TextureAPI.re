open StateDataMainType;

open TextureType;

let createTexture = (state) => [@bs] CreateTextureMainService.create(state);

/* TODO check alive */
let unsafeGetTextureSource = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.unsafeGetSource(texture, state);

let setTextureSource = (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.setSource(texture, source, state);

let getTextureWidth = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getWidth(texture, state);

let getTextureHeight = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getHeight(texture, state);

let getTextureWrapS = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getWrapS(texture, state);

let setTextureWrapS = (texture, wrapS, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.setWrapS(texture, wrapS, state);

let getTextureWrapT = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateTextureMainService.getWrapT(texture, state);

let setTextureWrapT = (texture, wrapT, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateTextureMainService.setWrapT(texture, wrapT, state);

let getTextureMagFilter = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getMagFilter(texture, state);

let setTextureMagFilter = (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.setMagFilter(texture, filter, state);

let getTextureMinFilter = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getMinFilter(texture, state);

let setTextureMinFilter = (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.setMinFilter(texture, filter, state);



let getTextureFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getFormat(texture, state);

let setTextureFormat = (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.setFormat(texture, format, state);

let getTextureType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.getType(texture, state);

let setTextureType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateTextureMainService.setType(texture, type_, state);
