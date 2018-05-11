open BrowserDetectType;

let setFlipY = (gl, flipY, {browser}) =>
  DetectBrowserService.isChrome(browser) ?
    () /* set it when createImageBitmap in render worker */ :
    DetectBrowserService.isFirefox(browser) ?
      gl |> Gl.pixelStorei(Gl.getUnpackFlipYWebgl(gl), flipY) :
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="setFlipY",
          ~description={j|unknown browser|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
      );