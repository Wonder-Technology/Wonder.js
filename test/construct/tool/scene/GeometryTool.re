open Js.Typed_array;

let isGeometry = geometry => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(geometry->GeometryEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getExnGeometry().maxIndex;
};
