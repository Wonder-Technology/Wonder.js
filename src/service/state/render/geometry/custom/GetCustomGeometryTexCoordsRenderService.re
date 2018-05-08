open StateRenderType;

open RenderCustomGeometryType;

open ReallocatedPointsGeometryService;

let getTexCoords =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {texCoords, texCoordsInfos} = customGeometryRecord;
      getFloat32PointData(
        BufferCustomGeometryService.getInfoIndex(index),
        texCoords,
        texCoordsInfos
      )
    }
  );