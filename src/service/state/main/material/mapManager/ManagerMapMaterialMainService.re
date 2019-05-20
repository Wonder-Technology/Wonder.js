let getMap =
    (
      material,
      textureCountPerMaterial,
      (getMapUnitFunc, getTextureIndexFunc),
      (textureIndices, mapUnits),
    ) => {
  let mapUnit = getMapUnitFunc(. material, mapUnits);

  MapUnitService.hasMap(mapUnit) ?
    Some(
      getTextureIndexFunc(.
        (material, mapUnit, textureCountPerMaterial),
        textureIndices,
      ),
    ) :
    None;
};

let _changeMap =
    (
      (material, texture),
      mapUnit,
      setTextureIndexFunc,
      (
        textureCountPerMaterial,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      ),
    ) => (
  setTextureIndexFunc(.
    (material, mapUnit, textureCountPerMaterial),
    texture,
    textureIndices,
  ),
  mapUnits,
  emptyMapUnitArrayMap,
);

let setMap =
    (
      material,
      texture,
      (
        getMapUnitFunc,
        setMapUnitFunc,
        setTextureIndexFunc,
      ),
      (
        textureCountPerMaterial,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      ),
    ) => {
  let mapUnit = getMapUnitFunc(. material, mapUnits);
  MapUnitService.hasMap(mapUnit) ?
    _changeMap(
      (material, texture),
      mapUnit,
      setTextureIndexFunc,
      (
        textureCountPerMaterial,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      ),
    ) :
    {
      let (mapUnit, emptyMapUnitArrayMap) =
        EmptyMapUnitArrayMapService.unsafeGetEmptyMapUnitAndPop(
          material,
          emptyMapUnitArrayMap,
        );

      (
        setTextureIndexFunc(.
          (material, mapUnit, textureCountPerMaterial),
          texture,
          textureIndices,
        ),
        setMapUnitFunc(. material, mapUnit, mapUnits),
        emptyMapUnitArrayMap,
      );
    };
};

let removeMap =
    (
      material,
      (getMapUnitFunc, setMapUnitFunc, setTextureIndexFunc),
      (
        textureCountPerMaterial,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      ),
    ) => {
  let defaultTexture = BufferMaterialService.getDefaultTextureIndex();

  let mapUnit = getMapUnitFunc(. material, mapUnits);

  MapUnitService.hasMap(mapUnit) ?
    (
      setTextureIndexFunc(.
        (material, defaultTexture, textureCountPerMaterial),
        defaultTexture,
        textureIndices,
      ),
      setMapUnitFunc(. material, MapUnitService.getDefaultUnit(), mapUnits),
      EmptyMapUnitArrayMapService.addEmptyMapUnit(
        material,
        mapUnit,
        emptyMapUnitArrayMap,
      ),
    ) :
    (textureIndices, mapUnits, emptyMapUnitArrayMap);
};