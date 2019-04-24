open WonderBsMost;

let buildLoadImageStream = (arrayBuffer, mimeType, errorMsg) => {
  let blob = Blob.newBlobFromArrayBuffer(arrayBuffer, mimeType);

  LoadImageSystem.loadBlobImage(blob |> Blob.createObjectURL, errorMsg)
  |> Most.tap(image => Blob.revokeObjectURL(blob));
};