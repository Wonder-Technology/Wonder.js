open Js.Typed_array;

let isPerspectiveCameraProjection = cameraProjection => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraProjection->PerspectiveCameraProjectionEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getPerspectiveCameraProjection().maxIndex;
};

let getDirtyList = () =>
  CPRepo.getPerspectiveCameraProjection().dirtyList
  ->ListSt.map(PerspectiveCameraProjectionEntity.create);

let clearDirtyList = () =>
  CPRepo.setPerspectiveCameraProjection({
    ...CPRepo.getPerspectiveCameraProjection(),
    dirtyList: [],
  });
