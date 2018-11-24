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
    [|5, 0, 6|],
  |],
  [|
    /* front */
    [|0., 0., 1.|],
    /* back */
    [|0., 0., (-1.)|],
    /* top */
    [|0., 1., 0.|],
    /* bottom */
    [|0., (-1.), 0.|],
    /* right */
    [|1., 0., 0.|],
    /* left */
    [|(-1.), 0., 0.|],
  |],
  [|
    (-. width, -. height, depth),
    (width, -. height, depth),
    (width, height, depth),
    (-. width, height, depth),
    (width, -. height, -. depth),
    (-. width, -. height, -. depth),
    (-. width, height, -. depth),
    (width, height, -. depth),
  |],
);

let _getLerpData =
    (
      (faceAxes, corners),
      (side, segment),
      (cornerIndex1, cornerIndex2, segmentIndex),
    ) =>
  Vector3Service.lerp(
    corners[faceAxes[side][cornerIndex1]],
    corners[faceAxes[side][cornerIndex2]],
    float_of_int(segmentIndex) /. float_of_int(segment),
  );

let _generateVertex =
    (
      (side: int, uSegment: int, vSegment: int),
      (faceAxes, corners),
      (uSegmentIndex, vSegmentIndex),
      vertices,
    ) => {
  let (vx, vy, vz) =
    Vector3Service.add(
      Vector3Type.Float,
      _getLerpData(
        (faceAxes, corners),
        (side, uSegment),
        (0, 1, uSegmentIndex),
      ),
      Vector3Service.sub(
        Vector3Type.Float,
        _getLerpData(
          (faceAxes, corners),
          (side, vSegment),
          (0, 2, vSegmentIndex),
        ),
        corners[faceAxes[side][0]],
      ),
    );
  vertices |> WonderCommonlib.ArrayService.pushMany([|vx, vy, vz|]) |> ignore;
};

let _generateTexCoord = (u, v, texCoords) =>
  texCoords |> WonderCommonlib.ArrayService.pushMany([|u, v|]) |> ignore;

let _generateNormal = (side, faceNormals, normals) =>
  normals
  |> WonderCommonlib.ArrayService.pushMany([|
       faceNormals[side][0],
       faceNormals[side][1],
       faceNormals[side][2],
     |])
  |> ignore;

let _generateIndex =
    ((uSegment, vSegment, offset), (uSegmentIndex, vSegmentIndex), indices) =>
  switch (uSegmentIndex, vSegmentIndex) {
  | (i, j) when i < uSegment && j < vSegment =>
    indices
    |> WonderCommonlib.ArrayService.pushMany([|
         offset + j + i * (uSegment + 1),
         offset + j + (i + 1) * (uSegment + 1),
         offset + j + i * (uSegment + 1) + 1,
         offset + j + (i + 1) * (uSegment + 1),
         offset + j + (i + 1) * (uSegment + 1) + 1,
         offset + j + i * (uSegment + 1) + 1,
       |])
    |> ignore
  | (_, _) => ()
  };

let _generateFace =
    (
      (side, uSegment, vSegment) as directionDataTuple,
      (faceAxes, faceNormals, corners),
      (vertices, texCoords, normals, indices),
    ) => {
  let (side: int, uSegment: int, vSegment: int) = directionDataTuple;
  let offset: int = Js.Array.length(vertices) / 3;
  for (i in 0 to uSegment) {
    for (j in 0 to vSegment) {
      let segmentIndexTuple = (i, j);
      _generateVertex(
        directionDataTuple,
        (faceAxes, corners),
        segmentIndexTuple,
        vertices,
      );
      _generateTexCoord(
        NumberType.intToFloat(i) /. NumberType.intToFloat(uSegment),
        NumberType.intToFloat(j) /. NumberType.intToFloat(vSegment),
        texCoords,
      );
      _generateNormal(side, faceNormals, normals);
      _generateIndex(
        (uSegment, vSegment, offset),
        segmentIndexTuple,
        indices,
      );
    };
  };
  (vertices, texCoords, normals, indices);
};

let _buildAllFaceDirectionDataTupleArr =
    (widthSegment, heightSegment, depthSegment) => [|
  (0, widthSegment, heightSegment),
  (1, widthSegment, heightSegment),
  (2, widthSegment, depthSegment),
  (3, widthSegment, depthSegment),
  (4, depthSegment, heightSegment),
  (5, depthSegment, heightSegment),
|];

let generateAllFaces =
    ((width, height, depth, widthSegment, heightSegment, depthSegment)) => {
  let faceDataTuple = _buildFaceData(width, height, depth);
  _buildAllFaceDirectionDataTupleArr(
    widthSegment,
    heightSegment,
    depthSegment,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. pointsTuple, directionDataTuple) =>
         pointsTuple |> _generateFace(directionDataTuple, faceDataTuple),
       (
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
       ),
     );
};