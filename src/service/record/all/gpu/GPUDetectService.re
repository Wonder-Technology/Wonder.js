open Gl;

open GlType;

open GPUDetectType;

let _getExtension = (name: string, gl) =>
  (
    switch name {
    | "instanced_arrays" => gl |> getExtension("ANGLE_instanced_arrays")
    | _ => gl |> getExtension(name)
    }
  )
  |> Obj.magic
  |> Js.toOption;

let _detectExtension = (gl, record) => {
  ...record,
  extensionInstancedArrays: _getExtension("instanced_arrays", gl)
};

let _detectPrecision = (gl, record) => {
  /* TODO handle Some experimental-webgl implementations do not have getShaderPrecisionFormat:

     if (!gl.getShaderPrecisionFormat) {
         record.precision = EGPUPrecision.HIGHP;

         return;
     } */
  let vertexShader = gl |> getVertexShader;
  let fragmentShader = gl |> getFragmentShader;
  let highFloat = gl |> getHighFloat;
  let mediumFloat = gl |> getMediumFloat;
  /* let lowFloat = gl |> getLowFloat; */
  let vertexShaderPrecisionHighpFloat = gl |> getShaderPrecisionFormat(vertexShader, highFloat);
  let vertexShaderPrecisionMediumpFloat =
    gl |> getShaderPrecisionFormat(vertexShader, mediumFloat);
  let fragmentShaderPrecisionHighpFloat =
    gl |> getShaderPrecisionFormat(fragmentShader, highFloat);
  let fragmentShaderPrecisionMediumpFloat =
    gl |> getShaderPrecisionFormat(fragmentShader, mediumFloat);
  let highpAvailable =
    vertexShaderPrecisionHighpFloat##precision > 0
    && fragmentShaderPrecisionHighpFloat##precision > 0;
  let mediumpAvailable =
    vertexShaderPrecisionMediumpFloat##precision > 0
    && fragmentShaderPrecisionMediumpFloat##precision > 0;
  if (! highpAvailable) {
    if (mediumpAvailable) {
      WonderLog.Log.warn({j|not support highp, using mediump instead|j});
      {...record, precision: Some(MEDIUMP)}
    } else {
      WonderLog.Log.warn({j|not support highp and mediump, using lowp instead|j});
      {...record, precision: Some(LOWP)}
    }
  } else {
    {...record, precision: Some(HIGHP)}
  }
};

let _getTextureCapability = (gl, textureCountPerMaterial, record) =>
  {...record, maxTextureUnit: Some(gl |> getParameter(gl |> getMaxTextureImageUnits))}
  |> WonderLog.Contract.ensureCheck(
       ({maxTextureUnit}) => {
         open WonderLog;
         open Contract;
         open Operators;
         let maxTextureUnit = maxTextureUnit |> OptionService.unsafeGet;
         test(
           Log.buildAssertMessage(
             ~expect={j|maxTextureUnit:$maxTextureUnit >= textureCountPerMaterial:$textureCountPerMaterial|j},
             ~actual={j|not|j}
           ),
           () => maxTextureUnit >= textureCountPerMaterial
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let _detectCapability = (gl, textureCountPerMaterial, record) =>
  record |> _getTextureCapability(gl, textureCountPerMaterial) |> _detectPrecision(gl);

let detect = (gl, textureCountPerMaterial, record) =>
  record |> _detectExtension(gl) |> _detectCapability(gl, textureCountPerMaterial);

let hasExtension = (extension) => Js.Option.isSome(extension);

let unsafeGetInstanceExtension = (record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|extensionInstancedArrays exist|j},
                ~actual={j|not|j}
              ),
              () => record.extensionInstancedArrays |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  record.extensionInstancedArrays |> OptionService.unsafeGet
};