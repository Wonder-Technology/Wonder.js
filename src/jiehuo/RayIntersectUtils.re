open ShapeType;

let _at = (t, {origin, direction}: RayType.ray) =>
  Vector3_JieHuo_Service.multiplyScalar(direction, t)
  |> Vector3Service.add(Vector3Type.Float, _, origin);

/* let checkIntersectPlane =
     ({normal, constant} as plane, ({origin, direction}: RayType.ray) as ray) =>
   switch (RayUtils.distanceToPlane(plane, ray)) {
   | None => None
   | Some(t) => Some(_at(t, ray))
   }; */

let isIntersectAABB =
    ({min, max}, ({origin, direction}: RayType.ray) as ray) => {
  let (originX, originY, originZ) = origin;
  let (directionX, directionY, directionZ) = direction;
  let (minX, minY, minZ) = min;
  let (maxX, maxY, maxZ) = max;

  let invdirx = 1. /. directionX;
  let invdiry = 1. /. directionY;
  let invdirz = 1. /. directionZ;

  let (tmin, tmax) =
    if (invdirx >= 0.) {
      ((minX -. originX) *. invdirx, (maxX -. originX) *. invdirx);
    } else {
      ((maxX -. originX) *. invdirx, (minX -. originX) *. invdirx);
    };

  let (tymin, tymax) =
    if (invdiry >= 0.) {
      ((minY -. originY) *. invdiry, (maxY -. originY) *. invdiry);
    } else {
      ((maxY -. originY) *. invdiry, (minY -. originY) *. invdiry);
    };

  if (tmin > tymax || tymin > tmax) {
    false;
  } else {
    /* These lines also handle the case where tmin or tmax is NaN
       (result of 0 * Infinity). x !== x returns true if x is NaN */

    let tmin = tymin > tmin || tmin !== tmin ? tymin : tmin;

    let tmax = tymax < tmax || tmax !== tmax ? tymax : tmax;

    let (tzmin, tzmax) =
      if (invdirz >= 0.) {
        ((minZ -. originZ) *. invdirz, (maxZ -. originZ) *. invdirz);
      } else {
        ((maxZ -. originZ) *. invdirz, (minZ -. originZ) *. invdirz);
      };

    if (tmin > tzmax || tzmin > tmax) {
      false;
    } else {
      let tmin = tzmin > tmin || tmin !== tmin ? tzmin : tmin;

      let tmax = tzmax < tmax || tmax !== tmax ? tzmax : tmax;

      if (tmax < 0.) {
        false;
      } else {
        true;
            /* _at(ray, tmin >= 0. ? tmin : tmax) |. Some; */
      };
    };
  };
};

let isIntersectOBB =
    (aabb, localToWorldMatrix, ({origin, direction}: RayType.ray) as ray) => {
  let inverseMatrix =
    Matrix4Service.invert(
      localToWorldMatrix,
      Matrix4Service.createIdentityMatrix4(),
    );

  let ray = RayUtils.applyMatrix4(ray, inverseMatrix);

  isIntersectAABB(aabb, ray);
};

let isIntersectSphere =
    ({center, radius}, ({origin, direction}: RayType.ray) as ray) => {
  let v1 = Vector3Service.sub(Vector3Type.Float, origin, center);

  let b = Vector3_JieHuo_Service.dot(direction, v1);

  let c = Vector3_JieHuo_Service.dot(v1, v1) -. radius *. radius;

  let v2 = b *. b -. c;

  v2 < 0. ?
    false :
    {
      let sqrtV2 = Js.Math.sqrt(v2);

      let t0 = -. b +. sqrtV2;
      let t1 = -. b -. sqrtV2;

      t0 < 0. && t1 < 0. ? false : true;
    };
};

let _checkIntersectTriangleForFrontCull =
    (
      (det, edge1, edge2, pvec),
      (v0, v1, v2),
      {origin, direction}: RayType.ray,
    ) => {
  let inv_det = 1. /. det;

  let tvec = Vector3Service.sub(Vector3Type.Float, origin, v0);

  let u = Vector3_JieHuo_Service.dot(tvec, pvec) *. inv_det;

  u < 0. || u > 1. ?
    None :
    {
      let qvec = Vector3Service.cross(tvec, edge1);

      let v = Vector3_JieHuo_Service.dot(direction, qvec) *. inv_det;

      v < 0. || u +. v > 1. ?
        None :
        {
          let t = Vector3_JieHuo_Service.dot(edge2, qvec) *. inv_det;

          Some(
            Vector3Service.add(
              Vector3Type.Float,
              origin,
              Vector3_JieHuo_Service.multiplyScalar(direction, t),
            ),
          );
          /* var t = dot(edge2, qvec) *. inv_det;
             out[0] = origin[0] + t * direction[0];
             out[1] = origin[1] + t * direction[1];
             out[2] = origin[2] + t * direction[2];
             return out; */
        };
    };
};

