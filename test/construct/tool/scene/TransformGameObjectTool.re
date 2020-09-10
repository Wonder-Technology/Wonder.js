let setLocalEulerAngles = (gameObject, localEulerAngles) => {
  TransformRunAPI.setLocalEulerAngles(
    GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn,
    localEulerAngles,
  )
  ->ResultTool.getExnSuccessValueIgnore;
};

let setLocalPosition = (gameObject, localPosition) => {
  TransformRunAPI.setLocalPosition(
    GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn,
    localPosition,
  )
  ->ResultTool.getExnSuccessValueIgnore;
};

let setLocalScale = (gameObject, localScale) => {
  TransformRunAPI.setLocalScale(
    GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn,
    localScale,
  )
  ->ResultTool.getExnSuccessValueIgnore;
};
