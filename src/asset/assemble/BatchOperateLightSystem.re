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
         let index = directionLightArr[index];

         {
           ...state,
           directionLightRecord:
             directionLightRecord
             |> OperateDirectionLightService.setColor(index, color)
             |> OperateDirectionLightService.setIntensity(index, intensity),
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
         let index = pointLightArr[index];

         {
           ...state,
           pointLightRecord:
             pointLightRecord
             |> OperatePointLightService.setColor(index, color)
             |> OperatePointLightService.setIntensity(index, intensity)
             |> OperatePointLightService.setConstant(
                  index,
                  constantAttenuation,
                )
             |> OperatePointLightService.setLinear(index, linearAttenuation)
             |> OperatePointLightService.setQuadratic(
                  index,
                  quadraticAttenuation,
                )
             |> OperatePointLightService.setRange(index, range),
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
        optionalAmbientLight |> OptionService.unsafeGetJsonSerializedValue;

      SceneAPI.setAmbientLightColor(color, state);
    };
};