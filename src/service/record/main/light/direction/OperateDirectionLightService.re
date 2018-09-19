open DirectionLightType;

let getColor = (light, {colors}) =>
  RecordDirectionLightMainService.getColor(light, colors);

let setColor = (light, color: array(float), {colors} as record) => {
  ...record,
  colors:
    RecordDirectionLightMainService.setColor(light, color, colors),
};

let getIntensity = (light, {intensities}) =>
  RecordDirectionLightMainService.getIntensity(light, intensities);

let setIntensity = (light, intensity, {intensities} as record) => {
  ...record,
  intensities:
    RecordDirectionLightMainService.setIntensity(
      light,
      intensity,
      intensities,
    ),
};

let getIsRender = (light, {renderLightArr} as record) =>
  renderLightArr |> Js.Array.includes(light);

let setIsRender = (light, isRender, {renderLightArr} as record) =>
  isRender ?
    {
      ...record,
      renderLightArr:
        renderLightArr
        |> ArrayService.push(light)
        |> WonderCommonlib.ArrayService.removeDuplicateItems,
    } :
    {
      ...record,
      renderLightArr:
        RenderLightArrLightService.removeFromRenderLightArr(
          light,
          renderLightArr,
        ),
    };