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

let _detectExtension = (gl, gpuDetectData) => {
  ...gpuDetectData,
  extensionInstancedArrays: _getExtension("instanced_arrays", gl)
};

let _detectPrecision = (gl, gpuDetectData) => {
  /* TODO handle Some experimental-webgl implementations do not have getShaderPrecisionFormat:

     if (!gl.getShaderPrecisionFormat) {
         gpuDetectData.precision = EGPUPrecision.HIGHP;

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
      {...gpuDetectData, precision: Some(MEDIUMP)}
    } else {
      WonderLog.Log.warn({j|not support highp and mediump, using lowp instead|j});
      {...gpuDetectData, precision: Some(LOWP)}
    }
  } else {
    {...gpuDetectData, precision: Some(HIGHP)}
  }
};

let _detectCapabilty = (gl, gpuDetectData) => _detectPrecision(gl, gpuDetectData);

let detect = (gl, state: StateDataType.state) => {
  ...state,
  gpuDetectData:
    GPUStateUtils.getGpuDetectData(state) |> _detectExtension(gl) |> _detectCapabilty(gl)
};

let hasExtension = (extension) => Js.Option.isSome(extension);

let getInstanceExtension = (state: StateDataType.state) =>
  GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays;