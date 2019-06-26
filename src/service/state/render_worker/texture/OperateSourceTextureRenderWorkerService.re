open AllBrowserDetectType;

open BrowserType;

let setFlipY = (gl, flipY, {browser}) =>
  switch browser {
  | Chrome => ()
  | Firefox => gl |> WonderWebgl.Gl.pixelStorei(WonderWebgl.Gl.getUnpackFlipYWebgl(gl), flipY)
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="setFlipY",
        ~description={j|unknown browser|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };