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

let setTextureWidth = (texture, width, state: StateDataMainType.state) =>
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
  OperateTextureMainService.setWidth(texture, width, state);

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

let setTextureHeight = (texture, height, state: StateDataMainType.state) =>
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
  OperateTextureMainService.setHeight(texture, height, state);