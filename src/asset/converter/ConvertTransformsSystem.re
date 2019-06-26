let _getTranslationTuple = mat => (mat[12], mat[13], mat[14]);

let _getScaleTuple = mat => {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  (
    Js.Math.sqrt(m11 *. m11 +. m12 *. m12 +. m13 *. m13),
    Js.Math.sqrt(m21 *. m21 +. m22 *. m22 +. m23 *. m23),
    Js.Math.sqrt(m31 *. m31 +. m32 *. m32 +. m33 *. m33),
  );
};

let _getRotationTuple = mat => {
  let trace = mat[0] +. mat[5] +. mat[10];
  /* let out = [||];*/
  /* if (trace > 0.) {
       let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
       Array.unsafe_set(out, 3, 0.25 *. s);
       Array.unsafe_set(out, 0, (mat[6] -. mat[9]) /. s);
       Array.unsafe_set(out, 1, (mat[8] -. mat[2]) /. s);
       Array.unsafe_set(out, 2, (mat[1] -. mat[4]) /. s)
     } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
       let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
       Array.unsafe_set(out, 3, (mat[6] -. mat[9]) /. s);
       Array.unsafe_set(out, 0, 0.25 *. s);
       Array.unsafe_set(out, 1, (mat[1] +. mat[4]) /. s);
       Array.unsafe_set(out, 2, (mat[8] +. mat[2]) /. s);
     } else if (mat[5] > mat[10]) {
       let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
       Array.unsafe_set(out, 3, (mat[8] -. mat[2]) /. s);
       Array.unsafe_set(out, 0, (mat[1] +. mat[4]) /. s);
       Array.unsafe_set(out, 1, 0.25 *. s);
       Array.unsafe_set(out, 2, (mat[6] +. mat[9]) /. s)

     } else {
       let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
       Array.unsafe_set(out, 3, (mat[1] -. mat[4]) /. s);
       Array.unsafe_set(out, 0, (mat[8] +. mat[2]) /. s);
       Array.unsafe_set(out, 1, (mat[6] +. mat[9]) /. s);
       Array.unsafe_set(out, 2, 0.25 *. s)
     }; */
  if (trace > 0.) {
    let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
    (
      (mat[6] -. mat[9]) /. s,
      (mat[8] -. mat[2]) /. s,
      (mat[1] -. mat[4]) /. s,
      0.25 *. s,
    );
  } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
    (
      0.25 *. s,
      (mat[1] +. mat[4]) /. s,
      (mat[8] +. mat[2]) /. s,
      (mat[6] -. mat[9]) /. s,
    );
  } else if (mat[5] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
    (
      (mat[1] +. mat[4]) /. s,
      0.25 *. s,
      (mat[6] +. mat[9]) /. s,
      (mat[8] -. mat[2]) /. s,
    );
  } else {
    let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
    (
      (mat[8] +. mat[2]) /. s,
      (mat[6] +. mat[9]) /. s,
      0.25 *. s,
      (mat[1] -. mat[4]) /. s,
    );
  };
};

let convertToTransforms = ({nodes}: GLTFType.gltf): array(WDType.transform) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, {matrix, translation, rotation, scale}: GLTFType.node) =>
         switch (matrix) {
         | None =>
           arr
           |> ArrayService.push(
                {
                  translation:
                    switch (translation) {
                    | None => None
                    | Some(translation) =>
                      Some(translation |> GLTFType.arrayFloat3ToTuple)
                    },
                  rotation:
                    switch (rotation) {
                    | None => None
                    | Some(rotation) =>
                      Some(rotation |> GLTFType.arrayFloat4ToTuple)
                    },
                  scale:
                    switch (scale) {
                    | None => None
                    | Some(scale) =>
                      Some(scale |> GLTFType.arrayFloat3ToTuple)
                    },
                }: WDType.transform,
              )
         | Some(matrix) =>
           arr
           |> ArrayService.push(
                {
                  translation: Some(_getTranslationTuple(matrix)),
                  rotation: Some(_getRotationTuple(matrix)),
                  scale: Some(_getScaleTuple(matrix)),
                }: WDType.transform,
              )
         },
       [||],
     );

