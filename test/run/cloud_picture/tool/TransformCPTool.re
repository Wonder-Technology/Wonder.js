let getTransformPO = () => CPRepo.getExnTransform();

let setTwoTransformsData = (gameObject1, gameObject2) => {
  open TransformRunAPI;

  let transform1 =
    GameObjectRunAPI.getTransform(gameObject1)->OptionSt.getExn;
  let transform2 =
    GameObjectRunAPI.getTransform(gameObject2)->OptionSt.getExn;

  let pos1 = (0., 1., 0.)->PositionTool.create;
  let pos2 = (2., 1., 0.)->PositionTool.create;
  let scale1 = (1., 2., 3.)->ScaleTool.create;
  let scale2 = (5., 10., 30.)->ScaleTool.create;
  let eulerAngles1 = (1., 2., 3.)->EulerAnglesTool.createFromPrimitive;
  let eulerAngles2 = (5.5, 10., 30.)->EulerAnglesTool.createFromPrimitive;

  setLocalPosition(transform1, pos1)->ResultTool.getExnSuccessValue;
  setLocalPosition(transform2, pos2)->ResultTool.getExnSuccessValue;

  setLocalEulerAngles(transform1, eulerAngles1)
  ->ResultTool.getExnSuccessValue;
  setLocalEulerAngles(transform2, eulerAngles2)
  ->ResultTool.getExnSuccessValue;

  setLocalScale(transform1, scale1)->ResultTool.getExnSuccessValue;
  setLocalScale(transform2, scale2)->ResultTool.getExnSuccessValue;

  (
    (transform1, transform2),
    ((pos1, pos2), (eulerAngles1, eulerAngles2), (scale1, scale2)),
  );
};