let _checkIntersectTriangleForBackAndNoneCull =
    (
      cullType: RayType.cull,
      (va, vb, vc),
      ({origin, direction}: RayType.ray) as ray,
    ) => {
  let edge1 = Vector3Service.sub(Vector3Type.Float, vb, va);

  let edge2 = Vector3Service.sub(Vector3Type.Float, vc, va);

  let normal = Vector3Service.cross(edge1, edge2);

  /*
        //from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

   Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
      E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
        |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
           |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N) */

  let ddn = Vector3_JieHuo_Service.dot(direction, normal);
  let sign = 0.;

  let isBackfaceCulling =
    switch (cullType) {
    | Back => true
    | None => false
    };

  let (isEndCheck, sign, ddn) =
    if (ddn > 0.) {
      isBackfaceCulling ? (Some(false), sign, ddn) : (None, 1., ddn);
    } else if (ddn < 0.) {
      (None, (-1.), -. ddn);
    } else {
      (Some(false), sign, ddn);
    };

  switch (isEndCheck) {
  | Some(isIntersect) => None
  | None =>
    let diff = Vector3Service.sub(Vector3Type.Float, origin, va);

    let edge2 = Vector3Service.cross(diff, edge2);

    let ddqxe2 =
      sign
      *. Vector3_JieHuo_Service.dot(
           direction,
           /* Vector3Service.cross(diff, edge2), */
           edge2,
         );

    /* b1 < 0, no intersection */
    if (ddqxe2 < 0.) {
      None;
    } else {
      let dde1xq =
        sign
        *. Vector3_JieHuo_Service.dot(
             direction,
             Vector3Service.cross(edge1, diff),
           );

      /* b2 < 0, no intersection */
      if (dde1xq < 0.) {
        None;
      } else if
        /* b1+b2 > 1, no intersection */
        (ddqxe2 +. dde1xq > ddn) {
        None;
      } else {
        /* Line intersects triangle, check if ray does. */
        let qdn = -. sign *. Vector3_JieHuo_Service.dot(diff, normal);

        qdn < 0. ? None : Some(_at(qdn /. ddn, ray));
      };
    };
  };
};

let checkIntersectTriangle =
    (
      cullType: RayType.cull,
      (va, vb, vc),
      ({origin, direction}: RayType.ray) as ray,
    ) =>
  switch (cullType) {
  | Both => None
  | Front =>
    let epsilon = 0.000001;

    let edge1 = Vector3Service.sub(Vector3Type.Float, vb, va);

    let edge2 = Vector3Service.sub(Vector3Type.Float, vc, va);

    let pvec = Vector3Service.cross(direction, edge2);

    let det = Vector3_JieHuo_Service.dot(edge1, pvec);

    det > epsilon ?
      None :
      _checkIntersectTriangleForFrontCull(
        (det, edge1, edge2, pvec),
        (va, vb, vc),
        {origin, direction}: RayType.ray,
      );
  | _ =>
    _checkIntersectTriangleForBackAndNoneCull(cullType, (va, vb, vc), ray)
  };

/*
 need fix bug: when ray->origin is in the model, sometimes the intersected point is the opposite point of the two intersected points!


 let _checkIntersectTriangleForFrontAndNoneCull =_checkIntersectTriangleForFrontCull;

 let checkIntersectTriangle =
      (
        cullType: RayType.cull,
        v0,
        v1,
        v2,
        {origin, direction}: RayType.ray,
      ) =>
    switch (cullType) {
    | Both => None
    | _ =>
      let epsilon = 0.000001;

      let edge1 =
        Vector3Service.sub(Vector3Type.Float, v1, v0);

      let edge2 =
        Vector3Service.sub(Vector3Type.Float, v2, v0);

      let pvec = Vector3Service.cross(direction, edge2);

      let det = Vector3_JieHuo_Service.dot(edge1, pvec);

      switch (cullType) {
      | Back =>
        det < epsilon ?
          None :
          {
            let tvec =
              Vector3Service.sub(
                Vector3Type.Float,
                origin,
                v0,
              );

            let u = Vector3_JieHuo_Service.dot(tvec, pvec);

            u < 0. || u > det ?
              None :
              {
                let qvec = Vector3Service.cross(tvec, edge1);

                let v = Vector3_JieHuo_Service.dot(direction, qvec);

                v < 0. || u +. v > det ?
                  None :
                  {
                    let t = Vector3_JieHuo_Service.dot(edge2, qvec) /. det;

                    /* var t = dot(edge2, qvec) / det;
                       out[0] = origin[0] + t * direction[0];
                       out[1] = origin[1] + t * direction[1];
                       out[2] = origin[2] + t * direction[2];
                       return out; */
                    Some(
                      Vector3Service.add(
                        Vector3Type.Float,
                        origin,
                        Vector3_JieHuo_Service.multiplyScalar(direction, t),
                      ),
                    );
                  };
              };
          }
      | Front =>
        det > epsilon ?
          None :
          _checkIntersectTriangleForFrontAndNoneCull(
            (det, edge1, edge2, pvec),
            v0,
            v1,
            v2,
            {origin, direction},
          )
      | None =>
        det > -. epsilon && det < epsilon ?
          None :
          _checkIntersectTriangleForFrontAndNoneCull(
            (det, edge1, edge2, pvec),
            v0,
            v1,
            v2,
            {origin, direction},
          )
      };
    }; */