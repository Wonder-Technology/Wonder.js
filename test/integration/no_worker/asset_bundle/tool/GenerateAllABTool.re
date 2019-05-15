open Js.Typed_array;

let buildDependencyRelation = dependencyRelationArrArr =>
  GenerateAllABSystem.buildDependencyRelation(dependencyRelationArrArr);

let buildRABData = (rabRelativePath, rab) => (rabRelativePath, rab);

let buildSABData = (sabRelativePath, sab) => (sabRelativePath, sab);

module ResourceAssetBundleContent = {
  let getResourceAssetBundleContent = rab: RABType.resourceAssetBundleContent => {
    let (resourceAssetBundleContent, buffer) =
      AssembleABSystem.All.getContentData(rab);

    resourceAssetBundleContent;
  };
};

module SceneAssetBundleContent = {
  let getSceneAssetBundleContent = sab: SABType.sceneAssetBundleContent => {
    let (sceneAssetBundleContent, buffer) =
      AssembleABSystem.All.getContentData(sab);

    sceneAssetBundleContent;
  };
};

module Manifest = {
  let buildHashIdData = () => [|
    ("01020304", Uint8Array.make([|1, 2, 3, 4|]) |> Uint8Array.buffer),
    ("02020304", Uint8Array.make([|2, 2, 3, 4|]) |> Uint8Array.buffer),
    ("03020304", Uint8Array.make([|3, 2, 3, 4|]) |> Uint8Array.buffer),
  |];

  let getFirstHashId = data => {
    let (hashId, _) = data |> ArrayService.unsafeGetFirst;

    hashId;
  };

  let getSecondHashId = data => {
    let (hashId, _) = Array.unsafe_get(data, 1);

    hashId;
  };

  let stubDigestForGenerateHashId = [%raw
    (sandbox, data) => {|
  var digestStub = sandbox.stub();
  var textEncoder = new TextEncoder();

  data.reduce((callIndex, [_, hashIdArrayBuffer ]) => {

    digestStub.onCall(callIndex).returns(
      new Promise((resolve, reject) => {
        resolve(
hashIdArrayBuffer
        )
      })
    );

    return callIndex + 1;
  }, 0);


  window.crypto = {
    subtle: {
      digest: digestStub
    }
  };

  return digestStub;
        |}
  ];

  let prepareDigest = [%raw
    sandbox => {|
var digestStub = sandbox.stub();

digestStub.returns(
new Promise((resolve, reject) => {
resolve(new ArrayBuffer())
})
);


       window.crypto = {
subtle: {
digest: digestStub
}
       } ;

return digestStub;
        |}
  ];
  /* sandbox =>
     stubDigestForGenerateHashId(sandbox, [|""|]); */
};

module TestWithOneRAB = {
  let getWholeDependencyRelationMap = () => buildDependencyRelation([||]);

  let getRabRelativePath = () => {
    let rab1RelativePath = "rab1.rab";
    /* let rab2RelativePath = "rab2.rab"; */

    rab1RelativePath;
  };

  let generateAllAB = (rab1, state) => {
    let rab1RelativePath = getRabRelativePath();

    state |> StateAPI.setState |> ignore;

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|rab1RelativePath|]|]),
      ([||], [|buildRABData(rab1RelativePath, rab1)|]),
    );
  };

  let getNewRabContent = ((_, newRabDataArr, _)) => {
    let (_, newRab1) = newRabDataArr[0];
    /* let (_, newRab2) = newRabDataArr[1]; */

    let newRab1Content =
      ResourceAssetBundleContent.getResourceAssetBundleContent(newRab1);
    /* let newRab2Content =
       ResourceAssetBundleContent.getResourceAssetBundleContent(newRab2); */

    newRab1Content;
  };

  let getNewRabManifest = ((_, newRabDataArr, _)) => {
    let (_, newRab1) = newRabDataArr[0];

    ParseABSystem.RAB.parseManifest(newRab1);
  };

  let getNewRab = ((_, newRabDataArr, _)) => {
    let (_, newRab1) = newRabDataArr[0];

    newRab1;
  };
};

module TestWithTwoRAB = {
  let getWholeDependencyRelationMap = (rab1RelativePath, rab2RelativePath) =>
    buildDependencyRelation([|[|rab2RelativePath, rab1RelativePath|]|]);

  let getRabRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let rab2RelativePath = "rab2.rab";

    (rab1RelativePath, rab2RelativePath);
  };

  let generateAllAB = ((rab1, rab2), state) => {
    let (rab1RelativePath, rab2RelativePath) = getRabRelativePaths();

    state |> StateAPI.setState |> ignore;

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|rab2RelativePath, rab1RelativePath|]|]),
      (
        [||],
        [|
          buildRABData(rab1RelativePath, rab1),
          buildRABData(rab2RelativePath, rab2),
        |],
      ),
    );
  };

  let getNewRabs = ((_, newRabDataArr, _)) => {
    let (_, newRab1) = newRabDataArr[0];
    let (_, newRab2) = newRabDataArr[1];

    (newRab1, newRab2);
  };

  let getNewRabContents = ((_, newRabDataArr, _)) => {
    let (_, newRab1) = newRabDataArr[0];
    let (_, newRab2) = newRabDataArr[1];

    let newRab1Content =
      ResourceAssetBundleContent.getResourceAssetBundleContent(newRab1);
    let newRab2Content =
      ResourceAssetBundleContent.getResourceAssetBundleContent(newRab2);

    (newRab1Content, newRab2Content);
  };

  let getNewRabManifests = ((_, newRabDataArr, _)) => {
    let (_, newRab1) = newRabDataArr[0];
    let (_, newRab2) = newRabDataArr[1];

    (
      ParseABSystem.RAB.parseManifest(newRab1),
      ParseABSystem.RAB.parseManifest(newRab2),
    );
  };

  let generateTwoRABs = state => {
    let resourceData1 = GenerateSingleRABTool.ResourceData.buildResourceData();

    let rab1 =
      GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

    let resourceData2 = GenerateSingleRABTool.ResourceData.buildResourceData();

    let rab2 =
      GenerateSingleRABSystem.generateSingleRAB(resourceData2, state);

    generateAllAB((rab1, rab2), state)
    |> MostTool.testStream(data => getNewRabs(data) |> Js.Promise.resolve);
  };
};

module TestWithOneSAB = {
  let getWholeDependencyRelationMap = ( sab1RelativePath) =>
    buildDependencyRelation([||]);

  let getSABRelativePath = () => {
    let sab1RelativePath = "sab1.sab";

    sab1RelativePath;
  };

  let generateAllAB = (sab1, state) => {
    let sab1RelativePath = getSABRelativePath();

    state |> StateAPI.setState |> ignore;

    GenerateAllABSystem.generate(
      buildDependencyRelation([||]),
      ([|buildSABData(sab1RelativePath, sab1)|], [||]),
    );
  };

  let getNewSAB = ((_, newRabDataArr, newSabDataArr)) => {
    let (_, newSab1) = newSabDataArr[0];

    newSab1;
  };
};

module TestWithOneSABAndOneRAB = {
  let getWholeDependencyRelationMap = (rab1RelativePath, sab1RelativePath) =>
    buildDependencyRelation([|[|sab1RelativePath, rab1RelativePath|]|]);

  let getABRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let sab1RelativePath = "sab1.sab";

    (rab1RelativePath, sab1RelativePath);
  };

  let generateAllAB = ((rab1, sab1), state) => {
    let (rab1RelativePath, sab1RelativePath) = getABRelativePaths();

    state |> StateAPI.setState |> ignore;

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|sab1RelativePath, rab1RelativePath|]|]),
      (
        [|buildSABData(sab1RelativePath, sab1)|],
        [|buildRABData(rab1RelativePath, rab1)|],
      ),
    );
  };

  let getNewABs = ((_, newRabDataArr, newSabDataArr)) => {
    let (_, newRab1) = newRabDataArr[0];
    let (_, newSab1) = newSabDataArr[0];

    (newRab1, newSab1);
  };

  let getNewABContents = ((_, newRabDataArr, newSabDataArr)) => {
    let (_, newRab1) = newRabDataArr[0];
    let (_, newSab1) = newSabDataArr[0];

    let newRab1Content =
      ResourceAssetBundleContent.getResourceAssetBundleContent(newRab1);
    let newSab1Content =
      SceneAssetBundleContent.getSceneAssetBundleContent(newSab1);

    (newRab1Content, newSab1Content);
  };

  let getNewRabManifests = ((_, newRabDataArr, newSabDataArr)) => {
    let (_, newRab1) = newRabDataArr[0];
    let (_, newSab1) = newSabDataArr[0];

    (
      ParseABSystem.RAB.parseManifest(newRab1),
      ParseABSystem.SAB.parseManifest(newSab1),
    );
  };
};

module TestWABWithOneSABAndOneRAB = {
  /* let getRabRelativePath = () => {
       let rab1RelativePath = "rab1.rab";
       /* let rab2RelativePath = "rab2.rab"; */

