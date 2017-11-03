open GeometryType;

open BoxGeometryType;

open GeometryStateUtils;

let _getConfigData = (geometry: geometry, state: StateDataType.state) =>
  getGeometryData(state).configMap |> HashMapSystem.get(geometry);

/* let setConfigData = (geometry:geometry, configData:HashMapSystem.t (float), state:StateDataType.state) => { */
let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  open JsObjUtils;
  let data = getGeometryData(state);
  let configDataHashMap =
    HashMapSystem.createEmpty()
    |> HashMapSystem.set("width", getValueFromJsObj(configData##width, 10))
    |> HashMapSystem.set("height", getValueFromJsObj(configData##height, 10))
    |> HashMapSystem.set("depth", getValueFromJsObj(configData##depth, 10))
    |> HashMapSystem.set("widthSegments", getValueFromJsObj(configData##widthSegments, 1))
    |> HashMapSystem.set("heightSegments", getValueFromJsObj(configData##heightSegments, 1))
    |> HashMapSystem.set("depthSegments", getValueFromJsObj(configData##depthSegments, 1));
  getGeometryData(state).configDataMap |> HashMapSystem.set(geometry, configDataHashMap) |> ignore;
  state
};

let _computeData = (index: int, configDataMap) =>
  switch (_getConfigData(index, configDataMap)) {
  | None => ExceptionHandlerSystem.throwMessage("configData should exist")
  | Some(configDataHashMap) =>
    let width = HashMapSystem.unsafeGet("width", configDataHashMap);
    let height = HashMapSystem.unsafeGet("height", configDataHashMap);
    let depth = HashMapSystem.unsafeGet("depth", configDataHashMap);
    let widthSegments = HashMapSystem.unsafeGet("widthSegments", configDataHashMap);
    let heightSegments = HashMapSystem.unsafeGet("heightSegments", configDataHashMap);
    let depthSegments = HashMapSystem.unsafeGet("depthSegments", configDataHashMap);
    /* let {
           width,
       height,
       depth,
       widthSegments,
       heightSegments,
       depthSegments
       } */
    /* let sides = {
           FRONT: 0,
           BACK: 1,
           TOP: 2,
           BOTTOM: 3,
           RIGHT: 4,
           LEFT: 5
       }; */
    let (FRONT, BACK, TOP, BOTTOM, RIGHT, LEFT) = (0, 1, 2, 3, 4, 5);
    let vertices = ArraySystem.createEmpty();
    let indices = ArraySystem.createEmpty();
    let faceAxes = [|
      /* FRONT */
      [|0, 1, 3|],
      /* BACK */
      [|4, 5, 7|],
      /* TOP */
      [|3, 2, 6|],
      /* BOTTOM */
      [|1, 0, 4|],
      /* RIGHT */
      [|1, 4, 2|],
      /* LEFT */
      [|5, 0, 6|]
    |];
    /* let faceNormals = [
           [0, 0, 1], // FRONT
           [0, 0, -1], // BACK
           [0, 1, 0], // TOP
           [0, -1, 0], // BOTTOM
           [1, 0, 0], // RIGHT
           [-1, 0, 0]  // LEFT
       ]; */
    /* let corners = [
           Vector3.create(-width, -height, depth),
           Vector3.create(width, -height, depth),
           Vector3.create(width, height, depth),
           Vector3.create(-width, height, depth),
           Vector3.create(width, -height, -depth),
           Vector3.create(-width, -height, -depth),
           Vector3.create(-width, height, -depth),
           Vector3.create(width, height, -depth)
       ]; */
    let corners = [|
      (- width, - height, depth),
      (width, - height, depth),
      (width, height, depth),
      (- width, height, depth),
      (width, - height, - depth),
      (- width, - height, - depth),
      (- width, height, - depth),
      (width, height, - depth)
    |];
    let _generateFace = (side, uSegments, vSegments) => {
      /* let x, y, z, u, v; */
      /* let i, j; */
      let offset: int = ArraySystem.length(vertices) / 3;
      for (i in 0 to uSegments) {
        for (j in 0 to vSegments) {
          let temp1 =
            Vector3System.lerp(
              corners[faceAxes[side][0]],
              corners[faceAxes[side][1]],
              i / uSegments
            );
          let temp2 =
            Vector3System.lerp(
              corners[faceAxes[side][0]],
              corners[faceAxes[side][2]],
              j / vSegments
            );
          let temp3 = Vector3System.sub(Vector3Type.Float, temp2, corners[faceAxes[side][0]]);
          let (vx, vy, vz) = Vector3System.add(Vector3Type.Float, temp1, temp3);
          vertices |> ArraySystem.pushMany([|vx, vy, vz|]) |> ignore;
          if (i < uSegments && j < vSegments) {
            indices
            |> ArraySystem.pushMany([|
                 offset + j + i * (uSegments + 1),
                 offset + j + (i + 1) * (uSegments + 1),
                 offset + j + i * (uSegments + 1) + 1
               |])
            |> ArraySystem.pushMany([|
                 offset + j + (i + 1) * (uSegments + 1),
                 offset + j + (i + 1) * (uSegments + 1) + 1,
                 offset + j + i * (uSegments + 1) + 1
               |])
            |> ignore
          } else {
            ()
          }
        }
      }
      /* for (i = 0; i <= uSegments; i++) {
             for (j = 0; j <= vSegments; j++) {
                 /* let temp1 = GlobalTempData.vector3_1,
                     temp2 = GlobalTempData.vector3_2,
                     temp3 = GlobalTempData.vector3_3,
                     r = GlobalTempData.vector3_4; */

                 temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                 temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                 temp3.sub2(temp2, corners[faceAxes[side][0]]);
                 r.add2(temp1, temp3);
                 u = i / uSegments;
                 v = j / vSegments;

                 vertices.push(r.x, r.y, r.z);
                 /* normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]); */
                 /* texCoords.push(u, v); */

                 if ((i < uSegments) && (j < vSegments)) {
                     indices.push(offset + j + i * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1), offset + j + i * (uSegments + 1) + 1);
                     indices.push(offset + j + (i + 1) * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1) + 1, offset + j + i * (uSegments + 1) + 1);

                 }
             }
         } */
    };
    _generateFace(FRONT, widthSegments, heightSegments);
    _generateFace(BACK, widthSegments, heightSegments);
    _generateFace(TOP, widthSegments, depthSegments);
    _generateFace(BOTTOM, widthSegments, depthSegments);
    _generateFace(RIGHT, depthSegments, heightSegments);
    _generateFace(LEFT, depthSegments, heightSegments);
    {
      vertices,
      /* normals: normals,
         texCoords: texCoords, */
      indices
    }
  };

let create = (state: StateDataType.state) => {
  let (state, index) = GeometrySystem.create(state);
  let data = getGeometryData(state);
  data.computeDataFuncMap |> HashMapSystem.set(index, _computeData) |> ignore;
  (state, index)
};