let rec _setParent = (parentIndex, transformArr, nodes, state) => {
  open StateDataMainType;

  let {children}: GLTFType.node = Array.unsafe_get(nodes, parentIndex);

  switch (children) {
  | Some(children) =>
    children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, child) => {
           state.transformRecord =
             Some(
               HierachyTransformService.setParent(.
                 transformArr |> ArrayService.getNth(parentIndex),
                 child,
                 state |> RecordTransformMainService.getRecord,
               ),
             );

           state |> _setParent(child, transformArr, nodes);
         },
         state,
       )
  | None => state
  };
};

/* TODO remove wonder_transformCount_forTest */
let _createTransformCount = [%raw
  count => {|
    if(
typeof window !== "undefined" &&
    typeof window.wonder_transformCount_forTest !== "undefined"
    ){
      return window.wonder_transformCount_forTest
    }
    else{
      return count
    }
  |}
];

let _createState = () => {
  let state = CreateStateMainService.createState();

  {
    ...state,
    settingRecord: {
      canvasId: None,
      memory: None,
      buffer:
        Some({
          geometryPointCount: 300,
          geometryCount: 30,
          transformCount: _createTransformCount(100000),
          basicMaterialCount: 48,
          lightMaterialCount: 48,
          directionLightCount: 48,
          pointLightCount: 48,
          basicSourceTextureCount: 48,
          arrayBufferViewSourceTextureCount: 48,
          cubemapTextureCount: 48,
          meshRendererCount: 48,
          instanceBuffer: {
            sourceInstanceCount: 48,
            objectInstanceCountPerSourceInstance: 48,
          },
        }),
      isDebug: None,
      context: None,
      gpu: None,
      worker: Some({useWorker: false}),
    },
  }
  |> RecordTransformMainService.create;
};

let _setTransformData = (transforms, state) =>
  transforms
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (transformArr, state),
         {translation, rotation, scale}: WDType.transform,
       ) => {
         let (state, transform) = CreateTransformMainService.create(. state);

         let state =
           switch (translation) {
           | Some(translation) =>
             state.transformRecord =
               Some(
                 ModelMatrixTransformService.setLocalPositionByTuple(
                   transform,
                   translation,
                   state |> RecordTransformMainService.getRecord,
                 ),
               );
             state;
           | None => state
           };

         let state =
           switch (rotation) {
           | Some(rotation) =>
             state.transformRecord =
               Some(
                 ModelMatrixTransformService.setLocalRotationByTuple(
                   transform,
                   rotation,
                   state |> RecordTransformMainService.getRecord,
                 ),
               );
             state;
           | None => state
           };

         let state =
           switch (scale) {
           | Some(scale) =>
             state.transformRecord =
               Some(
                 ModelMatrixTransformService.setLocalScaleByTuple(
                   transform,
                   scale,
                   state |> RecordTransformMainService.getRecord,
                 ),
               );
             state;
           | None => state
           };

         (transformArr |> ArrayService.push(transform), state);
       },
       ([||], state),
     );

let computeWorldPositionTransforms =
    (transforms, {nodes, scenes, scene}: GLTFType.gltf) => {
  open StateDataMainType;

  let state = _createState();

  let (transformArr, state) = _setTransformData(transforms, state);

  let state =
    ConvertSceneSystem.getRootNodeIndexs(
      ConvertCommon.getScene(scenes, scene),
    )
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, rootNodeIndex) =>
           _setParent(rootNodeIndex, transformArr, nodes, state),
         state,
       );

  let (positionArr, _) =
    transformArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (positionArr, state), transform) => (
           positionArr
           |> ArrayService.push(
                UpdateTransformMainService.updateAndGetPositionTuple(
                  transform,
                  state.globalTempRecord,
                  state |> RecordTransformMainService.getRecord,
                ),
              ),
           state,
         ),
         ([||], state),
       );

  positionArr;
};