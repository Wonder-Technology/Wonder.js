open Gl;

open GlType;

open GPUDetectType;

/* todo test */
let _getExtension = (name: string, gl) =>
  (
    switch name {
    | "instanced_arrays" => gl |> getExtension("ANGLE_instanced_arrays")
    | _ => gl |> getExtension(name)
    }
  )
  |> Js.toOption;

let _detectExtension = (gl, gpuDetectData) => {
  ...gpuDetectData,
  extensionInstancedArrays: _getExtension("instanced_arrays", gl)
};

let _detectPrecision = (gl, gpuDetectData) => {
  /* todo handle Some experimental-webgl implementations do not have getShaderPrecisionFormat:

     if (!gl.getShaderPrecisionFormat) {
         gpuDetectData.precision = EGPUPrecision.HIGHP;

         return;
     } */
  let vertexShader = gl |> getVertexShader;
  let fragmentShader = gl |> getFragmentShader;
  let highFloat = gl |> getHighFloat;
  let mediumFloat = gl |> getMediumFloat;
  let lowFloat = gl |> getLowFloat;
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
      LogUtils.warn("not support highp, using mediump instead");
      {...gpuDetectData, precision: Some(MEDIUMP)}
    } else {
      LogUtils.warn("not support highp and mediump, using lowp instead");
      {...gpuDetectData, precision: Some(LOWP)}
    }
  } else {
    {...gpuDetectData, precision: Some(HIGHP)}
  }
};

let _detectCapabilty = (gl, gpuDetectData) => _detectPrecision(gl, gpuDetectData);

let detect = (gl, state: StateDataType.state) => {
  ...state,
  gpuDetectData: GPUStateSystem.getData(state) |> _detectExtension(gl) |> _detectCapabilty(gl)
};

let hasExtension = (extension) => Js.Option.isSome(extension);