open StateDataMainType;

let getAmbientLightIndex = lightDataArr =>
  (lightDataArr |> Js.Array.length) - 1;

let build = (lightDataMap, {directionLightRecord, pointLightRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(lightDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  lightDataMap
  |> SparseMapService.reduceValid(
       (. lightDataArr, (type_, light)) =>
         switch (type_) {
         | "directional" =>
           lightDataArr
           |> ArrayService.push(
                {
                  type_,
                  color:
                    Some(
                      OperateDirectionLightService.getColor(
                        light,
                        directionLightRecord,
                      ),
                    ),
                  intensity:
                    Some(
                      OperateDirectionLightService.getIntensity(
                        light,
                        directionLightRecord,
                      ),
                    ),
                  constantAttenuation: None,
                  linearAttenuation: None,
                  quadraticAttenuation: None,
                  range: None,
                }: GenerateSceneGraphType.lightData,
              )

         | "point" =>
           lightDataArr
           |> ArrayService.push(
                {
                  type_,
                  color:
                    Some(
                      OperatePointLightService.getColor(
                        light,
                        pointLightRecord,
                      ),
                    ),
                  intensity:
                    Some(
                      OperatePointLightService.getIntensity(
                        light,
                        pointLightRecord,
                      ),
                    ),
                  constantAttenuation:
                    Some(
                      OperatePointLightService.getConstant(
                        light,
                        pointLightRecord,
                      ),
                    ),
                  linearAttenuation:
                    Some(
                      OperatePointLightService.getLinear(
                        light,
                        pointLightRecord,
                      ),
                    ),
                  quadraticAttenuation:
                    Some(
                      OperatePointLightService.getQuadratic(
                        light,
                        pointLightRecord,
                      ),
                    ),
                  range:
                    Some(
                      OperatePointLightService.getRange(
                        light,
                        pointLightRecord,
                      ),
                    ),
                }: GenerateSceneGraphType.lightData,
              )
         },
       [||],
     )
  |> ArrayService.push(
       {
         type_: "ambient",
         color: Some(SceneAPI.getAmbientLightColor(state)),
         intensity: None,
         constantAttenuation: None,
         linearAttenuation: None,
         quadraticAttenuation: None,
         range: None,
       }: GenerateSceneGraphType.lightData,
     );
};