open WonderWebgl.Gl;

open WonderWebgl.GlType;

open GPUDetectType;

let _getElementIndexUint = gl =>
  switch (gl |> getExtension("OES_element_index_uint") |> Js.toOption) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getExtension",
        ~description={j|not support OES_element_index_uint extension|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    );

    Obj.magic(false);
  | Some(_) => Obj.magic(true)
  };

let _getExtension = (name: string, gl) =>
  (
    switch (name) {
    | "instanced_arrays" => gl |> getExtension("ANGLE_instanced_arrays")
    | "element_index_uint" => _getElementIndexUint(gl)
    | _ => gl |> getExtension(name)
    }
  )
  |> Obj.magic
  |> Js.toOption;

let _detectExtension = (gl, record) => {
  ...record,
  extensionInstancedArrays: _getExtension("instanced_arrays", gl),
  extensionElementIndexUint: _getExtension("element_index_uint", gl),
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
  let vertexShaderPrecisionHighpFloat =
    gl |> getShaderPrecisionFormat(vertexShader, highFloat);
  let vertexShaderPrecisionMediumpFloat =
    gl |> getShaderPrecisionFormat(vertexShader, mediumFloat);
  let fragmentShaderPrecisionHighpFloat =
    gl |> getShaderPrecisionFormat(fragmentShader, highFloat);
  let fragmentShaderPrecisionMediumpFloat =
    gl |> getShaderPrecisionFormat(fragmentShader, mediumFloat);
  let highpAvailable =
    vertexShaderPrecisionHighpFloat##precision > 0
    &&
    fragmentShaderPrecisionHighpFloat##precision > 0;
  let mediumpAvailable =
    vertexShaderPrecisionMediumpFloat##precision > 0
    &&
    fragmentShaderPrecisionMediumpFloat##precision > 0;
  if (!highpAvailable) {
    if (mediumpAvailable) {
      WonderLog.Log.warn({j|not support highp, using mediump instead|j});
      {...record, precision: Some(MEDIUMP)};
    } else {
      WonderLog.Log.warn(
        {j|not support highp and mediump, using lowp instead|j},
      );
      {...record, precision: Some(LOWP)};
    };
  } else {
    {...record, precision: Some(HIGHP)};
  };
};

let _getTextureCapability = (gl, record) => {
  ...record,
  maxTextureUnit: Some(gl |> getParameter(gl |> getMaxTextureImageUnits)),
};

let _detectCapability = (gl, record) =>
  record |> _getTextureCapability(gl) |> _detectPrecision(gl);

let detect = (gl, record) =>
  record |> _detectExtension(gl) |> _detectCapability(gl);

let hasExtension = extension => Js.Option.isSome(extension);

let unsafeGetInstanceExtension = record => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|extensionInstancedArrays exist|j},
                ~actual={j|not|j},
              ),
              () =>
              record.extensionInstancedArrays |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  record.extensionInstancedArrays |> OptionService.unsafeGet;
};