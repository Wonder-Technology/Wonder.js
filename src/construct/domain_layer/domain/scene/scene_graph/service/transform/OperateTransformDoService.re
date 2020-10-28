open SceneGraphType;

let getLocalPosition = ({localPosition}) => {
  localPosition->PositionVO.create;
};

let getLocalRotation = ({localRotation}) => {
  localRotation->RotationVO.create;
};

let getLocalScale = ({localScale}) => {
  localScale->ScaleVO.create;
};

let getPosition = ({worldPosition}) => {
  worldPosition->PositionVO.create;
};

let getRotation = ({worldRotation}) => {
  worldRotation->RotationVO.create;
};

let getScale = ({worldScale}) => {
  worldScale->ScaleVO.create;
};

let getLocalToWorldMatrix = ({localToWorldMatrix}) => {
  localToWorldMatrix->LocalToWorldMatrixVO.create;
};

let getNormalMatrix = ({normalMatrix}) => {
  normalMatrix->NormalMatrixVO.create;
};
