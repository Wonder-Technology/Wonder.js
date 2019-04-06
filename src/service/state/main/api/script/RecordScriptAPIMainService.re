let create = () => {
  "unsafeGetScriptAttribute":
    (. script, scriptAttributeName, state) =>
      OperateScriptDataMainService.unsafeGetScriptAttribute(
        script,
        scriptAttributeName,
        state,
      ),
  "unsafeGetScriptAttributeFieldValue":
    (. fieldName, attribute) =>
      OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldValue(
        fieldName,
        attribute,
      ),
  "setScriptAttributeFieldValue":
    (. script, (scriptAttributeName, fieldName, value), state) =>
      OperateScriptDataMainService.setScriptAttributeFieldValue(
        script,
        (scriptAttributeName, fieldName, value),
        state,
      ),
  "unsafeGetScriptGameObject":
    (. script, state) => ScriptAPI.unsafeGetScriptGameObject(script, state),
  "getTransformLocalPosition":
    (. transform, state) =>
      TransformAPI.getTransformLocalPosition(transform, state),
  "setTransformLocalPosition":
    (. transform, localPosition, state) =>
      TransformAPI.setTransformLocalPosition(transform, localPosition, state),
  "unsafeGetGameObjectTransformComponent":
    (. gameObject, state) =>
      GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
  "disposeGameObject":
    (. gameObject, state) =>
      GameObjectAPI.disposeGameObject(gameObject, state),
};