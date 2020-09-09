open Js.Typed_array;

let isDirectionLight = light => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(light->DirectionLightEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getExnDirectionLight().maxIndex;
};

let createGameObject = () => {
  let light = DirectionLightRunAPI.create()->ResultTool.getExnSuccessValue;
  let gameObject = GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

  GameObjectRunAPI.addDirectionLight(gameObject, light)
  ->ResultTool.getExnSuccessValueIgnore;

  (gameObject, light);
};

let truncateColor = color => {
  let (r, g, b) = color->Color3VO.value;

  (
    TruncateTool.truncateFloatValue(5, r),
    TruncateTool.truncateFloatValue(5, g),
    TruncateTool.truncateFloatValue(5, b),
  )
  ->Color3VO.create;
};

let getDirection = light => {
  DirectionDirectionLightDoService.getDirection(light)
  ->OptionSt.getExn
  ->DirectionVO.value
  ->Vector3Tool.truncate(3);
};
