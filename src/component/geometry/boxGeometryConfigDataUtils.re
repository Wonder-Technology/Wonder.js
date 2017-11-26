open GeometryType;

open BoxGeometryType;

open GeometryStateUtils;

let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  open JsObjUtils;
  let configDataHashMap =
    WonderCommonlib.HashMapSystem.createEmpty()
    |> WonderCommonlib.HashMapSystem.set("width", getValueFromJsObj(configData##width, 10.))
    |> WonderCommonlib.HashMapSystem.set("height", getValueFromJsObj(configData##height, 10.))
    |> WonderCommonlib.HashMapSystem.set("depth", getValueFromJsObj(configData##depth, 10.))
    |> WonderCommonlib.HashMapSystem.set(
         "widthSegment",
         getValueFromJsObj(configData##widthSegment, 1.)
       )
    |> WonderCommonlib.HashMapSystem.set(
         "heightSegment",
         getValueFromJsObj(configData##heightSegment, 1.)
       )
    |> WonderCommonlib.HashMapSystem.set(
         "depthSegment",
         getValueFromJsObj(configData##depthSegment, 1.)
       );
  getGeometryData(state).configDataMap
  |> SparseMapSystem.set(geometry, configDataHashMap)
  |> ignore;
  state
};