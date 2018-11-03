open StateDataMainType;

open WDType;

let batchSetDirectionLightData =
    ({directionLights}, directionLightArr, state) =>
  directionLights
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, {color, intensity}: WDType.directionLight, index) => {
         let index = directionLightArr[index];

         {
           ...state,
           directionLightRecord:
             RecordDirectionLightMainService.getRecord(state)
             |> OperateDirectionLightService.setColor(index, color)
             |> OperateDirectionLightService.setIntensity(index, intensity)
             |. Some,
         };
       },
       state,
     );

let batchSetPointLightData = ({pointLights}, pointLightArr, state) =>
  pointLights
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         state,
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
             RecordPointLightMainService.getRecord(state)
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
             |> OperatePointLightService.setRange(index, range)
             |. Some,
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