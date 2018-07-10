open StateDataMainType;

open WDType;

let batchSetDirectionLightData =
    ({directionLights}, directionLightArr, state) =>
  directionLights
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         {directionLightRecord} as state,
         {color, intensity}: WDType.directionLight,
         index,
       ) => {
         let mappedIndex =
           directionLightArr[index]
           |. MappedIndexService.getMappedIndex(
                IndexDirectionLightService.getMappedIndexMap(
                  directionLightRecord,
                ),
              );

         {
           ...state,
           directionLightRecord:
             directionLightRecord
             |> OperateDirectionLightService.setColor(mappedIndex, color)
             |> OperateDirectionLightService.setIntensity(
                  mappedIndex,
                  intensity,
                ),
         };
       },
       state,
     );

let batchSetPointLightData = ({pointLights}, pointLightArr, state) =>
  pointLights
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         {pointLightRecord} as state,
         {
           color,
           intensity,
           constantAttenuation,
           linearAttenuation,
           quadraticAttenuation,
           range,
         }: WDType.pointLight,
         index,
       ) => {
         let mappedIndex =
           pointLightArr[index]
           |. MappedIndexService.getMappedIndex(
                IndexPointLightService.getMappedIndexMap(pointLightRecord),
              );

         {
           ...state,
           pointLightRecord:
             pointLightRecord
             |> OperatePointLightService.setColor(mappedIndex, color)
             |> OperatePointLightService.setIntensity(mappedIndex, intensity)
             |> OperatePointLightService.setConstant(
                  mappedIndex,
                  constantAttenuation,
                )
             |> OperatePointLightService.setLinear(
                  mappedIndex,
                  linearAttenuation,
                )
             |> OperatePointLightService.setQuadratic(
                  mappedIndex,
                  quadraticAttenuation,
                )
             |> OperatePointLightService.setRange(mappedIndex, range),
         };
       },
       state,
     );

let setAmbientLightData = ({scene}, state) => {
  let optionalAmbientLight = scene.ambientLight;

  optionalAmbientLight |> OptionService.isJsonSerializedValueNone ?
    state :
    {
      let {color}: ambientLight =
        optionalAmbientLight |> OptionService.unsafeGetJsonSerializedValue
;

      SceneAPI.setAmbientLightColor(color, state);
    };
};