       rab1RelativePath;
     };

     let generateAllAB = (rab1, state) => {
       let rab1RelativePath = getRabRelativePath();

       GenerateAllABSystem.generate(
         buildDependencyRelation([|[|rab1RelativePath|]|]),
         ([||], [|buildRABData(rab1RelativePath, rab1)|]),
         state,
       );
     }; */

  let getABRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let sab1RelativePath = "sab1.sab";

    (rab1RelativePath, sab1RelativePath);
  };

  let generateAllAB = ((rab1, sab1), state) => {
    let (rab1RelativePath, sab1RelativePath) = getABRelativePaths();

    state |> StateAPI.setState |> ignore;

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|sab1RelativePath, rab1RelativePath|]|]),
      (
        [|buildSABData(sab1RelativePath, sab1)|],
        [|buildRABData(rab1RelativePath, rab1)|],
      ),
    );
  };

  /* let getNewWAB = ((newWAB, _, _)) => {
       let (_, newRab1) = newRabDataArr[0];
       /* let (_, newRab2) = newRabDataArr[1]; */

       let newRab1Content =
         ResourceAssetBundleContent.getResourceAssetBundleContent(newRab1);
       /* let newRab2Content =
          ResourceAssetBundleContent.getResourceAssetBundleContent(newRab2); */

       newRab1Content;
     }; */

  let getNewWabManifest = ((newWAB, _, _)) =>
    /* let (_, newRab1) = newRabDataArr[0]; */
    ParseABSystem.WAB.parseManifest(newWAB);
};

module TestDuplicateDataForSAB = {
  module TestDuplicateImageData = {
    let createGameObject1 = (imageName, state) =>
      GenerateSABTool.createGameObjectWithMap(imageName, state);
  };

  module TestDuplicateGeometryData = {
    let _createGameObject =
        (geometryName, (vertices, normals, texCoords, indices16), state) => {
      open GameObjectAPI;
      open LightMaterialAPI;
      open GeometryAPI;
      open MeshRendererAPI;
      open Js.Typed_array;

      let (state, geometry) = createGeometry(state);
      let (state, gameObject) = GameObjectAPI.createGameObject(state);
      let state =
        state
        |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
      let state = state |> setGeometryName(geometry, geometryName);

      let state =
        state
        |> setGeometryVertices(geometry, vertices)
        |> setGeometryTexCoords(geometry, texCoords)
        |> setGeometryNormals(geometry, normals)
        |> setGeometryIndices16(geometry, indices16);

      let (state, material) = createLightMaterial(state);

      let (state, meshRenderer) = createMeshRenderer(state);

      let state =
        state
        |> addGameObjectLightMaterialComponent(gameObject, material)
        |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

      let transform =
        GameObjectAPI.unsafeGetGameObjectTransformComponent(
          gameObject,
          state,
        );

      (
        state,
        gameObject,
        transform,
        (geometry, (vertices, texCoords, normals, indices16)),
        material,
        meshRenderer,
      );
    };

    let createGameObject1 = (geometryName, state) => {
      let vertices1 =
        Float32Array.make([|
          (-0.04454309865832329),
          (-0.1662379950284958),
          1.0180000066757202,
          2.602089970253733e-18,
          (-6.938890181594472e-18),
          1.0180000066757202,
          (-0.08605089783668518),
          (-0.14904500544071198),
          1.0180000066757202,
        |]);
      let texCoords1 =
        Float32Array.make([|
          0.7119140028953552,
          0.12024599313735962,
          0.7552189826965332,
          0.15945100784301758,
          0.7032840251922607,
          0.13282698392868042,
        |]);
      let normals1 =
        Float32Array.make([|
          (-0.7455800175666809),
          0.47522100806236267,
          (-0.4671989977359772),
          (-0.7843430042266846),
          0.4080820083618164,
          (-0.4671989977359772),
          0.7455800175666809,
          (-0.47522100806236267),
          (-0.46720001101493835),
        |]);
      let indices1 = Uint16Array.make([|0, 2, 1|]);

      _createGameObject(
        geometryName,
        (vertices1, normals1, texCoords1, indices1),
        state,
      );
    };

    let createGameObject2 = (geometryName, state) => {
      let vertices1 =
        Float32Array.make([|
          (-0.08605089783668518),
          (-0.14904500544071198),
          1.0180000066757202,
          2.,
          3.,
          4.,
        |]);
      let texCoords1 = Float32Array.make([||]);
      let normals1 = Float32Array.make([||]);
      let indices1 = Uint16Array.make([|1, 0|]);

      _createGameObject(
        geometryName,
        (vertices1, normals1, texCoords1, indices1),
        state,
      );
    };
  };
};