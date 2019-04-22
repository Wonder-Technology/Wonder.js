open Js.Typed_array;

let buildDependencyRelation = dependencyRelationArrArr =>
  dependencyRelationArrArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. relationMap, dependencyRelationArr) =>
         relationMap
         |> WonderCommonlib.ImmutableHashMapService.set(
              dependencyRelationArr |> ArrayService.unsafeGetFirst,
              dependencyRelationArr |> Js.Array.sliceFrom(1),
            ),
       WonderCommonlib.ImmutableHashMapService.createEmpty(),
     );

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
  let getRabRelativePath = () => {
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
};

module TestWithTwoRAB = {
  let getRabRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let rab2RelativePath = "rab2.rab";

    (rab1RelativePath, rab2RelativePath);
  };

  let generateAllAB = ((rab1, rab2), state) => {
    let (rab1RelativePath, rab2RelativePath) = getRabRelativePaths();

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|rab2RelativePath, rab1RelativePath|]|]),
      (
        [||],
        [|
          buildRABData(rab1RelativePath, rab1),
          buildRABData(rab2RelativePath, rab2),
        |],
      ),
      state,
    );
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
};

module TestWithOneSABAndOneRAB = {
  let getABRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let sab1RelativePath = "sab1.sab";

    (rab1RelativePath, sab1RelativePath);
  };

  let generateAllAB = ((rab1, sab1), state) => {
    let (rab1RelativePath, sab1RelativePath) = getABRelativePaths();

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|sab1RelativePath, rab1RelativePath|]|]),
      (
        [|buildSABData(sab1RelativePath, sab1)|],
        [|buildRABData(rab1RelativePath, rab1)|],
      ),
      state,
    );
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

    GenerateAllABSystem.generate(
      buildDependencyRelation([|[|sab1RelativePath, rab1RelativePath|]|]),
      (
        [|buildSABData(sab1RelativePath, sab1)|],
        [|buildRABData(rab1RelativePath, rab1)|],
      ),
      state,
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
    ParseABSystem.WAB.parseManifest(
      newWAB,
    );
};