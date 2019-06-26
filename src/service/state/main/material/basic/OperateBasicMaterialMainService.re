open BasicMaterialType;

open StateDataMainType;

let getColor = (material, state) =>
  OperateTypeArrayAllBasicMaterialService.getColor(
    material,
    RecordBasicMaterialMainService.getRecord(state).colors,
  );

let setColor = (material, color: array(float), state) => {
  let {colors} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        colors:
          OperateTypeArrayAllBasicMaterialService.setColor(
            material,
            color,
            colors,
          ),
      }),
  };
};

let getIsDepthTest = (material, state) =>
  OperateTypeArrayAllBasicMaterialService.getIsDepthTest(
    material,
    RecordBasicMaterialMainService.getRecord(state).isDepthTests,
  );

/* let isDepthTest = (material, state) =>
   OperateTypeArrayAllBasicMaterialService.isDepthTest(
     material,
     RecordBasicMaterialMainService.getRecord(state).isDepthTests,
   ); */

let setIsDepthTest = (material, isDepthTest, state) => {
  let {isDepthTests} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        isDepthTests:
          OperateTypeArrayAllBasicMaterialService.setIsDepthTest(
            material,
            isDepthTest
            |> OperateTypeArrayAllBasicMaterialService.convertIsDepthTestToVal,
            isDepthTests,
          ),
      }),
  };
};

let getAlpha = (material, state) =>
  OperateTypeArrayAllBasicMaterialService.getAlpha(
    material,
    RecordBasicMaterialMainService.getRecord(state).alphas,
  );

let setAlpha = (material, alpha, state) => {
  let {alphas} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        alphas:
          OperateTypeArrayAllBasicMaterialService.setAlpha(
            material,
            alpha,
            alphas,
          ),
      }),
  };
};