let replaceMaterial =
    (
      (sourceMaterial, targetMaterial),
      gameObject,
      (disposeSourceMaterialFunc, addTargetMaterialFunc),
      state,
    ) =>
  ReplaceMaterialMainService.replaceMaterial(
    (sourceMaterial, targetMaterial),
    gameObject,
    (disposeSourceMaterialFunc, addTargetMaterialFunc),
    state,
  );