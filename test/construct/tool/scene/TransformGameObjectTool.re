let setLocalEulerAngles = (gameObject, localEulerAngles) => {
  TransformRunAPI.setLocalEulerAngles(
    GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn,
    localEulerAngles,
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
