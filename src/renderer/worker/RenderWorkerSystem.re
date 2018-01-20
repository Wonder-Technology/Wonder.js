let onerrorHandler = (msg: string, fileName: string, lineno: int) =>
  WonderLog.Log.error(
    WonderLog.Log.buildErrorMessage(
      ~title="render worker error",
      ~description={j|$msg|j},
      ~reason="",
      ~solution={j||j},
      ~params={j|fileName:$(fileName)
        lineno:$(lineno)|j}
    )
  );

let onmessage = (e) => Js.log(e);