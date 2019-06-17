open AllDeviceManagerType;

open WonderWebgl.GlType;

open WonderWebgl.DomExtendType;

let unsafeGetGl =
  (. {gl} as record) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|gl exist|j},
                  ~actual={j|not|j},
                ),
                () =>
                gl |> assertExist
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    gl |> OptionService.unsafeGet;
  };

let setGl = (gl: webgl1Context, record) => {...record, gl: Some(gl)};

let setColorWrite =
    (
      gl,
      (writeRed: bool, writeGreen: bool, writeBlue: bool, writeAlpha: bool),
      {colorWrite} as record,
    ) =>
  switch (colorWrite) {
  | Some((oldWriteRed, oldWriteGreen, oldWriteBlue, oldWriteAlpha))
      when
        oldWriteRed === writeRed
        && oldWriteGreen === writeGreen
        && oldWriteBlue === writeBlue
        && oldWriteAlpha === writeAlpha => record
  | _ =>
    WonderWebgl.Gl.colorMask(
      writeRed: bool,
      writeGreen: bool,
      writeBlue: bool,
      writeAlpha: bool,
      gl,
    );
    {
      ...record,
      colorWrite: Some((writeRed, writeGreen, writeBlue, writeAlpha)),
    };
  };

let setDepthWrite = (gl, writeDepth: bool, {depthWrite} as record) =>
  switch (depthWrite) {
  | Some(oldWriteDepth) when oldWriteDepth === writeDepth => record
  | _ =>
    WonderWebgl.Gl.depthMask(writeDepth, gl);
    {...record, depthWrite: Some(writeDepth)};
  };

let setDepthFunc = (gl, targetFunc, record) => {
  gl |> WonderWebgl.Gl.depthFunc(targetFunc);

  record;
};

