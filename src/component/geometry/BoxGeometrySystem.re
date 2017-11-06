open GeometryType;

open BoxGeometryType;

open GeometryStateUtils;

/* let setConfigData = (geometry:geometry, configData:HashMapSystem.t (float), state:StateDataType.state) => { */
let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  open JsObjUtils;
  let data = getGeometryData(state);
  let configDataHashMap =
    HashMapSystem.createEmpty()
    |> HashMapSystem.set("width", getValueFromJsObj(configData##width, 10.))
    |> HashMapSystem.set("height", getValueFromJsObj(configData##height, 10.))
    |> HashMapSystem.set("depth", getValueFromJsObj(configData##depth, 10.))
    |> HashMapSystem.set("widthSegments", getValueFromJsObj(configData##widthSegments, 1.))
    |> HashMapSystem.set("heightSegments", getValueFromJsObj(configData##heightSegments, 1.))
    |> HashMapSystem.set("depthSegments", getValueFromJsObj(configData##depthSegments, 1.));
  getGeometryData(state).configDataMap
  |> HashMapSystem.set(Js.Int.toString(geometry), configDataHashMap)
  |> ignore;
  state
};

let _computeData = (index: int, state: StateDataType.state) =>
  switch (GeometrySystem.getConfigData(index, state)) {
  | None => ExceptionHandlerSystem.throwMessage("configData should exist")
  | Some(configDataMap) =>
    let width = HashMapSystem.unsafeGet("width", configDataMap);
    let height = HashMapSystem.unsafeGet("height", configDataMap);
    let depth = HashMapSystem.unsafeGet("depth", configDataMap);
    let widthSegments = HashMapSystem.unsafeGet("widthSegments", configDataMap);
    let heightSegments = HashMapSystem.unsafeGet("heightSegments", configDataMap);
    let depthSegments = HashMapSystem.unsafeGet("depthSegments", configDataMap);
    /* let {
           width,
       height,
       depth,
       widthSegments,
       heightSegments,
       depthSegments
       } */
    /* let sides = {
           front: 0,
           back: 1,
           top: 2,
           bottom: 3,
           right: 4,
           left: 5
       }; */
    let (front, back, top, bottom, right, left) = (0, 1, 2, 3, 4, 5);
    let vertices = ArraySystem.createEmpty();
    let indices = ArraySystem.createEmpty();
    let faceAxes = [|
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
    |];
    /* let faceNormals = [
           [0, 0, 1], // front
           [0, 0, -1], // back
           [0, 1, 0], // top
           [0, -1, 0], // bottom
           [1, 0, 0], // right
           [-1, 0, 0]  // left
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
      (-. width, -. height, depth),
      (width, -. height, depth),
      (width, height, depth),
      (-. width, height, depth),
      (width, -. height, -. depth),
      (-. width, -. height, -. depth),
      (-. width, height, -. depth),
      (width, height, -. depth)
    |];
    let _generateFace = (side: int, uSegments: int, vSegments: int) => {
      /* let x, y, z, u, v; */
      /* let i, j; */
      let offset: int = Js.Array.length(vertices) / 3;
      for (i in 0 to uSegments) {
        for (j in 0 to vSegments) {
          let temp1 =
            Vector3System.lerp(
              corners[faceAxes[side][0]],
              corners[faceAxes[side][1]],
              float_of_int(i) /. float_of_int(uSegments)
            );
          let temp2 =
            Vector3System.lerp(
              corners[faceAxes[side][0]],
              corners[faceAxes[side][2]],
              float_of_int(j) /. float_of_int(vSegments)
            );
          let temp3 = Vector3System.sub(Vector3Type.Float, temp2, corners[faceAxes[side][0]]);
          let (vx, vy, vz) = Vector3System.add(Vector3Type.Float, temp1, temp3);
          vertices |> ArraySystem.pushMany([|vx, vy, vz|]) |> ignore;
          if (i < uSegments && j < vSegments) {
            indices
            |> ArraySystem.pushMany([|
                 offset + j + i * (uSegments + 1),
                 offset + j + (i + 1) * (uSegments + 1),
                 offset + j + i * (uSegments + 1) + 1,
                 offset + j + (i + 1) * (uSegments + 1),
                 offset + j + (i + 1) * (uSegments + 1) + 1,
                 offset + j + i * (uSegments + 1) + 1
               |])
            /* |> Js.Array.pushMany([|
                 offset + j + (i + 1) * (uSegments + 1),
                 offset + j + (i + 1) * (uSegments + 1) + 1,
                 offset + j + i * (uSegments + 1) + 1
               |]) */
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
    _generateFace(front, int_of_float(widthSegments), int_of_float(heightSegments));
    _generateFace(back, int_of_float(widthSegments), int_of_float(heightSegments));
    _generateFace(top, int_of_float(widthSegments), int_of_float(depthSegments));
    _generateFace(bottom, int_of_float(widthSegments), int_of_float(depthSegments));
    _generateFace(right, int_of_float(depthSegments), int_of_float(heightSegments));
    _generateFace(left, int_of_float(depthSegments), int_of_float(heightSegments));
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
  data.computeDataFuncMap |> HashMapSystem.set(Js.Int.toString(index), _computeData) |> ignore;
  (state, index)
};