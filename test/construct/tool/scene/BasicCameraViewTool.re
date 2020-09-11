open Js.Typed_array;

let isBasicCameraView = cameraView => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraView->BasicCameraViewEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getBasicCameraView().maxIndex;
};
