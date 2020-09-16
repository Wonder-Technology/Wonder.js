type t =
  | LocalToWorldMatrix(TransformPOType.localToWorldMatrix);

let create = value => LocalToWorldMatrix(value);

let value = mat =>
  switch (mat) {
  | LocalToWorldMatrix(value) => value
  };

let fromTranslationRotationScale = (result, position, rotation, scale) => {
  result
  ->value
  ->Matrix4.fromTranslationRotationScale(
      position->PositionVO.value,
      rotation->RotationVO.value,
      scale->ScaleVO.value,
    )
  ->create;
};

let multiply = (result, mat1, mat2) => {
  result->value->Matrix4.multiply(mat1->value, mat2->value)->create;
};

let getTranslation = mat => {
  Matrix4.getTranslationTuple(mat->value)->PositionVO.create;
};

let getRotation = mat => {
  Matrix4.getRotationTuple(mat->value)->RotationVO.create;
};

let getScale = mat => {
  Matrix4.getScaleTuple(mat->value)->ScaleVO.create;
};

let getEulerAngles = mat => {
  Matrix4.getEulerAngles(mat->value)
  ->Tuple3.map(AngleVO.create)
  ->EulerAnglesVO.create;
};

let invert = (result, mat) => {
  result->Matrix4.invert(mat->value);
};
