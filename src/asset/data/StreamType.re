type chunk =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Image;

type streamUnitData = {
  byteLength: int,
  index: int,
  type_: chunk,
  componentType: int,
};

type loadedStreamGeometryData = {
  meshIndex: int,
  arrayBuffer: Js.Typed_array.ArrayBuffer.t,
  componentType: int,
};

type loadedStreamImageData = {
  name: string,
  imageIndex: int,
  mimeType: string,
  arrayBuffer: Js.Typed_array.ArrayBuffer.t,
};

type loadedStreamData = {
  geometryData: option(loadedStreamGeometryData),
  imageData: option(loadedStreamImageData),
  type_: chunk,
};

type loadedStreamImageBlobData = {
  imageIndex: int,
  image: ImageType.image,
};

type loadedStreamBlobData = {
  geometryData: option(loadedStreamGeometryData),
  imageData: option(loadedStreamImageBlobData),
  type_: chunk,
};

/* type binBuffer = Js.Typed_array.ArrayBuffer.t; */

type assembleData =
  option(
    (
      GameObjectPrimitiveType.gameObject,
      (
        array(ComponentType.component),
        array(int),
        array(ComponentType.component),
      ),
      (
        option(array(WDType.image)),
        (array(int), WDType.imageTextureIndexData),
        (
          array(CubemapTextureType.cubemapTexture),
          WDType.imageCubemapTextureIndexData,
        ),
      ),
      /* (option(WDType.wd), option(binBuffer)), */
    ),
  );

external uint8ToChunk: Js.Typed_array.Uint8Array.elt => chunk = "%identity";

external chunkToUint8: chunk => Js.Typed_array.Uint8Array.elt = "%identity";