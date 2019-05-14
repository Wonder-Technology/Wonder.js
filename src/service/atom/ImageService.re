let getMimeTypeByExtname = extname =>
  switch (extname) {
  | None
  | Some(".png") => "image/png"
  | Some(".jpg")
  | Some(".jpeg") => "image/jpeg"
  | mimeType =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getMimeTypeByExtname",
        ~description={j|unknown image mimeType: $mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };