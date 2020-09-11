type t =
  | EulerAngles((AngleVO.t, AngleVO.t, AngleVO.t));

let create = value => EulerAngles(value);

let value = eulerAngles =>
  switch (eulerAngles) {
  | EulerAngles(value) => value
  };

let getPrimitiveValue = eulerAngles =>
  eulerAngles->value->Tuple3.map(AngleVO.value);

let convertToQuaternion = eulerAngles => {
  eulerAngles->getPrimitiveValue->Quaternion.setFromEulerAngles;
};
