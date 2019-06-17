open BasicMaterialType;

open StateDataMainType;

let getColor = (material, state) =>
  OperateTypeArrayBasicMaterialService.getColor(
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
          OperateTypeArrayBasicMaterialService.setColor(
            material,
            color,
            colors,
          ),
      }),
  };
};

let getIsDepthTest = (material, state) =>
  OperateTypeArrayBasicMaterialService.getIsDepthTest(
    material,
    RecordBasicMaterialMainService.getRecord(state).isDepthTests,
  );

/* let isDepthTest = (material, state) =>
   OperateTypeArrayBasicMaterialService.isDepthTest(
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
          OperateTypeArrayBasicMaterialService.setIsDepthTest(
            material,
            isDepthTest
            |> OperateTypeArrayBasicMaterialService.convertIsDepthTestToVal,
            isDepthTests,
          ),
      }),
  };
};

let getAlpha = (material, state) =>
  OperateTypeArrayBasicMaterialService.getAlpha(
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
          OperateTypeArrayBasicMaterialService.setAlpha(
            material,
            alpha,
            alphas,
          ),
      }),
  };
};