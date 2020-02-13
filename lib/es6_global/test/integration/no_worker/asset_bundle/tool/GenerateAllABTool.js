

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MostTool$Wonderjs from "./MostTool.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as ParseABSystem$Wonderjs from "../../../../../src/asset_bundle/import/ParseABSystem.js";
import * as GenerateSABTool$Wonderjs from "./GenerateSABTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as AssembleABSystem$Wonderjs from "../../../../../src/asset_bundle/import/assemble/AssembleABSystem.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as GenerateAllABSystem$Wonderjs from "../../../../../src/asset_bundle/all/generate/GenerateAllABSystem.js";
import * as GenerateSingleRABTool$Wonderjs from "./GenerateSingleRABTool.js";
import * as GenerateSingleRABSystem$Wonderjs from "../../../../../src/asset_bundle/single/rab/generate/GenerateSingleRABSystem.js";

var buildDependencyRelation = GenerateAllABSystem$Wonderjs.buildDependencyRelation;

function buildRABData(rabRelativePath, rab) {
  return /* tuple */[
          rabRelativePath,
          rab
        ];
}

function buildSABData(sabRelativePath, sab) {
  return /* tuple */[
          sabRelativePath,
          sab
        ];
}

function getResourceAssetBundleContent(rab) {
  return AssembleABSystem$Wonderjs.All[/* getContentData */0](rab)[0];
}

var ResourceAssetBundleContent = /* module */[/* getResourceAssetBundleContent */getResourceAssetBundleContent];

function getSceneAssetBundleContent(sab) {
  return AssembleABSystem$Wonderjs.All[/* getContentData */0](sab)[0];
}

var SceneAssetBundleContent = /* module */[/* getSceneAssetBundleContent */getSceneAssetBundleContent];

function buildHashIdData(param) {
  return /* array */[
          /* tuple */[
            "01020304",
            new Uint8Array(/* array */[
                  1,
                  2,
                  3,
                  4
                ]).buffer
          ],
          /* tuple */[
            "02020304",
            new Uint8Array(/* array */[
                  2,
                  2,
                  3,
                  4
                ]).buffer
          ],
          /* tuple */[
            "03020304",
            new Uint8Array(/* array */[
                  3,
                  2,
                  3,
                  4
                ]).buffer
          ]
        ];
}

function getFirstHashId(data) {
  return ArrayService$Wonderjs.unsafeGetFirst(data)[0];
}

function getSecondHashId(data) {
  return data[1][0];
}

function stubDigestForGenerateHashId (sandbox,data){
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
        };

function prepareDigest (sandbox){
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
        };

var Manifest = /* module */[
  /* buildHashIdData */buildHashIdData,
  /* getFirstHashId */getFirstHashId,
  /* getSecondHashId */getSecondHashId,
  /* stubDigestForGenerateHashId */stubDigestForGenerateHashId,
  /* prepareDigest */prepareDigest
];

function getWholeDependencyRelationMap(param) {
  return GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[]);
}

function getRabRelativePath(param) {
  return "rab1.rab";
}

function generateAllAB(rab1, state) {
  var rab1RelativePath = "rab1.rab";
  StateAPI$Wonderjs.setState(state);
  return GenerateAllABSystem$Wonderjs.generate(GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[/* array */[rab1RelativePath]]), /* tuple */[
              /* array */[],
              /* array */[/* tuple */[
                  rab1RelativePath,
                  rab1
                ]]
            ]);
}

function getNewRabContent(param) {
  var match = Caml_array.caml_array_get(param[1], 0);
  return getResourceAssetBundleContent(match[1]);
}

function getNewRabManifest(param) {
  var match = Caml_array.caml_array_get(param[1], 0);
  return ParseABSystem$Wonderjs.RAB[/* parseManifest */0](match[1]);
}

function getNewRab(param) {
  return Caml_array.caml_array_get(param[1], 0)[1];
}

var TestWithOneRAB = /* module */[
  /* getWholeDependencyRelationMap */getWholeDependencyRelationMap,
  /* getRabRelativePath */getRabRelativePath,
  /* generateAllAB */generateAllAB,
  /* getNewRabContent */getNewRabContent,
  /* getNewRabManifest */getNewRabManifest,
  /* getNewRab */getNewRab
];

function getWholeDependencyRelationMap$1(rab1RelativePath, rab2RelativePath) {
  return GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                rab2RelativePath,
                rab1RelativePath
              ]]);
}

function getRabRelativePaths(param) {
  return /* tuple */[
          "rab1.rab",
          "rab2.rab"
        ];
}

function generateAllAB$1(param, state) {
  var rab1RelativePath = "rab1.rab";
  var rab2RelativePath = "rab2.rab";
  StateAPI$Wonderjs.setState(state);
  return GenerateAllABSystem$Wonderjs.generate(GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                    rab2RelativePath,
                    rab1RelativePath
                  ]]), /* tuple */[
              /* array */[],
              /* array */[
                /* tuple */[
                  rab1RelativePath,
                  param[0]
                ],
                /* tuple */[
                  rab2RelativePath,
                  param[1]
                ]
              ]
            ]);
}