let _setSide = (gl, targetSide) =>
  AllDeviceManagerType.(
    switch (targetSide) {
    | NONE =>
      gl |> WonderWebgl.Gl.enable(WonderWebgl.Gl.getCullFace(gl));
      gl |> WonderWebgl.Gl.cullFace(WonderWebgl.Gl.getFrontAndBack(gl));
    | BOTH => gl |> WonderWebgl.Gl.disable(WonderWebgl.Gl.getCullFace(gl))
    | FRONT =>
      gl |> WonderWebgl.Gl.enable(WonderWebgl.Gl.getCullFace(gl));
      gl |> WonderWebgl.Gl.cullFace(WonderWebgl.Gl.getBack(gl));
    | BACK =>
      gl |> WonderWebgl.Gl.enable(WonderWebgl.Gl.getCullFace(gl));
      gl |> WonderWebgl.Gl.cullFace(WonderWebgl.Gl.getFront(gl));
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="setSide",
          ~description={j|unknown targetSide: $targetSide|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  );

let setSide = (gl, targetSide, {side} as record) =>
  switch (side) {
  | Some(oldSide) when oldSide === targetSide => record
  | _ =>
    _setSide(gl, targetSide) |> ignore;
    {...record, side: Some(targetSide)};
  };

let _setDepthTest = (gl, targetDepthTest) =>
  targetDepthTest ?
    gl |> WonderWebgl.Gl.enable(WonderWebgl.Gl.getDepthTest(gl)) :
    gl |> WonderWebgl.Gl.disable(WonderWebgl.Gl.getDepthTest(gl));

let setDepthTest = (gl, targetDepthTest, {depthTest} as record) =>
  switch (depthTest) {
  | Some(oldDepthTest) when oldDepthTest === targetDepthTest => record
  | _ =>
    _setDepthTest(gl, targetDepthTest) |> ignore;
    {...record, depthTest: Some(targetDepthTest)};
  };

let _setScissorTest = (gl, targetScissorTest) =>
  targetScissorTest ?
    gl |> WonderWebgl.Gl.enable(WonderWebgl.Gl.getScissorTest(gl)) :
    gl |> WonderWebgl.Gl.disable(WonderWebgl.Gl.getScissorTest(gl));

let setScissorTest = (gl, targetScissorTest, {scissorTest} as record) =>
  switch (scissorTest) {
  | Some(oldScissorTest) when oldScissorTest === targetScissorTest => record
  | _ =>
    _setScissorTest(gl, targetScissorTest) |> ignore;
    {...record, scissorTest: Some(targetScissorTest)};
  };

let setScissorOfGl = (gl, (x, y, width, height), {scissor} as record) =>
  switch (scissor) {
  | Some((oldX, oldY, oldWidth, oldHeight))
      when
        oldX === x && oldY === y && oldWidth === width && oldHeight === height => record
  | _ =>
    WonderWebgl.Gl.scissor(x, y, width, height, gl);
    {...record, scissor: Some((x, y, width, height))};
  };

let setStencilTest = (gl, targetStencilTest, record) => {
  targetStencilTest ?
    gl |> WonderWebgl.Gl.enable(WonderWebgl.Gl.getStencilTest(gl)) :
    gl |> WonderWebgl.Gl.disable(WonderWebgl.Gl.getStencilTest(gl));

  record;
};

let setStencilMask = (gl, targetStencilMask, record) => {
  gl
  |> WonderWebgl.Gl.stencilMask(
       WonderWebgl.GlType.intToHex(targetStencilMask),
     );

  record;
};

let setStencilFunc =
    (gl, (targetStencilFunc, targetStencilRef, targetStencilMask), record) => {
  gl
  |> WonderWebgl.Gl.stencilFunc(
       targetStencilFunc,
       targetStencilRef,
       WonderWebgl.GlType.intToHex(targetStencilMask),
     );

  record;
};

let setStencilOp =
    (
      gl,
      (targetStencilSFail, targetStencilDPFail, targetStencilDPPass),
      record,
    ) => {
  gl
  |> WonderWebgl.Gl.stencilOp(
       targetStencilSFail,
       targetStencilDPFail,
       targetStencilDPPass,
     );

  record;
};

let clearBuffer = (gl, bit: int, record) => {
  let record = setColorWrite(gl, (true, true, true, true), record);
  /*! optimize in ANGLE:
    (need more verify:set color mask all false before clear?
    so here not do the recommendation)


    Recommendation: Do Not Perform Clears with Scissors or Masks Enabled
    (<<WebGL Insights>> -> chapter 1)

    One of the subtle differences between the Direct3D APIs and the GL APIs is that in the former, clear calls ignore scissors and masks, while the latter applies both to clears [Koch 12]. This means that if a clear is performed with the scissors test enabled, or with a color or stencil mask in use, ANGLE must draw a quad with the requested clear values, rather than using clear. This introduces some state management overhead, as ANGLE must switch out all the cached state such as shaders, sampler and texture bindings, and vertex record related to the draw call stream. It then must set up all the appropriate state for the clear, perform the clear itself, and then reset all of the affected state back to its prior settings once the clear is complete. If multiple draw buffers are currently in use, using WEBGL_draw_ buffers, then the performance implications of this emulated clear are com- pounded, as the draw must be performed once for each target. Clearing buffers without scissors or masks enabled avoids this overhead.
    */
  WonderWebgl.Gl.clear(bit, gl);
  record;
};

let clearColor =
    (gl, (r: float, g: float, b: float, a: float), {clearColor} as record) =>
  switch (clearColor) {
  | Some((oldR, oldG, oldB, oldA))
      when oldR === r && oldG === g && oldB === b && oldA === a => record
  | _ =>
    WonderWebgl.Gl.clearColor(r, g, b, a, gl);
    {...record, clearColor: Some((r, g, b, a))};
  };

let setViewportOfGl = (gl, (x, y, width, height), {viewport} as record) =>
  switch (viewport) {
  | Some((oldX, oldY, oldWidth, oldHeight))
      when
        oldX === x && oldY === y && oldWidth === width && oldHeight === height => record
  | _ =>
    WonderWebgl.Gl.viewport(x, y, width, height, gl);
    {...record, viewport: Some((x, y, width, height))};
  };