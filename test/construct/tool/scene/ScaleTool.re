let create = scale => scale->ScaleVO.create;

let multiply = (s1, s2) =>
  Vector3.multiply(Vector3.Float, s1->ScaleVO.value, s2->ScaleVO.value)
  ->ScaleVO.create;
