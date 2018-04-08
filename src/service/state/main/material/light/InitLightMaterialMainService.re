/* TODO pass light material
   open StateDataMainType;

   open MaterialType;

   open RenderConfigType;

   open LightMaterialType;

   /*

    let _getShaderLibs = ({material_shaders}) => {
      let shaderName = "front_render_light";
      JobConfigService.unsafeFindFirst(
        material_shaders,
        shaderName,
        ({name}: material_shader) => JobConfigService.filterTargetName(name, shaderName)
      ).
        shader_libs
    };

    let _getShaderTuple = (materialIndex, state: StateDataMainType.state) => {
      let shaderRecord = RenderConfigMainService.getShaders(state);
      (materialIndex, _getShaderLibs(shaderRecord), shaderRecord)
    };

    let _getStateTuple = (state) => {
      let {gameObjectMap, shaderIndices} = state |> RecordLightMaterialMainService.getRecord;
      (gameObjectMap, shaderIndices, state)
    };

    let initMaterial =
      [@bs]
      (
        (gl, materialIndex: int, state: StateDataMainType.state) =>
          InitMaterialMainService.initMaterial(
            gl,
            _getShaderTuple(materialIndex, state),
            ShaderIndexLightMaterialMainService.setShaderIndex,
            _getStateTuple(state)
          )
      );

    let initMaterials = (materialIndexArr, gl, state: StateDataMainType.state) =>
      materialIndexArr
      |> ReduceStateMainService.reduceState(
           [@bs] ((state, materialIndex: int) => [@bs] initMaterial(gl, materialIndex, state)),
           state
         );

    let handleInitComponent = (gl, index: int, state: StateDataMainType.state) =>
      InitMaterialMainService.handleInitComponent(
        gl,
        _getShaderTuple(index, state),
        ShaderIndexLightMaterialMainService.setShaderIndex,
        _getStateTuple(state)
      );

    let init = (gl, state) => {
      let {index, disposedIndexArray} = RecordLightMaterialMainService.getRecord(state);
      InitMaterialMainService.init(gl, (index, disposedIndexArray), initMaterial, state)
    };

    */
   let initMaterial =
     [@bs] ((gl: GlType.webgl1Context, materialIndex: int, state: StateDataMainType.state) => state);

   let initMaterials = (materialIndexArr, gl, state: StateDataMainType.state) => state;

   let handleInitComponent = (gl, index: int, state: StateDataMainType.state) => state;

   let init = (gl, state) => state; */
open StateDataMainType;

open MaterialType;

open LightMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordLightMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray, shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, materialIndex: int) =>
           [@bs]
           InitLightMaterialInitMaterialService.initMaterial(
             gl,
             (
               materialIndex,
               JudgeInstanceMainService.isSourceInstance(
                 materialIndex,
                 gameObjectMap,
                 gameObjectRecord
               ),
               isSupportInstance
             ),
             state
           )
       ),
       CreateInitMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray, shaderIndices),
         state
       )
     )
  |> ignore;
  state
};

let handleInitComponent = (gl, materialIndex: int, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordLightMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray, shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  [@bs]
  InitLightMaterialInitMaterialService.initMaterial(
    gl,
    (
      materialIndex,
      JudgeInstanceMainService.isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord),
      isSupportInstance
    ),
    CreateInitMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};