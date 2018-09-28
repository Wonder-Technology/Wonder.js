open StateDataMainType;

open SettingType;

let disposeTextureIndices =
    (material, textureCountPerMaterial, textureIndices) => {
  open Js.Typed_array;
  let sourceIndex =
    BufferMaterialService.getTextureIndicesIndex(
      material,
      textureCountPerMaterial,
    );
  let defaultIndex = BufferMaterialService.getDefaultTextureIndex();
  for (i in
       0 to
       BufferMaterialService.getTextureIndicesSize(textureCountPerMaterial)
       - 1) {
    Uint32Array.unsafe_set(textureIndices, sourceIndex + i, defaultIndex);
  };
  textureIndices;
};

let isAlive = (material, disposedIndexArray) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);