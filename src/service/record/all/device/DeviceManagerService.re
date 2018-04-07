open DeviceManagerType;

open GlType;

open DomType;

let unsafeGetGl =
  [@bs]
  (
    ({gl} as record) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(~expect={j|gl exist|j}, ~actual={j|not|j}),
                  () => gl |> assertExist
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      gl |> OptionService.unsafeGet
    }
  );

let setGl = (gl: webgl1Context, record) => {...record, gl: Some(gl)};

let setColorWrite =
    (
      gl,
      (
        writeRed: Js.boolean,
        writeGreen: Js.boolean,
        writeBlue: Js.boolean,
        writeAlpha: Js.boolean
      ),
      {colorWrite} as record
    ) =>
  switch colorWrite {
  | Some((oldWriteRed, oldWriteGreen, oldWriteBlue, oldWriteAlpha))
      when
        oldWriteRed === writeRed
        && oldWriteGreen === writeGreen
        && oldWriteBlue === writeBlue
        && oldWriteAlpha === writeAlpha => record
  | _ =>
    Gl.colorMask(
      writeRed: Js.boolean,
      writeGreen: Js.boolean,
      writeBlue: Js.boolean,
      writeAlpha: Js.boolean,
      gl
    );
    {...record, colorWrite: Some((writeRed, writeGreen, writeBlue, writeAlpha))}
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

let setSide = (gl, targetSide, {side} as record) =>
  switch side {
  | Some(oldSide) when oldSide === targetSide => record
  | _ =>
    _setSide(gl, targetSide) |> ignore;
    {...record, side: Some(targetSide)}
  };

let clearBuffer = (gl, bit: int, record) => {
  let record = setColorWrite(gl, (Js.true_, Js.true_, Js.true_, Js.true_), record);
  /*! optimize in ANGLE:
    (need more verify:set color mask all false before clear?
    so here not do the recommendation)


    Recommendation: Do Not Perform Clears with Scissors or Masks Enabled
    (<<WebGL Insights>> -> chapter 1)

    One of the subtle differences between the Direct3D APIs and the GL APIs is that in the former, clear calls ignore scissors and masks, while the latter applies both to clears [Koch 12]. This means that if a clear is performed with the scissors test enabled, or with a color or stencil mask in use, ANGLE must draw a quad with the requested clear values, rather than using clear. This introduces some state management overhead, as ANGLE must switch out all the cached state such as shaders, sampler and texture bindings, and vertex record related to the draw call stream. It then must set up all the appropriate state for the clear, perform the clear itself, and then reset all of the affected state back to its prior settings once the clear is complete. If multiple draw buffers are currently in use, using WEBGL_draw_ buffers, then the performance implications of this emulated clear are com- pounded, as the draw must be performed once for each target. Clearing buffers without scissors or masks enabled avoids this overhead.
    */
  Gl.clear(bit, gl);
  record
};

let clearColor = (gl, (r: float, g: float, b: float, a: float), {clearColor} as record) =>
  switch clearColor {
  | Some((oldR, oldG, oldB, oldA)) when oldR === r && oldG === g && oldB === b && oldA === a => record
  | _ =>
    Gl.clearColor(r, g, b, a, gl);
    {...record, clearColor: Some((r, g, b, a))}
  };

let setViewportData = ((x, y, width, height), record) => {
  ...record,
  viewport: Some((x, y, width, height))
};

let setViewportOfGl = (gl, (x, y, width, height), {viewport} as record) =>
  switch viewport {
  | Some((oldX, oldY, oldWidth, oldHeight))
      when oldX === x && oldY === y && oldWidth === width && oldHeight === height => record
  | _ =>
    Gl.viewport(x, y, width, height, gl);
    {...record, viewport: Some((x, y, width, height))}
  };