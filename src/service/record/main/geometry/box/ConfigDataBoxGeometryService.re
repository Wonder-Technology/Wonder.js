open BoxGeometryType;

open JsObjService;

let getConfigData = (geometry, record) =>
  record.configDataMap |> WonderCommonlib.SparseMapService.get(geometry);

let unsafeGetConfigData = (geometry, record) =>
  getConfigData(geometry, record) |> OptionService.unsafeGet;

let setConfigData = (geometry, configData: boxGeometryConfigDataJsObj, {configDataMap} as record) => {
  ...record,
  configDataMap:
    configDataMap
    |> WonderCommonlib.SparseMapService.set(
         geometry,
         WonderCommonlib.HashMapService.createEmpty()
         |> WonderCommonlib.HashMapService.set("width", getValueFromJsObj(configData##width, 10.))
         |> WonderCommonlib.HashMapService.set(
              "height",
              getValueFromJsObj(configData##height, 10.)
            )
         |> WonderCommonlib.HashMapService.set("depth", getValueFromJsObj(configData##depth, 10.))
         |> WonderCommonlib.HashMapService.set(
              "widthSegment",
              getValueFromJsObj(configData##widthSegment, 1.)
            )
         |> WonderCommonlib.HashMapService.set(
              "heightSegment",
              getValueFromJsObj(configData##heightSegment, 1.)
            )
         |> WonderCommonlib.HashMapService.set(
              "depthSegment",
              getValueFromJsObj(configData##depthSegment, 1.)
            )
       )
};