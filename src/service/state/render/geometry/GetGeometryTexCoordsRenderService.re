open StateRenderType;

open RenderGeometryType;

open ReallocatedPointsGeometryService;

let getTexCoords =
  [@bs]
  (
    (index, {geometryRecord}) => {
      let {texCoords, texCoordsInfos} = geometryRecord;
      getFloat32PointData(
        BufferGeometryService.getInfoIndex(index),
        texCoords,
        texCoordsInfos
      )
    }
  );