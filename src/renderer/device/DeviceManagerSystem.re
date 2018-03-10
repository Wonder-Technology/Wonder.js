open StateDataType;

open DeviceManagerType;

open ViewSystem;

open GlType;

open DomType;

let _getDeviceManagerData = (state: state) => state.deviceManagerData;

let unsafeGetGl =
  [@bs]
  (
    (state: state) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(~expect={j|gl exist|j}, ~actual={j|not|j}),
                  () => _getDeviceManagerData(state).gl |> assertExist
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      Js.Option.getExn(_getDeviceManagerData(state).gl)
    }
  );

let setGl = (gl: webgl1Context, state: state) => {
  ...state,
  deviceManagerData: {...state.deviceManagerData, gl: Some(gl)}
};

let createGl = (contextConfig: ContextShareType.contextConfigJsObj, canvas) =>
  DeviceManagerShare.createGl(canvas, contextConfig);

let setColorWrite =
    (
      gl,
      (
        writeRed: Js.boolean,
        writeGreen: Js.boolean,
        writeBlue: Js.boolean,
        writeAlpha: Js.boolean
      ),
      state: StateDataType.state
    ) => {
  open DeviceManagerType;
  let {colorWrite} = _getDeviceManagerData(state);
  switch colorWrite {
  | Some((oldWriteRed, oldWriteGreen, oldWriteBlue, oldWriteAlpha))
      when
        oldWriteRed === writeRed
        && oldWriteGreen === writeGreen
        && oldWriteBlue === writeBlue
        && oldWriteAlpha === writeAlpha => state
  | _ =>
    Gl.colorMask(
      writeRed: Js.boolean,
      writeGreen: Js.boolean,
      writeBlue: Js.boolean,
      writeAlpha: Js.boolean,
      gl
    );
    {
      ...state,
      deviceManagerData: {
        ...state.deviceManagerData,
        colorWrite: Some((writeRed, writeGreen, writeBlue, writeAlpha))
      }
    }
  }
};

let _setSide = (gl, targetSide) =>
  DeviceManagerType.(
    switch targetSide {
    | NONE =>
      gl |> Gl.enable(Gl.getCullFace(gl));
      gl |> Gl.cullFace(Gl.getFrontAndBack(gl))
    | BOTH => gl |> Gl.disable(Gl.getCullFace(gl))
    | FRONT =>
      gl |> Gl.enable(Gl.getCullFace(gl));
      gl |> Gl.cullFace(Gl.getBack(gl))
    | BACK =>
      gl |> Gl.enable(Gl.getCullFace(gl));
      gl |> Gl.cullFace(Gl.getFront(gl))
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="setSide",
          ~description={j|unknown targetSide: $targetSide|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
      )
    }
  );

let setSide = (gl, targetSide, state: StateDataType.state) => {
  open DeviceManagerType;
  let {side} = _getDeviceManagerData(state);
  switch side {
  | Some(oldSide) when oldSide === targetSide => state
  | _ =>
    _setSide(gl, targetSide) |> ignore;
    {...state, deviceManagerData: {...state.deviceManagerData, side: Some(targetSide)}}
  }
};

let clearBuffer = (gl, bit: int, state: StateDataType.state) => {
  open DeviceManagerType;
  let state = setColorWrite(gl, (Js.true_, Js.true_, Js.true_, Js.true_), state);
  /*! optimize in ANGLE:
    (need more verify:set color mask all false before clear?
    so here not do the recommendation)


    Recommendation: Do Not Perform Clears with Scissors or Masks Enabled
    (<<WebGL Insights>> -> chapter 1)

    One of the subtle differences between the Direct3D APIs and the GL APIs is that in the former, clear calls ignore scissors and masks, while the latter applies both to clears [Koch 12]. This means that if a clear is performed with the scissors test enabled, or with a color or stencil mask in use, ANGLE must draw a quad with the requested clear values, rather than using clear. This introduces some state management overhead, as ANGLE must switch out all the cached state such as shaders, sampler and texture bindings, and vertex data related to the draw call stream. It then must set up all the appropriate state for the clear, perform the clear itself, and then reset all of the affected state back to its prior settings once the clear is complete. If multiple draw buffers are currently in use, using WEBGL_draw_ buffers, then the performance implications of this emulated clear are com- pounded, as the draw must be performed once for each target. Clearing buffers without scissors or masks enabled avoids this overhead.
    */
  Gl.clear(bit, gl);
  state
};

let clearColor = (gl, (r: float, g: float, b: float, a: float), state: StateDataType.state) => {
  open DeviceManagerType;
  let {clearColor} = _getDeviceManagerData(state);
  switch clearColor {
  | Some((oldR, oldG, oldB, oldA)) when oldR === r && oldG === g && oldB === b && oldA === a => state
  | _ =>
    Gl.clearColor(r, g, b, a, gl);
    {...state, deviceManagerData: {...state.deviceManagerData, clearColor: Some((r, g, b, a))}}
  }
};

let setViewportData = ((x, y, width, height), state: StateDataType.state) => {
  ...state,
  deviceManagerData: {...state.deviceManagerData, viewport: Some((x, y, width, height))}
};

let setViewportOfGl = (gl, newViewportData, state: StateDataType.state) =>
  DeviceManagerShare.setViewportOfGl(
    gl,
    _getDeviceManagerData(state).viewport,
    newViewportData,
    state
  );

let deepCopyForRestore = (state: StateDataType.state) => {
  open DeviceManagerType;
  let {colorWrite, clearColor, side, viewport} = state |> _getDeviceManagerData;
  {...state, deviceManagerData: {gl: None, colorWrite, clearColor, side, viewport}}
};

let restore = (currentState, {gl}: StateDataType.sharedDataForRestoreState, targetState) => {
  ...targetState,
  deviceManagerData: {..._getDeviceManagerData(targetState), gl: Some(gl)}
};