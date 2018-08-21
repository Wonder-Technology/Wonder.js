let buildLoadImageStream = (arrayBuffer, mimeType, errorMsg) => {
  let blob = Blob.newBlobFromArrayBuffer(arrayBuffer, mimeType);

  LoadImageSystem.loadBlobImage(blob |> Blob.createObjectURL, errorMsg)
  |> WonderBsMost.Most.tap(image => Blob.revokeObjectURL(blob));
};