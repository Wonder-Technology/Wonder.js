<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/Wonder-Technology/Wonder.js/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2018-01-26)


### Bug Fixes

* **redo-undo:** fix deepCopyStateForRestore: now deep copy transform->childMap ([6343eb5](https://github.com/Wonder-Technology/Wonder.js/commit/6343eb5))
* **specHelper:** fix "toCalledWith"-> error message ([f3a6b54](https://github.com/Wonder-Technology/Wonder.js/commit/f3a6b54))


### Features

* **job:** add json data files instead of reason wraped json data files ([ba91ca7](https://github.com/Wonder-Technology/Wonder.js/commit/ba91ca7))
* **job:** add logic job config ([477b253](https://github.com/Wonder-Technology/Wonder.js/commit/477b253))
* **job:** handle RenderJobConfigSystem.re->switch unknown cases ([d447ab0](https://github.com/Wonder-Technology/Wonder.js/commit/d447ab0))
* **job:** implement "add,remove custom job" ([187de58](https://github.com/Wonder-Technology/Wonder.js/commit/187de58))
* **job:** renderJobConfigSystem,LogicJobConfigSystem->_unsafeGetXXXJobConfig add contract check ([e5ebc4d](https://github.com/Wonder-Technology/Wonder.js/commit/e5ebc4d))
* **job** implement logic->"add,remove custom job" ([30c1abd](https://github.com/Wonder-Technology/Wonder.js/commit/30c1abd))
* **transform:** add "setTransformParentKeepOrder" api ([4c59d98](https://github.com/Wonder-Technology/Wonder.js/commit/4c59d98))


### Performance Improvements

* **job:** now only get render jobs from config once ([8901be8](https://github.com/Wonder-Technology/Wonder.js/commit/8901be8))
* **transform:** "getChilren" now not copy children ([3d5e2a7](https://github.com/Wonder-Technology/Wonder.js/commit/3d5e2a7))




<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2018-01-15)


### Bug Fixes

* **bumped:** solve "permission denied" problem ([125d132](https://github.com/yyc-git/Wonder.js/commit/125d132))
* createShaderChunkSystemFile gulp task-> builded ShaderChunkSystem.re not has "open Contract;" ([5b3ba87](https://github.com/yyc-git/Wonder.js/commit/5b3ba87))
* **coverage:** fix jest_coverage.json: change "lib/js/xxx" to "lib/es6_global/xxx" ([178529d](https://github.com/yyc-git/Wonder.js/commit/178529d))
* **e2e-test:** fix "if test fail, not exit when run test in local" bug ([f91cc29](https://github.com/yyc-git/Wonder.js/commit/f91cc29))
* **pf-test:** fix "re-generate benchmark case data" bug ([d1ecd9b](https://github.com/yyc-git/Wonder.js/commit/d1ecd9b))


### Features

* **log:** use wonder-log for debug,contract,log,error,fatal ([5d02463](https://github.com/yyc-git/Wonder.js/commit/5d02463))
* **pf-test:** improve pf test success rate:re-generate benchmark before re-compare ([440b08b](https://github.com/yyc-git/Wonder.js/commit/440b08b))
* upgrade wonder-commonlib, remove DebugUtils, LogUtils ([0ed59c5](https://github.com/yyc-git/Wonder.js/commit/0ed59c5))



<a name="1.0.0-alpha.13.1"></a>
# [1.0.0-alpha.13.1](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.13...v1.0.0-alpha.13.1) (2018-01-15)


### Bug Fixes

* **bumped:** solve "permission denied" problem ([125d132](https://github.com/yyc-git/Wonder.js/commit/125d132))
* createShaderChunkSystemFile gulp task-> builded ShaderChunkSystem.re not has "open Contract;" ([5b3ba87](https://github.com/yyc-git/Wonder.js/commit/5b3ba87))
* **coverage:** fix jest_coverage.json: change "lib/js/xxx" to "lib/es6_global/xxx" ([178529d](https://github.com/yyc-git/Wonder.js/commit/178529d))
* **e2e-test:** fix "if test fail, not exit when run test in local" bug ([f91cc29](https://github.com/yyc-git/Wonder.js/commit/f91cc29))
* **pf-test:** fix "re-generate benchmark case data" bug ([d1ecd9b](https://github.com/yyc-git/Wonder.js/commit/d1ecd9b))


### Features

* **log:** use wonder-log for debug,contract,log,error,fatal ([5d02463](https://github.com/yyc-git/Wonder.js/commit/5d02463))
* **pf-test:** improve pf test success rate:re-generate benchmark before re-compare ([440b08b](https://github.com/yyc-git/Wonder.js/commit/440b08b))
* upgrade wonder-commonlib, remove DebugUtils, LogUtils ([0ed59c5](https://github.com/yyc-git/Wonder.js/commit/0ed59c5))



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/yyc-git/Wonder.js/compare/1.0.0-alpha.12...1.0.0-alpha.13) (2018-01-09)


### Bug Fixes

* change "DreamForest" to "Wonder-Technology" ([e5afdb7](https://github.com/yyc-git/Wonder.js/commit/e5afdb7))
* rename "cacheable" to "cachable" ([f90506a](https://github.com/yyc-git/Wonder.js/commit/f90506a))
* **license:** fix author and date ([e2f18c9](https://github.com/yyc-git/Wonder.js/commit/e2f18c9))
* **render-test:** fix "gulp build" error: Cannot find module 'xxx/lib/js/test/render/TestRender.js' ([1029a99](https://github.com/yyc-git/Wonder.js/commit/1029a99))


### Features

* **canvas:** use full screen  canvas ([d992876](https://github.com/yyc-git/Wonder.js/commit/d992876))
* **canvas:** use full screen canvas ([95f38da](https://github.com/yyc-git/Wonder.js/commit/95f38da))


### Performance Improvements

* **code-climate:** solve performance reduce problem caused by refactor ([0f56d2a](https://github.com/yyc-git/Wonder.js/commit/0f56d2a))


### Reverts

* "chore(release): 1.0.0-alpha.13" ([84dbeb4](https://github.com/yyc-git/Wonder.js/commit/84dbeb4))
* "chore(release): 1.0.0-alpha.13" ([698488a](https://github.com/yyc-git/Wonder.js/commit/698488a))
* chore(release): 1.0.0-alpha.13 ([7321f92](https://github.com/yyc-git/Wonder.js/commit/7321f92))



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2017-12-28)


### Bug Fixes

* compileReason gulp task: add "sudo" ([6cb4f30](https://github.com/yyc-git/Wonder.js/commit/6cb4f30))


### Features

* add "generate pf test json data" logic and test ([4be0de4](https://github.com/yyc-git/Wonder.js/commit/4be0de4))
* add "rollup", "generateIndex" gulp task ([7f3eefc](https://github.com/yyc-git/Wonder.js/commit/7f3eefc))
* add more performance test data: one for ci test, and one for local test ([678bf83](https://github.com/yyc-git/Wonder.js/commit/678bf83))
* add src/Index.re ([70e6cc0](https://github.com/yyc-git/Wonder.js/commit/70e6cc0))
* gulp task: add "buildForRunTest" ([d9802b4](https://github.com/yyc-git/Wonder.js/commit/d9802b4))
* Main->config: add "gpuConfig" ([51c300f](https://github.com/yyc-git/Wonder.js/commit/51c300f))



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2017-12-18)


### Bug Fixes

* GameObject->cloneGameObject: now pass isShareMaterial: Js.boolean ([7190061](https://github.com/yyc-git/Wonder.js/commit/7190061))
* redo undo: transform data->not copy and restore localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool ([f113a3a](https://github.com/yyc-git/Wonder.js/commit/f113a3a))
* redo/undo->init shader: now init diff shader when restore ([e19bc4b](https://github.com/yyc-git/Wonder.js/commit/e19bc4b))
* redo/undo->MaterialAdmin->_getAllAliveMaterials: now get valid keys of gameObjectMap instead of valid values ([f3a318d](https://github.com/yyc-git/Wonder.js/commit/f3a318d))
* redo/undo->ShaderStateCommon->restoreFromState: now index should be intersected shader's length + 1 ([bf94759](https://github.com/yyc-git/Wonder.js/commit/bf94759))


### Features

* "redo/undo": finish redo/undo cameraController data ([a46f95e](https://github.com/yyc-git/Wonder.js/commit/a46f95e))
* "redo/undo": finish redo/undo deviceManager data ([ddfb3c5](https://github.com/yyc-git/Wonder.js/commit/ddfb3c5))
* "redo/undo": finish redo/undo geometry,vbo buffer data ([809412d](https://github.com/yyc-git/Wonder.js/commit/809412d))
* "redo/undo": finish redo/undo glsl sender data ([977f043](https://github.com/yyc-git/Wonder.js/commit/977f043))
* "redo/undo": finish redo/undo material data ([207a6f1](https://github.com/yyc-git/Wonder.js/commit/207a6f1))
* "redo/undo": finish redo/undo program, glsl location data ([ea788a7](https://github.com/yyc-git/Wonder.js/commit/ea788a7))
* "redo/undo": finish redo/undo shader data ([61a784b](https://github.com/yyc-git/Wonder.js/commit/61a784b))
* "redo/undo": finish redo/undo sourceInstance, objectInstance data ([7df1c34](https://github.com/yyc-git/Wonder.js/commit/7df1c34))
* "redo/undo": finish redo/undo transform data ([20eba4d](https://github.com/yyc-git/Wonder.js/commit/20eba4d))
* add Material->color draft ([9ea7eba](https://github.com/yyc-git/Wonder.js/commit/9ea7eba))
* add redo/undo benchmark test ([eb45aaf](https://github.com/yyc-git/Wonder.js/commit/eb45aaf))
* begin "redo/undo": ([60f9798](https://github.com/yyc-git/Wonder.js/commit/60f9798))
* pass render test ([3875251](https://github.com/yyc-git/Wonder.js/commit/3875251))
* redo/undo: add gameObject data ([6abad52](https://github.com/yyc-git/Wonder.js/commit/6abad52))
* redo/undo: add scheduler,globalTemp,renderData data ([6ed3dcd](https://github.com/yyc-git/Wonder.js/commit/6ed3dcd))
* remove box.html ([d7a13d2](https://github.com/yyc-git/Wonder.js/commit/d7a13d2))
* share material: should send shared materials' uniform cacheable data only once ([1d4136a](https://github.com/yyc-git/Wonder.js/commit/1d4136a))
* update benchmark_redo_undo.html ([4c25559](https://github.com/yyc-git/Wonder.js/commit/4c25559))



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2017-12-12)


### Bug Fixes

* clone material: now if source material's shaderIndex not exist, not set cloned material's shaderIndex ([76aedbf](https://github.com/yyc-git/Wonder.js/commit/76aedbf))
* clone transform: source transform,cloned transforms shouldn't affect each other ([e6662e7](https://github.com/yyc-git/Wonder.js/commit/e6662e7))
* fix instance->set capacity: ([6626856](https://github.com/yyc-git/Wonder.js/commit/6626856))
* fix RenderBasicHardwareInstanceSystem->"bind deleted instance buffer" bug ([a033acb](https://github.com/yyc-git/Wonder.js/commit/a033acb))
* fix shared geometry: GameObjectComponentCommon->_batchAddComponent now not increaseGroupCount ([cb95fe2](https://github.com/yyc-git/Wonder.js/commit/cb95fe2))
* material,meshRenderer,cameraController,transform->dispose: dispose data ([bf2d83a](https://github.com/yyc-git/Wonder.js/commit/bf2d83a))


### Features

* add "instance" related shader libs ([63b632c](https://github.com/yyc-git/Wonder.js/commit/63b632c))
* add benchmark_instance_basic_boxes.html ([5592e47](https://github.com/yyc-git/Wonder.js/commit/5592e47))
* add clone gameObject->contract check: shouldn't clone sourceInstance/objectInstance gameObject ([986e049](https://github.com/yyc-git/Wonder.js/commit/986e049))
* add gpu detect ([6e4b664](https://github.com/yyc-git/Wonder.js/commit/6e4b664))
* add ObjectInstance component ([33fa96c](https://github.com/yyc-git/Wonder.js/commit/33fa96c))
* add render "instance" logic ([d7dc2d1](https://github.com/yyc-git/Wonder.js/commit/d7dc2d1))
* benchmark_instance_basic_boxes.html: add "createAndDisposeObjectInstanceGameObjects" test ([6e224bd](https://github.com/yyc-git/Wonder.js/commit/6e224bd))
* benchmark_instance_basic_boxes.html: add "createAndDisposeSourceInstanceGameObjects" test ([5f9a86e](https://github.com/yyc-git/Wonder.js/commit/5f9a86e))
* benchmark_instance_basic_boxes.html: add "dispose sourceInstance" benchmark test ([b91d58b](https://github.com/yyc-git/Wonder.js/commit/b91d58b))
* benchmark_instance_basic_boxes.html: add "dispose sourceInstance" benchmark test ([7e375a7](https://github.com/yyc-git/Wonder.js/commit/7e375a7))
* finish dispose SourceInstance component ([183abd3](https://github.com/yyc-git/Wonder.js/commit/183abd3))
* instance data: support switch between static and dynamic ([1801c06](https://github.com/yyc-git/Wonder.js/commit/1801c06))
* instance: support batch draw(as fallback) if not support hardware instance ([8d2f391](https://github.com/yyc-git/Wonder.js/commit/8d2f391))
* not support draw array ([d3bd35d](https://github.com/yyc-git/Wonder.js/commit/d3bd35d))
* SourceInstance.re->contract check: check "is alive" ([fadd2ca](https://github.com/yyc-git/Wonder.js/commit/fadd2ca))
* transform: change "defer update" to "immediately update" ([af4e22a](https://github.com/yyc-git/Wonder.js/commit/af4e22a))



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2017-12-01)


### Bug Fixes

* ArraySystem->range: not check range ([4dda2d3](https://github.com/yyc-git/Wonder.js/commit/4dda2d3))
* ArraySystem->range: not check range ([268e7fc](https://github.com/yyc-git/Wonder.js/commit/268e7fc))


### Features

* finish todo ([e5999e5](https://github.com/yyc-git/Wonder.js/commit/e5999e5))
* finish todo ([217a85d](https://github.com/yyc-git/Wonder.js/commit/217a85d))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2017-11-26)


### Bug Fixes

* clone gameObject: add handle component's add logic ([4079261](https://github.com/yyc-git/Wonder.js/commit/4079261))
* clone geometry: should use mapped geometryIndex to set cloned geometry's data ([55853b8](https://github.com/yyc-git/Wonder.js/commit/55853b8))
* fix ComponentSystem->generateIndex ([1a87710](https://github.com/yyc-git/Wonder.js/commit/1a87710))
* fix geometry->mappedIndex bug ([ddc9e64](https://github.com/yyc-git/Wonder.js/commit/ddc9e64))
* fix MeshRenderer->"test add gameObject after dispose" bug ([1057037](https://github.com/yyc-git/Wonder.js/commit/1057037))
* GameObject->cloneGameObject: remove label ([6c23deb](https://github.com/yyc-git/Wonder.js/commit/6c23deb))
* Geometry->getGeometryGameObject: use mapped geometry index ([5350d2e](https://github.com/yyc-git/Wonder.js/commit/5350d2e))
* transform->_sortParentBeforeChildInDirtyArray: now can correctly sort! ([ad90d5f](https://github.com/yyc-git/Wonder.js/commit/ad90d5f))
* vbo buffer->getOrCreateBuffer: test create geometry after dispose one, invoke getOrCreateBuffer should create new buffer ([51db9e0](https://github.com/yyc-git/Wonder.js/commit/51db9e0))
* vbo buffer,data of drawElements/drawArrays should be independent!(should add to two map whose key is geometryIndex!) ([2dae969](https://github.com/yyc-git/Wonder.js/commit/2dae969))


### Features

* .gitignore add ".DS_Store" ([48431f0](https://github.com/yyc-git/Wonder.js/commit/48431f0))
* "dispose component" add contract check: shouldn't dispose the component which isn't alive ([229aaad](https://github.com/yyc-git/Wonder.js/commit/229aaad))
* add "batch dispose" ([4e7668d](https://github.com/yyc-git/Wonder.js/commit/4e7668d))
* add "createShaderChunkSystemFile" gulp task ([05c4eaf](https://github.com/yyc-git/Wonder.js/commit/05c4eaf))
* add "dispose cameraController" logic ([11ce40d](https://github.com/yyc-git/Wonder.js/commit/11ce40d))
* add "dispose geometry component" logic ([cfe9e21](https://github.com/yyc-git/Wonder.js/commit/cfe9e21))
* add "dispose" benchmark test ([4b83334](https://github.com/yyc-git/Wonder.js/commit/4b83334))
* add benchmark_basic_boxes.html ([029e3e9](https://github.com/yyc-git/Wonder.js/commit/029e3e9))
* add clone cameraController ([cfdcf81](https://github.com/yyc-git/Wonder.js/commit/cfdcf81))
* add reallocate geometry logic ([6d7ef79](https://github.com/yyc-git/Wonder.js/commit/6d7ef79))
* begin implement "clone gameObject": ([7470d5f](https://github.com/yyc-git/Wonder.js/commit/7470d5f))
* clone gameObject: add "clone material component" logic ([cff83eb](https://github.com/yyc-git/Wonder.js/commit/cff83eb))
* component add "is alive" check ([e73149e](https://github.com/yyc-git/Wonder.js/commit/e73149e))
* gameObject add "is alive" check ([effdcf4](https://github.com/yyc-git/Wonder.js/commit/effdcf4))
* GameObject: add "dispose", "isAlive" logic ([cd37666](https://github.com/yyc-git/Wonder.js/commit/cd37666))
* GameObject: add "initGameObject" ([3e8a827](https://github.com/yyc-git/Wonder.js/commit/3e8a827))
* Geometry->getGeometryConfigData->add contract check: cloned geometry have no config data, shouldn't get it ([f6569f3](https://github.com/yyc-git/Wonder.js/commit/f6569f3))
* GeometrySystem->init, BasicMaterialSystem->init add check: "shouldn't dispose any xxx before init" ([effe60f](https://github.com/yyc-git/Wonder.js/commit/effe60f))
* meshRenderer: add "disposeComponent","isAlive" logic ([eb23762](https://github.com/yyc-git/Wonder.js/commit/eb23762))
* transform: add dispose component ([46a52f5](https://github.com/yyc-git/Wonder.js/commit/46a52f5))
* transform: add isAlive logic and check ([b97c2f7](https://github.com/yyc-git/Wonder.js/commit/b97c2f7))
* upgrade wonder-glsl-compiler ([1ce5f7f](https://github.com/yyc-git/Wonder.js/commit/1ce5f7f))
* use wonder-bs-sinon, wonder-commonlib ([3e803cc](https://github.com/yyc-git/Wonder.js/commit/3e803cc))



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2017-11-10)


### Bug Fixes

* "setState" now return state ([c3b2697](https://github.com/yyc-git/Wonder.js/commit/c3b2697))
* fix .gitignore ([e3874b0](https://github.com/yyc-git/Wonder.js/commit/e3874b0))
* fix "exec jobs" bug: now exec executable jobs ([6adeed4](https://github.com/yyc-git/Wonder.js/commit/6adeed4))
* fix "send u_mMatrix" bug: if not do any transform operation, should still send identity matrix value on the first send ([3adab41](https://github.com/yyc-git/Wonder.js/commit/3adab41))
* fix contract check ([106ee27](https://github.com/yyc-git/Wonder.js/commit/106ee27))
* fix GameObject.re bug ([31fee6c](https://github.com/yyc-git/Wonder.js/commit/31fee6c))
* fix Main->setMainConfig: now accept Js.boolean instead of bool ([e2954be](https://github.com/yyc-git/Wonder.js/commit/e2954be))
* fix sinon.re->getArgsFromEmptyStub bug ([86a3869](https://github.com/yyc-git/Wonder.js/commit/86a3869))
* fix StateSystem->createJobHandleMap ([04014c3](https://github.com/yyc-git/Wonder.js/commit/04014c3))
* fix test->Main_test related bug ([5d58029](https://github.com/yyc-git/Wonder.js/commit/5d58029))
* fix test->simpleBasicRenderPipeline_test: use "WebGLRenderSystem.init" instead of "BasicMaterialSystem.init" ([c00981c](https://github.com/yyc-git/Wonder.js/commit/c00981c))
* fix transform->setPosition bug ([647c74a](https://github.com/yyc-git/Wonder.js/commit/647c74a))
* MainSystem: now handle nullable filed in contextConfigData(e.g. nullable alpha) ([9e4bd52](https://github.com/yyc-git/Wonder.js/commit/9e4bd52))
* Material->initMaterialShaders: now set shaderIndex to map ([bf4fe1e](https://github.com/yyc-git/Wonder.js/commit/bf4fe1e))
* pass all bsb compiles ([266fab6](https://github.com/yyc-git/Wonder.js/commit/266fab6))
* pass most bsb compile ([7f30e98](https://github.com/yyc-git/Wonder.js/commit/7f30e98))
* remove "send matrix4" cache ([13bde78](https://github.com/yyc-git/Wonder.js/commit/13bde78))
* sinon.re: define createMethodStub's type ([39f2632](https://github.com/yyc-git/Wonder.js/commit/39f2632))
* TimeControllerSystem->_getNow: now can pass render test ([fbb1b61](https://github.com/yyc-git/Wonder.js/commit/fbb1b61))
* transform component: now "moveTo"/"swap" will change "gameObjectMap" ([2554087](https://github.com/yyc-git/Wonder.js/commit/2554087))
* Transform->getLocalToWorldMatricesTypeArr, setLocalToWorldMatricesTypeArr: use "getMatrix4DataIndex(index)" instead of "index" ([99e50bd](https://github.com/yyc-git/Wonder.js/commit/99e50bd))
* use raw js code to implement numberUtils->hexFloat_of_string instead of directly use "parseInt" in number.re ([d9ec9b9](https://github.com/yyc-git/Wonder.js/commit/d9ec9b9))


### Features

* .gitignore add "yarn.lock", ".merlin" ([6e7f2b4](https://github.com/yyc-git/Wonder.js/commit/6e7f2b4))
* add "addChild, setParent" logic ([e79f673](https://github.com/yyc-git/Wonder.js/commit/e79f673))
* add "addComponent","getComponent","hasComponent" logic ([dc3017f](https://github.com/yyc-git/Wonder.js/commit/dc3017f))
* add "createGL", "setGL" logic ([36ca1d6](https://github.com/yyc-git/Wonder.js/commit/36ca1d6))
* add "npm run test:coverage" for collect test coverage ([33f1f6e](https://github.com/yyc-git/Wonder.js/commit/33f1f6e))
* add "setCanvas" and "setContextConfig" logic ([ae72cb8](https://github.com/yyc-git/Wonder.js/commit/ae72cb8))
* add cameraController component ([f8ff3d7](https://github.com/yyc-git/Wonder.js/commit/f8ff3d7))
* add Director,Scene,GameObject -> initData logic ([dabe002](https://github.com/yyc-git/Wonder.js/commit/dabe002))
* add jest and bucklescript build ([ace06d8](https://github.com/yyc-git/Wonder.js/commit/ace06d8))
* add MeshRenderer component ([21ad4e7](https://github.com/yyc-git/Wonder.js/commit/21ad4e7))
* add scheduler ([9a04f87](https://github.com/yyc-git/Wonder.js/commit/9a04f87))
* add TimeController ([4abf2ea](https://github.com/yyc-git/Wonder.js/commit/4abf2ea))
* add transform component: finish "create", "initData" logic ([1dac8c2](https://github.com/yyc-git/Wonder.js/commit/1dac8c2))
* add travis ci ([ca39cdc](https://github.com/yyc-git/Wonder.js/commit/ca39cdc))
* begin render logic ([afe1733](https://github.com/yyc-git/Wonder.js/commit/afe1733))
* begin render: ([8a6e49b](https://github.com/yyc-git/Wonder.js/commit/8a6e49b))
* benchmark test "setParent" ([96b9f82](https://github.com/yyc-git/Wonder.js/commit/96b9f82))
* cameraController component: add "add component" logic ([344e9a2](https://github.com/yyc-git/Wonder.js/commit/344e9a2))
* cameraController component: add "getPMatrix" ([3a89a88](https://github.com/yyc-git/Wonder.js/commit/3a89a88))
* cameraController component: add "getWorldToCameraMatrix" ([20c710d](https://github.com/yyc-git/Wonder.js/commit/20c710d))
* cameraController component: add lost files! ([f609d34](https://github.com/yyc-git/Wonder.js/commit/f609d34))
* debugUtils: extract "xxxJson" functions ([7c5b7e6](https://github.com/yyc-git/Wonder.js/commit/7c5b7e6))
* DirectorSystem add "init render", "render" logic ([d405158](https://github.com/yyc-git/Wonder.js/commit/d405158))
* DirectorSystem: add loop and init ([ff53270](https://github.com/yyc-git/Wonder.js/commit/ff53270))
* edit README ([4ad2324](https://github.com/yyc-git/Wonder.js/commit/4ad2324))
* finish WebGLRenderSystem->init draft ([fd783cf](https://github.com/yyc-git/Wonder.js/commit/fd783cf))
* implement "clear_color", "clear_buffer" logic ([8018c61](https://github.com/yyc-git/Wonder.js/commit/8018c61))
* implement "render_basic" job ([57949d2](https://github.com/yyc-git/Wonder.js/commit/57949d2))
* implement geometry component draft ([871a496](https://github.com/yyc-git/Wonder.js/commit/871a496))
* implement GLSLSenderSystem->addAttributeSendData draft logic ([760077d](https://github.com/yyc-git/Wonder.js/commit/760077d))
* implement GLSLSenderSystem->addDrawPointsFunc draft logic ([232a77d](https://github.com/yyc-git/Wonder.js/commit/232a77d))
* implement GLSLSenderSystem->addUniformSendData draft logic ([904c02e](https://github.com/yyc-git/Wonder.js/commit/904c02e))
* implement GLSLSenderSystem->getCameraXXX, getModelMMatrixData logic ([1e9fb49](https://github.com/yyc-git/Wonder.js/commit/1e9fb49))
* implement Main->"set config", "create canvas"(only pass compile, not pass test yet) [#2](https://github.com/yyc-git/Wonder.js/issues/2) ([8b8a0b7](https://github.com/yyc-git/Wonder.js/commit/8b8a0b7))
* implement render->init logic draft ([c01f071](https://github.com/yyc-git/Wonder.js/commit/c01f071))
* package.json->"npm run watch" script: add "-clean-world" ([6f0f1b0](https://github.com/yyc-git/Wonder.js/commit/6f0f1b0))
* pass "show one box" render test! ([068742c](https://github.com/yyc-git/Wonder.js/commit/068742c))
* prepare for reasonml environment, rewrite engine from scratch ([7b7b492](https://github.com/yyc-git/Wonder.js/commit/7b7b492))
* remove all examples ([0dfed55](https://github.com/yyc-git/Wonder.js/commit/0dfed55))
* remove gulpfile.js ([f14351f](https://github.com/yyc-git/Wonder.js/commit/f14351f))
* transform component: add "get/setLocalPosition" ([c7e1b27](https://github.com/yyc-git/Wonder.js/commit/c7e1b27))
* transform component: add "getChildren" ([cde0d56](https://github.com/yyc-git/Wonder.js/commit/cde0d56))
* transform component: add "init", "handleAddComponent" logic ([c10319a](https://github.com/yyc-git/Wonder.js/commit/c10319a))
* transform component: finish "setParent" logic ([e5eaf93](https://github.com/yyc-git/Wonder.js/commit/e5eaf93))
* transform component: implement "update" logic ([0f21615](https://github.com/yyc-git/Wonder.js/commit/0f21615))
* update reason to 3.0.0 ([18e05f7](https://github.com/yyc-git/Wonder.js/commit/18e05f7))
* update version ([12edde2](https://github.com/yyc-git/Wonder.js/commit/12edde2))



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2017-10-12)


### Bug Fixes

* arrayUtils->forEach, filter: now handle "arr is undefined" case ([c670eb6](https://github.com/yyc-git/Wonder.js/commit/c670eb6))
* Color->toString: fix "some r,g,b value will cause like #asdfff.sadasdsa case" bug ([302fb8e](https://github.com/yyc-git/Wonder.js/commit/302fb8e))
* Color->toString: fix compute bug ([432aeca](https://github.com/yyc-git/Wonder.js/commit/432aeca))
* fix "set isTest" ([7f34aed](https://github.com/yyc-git/Wonder.js/commit/7f34aed))
* fix GameObjectSystem->setParent->set children ([0202267](https://github.com/yyc-git/Wonder.js/commit/0202267))
* fix MainSystem->initData: now init DeviceManager data ([87a3134](https://github.com/yyc-git/Wonder.js/commit/87a3134))
* fix no worker->set view port bug: now can set view port after first frame ([a20ee9d](https://github.com/yyc-git/Wonder.js/commit/a20ee9d))
* fix render worker->set view port when init Main ([b45c1ef](https://github.com/yyc-git/Wonder.js/commit/b45c1ef))
* fix render worker->webgl1->FrontRenderWorkerSystem ([b826cbb](https://github.com/yyc-git/Wonder.js/commit/b826cbb))
* fix wd.js->import wonder-frp classes twice(e.g. Stream, Stream$1) bug ([85ada76](https://github.com/yyc-git/Wonder.js/commit/85ada76))
* GameObjectSystem->setParent: now if child already has parent, not dispose child's MeshRenderer component ([1e11578](https://github.com/yyc-git/Wonder.js/commit/1e11578))
* MapManagerSystem->dispose: now delete MapManagerData.materialTextureMap ([73639f8](https://github.com/yyc-git/Wonder.js/commit/73639f8))
* no worker: change "u_sampler2D0" to "u_sampler2D" ([331dec6](https://github.com/yyc-git/Wonder.js/commit/331dec6))
* package.json: bowser,immutable,wonder-expect.js use fixed version(for rollup->namedExports) ([cce91e4](https://github.com/yyc-git/Wonder.js/commit/cce91e4))
* pass benchmark_light_texture_boxes.html ([2e95260](https://github.com/yyc-git/Wonder.js/commit/2e95260))
* render worker: clearNeedInitTextureDataArr after initMapManagers ([34d22a2](https://github.com/yyc-git/Wonder.js/commit/34d22a2))
* render worker: now can show texture ([141645b](https://github.com/yyc-git/Wonder.js/commit/141645b))
* rollup.config.xxx.js: "namedExports" now define xxx@xxx(add version to handle the package installed by cnpm case) ([2309737](https://github.com/yyc-git/Wonder.js/commit/2309737))
* samples remove import materialTool.js ([0d2a22a](https://github.com/yyc-git/Wonder.js/commit/0d2a22a))
* ThreeDTransformSystem->setPosition,setLocalPosition: should mark children to isTranslate ([a699f3a](https://github.com/yyc-git/Wonder.js/commit/a699f3a))


### Features

* add "dist/" to .gitignore ([f6a3cea](https://github.com/yyc-git/Wonder.js/commit/f6a3cea))
* asset database: use idle background task api to optimize "load" function(wonder-frp has bug:some files duplicate! need solve!) ([8b0a607](https://github.com/yyc-git/Wonder.js/commit/8b0a607))
* AssetDatabaseSystem: not implement streamLoad ([fc14fec](https://github.com/yyc-git/Wonder.js/commit/fc14fec))
* begin load asset: ([1b09165](https://github.com/yyc-git/Wonder.js/commit/1b09165))
* Color->toString now can convert rgb to string ([8873183](https://github.com/yyc-git/Wonder.js/commit/8873183))
* commit dist files ([f1f64f2](https://github.com/yyc-git/Wonder.js/commit/f1f64f2))
* DeviceManager export "getDeviceManagerGL" function ([a83a167](https://github.com/yyc-git/Wonder.js/commit/a83a167))
* DeviceManager export "setDeviceManagerViewport" function ([2ef22d5](https://github.com/yyc-git/Wonder.js/commit/2ef22d5))
* DeviceManager: add "getDeviceManagerClearColor" ([04e68c7](https://github.com/yyc-git/Wonder.js/commit/04e68c7))
* export "isDirectorInit", "initAllData", "getDeviceManagerViewport", "getCanvas"... to user ([1ba545b](https://github.com/yyc-git/Wonder.js/commit/1ba545b))
* export Director->init, loopBody for editor ([5be0228](https://github.com/yyc-git/Wonder.js/commit/5be0228))
* GameObject add "getGameObjectAllComponents" function ([9238d35](https://github.com/yyc-git/Wonder.js/commit/9238d35))
* GameObject add "getGameObjectMaterial" function ([7233a07](https://github.com/yyc-git/Wonder.js/commit/7233a07))
* GameObject: add "setGameObjectParent" function ([d0bd173](https://github.com/yyc-git/Wonder.js/commit/d0bd173))
* hot load->AssetDatabase add "setTextureAsset" function ([54f3a3b](https://github.com/yyc-git/Wonder.js/commit/54f3a3b))
* hot load->support "test change texture at runtime"(not pass render worker yet) ([6fc1cb0](https://github.com/yyc-git/Wonder.js/commit/6fc1cb0))
* implement load ([a957fa0](https://github.com/yyc-git/Wonder.js/commit/a957fa0))
* render worker pass "hotload texture at runtime"(pass render test: basic_texture_box.html) ([c431bd3](https://github.com/yyc-git/Wonder.js/commit/c431bd3))
* TextureAsset,ImageTextureAsset add "toTexture" method ([9908ba4](https://github.com/yyc-git/Wonder.js/commit/9908ba4))
* try load wd asset(not finish) ([4e98081](https://github.com/yyc-git/Wonder.js/commit/4e98081))
* update ci->nodejs version ([c46b490](https://github.com/yyc-git/Wonder.js/commit/c46b490))
* update ci->nodejs version ([45d62f2](https://github.com/yyc-git/Wonder.js/commit/45d62f2))
* update npm package ([772c6dc](https://github.com/yyc-git/Wonder.js/commit/772c6dc))
* update npm version ([cc065a6](https://github.com/yyc-git/Wonder.js/commit/cc065a6))
* update version ([a2e678c](https://github.com/yyc-git/Wonder.js/commit/a2e678c))
* update wonder-expect.js version ([06d36b4](https://github.com/yyc-git/Wonder.js/commit/06d36b4))
* update wonder-frp version ([7dc6e9e](https://github.com/yyc-git/Wonder.js/commit/7dc6e9e))



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2017-08-23)


### Bug Fixes

* change MapManagerData->textureIndices from Float32Array to Uint32Array ([c5a193c](https://github.com/yyc-git/Wonder.js/commit/c5a193c))
* ci test: render worker->webgl2 ci test use firefox instead of chrome ([80332a0](https://github.com/yyc-git/Wonder.js/commit/80332a0))
* continue fix last bug: separate render worker-> PointLightWorkerData, PointLightWorkerSystem for webgl1,webgl2 ([d5cd0e0](https://github.com/yyc-git/Wonder.js/commit/d5cd0e0))
* DirectionLightSystem: mark dirty when set color/intensity ([d980f7a](https://github.com/yyc-git/Wonder.js/commit/d980f7a))
* fix "if one material set diffuse map, one not, then the two should has different shaders" bug ([88b1a6a](https://github.com/yyc-git/Wonder.js/commit/88b1a6a))
* fix "render worker->front render light not work" bug: separatewebgl1/webgl2->LightWorkerSystem(initData function) ([e37595e](https://github.com/yyc-git/Wonder.js/commit/e37595e))
* fix "when the camera enters the light volume the light disappears." bug ([7775edc](https://github.com/yyc-git/Wonder.js/commit/7775edc))
* fix es6 module import path ([718da7f](https://github.com/yyc-git/Wonder.js/commit/718da7f))
* fix es6 module import path: change upper case to lower case ([0fd2143](https://github.com/yyc-git/Wonder.js/commit/0fd2143))
* fix es6 module import path: fix file name ([c3ea455](https://github.com/yyc-git/Wonder.js/commit/c3ea455))
* fix GameObjectSystem->removeChild: now removed gameObject will not be rendered ([7fcc4e9](https://github.com/yyc-git/Wonder.js/commit/7fcc4e9))
* fix PointLightSystem->initData->size: isXXXDirtys use Uint8Array.BYTES_PER_ELEMENT instead of Float32Array.BYTES_PER_ELEMENT ([dce3ff4](https://github.com/yyc-git/Wonder.js/commit/dce3ff4))
* fix webgl2->defer shading->draw point light pass->scissor optimize->compute light range algorithm: now can mark the "full screen", "not in the screen", "in the screen" cases ([527e0e1](https://github.com/yyc-git/Wonder.js/commit/527e0e1))
* fix WebGLDetectSystem ([bc29ab2](https://github.com/yyc-git/Wonder.js/commit/bc29ab2))
* front render light: now not read texture diffuseMap.a data ([2d32d90](https://github.com/yyc-git/Wonder.js/commit/2d32d90))
* index.ts: rename "xxxIDxxx.ts" to "xxxIdxxx.ts" ([7ff7433](https://github.com/yyc-git/Wonder.js/commit/7ff7433))
* light material use "diffuseMaps","specularMaps" instead of "diffuseMapMap", "specularMapMap" ([f9a2e7f](https://github.com/yyc-git/Wonder.js/commit/f9a2e7f))
* light->disposeComponent: now dispose isDirtys data ([1758705](https://github.com/yyc-git/Wonder.js/commit/1758705))
* LightMaterialSystem->disposeComponent: now dispose "diffuseMapMap", "specularMapMap" data ([0473f7a](https://github.com/yyc-git/Wonder.js/commit/0473f7a))
* MaterialSystem,PointLightSystem,DirectionLightSystem->disposeComponent: now not check that "lastComponentIndex !== sourceComponentIndex" ([5b43bc8](https://github.com/yyc-git/Wonder.js/commit/5b43bc8))
* no worker->separate PointLightData for webgl1,webgl2 ([f2a4547](https://github.com/yyc-git/Wonder.js/commit/f2a4547))
* now can bind no-gbuffer textures: ([220ad17](https://github.com/yyc-git/Wonder.js/commit/220ad17))
* now expand max point light count to be bigger than the one defined in front render ([341f516](https://github.com/yyc-git/Wonder.js/commit/341f516))
* now point light shouldn't be created after Director->init ([0ac2486](https://github.com/yyc-git/Wonder.js/commit/0ac2486))
* now vaoUtils->disposeVao will remove vao from VaoData.vaos ([d8e6e2c](https://github.com/yyc-git/Wonder.js/commit/d8e6e2c))
* pass webgl1 ([e8ad5cc](https://github.com/yyc-git/Wonder.js/commit/e8ad5cc))
* programUtils->_getOrCreateArrayBuffer->switch default bug ([55610b1](https://github.com/yyc-git/Wonder.js/commit/55610b1))
* rename ComponentComponentIDManager to ComponentComponentIdManager ([4e547e0](https://github.com/yyc-git/Wonder.js/commit/4e547e0))
* rename ComponentComponentIDManager to ComponentComponentIdManager ([4df4faf](https://github.com/yyc-git/Wonder.js/commit/4df4faf))
* rename ComponentTypeIDManager to ComponentTypeIdManager ([f856ffa](https://github.com/yyc-git/Wonder.js/commit/f856ffa))
* rename ComponentTypeIDManager to ComponentTypeIdManager ([3848717](https://github.com/yyc-git/Wonder.js/commit/3848717))
* rename IUIDEntity to IUIdEntity ([caf0b58](https://github.com/yyc-git/Wonder.js/commit/caf0b58))
* rename IUIDEntity to IUIdEntity ([9559c8b](https://github.com/yyc-git/Wonder.js/commit/9559c8b))
* render worker: pass webgl1 ([27aaf8a](https://github.com/yyc-git/Wonder.js/commit/27aaf8a))
* restore WebGLDetectSystem ([5cd53d0](https://github.com/yyc-git/Wonder.js/commit/5cd53d0))
* try solve ci->"karama disconnected" problem: download package.json->jasmine to v2.5.2 ([ffb097c](https://github.com/yyc-git/Wonder.js/commit/ffb097c))
* webgl2->basic render->glsl: now use "texture" instead of "texture2D" ([714bd50](https://github.com/yyc-git/Wonder.js/commit/714bd50))
* webgl2->ubo->shaderLib_generator->PointLightUboShaderLib: now bind ubo no matter is dirty or not ([e09cd50](https://github.com/yyc-git/Wonder.js/commit/e09cd50))


### Features

* add "defer_shading_pointLight_box.html" sample and pass ([319f042](https://github.com/yyc-git/Wonder.js/commit/319f042))
* begin add defer shading to engine: ([957e438](https://github.com/yyc-git/Wonder.js/commit/957e438))
* begin separate webgl1,webgl2: ([cf10f69](https://github.com/yyc-git/Wonder.js/commit/cf10f69))
* benchmark->benchmark_light_texture_boxes.html: add many pointlights test for defer shading ([4f00091](https://github.com/yyc-git/Wonder.js/commit/4f00091))
* commit dist ([b3fb495](https://github.com/yyc-git/Wonder.js/commit/b3fb495))
* continue separate webgl1,webgl2: ([9afff7e](https://github.com/yyc-git/Wonder.js/commit/9afff7e))
* defer shading sample add "scissor optimize" ([415cb54](https://github.com/yyc-git/Wonder.js/commit/415cb54))
* finish "defer light pass" draft ([3c31865](https://github.com/yyc-git/Wonder.js/commit/3c31865))
* now support "different gameObject can add the same geometry component so that they can share the same vao" ([61c9d0f](https://github.com/yyc-git/Wonder.js/commit/61c9d0f))
* pass "basic material" render ([43a54f6](https://github.com/yyc-git/Wonder.js/commit/43a54f6))
* pass webgl2->"basic material" render + defer render ([9bb5cca](https://github.com/yyc-git/Wonder.js/commit/9bb5cca))
* render worker->pass defer shading ([dc8ffc1](https://github.com/yyc-git/Wonder.js/commit/dc8ffc1))
* render worker->pass front render light ([781da67](https://github.com/yyc-git/Wonder.js/commit/781da67))
* render worker->webgl1, webgl2: support vao ([74c170e](https://github.com/yyc-git/Wonder.js/commit/74c170e))
* render worker->webgl1: pass basic render, front render ([2bb2c76](https://github.com/yyc-git/Wonder.js/commit/2bb2c76))
* render worker->webgl2: pass basic render, defer render ([9e01f3f](https://github.com/yyc-git/Wonder.js/commit/9e01f3f))
* render worker: pass ([c27d649](https://github.com/yyc-git/Wonder.js/commit/c27d649))
* render worker: pass ([def1179](https://github.com/yyc-git/Wonder.js/commit/def1179))
* render worker: pass ([8242fad](https://github.com/yyc-git/Wonder.js/commit/8242fad))
* render worker: pass ([a2c846a](https://github.com/yyc-git/Wonder.js/commit/a2c846a))
* render worker: pass scissor optimize ([8ce70c3](https://github.com/yyc-git/Wonder.js/commit/8ce70c3))
* render worker: support direction light ([7880565](https://github.com/yyc-git/Wonder.js/commit/7880565))
* render worker: support ubo ([2f5e2b3](https://github.com/yyc-git/Wonder.js/commit/2f5e2b3))
* try pass ci ([2c354f5](https://github.com/yyc-git/Wonder.js/commit/2c354f5))
* try pass ci ([2d861ee](https://github.com/yyc-git/Wonder.js/commit/2d861ee))
* try pass ci ([b67626c](https://github.com/yyc-git/Wonder.js/commit/b67626c))
* try pass ci ([36e5e46](https://github.com/yyc-git/Wonder.js/commit/36e5e46))
* try pass ci ([16bb77b](https://github.com/yyc-git/Wonder.js/commit/16bb77b))
* try pass ci ([0815afd](https://github.com/yyc-git/Wonder.js/commit/0815afd))
* try pass ci ([3f1abf1](https://github.com/yyc-git/Wonder.js/commit/3f1abf1))
* try pass ci ([6972df6](https://github.com/yyc-git/Wonder.js/commit/6972df6))
* try pass ci->no worker->webgl1, webgl2: use chrome instead of firefox, but render worker->webgl1, webgl2 still use firefox ([0b57a7c](https://github.com/yyc-git/Wonder.js/commit/0b57a7c))
* try pass ci->no worker, render worker->webgl1, webgl2: use firefox instead of chrome ([6405699](https://github.com/yyc-git/Wonder.js/commit/6405699))
* try pass ci->render worker->webgl1, webgl2: use chrome instead of firefox ([6d80ead](https://github.com/yyc-git/Wonder.js/commit/6d80ead))
* update benchmark ([e5cce5b](https://github.com/yyc-git/Wonder.js/commit/e5cce5b))
* update dist ([0e322c8](https://github.com/yyc-git/Wonder.js/commit/0e322c8))
* update README ([e369380](https://github.com/yyc-git/Wonder.js/commit/e369380))
* update version ([c24b778](https://github.com/yyc-git/Wonder.js/commit/c24b778))
* update version ([c128a0d](https://github.com/yyc-git/Wonder.js/commit/c128a0d))
* webgl1 support vao(if not support extension, fallback) ([25e60da](https://github.com/yyc-git/Wonder.js/commit/25e60da))
* webgl1->shaderLib_generator->light shader lib: add dirty ([91f3740](https://github.com/yyc-git/Wonder.js/commit/91f3740))
* webgl2 support glsl 3.0->attribute location:define attribute location in shaderLib_generator, then auto generate attribute define in glsl ([98551e2](https://github.com/yyc-git/Wonder.js/commit/98551e2))
* webgl2 support vao ([059497f](https://github.com/yyc-git/Wonder.js/commit/059497f))
* webgl2->basic render add ubo ([a691896](https://github.com/yyc-git/Wonder.js/commit/a691896))
* webgl2->defer shading: if not support extensionColorBufferFloat, error ([a733122](https://github.com/yyc-git/Wonder.js/commit/a733122))
* webgl2->defer shading: support ambient light ([f803ca7](https://github.com/yyc-git/Wonder.js/commit/f803ca7))
* webgl2->defer shading: support direction light ([51a9c01](https://github.com/yyc-git/Wonder.js/commit/51a9c01))
* webgl2: begin implement ubo(uniform buffer) ([e8aead5](https://github.com/yyc-git/Wonder.js/commit/e8aead5))



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2017-07-22)


### Bug Fixes

* fix gulpfile->rollupRenderWorker, rollupNoWorker task ([ced4fd0](https://github.com/yyc-git/Wonder.js/commit/ced4fd0))
* fix render worker->"can't set flipY by 'gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY)'" ([78cc5a8](https://github.com/yyc-git/Wonder.js/commit/78cc5a8))
* MainSystem-> import from "InitConfigSystem" instead of "initConfigSystem" ([2c2aa71](https://github.com/yyc-git/Wonder.js/commit/2c2aa71))
* make light sample run correctly: init state(set front side) ([e791ce2](https://github.com/yyc-git/Wonder.js/commit/e791ce2))
* material use one buffer(MaterialData.buffer) ([da05460](https://github.com/yyc-git/Wonder.js/commit/da05460))
* now "one type material map to multi shader index" ([05f79a8](https://github.com/yyc-git/Wonder.js/commit/05f79a8))
* now "set isTest" can work correctly in render worker ([0c885a7](https://github.com/yyc-git/Wonder.js/commit/0c885a7))
* now not mannually import stream,root from wonder-frp!(solve the problem in wonder-frp project) ([a440a25](https://github.com/yyc-git/Wonder.js/commit/a440a25))
* texture->now dynamicly send texture sampler unit index in programUtils->sendUniformData ([d95e1f3](https://github.com/yyc-git/Wonder.js/commit/d95e1f3))
* textureUtils->getWidth, getHeight: if value is 0 and source exist, return source.width/height ([3c54a73](https://github.com/yyc-git/Wonder.js/commit/3c54a73))
* to pass rollup: textureUtils->not "return this" ([32e2d3a](https://github.com/yyc-git/Wonder.js/commit/32e2d3a))
* try pass travi ci ([26f35dd](https://github.com/yyc-git/Wonder.js/commit/26f35dd))
* try pass travi ci ([dd95bf3](https://github.com/yyc-git/Wonder.js/commit/dd95bf3))


### Features

* add "basic_light_box" sample ([174aebe](https://github.com/yyc-git/Wonder.js/commit/174aebe))
* add benchmark_light_texture_boxes.html ([a3a2422](https://github.com/yyc-git/Wonder.js/commit/a3a2422))
* add point light ([65ffa50](https://github.com/yyc-git/Wonder.js/commit/65ffa50))
* begin "add light": add BasicMaterialData(not pass worker) ([96cb235](https://github.com/yyc-git/Wonder.js/commit/96cb235))
* code converage now show noWorker report ([ec4be1a](https://github.com/yyc-git/Wonder.js/commit/ec4be1a))
* commit dist ([0ef2aaa](https://github.com/yyc-git/Wonder.js/commit/0ef2aaa))
* finish "add ambient,direction light" draft ([24c77cc](https://github.com/yyc-git/Wonder.js/commit/24c77cc))
* finish "todo" remained in this version ([f8076f5](https://github.com/yyc-git/Wonder.js/commit/f8076f5))
* finish light for render worker(pass compile): ([dab8b19](https://github.com/yyc-git/Wonder.js/commit/dab8b19))
* light material support diffuse map, specular map ([e0685c6](https://github.com/yyc-git/Wonder.js/commit/e0685c6))
* pass "light_box" sample(still has bug) ([87a4016](https://github.com/yyc-git/Wonder.js/commit/87a4016))
* pass render worker ([2033cfe](https://github.com/yyc-git/Wonder.js/commit/2033cfe))
* render worker-> pass "basic_texture_box.html" run test ([7eb74a1](https://github.com/yyc-git/Wonder.js/commit/7eb74a1))
* render worker->pass texture run test in firefox ([e1c1d6b](https://github.com/yyc-git/Wonder.js/commit/e1c1d6b))
* render worker: pass basic light material texture ([cb7578c](https://github.com/yyc-git/Wonder.js/commit/cb7578c))
* render worker: pass boxes.html run test ([a9d4c9c](https://github.com/yyc-git/Wonder.js/commit/a9d4c9c))
* render worker: pass light_box run test ([61e3668](https://github.com/yyc-git/Wonder.js/commit/61e3668))
* render worker: support point light ([f088b18](https://github.com/yyc-git/Wonder.js/commit/f088b18))
* support basic material->texture ([76aaa1e](https://github.com/yyc-git/Wonder.js/commit/76aaa1e))
* update typescript to 2.4: ([4915a83](https://github.com/yyc-git/Wonder.js/commit/4915a83))



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2017-06-20)


### Bug Fixes

* benchmark test->createAndDisposeGameObjects: after a while, the new created boxes will decrease! ([f849c39](https://github.com/yyc-git/Wonder.js/commit/f849c39))
* fix "material class name and shader index" ([2dfa975](https://github.com/yyc-git/Wonder.js/commit/2dfa975))
* fix benchmark_basic_boxes->_setData ([d383752](https://github.com/yyc-git/Wonder.js/commit/d383752))
* fix material->color ([be20639](https://github.com/yyc-git/Wonder.js/commit/be20639))
* fix material->opacity, alphaTest ([6e3b09b](https://github.com/yyc-git/Wonder.js/commit/6e3b09b))
* fix MaterialSystem, MaterialData: ([2bdfac4](https://github.com/yyc-git/Wonder.js/commit/2bdfac4))
* fix render worker geometry bug ([e0e3dfa](https://github.com/yyc-git/Wonder.js/commit/e0e3dfa))
* fix render worker->set screen, viewport, canvas ([592382b](https://github.com/yyc-git/Wonder.js/commit/592382b))
* GeometrySystem->_initBufferData: when geometryDataBufferCount is just enough, set indices should not affect set vertices ([9f920a0](https://github.com/yyc-git/Wonder.js/commit/9f920a0))
* GeometrySystem->_initBufferData: when geometryDataBufferCount is just enough, set indices should not affect set vertices ([ee1d32c](https://github.com/yyc-git/Wonder.js/commit/ee1d32c))
* GeometrySystem->disposeComponent: now will dispose corresponding buffers when need reallocate memory ([7b7ede3](https://github.com/yyc-git/Wonder.js/commit/7b7ede3))
* invoke "gl.commit" when all renderCommands are drawed ([e1ed43e](https://github.com/yyc-git/Wonder.js/commit/e1ed43e))
* MainSystem,MeshRendererSystem->disposeComponent: now map is all array ([61acc57](https://github.com/yyc-git/Wonder.js/commit/61acc57))
* move wonder-package->postinstall to Wonder.js ([daa1550](https://github.com/yyc-git/Wonder.js/commit/daa1550))
* now can pass geometry point data(vertices, indices) to worker through SharedArrayBuffer ([5ecd519](https://github.com/yyc-git/Wonder.js/commit/5ecd519))
* now import DeviceManagerWorkerSystem->IO from "wonder-fantasy-land" instead of "Wonder-Fantasy-Land" ([ca6670a](https://github.com/yyc-git/Wonder.js/commit/ca6670a))
* pass travis ci: Wonder.js not postinstall ([04fb4b6](https://github.com/yyc-git/Wonder.js/commit/04fb4b6))
* restore GeometryWorkerSystem->getIndexType, getIndexTypeSize ([ed0485d](https://github.com/yyc-git/Wonder.js/commit/ed0485d))
* SceneSystem->addChild: should pass "add gameObject which has parent to scene" ([76bf7d5](https://github.com/yyc-git/Wonder.js/commit/76bf7d5))
* travis ci: use "gulp testInCI" instead of "npm test" ([fdf493b](https://github.com/yyc-git/Wonder.js/commit/fdf493b))


### Features

* add "rollupRenderWorker", "rollupNoWorker" gulp tasks ([bd5a1e6](https://github.com/yyc-git/Wonder.js/commit/bd5a1e6))
* add scheduler ([89141e1](https://github.com/yyc-git/Wonder.js/commit/89141e1))
* can handle "support render worker"  and "not support"(draft) ([30f019e](https://github.com/yyc-git/Wonder.js/commit/30f019e))
* commit dist files ([b32c8ae](https://github.com/yyc-git/Wonder.js/commit/b32c8ae))
* commit gulp->test.js ([e5e757a](https://github.com/yyc-git/Wonder.js/commit/e5e757a))
* GeometrySystem->disposeComponent: reallocate geometry buffer and maps ([eaac1a4](https://github.com/yyc-git/Wonder.js/commit/eaac1a4))
* Main->setConfig support set "workerConfig->renderWorkerFileDir" ([8d0cf39](https://github.com/yyc-git/Wonder.js/commit/8d0cf39))
* MaterialSystem ([346f56e](https://github.com/yyc-git/Wonder.js/commit/346f56e))
* pass compile and run test: can handle "support render worker"  and "not support" ([89bdc28](https://github.com/yyc-git/Wonder.js/commit/89bdc28))
* update README.org ([256a7e7](https://github.com/yyc-git/Wonder.js/commit/256a7e7))
* update README.org ([19c186e](https://github.com/yyc-git/Wonder.js/commit/19c186e))
* update README.org ([dcfd5c7](https://github.com/yyc-git/Wonder.js/commit/dcfd5c7))
* update to v1.0.0-alpha.3 ([1ac95c5](https://github.com/yyc-git/Wonder.js/commit/1ac95c5))
* update wonder-expect.js to 0.1.9 ([11e104d](https://github.com/yyc-git/Wonder.js/commit/11e104d))



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/yyc-git/Wonder.js/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-05-29)


### Bug Fixes

* "watchForTest" gulp task now add "generateIndex" task ([baa637b](https://github.com/yyc-git/Wonder.js/commit/baa637b))
* continue rename ComponentTypeIdManager to ComponentTypeIDManager: fix SceneSystem, RenderCommandSystem ([6cc2134](https://github.com/yyc-git/Wonder.js/commit/6cc2134))
* fix .travis.yml to try to pass ci ([3ec1fae](https://github.com/yyc-git/Wonder.js/commit/3ec1fae))
* fix .travis.yml to try to pass ci ([ea1ad03](https://github.com/yyc-git/Wonder.js/commit/ea1ad03))
* fix .travis.yml to try to pass ci ([207fc02](https://github.com/yyc-git/Wonder.js/commit/207fc02))
* fix .travis.yml to try to pass ci ([36897c1](https://github.com/yyc-git/Wonder.js/commit/36897c1))
* fix fp example bug ([269e0c0](https://github.com/yyc-git/Wonder.js/commit/269e0c0))
* fix GameObjectData->type ([c3aa568](https://github.com/yyc-git/Wonder.js/commit/c3aa568))
* fix GameObjectSystem->dispose, ThreeDTransformSpec->disposeComponent ([21f09b5](https://github.com/yyc-git/Wonder.js/commit/21f09b5))
* fix GeometrySystem->disposeComponent: now can remove vertices,indices data correctly ([3a3ed7f](https://github.com/yyc-git/Wonder.js/commit/3a3ed7f))
* fix gulpfile->createShaderChunk gulp task ([7688c0c](https://github.com/yyc-git/Wonder.js/commit/7688c0c))
* fix jest and ts-jest problem ([0a92337](https://github.com/yyc-git/Wonder.js/commit/0a92337))
* fix jest/specHelper.js ([5041bb3](https://github.com/yyc-git/Wonder.js/commit/5041bb3))
* fix MainSystem,DeviceManagerSystem->requireCheckFunc/ensureFunc with curry bug ([f4c2a26](https://github.com/yyc-git/Wonder.js/commit/f4c2a26))
* fix MaterialData,ThreeDTransformData,GameObjectData->type ([440ee16](https://github.com/yyc-git/Wonder.js/commit/440ee16))
* fix memory->threeDTransform->gameObjectMap not release bug ([e7b552c](https://github.com/yyc-git/Wonder.js/commit/e7b552c))
* fix transform->parent bug ([2a697c1](https://github.com/yyc-git/Wonder.js/commit/2a697c1))
* GameObjectSystem -> isAlive: now can handle children's isAlive correctly ([efa3507](https://github.com/yyc-git/Wonder.js/commit/efa3507))
* package.json add "through-gulp" dependences ([4ecd527](https://github.com/yyc-git/Wonder.js/commit/4ecd527))
* package.json->"devDependencies" add "del" ([09276a7](https://github.com/yyc-git/Wonder.js/commit/09276a7))
* rename ComponentTypeIdManager to ComponentTypeIDManager ([25c3582](https://github.com/yyc-git/Wonder.js/commit/25c3582))
* rename ComponentTypeIdManager to ComponentTypeIDManager ([19add9e](https://github.com/yyc-git/Wonder.js/commit/19add9e))
* src/index.ts not not contain "xxxSystem.ts" ([19b9953](https://github.com/yyc-git/Wonder.js/commit/19b9953))
* ThreeDTransformSystem->getLocalToWorldMatrix->cache: now use localToWorldMatrixCacheMap ([cdeaec6](https://github.com/yyc-git/Wonder.js/commit/cdeaec6))
* ThreeDTransformSystem->initData: now size not contain Uint16Array.BYTES_PER_ELEMENT * 3 ([f4cc4f1](https://github.com/yyc-git/Wonder.js/commit/f4cc4f1))
* try to pass travis: ([828f085](https://github.com/yyc-git/Wonder.js/commit/828f085))
* try to pass travis: ([c4c7158](https://github.com/yyc-git/Wonder.js/commit/c4c7158))
* try to pass travis: update wonder-package to not postinstall global package ([446183b](https://github.com/yyc-git/Wonder.js/commit/446183b))


### Features

* "build" gulp task add "generateIndex" gulp task ([7e752ab](https://github.com/yyc-git/Wonder.js/commit/7e752ab))
* "quad demo": add "set pos" logic, change "sync" and "the sended data to collision worker" logic ([fd376e4](https://github.com/yyc-git/Wonder.js/commit/fd376e4))
* "quad demo": add action worker and collision worker ([7040483](https://github.com/yyc-git/Wonder.js/commit/7040483))
* "quad demo": add game loop ([905d38e](https://github.com/yyc-git/Wonder.js/commit/905d38e))
* "quad demo": make quad movable ([0f13575](https://github.com/yyc-git/Wonder.js/commit/0f13575))
* "quad demo": support record and rePlay ([759ff34](https://github.com/yyc-git/Wonder.js/commit/759ff34))
* "quad demo": support render webgl in worker(now only firefox support) ([a1fe0a8](https://github.com/yyc-git/Wonder.js/commit/a1fe0a8))
* add "quad demo" ([e682455](https://github.com/yyc-git/Wonder.js/commit/e682455))
* add benchmark(5000 basic boxes) ([f774122](https://github.com/yyc-git/Wonder.js/commit/f774122))
* add camera component(draft) ([4e0b695](https://github.com/yyc-git/Wonder.js/commit/4e0b695))
* add customGeometryTool ([6053369](https://github.com/yyc-git/Wonder.js/commit/6053369))
* add Director,Scene,Entity,EntityObject,GameObject,transform ([7e7a39c](https://github.com/yyc-git/Wonder.js/commit/7e7a39c))
* add fp example(draft version) ([3b7844a](https://github.com/yyc-git/Wonder.js/commit/3b7844a))
* add geometry,material,render draft ([f83b66d](https://github.com/yyc-git/Wonder.js/commit/f83b66d))
* add other parts to show box sample(boxes.html)(only remain transform system) ([aa5d714](https://github.com/yyc-git/Wonder.js/commit/aa5d714))
* add Tag component ([48c08c4](https://github.com/yyc-git/Wonder.js/commit/48c08c4))
* add TagSystem->disposeComponent ([0cd926a](https://github.com/yyc-git/Wonder.js/commit/0cd926a))
* add unit test->ThreeDTransformSpec ([dc7a4a9](https://github.com/yyc-git/Wonder.js/commit/dc7a4a9))
* begin rewrite in "data driven" way: ([20a912d](https://github.com/yyc-git/Wonder.js/commit/20a912d))
* commit dist files ([b78fd86](https://github.com/yyc-git/Wonder.js/commit/b78fd86))
* commit dist files ([476220c](https://github.com/yyc-git/Wonder.js/commit/476220c))
* commit dist files ([cdef28a](https://github.com/yyc-git/Wonder.js/commit/cdef28a))
* continue finish "set transform parent"(now use reference to store relation data instead of type arr) ([2d7a152](https://github.com/yyc-git/Wonder.js/commit/2d7a152))
* continue geometry,material,render draft ([ec576dc](https://github.com/yyc-git/Wonder.js/commit/ec576dc))
* finish "set transform parent" draft(still has bug!) ([d3ed6e8](https://github.com/yyc-git/Wonder.js/commit/d3ed6e8))
* finish material system ([740575c](https://github.com/yyc-git/Wonder.js/commit/740575c))
* finish meshRenderer system ([bafa9eb](https://github.com/yyc-git/Wonder.js/commit/bafa9eb))
* finish render system ([e5ed196](https://github.com/yyc-git/Wonder.js/commit/e5ed196))
* implement Data Oriented Design->Transform component->defer compute(only pass compile, not test) ([e9b12f4](https://github.com/yyc-git/Wonder.js/commit/e9b12f4))
* implement EntityObject->"add,remove,dispose component"(only pass compile, not test) ([8fc912d](https://github.com/yyc-git/Wonder.js/commit/8fc912d))
* implement Main->setScreen logic ([bf7f363](https://github.com/yyc-git/Wonder.js/commit/bf7f363))
* Main add "detect" logic(not extract GPUDetectorSystem(because it's not high priority)! remain GPUDetector now) ([c3f4491](https://github.com/yyc-git/Wonder.js/commit/c3f4491))
* not invoke functions in transformSystem->run ([b2413aa](https://github.com/yyc-git/Wonder.js/commit/b2413aa))
* pass "shared type array with worker" demo ([6fb5537](https://github.com/yyc-git/Wonder.js/commit/6fb5537))
* pass "transform data oriented" draft ([e8c38cb](https://github.com/yyc-git/Wonder.js/commit/e8c38cb))
* pass ts compile ([e48443d](https://github.com/yyc-git/Wonder.js/commit/e48443d))
* rewrite entity,entityObject,component by data oriented(do) ([dafc3ee](https://github.com/yyc-git/Wonder.js/commit/dafc3ee))
* TagSystem add "removeTag" method ([f298392](https://github.com/yyc-git/Wonder.js/commit/f298392))
* threeDTransform add isAlive check ([aa926a8](https://github.com/yyc-git/Wonder.js/commit/aa926a8))
* update [@types](https://github.com/types)/wonder-frp,wonder-commonlib ([5d0664e](https://github.com/yyc-git/Wonder.js/commit/5d0664e))
* update version ([e4f02be](https://github.com/yyc-git/Wonder.js/commit/e4f02be))
* update wonder-expect.js to [@0](https://github.com/0).1.4: ([fef2e67](https://github.com/yyc-git/Wonder.js/commit/fef2e67))
* update wonder-package version ([0ac52d2](https://github.com/yyc-git/Wonder.js/commit/0ac52d2))



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/yyc-git/Wonder.js/compare/v0.9.0...v1.0.0-alpha.1) (2017-02-26)


### Bug Fixes

* add "trigger STARTLOOP,ENDLOOP" logic in Director.ts ([39c0310](https://github.com/yyc-git/Wonder.js/commit/39c0310))
* continue to handle the "shared npm package will be imported multi times by rollup" problem: ([dd72a44](https://github.com/yyc-git/Wonder.js/commit/dd72a44))
* firefox now can play sound(support ".ogg", not support ".mp3") ([3180a91](https://github.com/yyc-git/Wonder.js/commit/3180a91))
* fix "the bundle by rollup has the duplicate code of wonder-commonlib": ([97a7089](https://github.com/yyc-git/Wonder.js/commit/97a7089))
* fix "write innerLib.js file": now use browserify to get npm module file content ([3155a05](https://github.com/yyc-git/Wonder.js/commit/3155a05))
* wd.xxx.innerLib.js: now wdFrp not contain wdCb code: ([c97d37c](https://github.com/yyc-git/Wonder.js/commit/c97d37c))


### Features

* add dist files ([f681f5d](https://github.com/yyc-git/Wonder.js/commit/f681f5d))
* convert module->namespace to es2015 ([21e5cf9](https://github.com/yyc-git/Wonder.js/commit/21e5cf9))
* gulp task: add "compileTsCommonjs" task and "generate commonjs dts file" task logic ([b9e3474](https://github.com/yyc-git/Wonder.js/commit/b9e3474))
* pass "boxes" sample run test: ([66ae70c](https://github.com/yyc-git/Wonder.js/commit/66ae70c))
* pass "bundle with rollup": ([8ee57b7](https://github.com/yyc-git/Wonder.js/commit/8ee57b7))
* refactor glsl: ([458b840](https://github.com/yyc-git/Wonder.js/commit/458b840))
* rewrite gulpfile.js ([5453436](https://github.com/yyc-git/Wonder.js/commit/5453436))
* rollup: use typescript plugin ([9b5df90](https://github.com/yyc-git/Wonder.js/commit/9b5df90))
* update wonder-frp ([40305de](https://github.com/yyc-git/Wonder.js/commit/40305de))
* use browserify to package(support nodejs,cmd,amd) ([721ea5c](https://github.com/yyc-git/Wonder.js/commit/721ea5c))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/yyc-git/Wonder.js/compare/v0.8.0...v0.9.0) (2017-01-15)


### Bug Fixes

* animation: now when finish all frames, the begin elapsed time should be the "elpased" value ([e234d32](https://github.com/yyc-git/Wonder.js/commit/e234d32))
* fix EntityObject->removeChild->"remove components from component container" logic ([40b5121](https://github.com/yyc-git/Wonder.js/commit/40b5121))
* fix error in commit:"feat: save temp modifications of hongbao project(need rewrite)" ([e4e32ed](https://github.com/yyc-git/Wonder.js/commit/e4e32ed))
* fix tool->converter: ([32c437e](https://github.com/yyc-git/Wonder.js/commit/32c437e))
* OneToOneSourceInstance->cloneInstance: now not remove child's components from component container when addChild here ([c3d5bc6](https://github.com/yyc-git/Wonder.js/commit/c3d5bc6))
* pass all samples: rename mouse event to point event ([5135991](https://github.com/yyc-git/Wonder.js/commit/5135991))
* skin animation: if joint animation data->first frame->time > 0, joint animation data should add bone matrix data as the first frame data and set the time of it to be 0 ([b2dbda7](https://github.com/yyc-git/Wonder.js/commit/b2dbda7))
* tool->converter->fbx python converter: now can parse "skeletons" field if IsSkeletonRoot not works well correctly ([0045b3c](https://github.com/yyc-git/Wonder.js/commit/0045b3c))


### Features

* if convert gltf file with embedded, warn "that gltf should use embedded version" ([e296931](https://github.com/yyc-git/Wonder.js/commit/e296931))
* save temp modifications of hongbao project(need rewrite) ([7916792](https://github.com/yyc-git/Wonder.js/commit/7916792))
* support gulp task->package(package all, package lite, package custom) ([654a1e6](https://github.com/yyc-git/Wonder.js/commit/654a1e6))
* tool-converter: if resource not exist, warn ([f9f3dce](https://github.com/yyc-git/Wonder.js/commit/f9f3dce))
* update node.js->wdcb to 0.1.6 ([6ac8c80](https://github.com/yyc-git/Wonder.js/commit/6ac8c80))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/yyc-git/Wonder.js/compare/v0.7.0...v0.8.0) (2016-12-01)


### Bug Fixes

* now instance, batch(fallback), and basic draw(SingleDrawCommand) can work together ([5eb250d](https://github.com/yyc-git/Wonder.js/commit/5eb250d))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/yyc-git/Wonder.js/compare/v0.6.1...v0.6.2) (2016-08-20)



<a name="0.6.1"></a>
## [0.6.1](https://github.com/yyc-git/Wonder.js/compare/v0.6.0...v0.6.1) (2016-07-20)


### Bug Fixes

* implement "getTextureForRenderSort" method ([089d74e](https://github.com/yyc-git/Wonder.js/commit/089d74e))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/yyc-git/Wonder.js/compare/v0.5.8...v0.6.0) (2016-07-12)



<a name="0.5.8"></a>
## [0.5.8](https://github.com/yyc-git/Wonder.js/compare/v0.5.7...v0.5.8) (2016-06-10)



<a name="0.5.7"></a>
## [0.5.7](https://github.com/yyc-git/Wonder.js/compare/v0.5.6...v0.5.7) (2016-05-15)



<a name="0.5.6"></a>
## [0.5.6](https://github.com/yyc-git/Wonder.js/compare/v0.5.5...v0.5.6) (2016-04-22)



<a name="0.5.4"></a>
## [0.5.4](https://github.com/yyc-git/Wonder.js/compare/v0.5.3...v0.5.4) (2016-03-08)



<a name="0.5.3"></a>
## [0.5.3](https://github.com/yyc-git/Wonder.js/compare/v0.5.2...v0.5.3) (2016-02-25)



<a name="0.5.2"></a>
## [0.5.2](https://github.com/yyc-git/Wonder.js/compare/v0.5.1...v0.5.2) (2016-02-22)



<a name="0.5.1"></a>
## [0.5.1](https://github.com/yyc-git/Wonder.js/compare/v0.5.0...v0.5.1) (2016-02-14)


### Bug Fixes

* rename samples->"setModelAndReture" function to "setModelAndReturn" ([4960d68](https://github.com/yyc-git/Wonder.js/commit/4960d68))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/yyc-git/Wonder.js/compare/v0.4.0...v0.5.0) (2016-01-29)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/yyc-git/Wonder.js/compare/v0.3.0...v0.4.0) (2016-01-20)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/yyc-git/Wonder.js/compare/v0.2.0...v0.3.0) (2015-12-26)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/yyc-git/Wonder.js/compare/v0.1.1...v0.2.0) (2015-12-16)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/yyc-git/Wonder.js/compare/v0.1.0...v0.1.1) (2015-12-01)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/yyc-git/Wonder.js/compare/6f1d074...v0.1.0) (2015-12-01)


### Bug Fixes

* CommonBufferContainer,BufferContainer -> get data buffer add cache now ([6f1d074](https://github.com/yyc-git/Wonder.js/commit/6f1d074))





