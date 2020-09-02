open Js.Typed_array;

let isTransform = transform => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(transform->TransformEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getExnTransform().maxIndex;
};

let isDirty = transform => DirtyTransformDoService.isDirty(transform);

let getDefaultPosition = () => (0., 0., 0.)->PositionTool.create;

let getDefaultRotation = () => (0., 0., 0., 1.)->RotationTool.create;

let getDefaultScale = () => (1., 1., 1.)->ScaleTool.create;

let getDefaultLocalPosition = () =>
  CPRepo.getExnTransform().defaultLocalPosition;

let getDefaultLocalRotation = () =>
  CPRepo.getExnTransform().defaultLocalRotation;

let getDefaultLocalScale = () => CPRepo.getExnTransform().defaultLocalScale;

let getLocalToWorldMatrixTypeArray = transform => {
  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.value;
};

let getDefaultLocalToWorldMatrixTypeArray = () =>
  CPRepo.getExnTransform().defaultLocalToWorldMatrix
  ->Obj.magic
  ->Float32Array.make;

let update = transform => {
  UpdateTransformDoService.update(transform);
};