function getNewRabs(param) {
  var newRabDataArr = param[1];
  var match = Caml_array.caml_array_get(newRabDataArr, 0);
  var match$1 = Caml_array.caml_array_get(newRabDataArr, 1);
  return /* tuple */[
          match[1],
          match$1[1]
        ];
}

function getNewRabContents(param) {
  var newRabDataArr = param[1];
  var match = Caml_array.caml_array_get(newRabDataArr, 0);
  var match$1 = Caml_array.caml_array_get(newRabDataArr, 1);
  var newRab1Content = getResourceAssetBundleContent(match[1]);
  var newRab2Content = getResourceAssetBundleContent(match$1[1]);
  return /* tuple */[
          newRab1Content,
          newRab2Content
        ];
}

function getNewRabManifests(param) {
  var newRabDataArr = param[1];
  var match = Caml_array.caml_array_get(newRabDataArr, 0);
  var match$1 = Caml_array.caml_array_get(newRabDataArr, 1);
  return /* tuple */[
          ParseABSystem$Wonderjs.RAB[/* parseManifest */0](match[1]),
          ParseABSystem$Wonderjs.RAB[/* parseManifest */0](match$1[1])
        ];
}

function generateTwoRABs(state) {
  var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state);
  var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state);
  return MostTool$Wonderjs.testStream((function (data) {
                return Promise.resolve(getNewRabs(data));
              }), generateAllAB$1(/* tuple */[
                  rab1,
                  rab2
                ], state));
}

var TestWithTwoRAB = /* module */[
  /* getWholeDependencyRelationMap */getWholeDependencyRelationMap$1,
  /* getRabRelativePaths */getRabRelativePaths,
  /* generateAllAB */generateAllAB$1,
  /* getNewRabs */getNewRabs,
  /* getNewRabContents */getNewRabContents,
  /* getNewRabManifests */getNewRabManifests,
  /* generateTwoRABs */generateTwoRABs
];

function getWholeDependencyRelationMap$2(sab1RelativePath) {
  return GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[]);
}

function getSABRelativePath(param) {
  return "sab1.sab";
}

function generateAllAB$2(sab1, state) {
  StateAPI$Wonderjs.setState(state);
  return GenerateAllABSystem$Wonderjs.generate(GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[]), /* tuple */[
              /* array */[/* tuple */[
                  "sab1.sab",
                  sab1
                ]],
              /* array */[]
            ]);
}

function getNewSAB(param) {
  return Caml_array.caml_array_get(param[2], 0)[1];
}

var TestWithOneSAB = /* module */[
  /* getWholeDependencyRelationMap */getWholeDependencyRelationMap$2,
  /* getSABRelativePath */getSABRelativePath,
  /* generateAllAB */generateAllAB$2,
  /* getNewSAB */getNewSAB
];

function getWholeDependencyRelationMap$3(rab1RelativePath, sab1RelativePath) {
  return GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                sab1RelativePath,
                rab1RelativePath
              ]]);
}

function getABRelativePaths(param) {
  return /* tuple */[
          "rab1.rab",
          "sab1.sab"
        ];
}

function generateAllAB$3(param, state) {
  var rab1RelativePath = "rab1.rab";
  var sab1RelativePath = "sab1.sab";
  StateAPI$Wonderjs.setState(state);
  return GenerateAllABSystem$Wonderjs.generate(GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                    sab1RelativePath,
                    rab1RelativePath
                  ]]), /* tuple */[
              /* array */[/* tuple */[
                  sab1RelativePath,
                  param[1]
                ]],
              /* array */[/* tuple */[
                  rab1RelativePath,
                  param[0]
                ]]
            ]);
}

function getNewABs(param) {
  var match = Caml_array.caml_array_get(param[1], 0);
  var match$1 = Caml_array.caml_array_get(param[2], 0);
  return /* tuple */[
          match[1],
          match$1[1]
        ];
}

function getNewABContents(param) {
  var match = Caml_array.caml_array_get(param[1], 0);
  var match$1 = Caml_array.caml_array_get(param[2], 0);
  var newRab1Content = getResourceAssetBundleContent(match[1]);
  var newSab1Content = getSceneAssetBundleContent(match$1[1]);
  return /* tuple */[
          newRab1Content,
          newSab1Content
        ];
}

function getNewRabManifests$1(param) {
  var match = Caml_array.caml_array_get(param[1], 0);
  var match$1 = Caml_array.caml_array_get(param[2], 0);
  return /* tuple */[
          ParseABSystem$Wonderjs.RAB[/* parseManifest */0](match[1]),
          ParseABSystem$Wonderjs.SAB[/* parseManifest */0](match$1[1])
        ];
}

