let getWrapData = wrap =>
  TextureType.(
    switch (wrap |> uint8ToWrap) {
    | Clamp_to_edge => 33071
    | Mirrored_repeat => 33648
    | Repeat => 10497
    }
  );

let getFilterData = filter =>
  TextureType.(
    switch (filter |> uint8ToFilter) {
    | Nearest => 9728
    | Linear => 9729
    | Nearest_mipmap_nearest => 9984
    | Linear_mipmap_nearest => 9985
    | Nearest_mipmap_linear => 9986
    | Linear_mipmap_linear => 9987
    }
  );

let _convertImageToBase64 = [%raw
  (width, height, mimeType, image) => {|
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL = null;
    canvas.height = width;
    canvas.width = height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL(mimeType);
    |}
];

let convertBase64MimeTypeToWDBMimeType = mimeType =>
  switch (mimeType) {
  | "image/png"
  | "image/jpeg" => mimeType
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="convertBase64MimeTypeToWDBMimeType",
        ~description={j|unknown mimeType: $mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _getImageMimeType = source =>
  ImageService.getMimeTypeByExtname(
    FileNameService.getFileExtName(Obj.magic(source)##name),
  );

let getImageBase64 = source =>
  _convertImageToBase64(
    TextureSizeService.getWidth(source),
    TextureSizeService.getHeight(source),
    _getImageMimeType(source),
    source,
  );