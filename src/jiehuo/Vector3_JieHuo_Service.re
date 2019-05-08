let unproject = (vec3, cameraToWorldMatrix, projectionMatrix) =>
  Matrix4Service.multiply(
    cameraToWorldMatrix,
    Matrix4Service.invert(
      projectionMatrix,
      Matrix4Service.createIdentityMatrix4(),
    ),
    Matrix4Service.createIdentityMatrix4(),
  )
  |> Vector3Service.transformMat4Tuple(vec3);

let multiplyScalar = ((x, y, z), scalar) => (
  x *. scalar,
  y *. scalar,
  z *. scalar,
);

let addScalar = ((x, y, z), scalar) => (
  x +. scalar,
  y +. scalar,
  z +. scalar,
);

let fromBufferAttribute = (vertices, index) => {
  let vIndex = index * 3;

  (
    Js.Typed_array.Float32Array.unsafe_get(vertices, vIndex),
    Js.Typed_array.Float32Array.unsafe_get(vertices, vIndex + 1),
    Js.Typed_array.Float32Array.unsafe_get(vertices, vIndex + 2),
  );
};

let distanceToSquared = ((x, y, z), (vx, vy, vz)) => {
  let dx = x -. vx;
  let dy = y -. vy;
  let dz = z -. vz;

  dx *. dx +. dy *. dy +. dz *. dz;
};

let distanceTo = (vec, v) => Js.Math.sqrt(distanceToSquared(vec, v));

let dot = ((x, y, z), (vx, vy, vz)) => x *. vx +. y *. vy +. z *. vz;

let min = ((x, y, z), (vx, vy, vz)) => (
  x > vx ? vx : x,
  y > vy ? vy : y,
  z > vz ? vz : z,
);

let max = ((x, y, z), (vx, vy, vz)) => (
  x < vx ? vx : x,
  y < vy ? vy : y,
  z < vz ? vz : z,
);

let lengthSq = ((x, y, z)) => x *. x +. y *. y +. z *. z;

let length = vec => Js.Math.sqrt(lengthSq(vec));

let projectOnVector = (sourceVec, targetVec) => {
  let scalar = dot(targetVec, sourceVec) /. lengthSq(targetVec);

  multiplyScalar(targetVec, scalar);
};

let projectOnPlane = (planeNormal, vec) =>
  Vector3Service.sub(
    Vector3Type.Float,
    vec,
    projectOnVector(vec, planeNormal),
  );

/* let truncate = (digit, (x, y, z)) => (
     FloatService.truncateFloatValue(x, digit),
     FloatService.truncateFloatValue(y, digit),
     FloatService.truncateFloatValue(z, digit),
   );

   let isEqual = ((x, y, z), (newX, newY, newZ)) =>
     x
     |> ValueService.isValueEqual(ValueType.Float, newX)
     && y
     |> ValueService.isValueEqual(ValueType.Float, newY)
     && z
     |> ValueService.isValueEqual(ValueType.Float, newZ); */