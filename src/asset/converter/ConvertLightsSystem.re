let _getColor = color =>
  switch (color) {
  | None => [|0., 0., 0.|]
  | Some(color) => color
  };

let _getIntensity = intensity =>
  switch (intensity) {
  | None => 1.
  | Some(intensity) => intensity
  };

let _convertPointLights =
    (
      (ambientLightArr, directionLightArr, pointLightArr),
      {
        type_,
        color,
        intensity,
        constantAttenuation,
        linearAttenuation,
        quadraticAttenuation,
        range,
      }: GLTFType.light,
    ) => (
  ambientLightArr,
  directionLightArr,
  pointLightArr
  |> ArrayService.push(
       {
         color: _getColor(color),
         intensity: _getIntensity(intensity),
         constantAttenuation:
           switch (constantAttenuation) {
           | None => 1.
           | Some(constantAttenuation) => constantAttenuation
           },
         linearAttenuation:
           switch (linearAttenuation) {
           | None => 0.
           | Some(linearAttenuation) => linearAttenuation
           },
         quadraticAttenuation:
           switch (quadraticAttenuation) {
           | None => 0.
           | Some(quadraticAttenuation) => quadraticAttenuation
           },
         range:
           switch (range) {
           | None => RecordPointLightMainService.getDefaultRange()
           | Some(range) => range
           },
       }: WDType.pointLight,
     ),
);

let convertToLights = ({extensions}: GLTFType.gltf) =>
  switch (extensions) {
  | None => ([||], [||], [||])
  | Some({khr_lights}) =>
    switch (khr_lights) {
    | None => ([||], [||], [||])
    | Some({lights}) =>
      lights
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (ambientLightArr, directionLightArr, pointLightArr),
             ({type_, color, intensity}: GLTFType.light) as lightData,
           ) =>
             switch (type_) {
             | "ambient" => (
                 ambientLightArr
                 |> ArrayService.push(
                      {color: _getColor(color)}: WDType.ambientLight,
                    ),
                 directionLightArr,
                 pointLightArr,
               )
             | "directional" => (
                 ambientLightArr,
                 directionLightArr
                 |> ArrayService.push(
                      {
                        color: _getColor(color),
                        intensity: _getIntensity(intensity),
                      }: WDType.directionLight,
                    ),
                 pointLightArr,
               )
             | "point" =>
               _convertPointLights(
                 (ambientLightArr, directionLightArr, pointLightArr),
                 lightData,
               )
             | _ => (ambientLightArr, directionLightArr, pointLightArr)
             },
           ([||], [||], [||]),
         )
    }
  };