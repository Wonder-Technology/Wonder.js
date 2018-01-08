open GeometryGetStateDataCommon;

open BoxGeometryType;

open GeometryType;

let _getConfig = (configDataMap) => (
  WonderCommonlib.HashMapSystem.unsafeGet("width", configDataMap),
  WonderCommonlib.HashMapSystem.unsafeGet("height", configDataMap),
  WonderCommonlib.HashMapSystem.unsafeGet("depth", configDataMap),
  WonderCommonlib.HashMapSystem.unsafeGet("widthSegment", configDataMap) |> int_of_float,
  WonderCommonlib.HashMapSystem.unsafeGet("heightSegment", configDataMap) |> int_of_float,
  WonderCommonlib.HashMapSystem.unsafeGet("depthSegment", configDataMap) |> int_of_float
);

let _buildFaceData = (width, height, depth) => (
  [|
    /* front */
    [|0, 1, 3|],
    /* back */
    [|4, 5, 7|],
    /* top */
    [|3, 2, 6|],
    /* bottom */
    [|1, 0, 4|],
    /* right */
    [|1, 4, 2|],
    /* left */
    [|5, 0, 6|]
  |],
  [|
    (-. width, -. height, depth),
    (width, -. height, depth),
    (width, height, depth),
    (-. width, height, depth),
    (width, -. height, -. depth),
    (-. width, -. height, -. depth),
    (-. width, height, -. depth),
    (width, height, -. depth)
  |]
);

let _getLerpData =
    ((faceAxes, corners), (side, segment), (cornerIndex1, cornerIndex2, segmentIndex)) =>
  Vector3System.lerp(
    corners[faceAxes[side][cornerIndex1]],
    corners[faceAxes[side][cornerIndex2]],
    float_of_int(segmentIndex) /. float_of_int(segment)
  );

let _generateVertex =
    (
      (side: int, uSegment: int, vSegment: int),
      (faceAxes, corners),
      (uSegmentIndex, vSegmentIndex),
      vertices
    ) => {
  let (vx, vy, vz) =
    Vector3System.add(
      Vector3Type.Float,
      _getLerpData((faceAxes, corners), (side, uSegment), (0, 1, uSegmentIndex)),
      Vector3System.sub(
        Vector3Type.Float,
        _getLerpData((faceAxes, corners), (side, vSegment), (0, 2, vSegmentIndex)),
        corners[faceAxes[side][0]]
      )
    );
  vertices |> WonderCommonlib.ArraySystem.pushMany([|vx, vy, vz|]) |> ignore
};

let _generateIndex = ((uSegment, vSegment, offset), (uSegmentIndex, vSegmentIndex), indices) =>
  switch (uSegmentIndex, vSegmentIndex) {
  | (i, j) when i < uSegment && j < vSegment =>
    indices
    |> WonderCommonlib.ArraySystem.pushMany([|
         offset + j + i * (uSegment + 1),
         offset + j + (i + 1) * (uSegment + 1),
         offset + j + i * (uSegment + 1) + 1,
         offset + j + (i + 1) * (uSegment + 1),
         offset + j + (i + 1) * (uSegment + 1) + 1,
         offset + j + i * (uSegment + 1) + 1
       |])
    |> ignore
  | (_, _) => ()
  };

let _generateFace = (directionDataTuple, faceDataTuple, (vertices, indices)) => {
  let (side: int, uSegment: int, vSegment: int) = directionDataTuple;
  let offset: int = Js.Array.length(vertices) / 3;
  for (i in 0 to uSegment) {
    for (j in 0 to vSegment) {
      let segmentIndexTuple = (i, j);
      _generateVertex(directionDataTuple, faceDataTuple, segmentIndexTuple, vertices);
      _generateIndex((uSegment, vSegment, offset), segmentIndexTuple, indices)
    }
  };
  (vertices, indices)
};

let _buildAllFaceDirectionDataTupleArr = (widthSegment, heightSegment, depthSegment) => [|
  (0, widthSegment, heightSegment),
  (1, widthSegment, heightSegment),
  (2, widthSegment, depthSegment),
  (3, widthSegment, depthSegment),
  (4, depthSegment, heightSegment),
  (5, depthSegment, heightSegment)
|];

let _generateAllFaces = (configDataMap) => {
  let (width, height, depth, widthSegment, heightSegment, depthSegment) =
    _getConfig(configDataMap);
  let faceDataTuple = _buildFaceData(width, height, depth);
  _buildAllFaceDirectionDataTupleArr(widthSegment, heightSegment, depthSegment)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (pointsTuple, directionDataTuple) =>
           pointsTuple |> _generateFace(directionDataTuple, faceDataTuple)
       ),
       (WonderCommonlib.ArraySystem.createEmpty(), WonderCommonlib.ArraySystem.createEmpty())
     )
};

let _computeData = (index: int, state: StateDataType.state) =>
  switch (GeometryConfigDataCommon.getConfigData(index, state)) {
  | None => ExceptionHandleSystem.throwMessage("configData should exist")
  | Some(configDataMap) =>
    let (vertices, indices) = _generateAllFaces(configDataMap);
    {vertices, indices}
  };

let create = (state: StateDataType.state) => {
  open StateDataType;
  let (state, index) = GeometryCreateCommon.create(state);
  getGeometryData(state).computeDataFuncMap
  |> WonderCommonlib.SparseMapSystem.set(index, _computeData)
  |> ignore;
  (state, index)
};