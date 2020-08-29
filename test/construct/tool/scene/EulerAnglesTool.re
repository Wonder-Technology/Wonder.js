let create = EulerAnglesVO.create;

let createFromPrimitive = primitive =>
  primitive->Tuple3.map(AngleVO.create)->create;

let getPrimitiveValue = EulerAnglesVO.getPrimitiveValue;
