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

let getUniqueDirtyList = () => {
  // CPRepo.getPerspectiveCameraProjection().dirtyList
  // ->ListSt.map(PerspectiveCameraProjectionEntity.create);
  DirtyPerspectiveCameraProjectionDoService.getUniqueDirtyList();
};

let clearDirtyList = () =>
  CPRepo.setPerspectiveCameraProjection({
    ...CPRepo.getPerspectiveCameraProjection(),
    dirtyList: [],
  });