var TestWithOneSABAndOneRAB = /* module */[
  /* getWholeDependencyRelationMap */getWholeDependencyRelationMap$3,
  /* getABRelativePaths */getABRelativePaths,
  /* generateAllAB */generateAllAB$3,
  /* getNewABs */getNewABs,
  /* getNewABContents */getNewABContents,
  /* getNewRabManifests */getNewRabManifests$1
];

function getABRelativePaths$1(param) {
  return /* tuple */[
          "rab1.rab",
          "sab1.sab"
        ];
}

function generateAllAB$4(param, state) {
  var rab1RelativePath = "rab1.rab";
  var sab1RelativePath = "sab1.sab";
  StateAPI$Wonderjs.setState(state);
  return GenerateAllABSystem$Wonderjs.generate(GenerateAllABSystem$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                    sab1RelativePath,
                    rab1RelativePath
                  ]]), /* tuple */[
              /* array */[/* tuple */[
                  sab1RelativePath,
                  param[1]
                ]],
              /* array */[/* tuple */[
                  rab1RelativePath,
                  param[0]
                ]]
            ]);
}

function getNewWabManifest(param) {
  return ParseABSystem$Wonderjs.WAB[/* parseManifest */2](param[0]);
}

var TestWABWithOneSABAndOneRAB = /* module */[
  /* getABRelativePaths */getABRelativePaths$1,
  /* generateAllAB */generateAllAB$4,
  /* getNewWabManifest */getNewWabManifest
];

var createGameObject1 = GenerateSABTool$Wonderjs.createGameObjectWithMap;

var TestDuplicateImageData = /* module */[/* createGameObject1 */createGameObject1];

function _createGameObject(geometryName, param, state) {
  var indices16 = param[3];
  var texCoords = param[2];
  var normals = param[1];
  var vertices = param[0];
  var match = GeometryAPI$Wonderjs.createGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
  var state$2 = GeometryAPI$Wonderjs.setGeometryName(geometry, geometryName, state$1);
  var state$3 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, indices16, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices, state$2))));
  var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(state$3);
  var material = match$2[1];
  var match$3 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$2[0]);
  var meshRenderer = match$3[1];
  var state$4 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0]));
  var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$4);
  return /* tuple */[
          state$4,
          gameObject,
          transform,
          /* tuple */[
            geometry,
            /* tuple */[
              vertices,
              texCoords,
              normals,
              indices16
            ]
          ],
          material,
          meshRenderer
        ];
}

function createGameObject1$1(geometryName, state) {
  var vertices1 = new Float32Array(/* array */[
        -0.04454309865832329,
        -0.1662379950284958,
        1.0180000066757202,
        2.602089970253733e-18,
        -6.938890181594472e-18,
        1.0180000066757202,
        -0.08605089783668518,
        -0.14904500544071198,
        1.0180000066757202
      ]);
  var texCoords1 = new Float32Array(/* array */[
        0.7119140028953552,
        0.12024599313735962,
        0.7552189826965332,
        0.15945100784301758,
        0.7032840251922607,
        0.13282698392868042
      ]);
  var normals1 = new Float32Array(/* array */[
        -0.7455800175666809,
        0.47522100806236267,
        -0.4671989977359772,
        -0.7843430042266846,
        0.4080820083618164,
        -0.4671989977359772,
        0.7455800175666809,
        -0.47522100806236267,
        -0.46720001101493835
      ]);
  var indices1 = new Uint16Array(/* array */[
        0,
        2,
        1
      ]);
  return _createGameObject(geometryName, /* tuple */[
              vertices1,
              normals1,
              texCoords1,
              indices1
            ], state);
}

function createGameObject2(geometryName, state) {
  var vertices1 = new Float32Array(/* array */[
        -0.08605089783668518,
        -0.14904500544071198,
        1.0180000066757202,
        2,
        3,
        4
      ]);
  var texCoords1 = new Float32Array(/* array */[]);
  var normals1 = new Float32Array(/* array */[]);
  var indices1 = new Uint16Array(/* array */[
        1,
        0
      ]);
  return _createGameObject(geometryName, /* tuple */[
              vertices1,
              normals1,
              texCoords1,
              indices1
            ], state);
}

var TestDuplicateGeometryData = /* module */[
  /* _createGameObject */_createGameObject,
  /* createGameObject1 */createGameObject1$1,
  /* createGameObject2 */createGameObject2
];

var TestDuplicateDataForSAB = /* module */[
  /* TestDuplicateImageData */TestDuplicateImageData,
  /* TestDuplicateGeometryData */TestDuplicateGeometryData
];

export {
  buildDependencyRelation ,
  buildRABData ,
  buildSABData ,
  ResourceAssetBundleContent ,
  SceneAssetBundleContent ,
  Manifest ,
  TestWithOneRAB ,
  TestWithTwoRAB ,
  TestWithOneSAB ,
  TestWithOneSABAndOneRAB ,
  TestWABWithOneSABAndOneRAB ,
  TestDuplicateDataForSAB ,
  
}
/* MostTool-Wonderjs Not a pure module */
