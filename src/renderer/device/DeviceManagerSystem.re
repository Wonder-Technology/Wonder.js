open StateDataType;

open ViewSystem;

open GlType;

open DomType;

let _getDeviceManagerData = (state: state) => state.deviceManagerData;

let getGl = [@bs] ((state: state) => Js.Option.getExn(_getDeviceManagerData(state).gl));

let setGl = (gl: webgl1Context, state: state) => {
  ...state,
  deviceManagerData: {...state.deviceManagerData, gl: Some(gl)}
};

/* let createGL (state: state) =>
   state |> getCanvas |> getContext options::(getContextConfig state); */
let createGL = (canvas: htmlElement, contextConfig: MainConfigType.contextConfig) =>
  getContext(canvas, contextConfig);

let setColorWrite =
    (
      gl,
      writeRed: Js.boolean,
      writeGreen: Js.boolean,
      writeBlue: Js.boolean,
      writeAlpha: Js.boolean,
      state: StateDataType.state
    ) => {
  let {colorWrite} as data = _getDeviceManagerData(state);
  switch colorWrite {
  | Some((oldWriteRed, oldWriteGreen, oldWriteBlue, oldWriteAlpha))
      when
        oldWriteRed == writeRed
        && oldWriteGreen == writeGreen
        && oldWriteBlue == writeBlue
        && oldWriteAlpha == writeAlpha => state
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

let clearBuffer = (gl, bit: int, state: StateDataType.state) => {
  let state = setColorWrite(gl, Js.true_, Js.true_, Js.true_, Js.true_, state);
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

let clearColor = (gl, (r: float, g: float, b: float, a: float), state: state) => {
  let {clearColor} as data = _getDeviceManagerData(state);
  switch clearColor {
  | Some((oldR, oldG, oldB, oldA)) when oldR == r && oldG == g && oldB == b && oldA == a => state
  | _ =>
    Gl.clearColor(r, g, b, a, gl);
    {...state, deviceManagerData: {...state.deviceManagerData, clearColor: Some((r, g, b, a))}}
  }
};