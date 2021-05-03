

import * as APIAPI$Wonderjs from "./api/api/APIAPI.js";
import * as JobAPI$Wonderjs from "./api/job/JobAPI.js";
import * as SceneAPI$Wonderjs from "./api/SceneAPI.js";
import * as StateAPI$Wonderjs from "./api/StateAPI.js";
import * as JieHuoAPI$Wonderjs from "./api/jiehuo/JieHuoAPI.js";
import * as ScreenAPI$Wonderjs from "./api/ScreenAPI.js";
import * as ScriptAPI$Wonderjs from "./api/script/ScriptAPI.js";
import * as ShaderAPI$Wonderjs from "./api/shader/ShaderAPI.js";
import * as JobDataAPI$Wonderjs from "./api/jobData/JobDataAPI.js";
import * as DirectorAPI$Wonderjs from "./api/DirectorAPI.js";
import * as GeometryAPI$Wonderjs from "./api/geometry/GeometryAPI.js";
import * as ConverterAPI$Wonderjs from "./api/asset/ConverterAPI.js";
import * as ExecIMGUIAPI$Wonderjs from "./api/imgui/ExecIMGUIAPI.js";
import * as NameEventAPI$Wonderjs from "./api/event/NameEventAPI.js";
import * as RenderJobAPI$Wonderjs from "./api/job/RenderJobAPI.js";
import * as SparseMapAPI$Wonderjs from "./api/structure/SparseMapAPI.js";
import * as TransformAPI$Wonderjs from "./api/TransformAPI.js";
import * as AssetIMGUIAPI$Wonderjs from "./api/imgui/AssetIMGUIAPI.js";
import * as CoordinateAPI$Wonderjs from "./api/CoordinateAPI.js";
import * as GameObjectAPI$Wonderjs from "./api/GameObjectAPI.js";
import * as PointLightAPI$Wonderjs from "./api/light/PointLightAPI.js";
import * as WorkerDataAPI$Wonderjs from "./api/workerData/WorkerDataAPI.js";
import * as CameraGroupAPI$Wonderjs from "./api/group/camera/CameraGroupAPI.js";
import * as ExtendIMGUIAPI$Wonderjs from "./api/imgui/ExtendIMGUIAPI.js";
import * as ManageEventAPI$Wonderjs from "./api/event/ManageEventAPI.js";
import * as ManageIMGUIAPI$Wonderjs from "./api/imgui/ManageIMGUIAPI.js";
import * as RenderGroupAPI$Wonderjs from "./api/group/render/RenderGroupAPI.js";
import * as MeshRendererAPI$Wonderjs from "./api/MeshRendererAPI.js";
import * as WorkerDetectAPI$Wonderjs from "./api/detect/WorkerDetectAPI.js";
import * as BasicMaterialAPI$Wonderjs from "./api/material/BasicMaterialAPI.js";
import * as DeviceManagerAPI$Wonderjs from "./api/DeviceManagerAPI.js";
import * as GenerateAllABAPI$Wonderjs from "./api/asset_bundle/GenerateAllABAPI.js";
import * as LightMaterialAPI$Wonderjs from "./api/material/LightMaterialAPI.js";
import * as LoaderManagerAPI$Wonderjs from "./api/asset/LoaderManagerAPI.js";
import * as CubemapTextureAPI$Wonderjs from "./api/texture/CubemapTextureAPI.js";
import * as DirectionLightAPI$Wonderjs from "./api/light/DirectionLightAPI.js";
import * as SourceInstanceAPI$Wonderjs from "./api/SourceInstanceAPI.js";
import * as TimeControllerAPI$Wonderjs from "./api/TimeControllerAPI.js";
import * as BasicCameraViewAPI$Wonderjs from "./api/camera/BasicCameraViewAPI.js";
import * as ScriptAttributeAPI$Wonderjs from "./api/script/ScriptAttributeAPI.js";
import * as AssembleWholeWDBAPI$Wonderjs from "./api/asset/AssembleWholeWDBAPI.js";
import * as AssembleStreamWDBAPI$Wonderjs from "./api/asset/AssembleStreamWDBAPI.js";
import * as GenerateSingleRABAPI$Wonderjs from "./api/asset_bundle/GenerateSingleRABAPI.js";
import * as GenerateSingleSABAPI$Wonderjs from "./api/asset_bundle/GenerateSingleSABAPI.js";
import * as RecordAPIMainService$Wonderjs from "./service/state/main/api/RecordAPIMainService.js";
import * as BasicSourceTextureAPI$Wonderjs from "./api/texture/BasicSourceTextureAPI.js";
import * as GenerateSceneGraphAPI$Wonderjs from "./api/asset/GenerateSceneGraphAPI.js";
import * as FlyCameraControllerAPI$Wonderjs from "./api/camera_controller/FlyCameraControllerAPI.js";
import * as ScriptEventFunctionAPI$Wonderjs from "./api/script/ScriptEventFunctionAPI.js";
import * as ReallocateCPUMemoryJobAPI$Wonderjs from "./api/job/ReallocateCPUMemoryJobAPI.js";
import * as RecordIMGUIAPIMainService$Wonderjs from "./service/state/main/api/RecordIMGUIAPIMainService.js";
import * as ArcballCameraControllerAPI$Wonderjs from "./api/camera_controller/ArcballCameraControllerAPI.js";
import * as FixedLayoutControlIMGUIAPI$Wonderjs from "./api/imgui/FixedLayoutControlIMGUIAPI.js";
import * as RecordScriptAPIMainService$Wonderjs from "./service/state/main/api/script/RecordScriptAPIMainService.js";
import * as RecordAPIRenderWorkerService$Wonderjs from "./service/state/render_worker/api/RecordAPIRenderWorkerService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "./api/camera/PerspectiveCameraProjectionAPI.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "./api/texture/ArrayBufferViewSourceTextureAPI.js";

var buildDependencyRelation = GenerateAllABAPI$Wonderjs.buildDependencyRelation;

var generateAllABs = GenerateAllABAPI$Wonderjs.generateAllABs;

var buildResourceData = GenerateSingleRABAPI$Wonderjs.buildResourceData;

var generateSingleRAB = GenerateSingleRABAPI$Wonderjs.generateSingleRAB;

var generateSingleSAB = GenerateSingleSABAPI$Wonderjs.generateSingleSAB;

var assembleStreamWDB = AssembleStreamWDBAPI$Wonderjs.assembleStreamWDB;

var assembleWholeWDB = AssembleWholeWDBAPI$Wonderjs.assembleWholeWDB;

var assembleWholeGLB = AssembleWholeWDBAPI$Wonderjs.assembleWholeGLB;

var isDefaultGeometryName = ConverterAPI$Wonderjs.isDefaultGeometryName;

var isDefaultCubemapTextureName = ConverterAPI$Wonderjs.isDefaultCubemapTextureName;

var isDefaultBasicSourceTextureName = ConverterAPI$Wonderjs.isDefaultBasicSourceTextureName;

var isDefaultBasicMaterialName = ConverterAPI$Wonderjs.isDefaultBasicMaterialName;

var isDefaultLightMaterialName = ConverterAPI$Wonderjs.isDefaultLightMaterialName;

var isDefaultImageName = ConverterAPI$Wonderjs.isDefaultImageName;

var convertGLBToWDB = ConverterAPI$Wonderjs.convertGLBToWDB;

var generateWDB = GenerateSceneGraphAPI$Wonderjs.generateWDB;

var generateGLBData = GenerateSceneGraphAPI$Wonderjs.generateGLBData;

var loadIMGUIAsset = LoaderManagerAPI$Wonderjs.loadIMGUIAsset;

var loadStreamWDB = LoaderManagerAPI$Wonderjs.loadStreamWDB;

var loadWholeWDB = LoaderManagerAPI$Wonderjs.loadWholeWDB;

var loadConfig = LoaderManagerAPI$Wonderjs.loadConfig;

var isBindArcballCameraControllerEvent = ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent;

var unbindArcballCameraControllerPointScaleEvent = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerPointScaleEvent;

var unbindArcballCameraControllerEvent = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent;

var bindArcballCameraControllerEvent = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent;

var setArcballCameraControllerDirectionArray = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDirectionArray;

var hasArcballCameraControllerDirection = ArcballCameraControllerAPI$Wonderjs.hasArcballCameraControllerDirection;

var unsafeGetArcballCameraControllerDirectionArray = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDirectionArray;

var setArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed;

var unsafeGetArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerRotateSpeed;

var setArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedY;

var unsafeGetArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedY;

var setArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedX;

var unsafeGetArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedX;

var setArcballCameraControllerTarget = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget;

var unsafeGetArcballCameraControllerTarget = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget;

var setArcballCameraControllerThetaMargin = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin;

var unsafeGetArcballCameraControllerThetaMargin = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerThetaMargin;

var setArcballCameraControllerTheta = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta;

var unsafeGetArcballCameraControllerTheta = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta;

var setArcballCameraControllerPhi = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi;

var unsafeGetArcballCameraControllerPhi = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi;

var setArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed;

var unsafeGetArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerWheelSpeed;

var setArcballCameraControllerMinDistance = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance;

var unsafeGetArcballCameraControllerMinDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMinDistance;

var setArcballCameraControllerDistance = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance;

var unsafeGetArcballCameraControllerDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance;

var unsafeGetArcballCameraControllerGameObject = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerGameObject;

var createArcballCameraController = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController;

var isBindFlyCameraControllerEvent = FlyCameraControllerAPI$Wonderjs.isBindFlyCameraControllerEvent;

var unbindFlyCameraControllerPointScaleEvent = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerPointScaleEvent;

var unbindFlyCameraControllerEvent = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerEvent;

var bindFlyCameraControllerEvent = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent;

var setFlyCameraControllerDirectionArray = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerDirectionArray;

var hasFlyCameraControllerDirection = FlyCameraControllerAPI$Wonderjs.hasFlyCameraControllerDirection;

var unsafeGetFlyCameraControllerDirectionArray = FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray;

var setFlyCameraControllerRotateSpeed = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerRotateSpeed;

var unsafeGetFlyCameraControllerRotateSpeed = FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerRotateSpeed;

var setFlyCameraControllerWheelSpeed = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerWheelSpeed;

var unsafeGetFlyCameraControllerWheelSpeed = FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerWheelSpeed;

var setFlyCameraControllerMoveSpeed = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerMoveSpeed;

var unsafeGetFlyCameraControllerMoveSpeed = FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerMoveSpeed;

var unsafeGetFlyCameraControllerGameObject = FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerGameObject;

var createFlyCameraController = FlyCameraControllerAPI$Wonderjs.createFlyCameraController;

var getActiveBasicCameraView = BasicCameraViewAPI$Wonderjs.getActiveBasicCameraView;

var setActiveBasicCameraView = BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView;

var unactiveBasicCameraView = BasicCameraViewAPI$Wonderjs.unactiveBasicCameraView;

var activeBasicCameraView = BasicCameraViewAPI$Wonderjs.activeBasicCameraView;

var isActiveBasicCameraView = BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView;

var getBasicCameraViewWorldToCameraMatrix = BasicCameraViewAPI$Wonderjs.getBasicCameraViewWorldToCameraMatrix;

var unsafeGetBasicCameraViewGameObject = BasicCameraViewAPI$Wonderjs.unsafeGetBasicCameraViewGameObject;

var createBasicCameraView = BasicCameraViewAPI$Wonderjs.createBasicCameraView;

var markPerspectiveCameraProjectionNotDirty = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionNotDirty;

var markPerspectiveCameraProjectionDirty = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty;

var getAllPerspectiveCameraProjections = PerspectiveCameraProjectionAPI$Wonderjs.getAllPerspectiveCameraProjections;

var setPerspectiveCameraProjectionFar = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar;

var unsafeGetPerspectiveCameraFar = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar;

var setPerspectiveCameraProjectionNear = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear;

var unsafeGetPerspectiveCameraNear = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear;

var setPerspectiveCameraProjectionAspect = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect;

var unsafeGetPerspectiveCameraAspect = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect;

var setPerspectiveCameraProjectionFovy = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy;

var unsafeGetPerspectiveCameraFovy = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy;

var unsafeGetPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject;

var unsafeGetPerspectiveCameraProjectionPMatrix = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix;

var createPerspectiveCameraProjection = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection;

var isSupportRenderWorkerAndSharedArrayBuffer = WorkerDetectAPI$Wonderjs.isSupportRenderWorkerAndSharedArrayBuffer;

var getPointEventEventOfEvent = ManageEventAPI$Wonderjs.getPointEventEventOfEvent;

var getPointEventMovementDeltaOfEvent = ManageEventAPI$Wonderjs.getPointEventMovementDeltaOfEvent;

var getPointEventWheelOfEvent = ManageEventAPI$Wonderjs.getPointEventWheelOfEvent;

var getPointEventButtonOfEvent = ManageEventAPI$Wonderjs.getPointEventButtonOfEvent;

var getPointEventLocationOfEvent = ManageEventAPI$Wonderjs.getPointEventLocationOfEvent;

var getPointEventLocationInViewOfEvent = ManageEventAPI$Wonderjs.getPointEventLocationInViewOfEvent;

var getCustomEventUserData = ManageEventAPI$Wonderjs.getCustomEventUserData;

var createCustomEvent = ManageEventAPI$Wonderjs.createCustomEvent;

var emitCustomGameObjectEvent = ManageEventAPI$Wonderjs.emitCustomGameObjectEvent;

var broadcastCustomGameObjectEvent = ManageEventAPI$Wonderjs.broadcastCustomGameObjectEvent;

var triggerCustomGameObjectEvent = ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent;

var triggerCustomGlobalEvent = ManageEventAPI$Wonderjs.triggerCustomGlobalEvent;

var stopPropagationCustomEvent = ManageEventAPI$Wonderjs.stopPropagationCustomEvent;

var offCustomGameObjectEventByHandleFunc = ManageEventAPI$Wonderjs.offCustomGameObjectEventByHandleFunc;

var offCustomGameObjectEventByTarget = ManageEventAPI$Wonderjs.offCustomGameObjectEventByTarget;

var onCustomGameObjectEvent = ManageEventAPI$Wonderjs.onCustomGameObjectEvent;

var offCustomGlobalEventByHandleFunc = ManageEventAPI$Wonderjs.offCustomGlobalEventByHandleFunc;

var offCustomGlobalEventByEventName = ManageEventAPI$Wonderjs.offCustomGlobalEventByEventName;

var onCustomGlobalEvent = ManageEventAPI$Wonderjs.onCustomGlobalEvent;

var offTouchEventByHandleFunc = ManageEventAPI$Wonderjs.offTouchEventByHandleFunc;

var offKeyboardEventByHandleFunc = ManageEventAPI$Wonderjs.offKeyboardEventByHandleFunc;

var offMouseEventByHandleFunc = ManageEventAPI$Wonderjs.offMouseEventByHandleFunc;

var onTouchEvent = ManageEventAPI$Wonderjs.onTouchEvent;

var onKeyboardEvent = ManageEventAPI$Wonderjs.onKeyboardEvent;

var onMouseEvent = ManageEventAPI$Wonderjs.onMouseEvent;

var getPointDragDropEventName = NameEventAPI$Wonderjs.getPointDragDropEventName;

var getPointDragOverEventName = NameEventAPI$Wonderjs.getPointDragOverEventName;

var getPointDragStartEventName = NameEventAPI$Wonderjs.getPointDragStartEventName;

var getPointScaleEventName = NameEventAPI$Wonderjs.getPointScaleEventName;

var getPointMoveEventName = NameEventAPI$Wonderjs.getPointMoveEventName;

var getPointTapEventName = NameEventAPI$Wonderjs.getPointTapEventName;

var getPointUpEventName = NameEventAPI$Wonderjs.getPointUpEventName;

var getPointDownEventName = NameEventAPI$Wonderjs.getPointDownEventName;

var getGeometryIndicesCount = GeometryAPI$Wonderjs.getGeometryIndicesCount;

var hasGeometryIndices32 = GeometryAPI$Wonderjs.hasGeometryIndices32;

var hasGeometryIndices16 = GeometryAPI$Wonderjs.hasGeometryIndices16;

var hasGeometryIndices = GeometryAPI$Wonderjs.hasGeometryIndices;

var hasGeometryTexCoords = GeometryAPI$Wonderjs.hasGeometryTexCoords;

var hasGeometryNormals = GeometryAPI$Wonderjs.hasGeometryNormals;

var hasGeometryVertices = GeometryAPI$Wonderjs.hasGeometryVertices;

var batchDisposeGeometry = GeometryAPI$Wonderjs.batchDisposeGeometry;

var getAllGeometrys = GeometryAPI$Wonderjs.getAllGeometrys;

var setGeometryName = GeometryAPI$Wonderjs.setGeometryName;

var unsafeGetGeometryName = GeometryAPI$Wonderjs.unsafeGetGeometryName;

var unsafeGetGeometryGameObjects = GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects;

var setGeometryIndices32 = GeometryAPI$Wonderjs.setGeometryIndices32;

var getGeometryIndices32 = GeometryAPI$Wonderjs.getGeometryIndices32;

var setGeometryIndices16 = GeometryAPI$Wonderjs.setGeometryIndices16;

var getGeometryIndices16 = GeometryAPI$Wonderjs.getGeometryIndices16;

var setGeometryNormals = GeometryAPI$Wonderjs.setGeometryNormals;

var getGeometryNormals = GeometryAPI$Wonderjs.getGeometryNormals;

var setGeometryTexCoords = GeometryAPI$Wonderjs.setGeometryTexCoords;

var getGeometryTexCoords = GeometryAPI$Wonderjs.getGeometryTexCoords;

var setGeometryVertices = GeometryAPI$Wonderjs.setGeometryVertices;

var getGeometryVertices = GeometryAPI$Wonderjs.getGeometryVertices;

var createPlaneGeometry = GeometryAPI$Wonderjs.createPlaneGeometry;

var createConeGeometry = GeometryAPI$Wonderjs.createConeGeometry;

var createCylinderGeometry = GeometryAPI$Wonderjs.createCylinderGeometry;

var createSphereGeometry = GeometryAPI$Wonderjs.createSphereGeometry;

var createBoxGeometry = GeometryAPI$Wonderjs.createBoxGeometry;

var createGeometry = GeometryAPI$Wonderjs.createGeometry;

var hasGameObjectCameraGroupComponents = CameraGroupAPI$Wonderjs.hasGameObjectCameraGroupComponents;

var unsafeGetGameObjectCameraGroupComponents = CameraGroupAPI$Wonderjs.unsafeGetGameObjectCameraGroupComponents;

var disposeGameObjectCameraGroupComponents = CameraGroupAPI$Wonderjs.disposeGameObjectCameraGroupComponents;

var addGameObjectCameraGroupComponents = CameraGroupAPI$Wonderjs.addGameObjectCameraGroupComponents;

var createCameraGroup = CameraGroupAPI$Wonderjs.createCameraGroup;

var replaceMaterial = RenderGroupAPI$Wonderjs.replaceMaterial;

var hasGameObjectRenderGroupComponents = RenderGroupAPI$Wonderjs.hasGameObjectRenderGroupComponents;

var unsafeGetGameObjectRenderGroupComponents = RenderGroupAPI$Wonderjs.unsafeGetGameObjectRenderGroupComponents;

var disposeGameObjectRenderGroupComponents = RenderGroupAPI$Wonderjs.disposeGameObjectRenderGroupComponents;

var addGameObjectRenderGroupComponents = RenderGroupAPI$Wonderjs.addGameObjectRenderGroupComponents;

var createRenderGroup = RenderGroupAPI$Wonderjs.createRenderGroup;

var buildRenderGroup = RenderGroupAPI$Wonderjs.buildRenderGroup;

var initSettedAssets = AssetIMGUIAPI$Wonderjs.initSettedAssets;

var addSettedAssetCustomImageData = AssetIMGUIAPI$Wonderjs.addSettedAssetCustomImageData;

var getSettedAssetCustomImageDataArr = AssetIMGUIAPI$Wonderjs.getSettedAssetCustomImageDataArr;

var hasSettedAssetCustomImageData = AssetIMGUIAPI$Wonderjs.hasSettedAssetCustomImageData;

var setSettedAssetBitmapData = AssetIMGUIAPI$Wonderjs.setSettedAssetBitmapData;

var hasSettedAssetBitmapData = AssetIMGUIAPI$Wonderjs.hasSettedAssetBitmapData;

var unsafeGetSettedAssetBitmapName = AssetIMGUIAPI$Wonderjs.unsafeGetSettedAssetBitmapName;

var getSettedAssetBitmapName = AssetIMGUIAPI$Wonderjs.getSettedAssetBitmapName;

var unsafeGetSettedAssetBitmapArrayBuffer = AssetIMGUIAPI$Wonderjs.unsafeGetSettedAssetBitmapArrayBuffer;

var getSettedAssetBitmapArrayBuffer = AssetIMGUIAPI$Wonderjs.getSettedAssetBitmapArrayBuffer;

var setSettedAssetFntData = AssetIMGUIAPI$Wonderjs.setSettedAssetFntData;

var hasSettedAssetFntData = AssetIMGUIAPI$Wonderjs.hasSettedAssetFntData;

var unsafeGetSettedAssetFntName = AssetIMGUIAPI$Wonderjs.unsafeGetSettedAssetFntName;

var getSettedAssetFntName = AssetIMGUIAPI$Wonderjs.getSettedAssetFntName;

var unsafeGetSettedAssetFntContent = AssetIMGUIAPI$Wonderjs.unsafeGetSettedAssetFntContent;

var getSettedAssetFntContent = AssetIMGUIAPI$Wonderjs.getSettedAssetFntContent;

var unsafeGetExecOrder = ExecIMGUIAPI$Wonderjs.unsafeGetExecOrder;

var getExecOrder = ExecIMGUIAPI$Wonderjs.getExecOrder;

var unsafeGetCustomData = ExecIMGUIAPI$Wonderjs.unsafeGetCustomData;

var getCustomData = ExecIMGUIAPI$Wonderjs.getCustomData;

var unsafeGetExecFunc = ExecIMGUIAPI$Wonderjs.unsafeGetExecFunc;

var getExecFunc = ExecIMGUIAPI$Wonderjs.getExecFunc;

var clearExecFuncDataArr = ExecIMGUIAPI$Wonderjs.clearExecFuncDataArr;

var removeExecFuncData = ExecIMGUIAPI$Wonderjs.removeExecFuncData;

var addExecFuncData = ExecIMGUIAPI$Wonderjs.addExecFuncData;

var hasExecFuncData = ExecIMGUIAPI$Wonderjs.hasExecFuncData;

var createDefaultButtonSkinData = ExtendIMGUIAPI$Wonderjs.createDefaultButtonSkinData;

var createButtonSkinData = ExtendIMGUIAPI$Wonderjs.createButtonSkinData;

var setButtonSkinData = ExtendIMGUIAPI$Wonderjs.setButtonSkinData;

var getButtonSkinData = ExtendIMGUIAPI$Wonderjs.getButtonSkinData;

var getDefaultSkinName = ExtendIMGUIAPI$Wonderjs.getDefaultSkinName;

var setSkinData = ExtendIMGUIAPI$Wonderjs.setSkinData;

var createDefaultSkinData = ExtendIMGUIAPI$Wonderjs.createDefaultSkinData;

var unsafeGetDefaultSkinData = ExtendIMGUIAPI$Wonderjs.unsafeGetDefaultSkinData;

var unsafeGetSkinData = ExtendIMGUIAPI$Wonderjs.unsafeGetSkinData;

var createSkinData = ExtendIMGUIAPI$Wonderjs.createSkinData;

var removeSkinData = ExtendIMGUIAPI$Wonderjs.removeSkinData;

var addSkinData = ExtendIMGUIAPI$Wonderjs.addSkinData;

var hasSkinData = ExtendIMGUIAPI$Wonderjs.hasSkinData;

var removeSingleCustomStyleData = ExtendIMGUIAPI$Wonderjs.removeSingleCustomStyleData;

var addSingleCustomStyleData = ExtendIMGUIAPI$Wonderjs.addSingleCustomStyleData;

var removeCustomStyleData = ExtendIMGUIAPI$Wonderjs.removeCustomStyleData;

var addCustomStyleData = ExtendIMGUIAPI$Wonderjs.addCustomStyleData;

var createSingleCustomStyleData = ExtendIMGUIAPI$Wonderjs.createSingleCustomStyleData;

var createAllCustomStyleData = ExtendIMGUIAPI$Wonderjs.createAllCustomStyleData;

var removeCustomControl = ExtendIMGUIAPI$Wonderjs.removeCustomControl;

var registerCustomControl = ExtendIMGUIAPI$Wonderjs.registerCustomControl;

var hasCustomControl = ExtendIMGUIAPI$Wonderjs.hasCustomControl;

var image = FixedLayoutControlIMGUIAPI$Wonderjs.image;

var label = FixedLayoutControlIMGUIAPI$Wonderjs.label;

var sendNoTextureProgramUniformProjectionMatData = ManageIMGUIAPI$Wonderjs.sendNoTextureProgramUniformProjectionMatData;

var sendFontTextureProgramUniformProjectionMatData = ManageIMGUIAPI$Wonderjs.sendFontTextureProgramUniformProjectionMatData;

var sendCustomTextureProgramUniformProjectionMatData = ManageIMGUIAPI$Wonderjs.sendCustomTextureProgramUniformProjectionMatData;

var loadImageDataArr = JieHuoAPI$Wonderjs.loadImageDataArr;

var loadImage = JieHuoAPI$Wonderjs.loadImage;

var getIntersectedPointWithMesh = JieHuoAPI$Wonderjs.getIntersectedPointWithMesh;

var isIntersectWithMesh = JieHuoAPI$Wonderjs.isIntersectWithMesh;

var checkIntersectMesh = JieHuoAPI$Wonderjs.checkIntersectMesh;

var createPerspectiveCameraRayFromEvent = JieHuoAPI$Wonderjs.createPerspectiveCameraRayFromEvent;

var removeWorkerMainLoopJob = JobAPI$Wonderjs.removeWorkerMainLoopJob;

var addWorkerMainLoopJob = JobAPI$Wonderjs.addWorkerMainLoopJob;

var removeWorkerMainInitJob = JobAPI$Wonderjs.removeWorkerMainInitJob;

var addWorkerMainInitJob = JobAPI$Wonderjs.addWorkerMainInitJob;

var removeNoWorkerLoopJob = JobAPI$Wonderjs.removeNoWorkerLoopJob;

var removeNoWorkerInitJob = JobAPI$Wonderjs.removeNoWorkerInitJob;

var addNoWorkerLoopJob = JobAPI$Wonderjs.addNoWorkerLoopJob;

var addNoWorkerInitJob = JobAPI$Wonderjs.addNoWorkerInitJob;

var registerNoWorkerLoopJob = JobAPI$Wonderjs.registerNoWorkerLoopJob;

var registerNoWorkerInitJob = JobAPI$Wonderjs.registerNoWorkerInitJob;

var resetDisposeCount = ReallocateCPUMemoryJobAPI$Wonderjs.resetDisposeCount;

var reallocateGeometry = ReallocateCPUMemoryJobAPI$Wonderjs.reallocateGeometry;

var initGeometryBufferData = ReallocateCPUMemoryJobAPI$Wonderjs.initGeometryBufferData;

var reAllocateToBuffer = ReallocateCPUMemoryJobAPI$Wonderjs.reAllocateToBuffer;

var isGeometryBufferNearlyFull = ReallocateCPUMemoryJobAPI$Wonderjs.isGeometryBufferNearlyFull;

var isDisposeTooMany = ReallocateCPUMemoryJobAPI$Wonderjs.isDisposeTooMany;

var reallocateGameObjectByDisposeCount = ReallocateCPUMemoryJobAPI$Wonderjs.reallocateGameObjectByDisposeCount;

var draw = RenderJobAPI$Wonderjs.draw;

var sendUniformRenderObjectMaterialData = RenderJobAPI$Wonderjs.sendUniformRenderObjectMaterialData;

var sendUniformRenderObjectModelData = RenderJobAPI$Wonderjs.sendUniformRenderObjectModelData;

var sendAttributeData = RenderJobAPI$Wonderjs.sendAttributeData;

var useByShaderIndex = RenderJobAPI$Wonderjs.useByShaderIndex;

var getShaderIndex = RenderJobAPI$Wonderjs.getShaderIndex;

var setGameObjectsNeedDrawOutline = JobDataAPI$Wonderjs.setGameObjectsNeedDrawOutline;

var setOutlineColor = JobDataAPI$Wonderjs.setOutlineColor;

var getOutlineColor = JobDataAPI$Wonderjs.getOutlineColor;

var setDirectionLightIsRender = DirectionLightAPI$Wonderjs.setDirectionLightIsRender;

var getDirectionLightIsRender = DirectionLightAPI$Wonderjs.getDirectionLightIsRender;

var setDirectionLightIntensity = DirectionLightAPI$Wonderjs.setDirectionLightIntensity;

var getDirectionLightIntensity = DirectionLightAPI$Wonderjs.getDirectionLightIntensity;

var setDirectionLightColor = DirectionLightAPI$Wonderjs.setDirectionLightColor;

var getDirectionLightColor = DirectionLightAPI$Wonderjs.getDirectionLightColor;

var unsafeGetDirectionLightGameObject = DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject;

var createDirectionLight = DirectionLightAPI$Wonderjs.createDirectionLight;

var isMaxCount = PointLightAPI$Wonderjs.isMaxCount;

var setPointLightIsRender = PointLightAPI$Wonderjs.setPointLightIsRender;

var getPointLightIsRender = PointLightAPI$Wonderjs.getPointLightIsRender;

var setPointLightRangeLevel = PointLightAPI$Wonderjs.setPointLightRangeLevel;

var setPointLightRange = PointLightAPI$Wonderjs.setPointLightRange;

var getPointLightRange = PointLightAPI$Wonderjs.getPointLightRange;

var setPointLightQuadratic = PointLightAPI$Wonderjs.setPointLightQuadratic;

var getPointLightQuadratic = PointLightAPI$Wonderjs.getPointLightQuadratic;

var setPointLightLinear = PointLightAPI$Wonderjs.setPointLightLinear;

var getPointLightLinear = PointLightAPI$Wonderjs.getPointLightLinear;

var setPointLightConstant = PointLightAPI$Wonderjs.setPointLightConstant;

var getPointLightConstant = PointLightAPI$Wonderjs.getPointLightConstant;

var setPointLightIntensity = PointLightAPI$Wonderjs.setPointLightIntensity;

var getPointLightIntensity = PointLightAPI$Wonderjs.getPointLightIntensity;

var setPointLightColor = PointLightAPI$Wonderjs.setPointLightColor;

var getPointLightColor = PointLightAPI$Wonderjs.getPointLightColor;

var unsafeGetPointLightGameObject = PointLightAPI$Wonderjs.unsafeGetPointLightGameObject;

var createPointLight = PointLightAPI$Wonderjs.createPointLight;

var batchDisposeBasicMaterial = BasicMaterialAPI$Wonderjs.batchDisposeBasicMaterial;

var getAllBasicMaterials = BasicMaterialAPI$Wonderjs.getAllBasicMaterials;

var setBasicMaterialName = BasicMaterialAPI$Wonderjs.setBasicMaterialName;

var unsafeGetBasicMaterialName = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName;

var setBasicMaterialAlpha = BasicMaterialAPI$Wonderjs.setBasicMaterialAlpha;

var getBasicMaterialAlpha = BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha;

var setBasicMaterialIsDepthTest = BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest;

var getBasicMaterialIsDepthTest = BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest;

var setBasicMaterialColor = BasicMaterialAPI$Wonderjs.setBasicMaterialColor;

var getBasicMaterialColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var unsafeGetBasicMaterialGameObjects = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects;

var createBasicMaterial = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var batchDisposeLightMaterialRemoveTexture = LightMaterialAPI$Wonderjs.batchDisposeLightMaterialRemoveTexture;

var batchDisposeLightMaterial = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial;

var getAllLightMaterials = LightMaterialAPI$Wonderjs.getAllLightMaterials;

var reInitMaterials = LightMaterialAPI$Wonderjs.reInitMaterials;

var setLightMaterialName = LightMaterialAPI$Wonderjs.setLightMaterialName;

var unsafeGetLightMaterialName = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName;

var removeLightMaterialSpecularMap = LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap;

var hasLightMaterialSpecularMap = LightMaterialAPI$Wonderjs.hasLightMaterialSpecularMap;

var setLightMaterialSpecularMap = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap;

var unsafeGetLightMaterialSpecularMap = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap;

var removeLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.removeLightMaterialDiffuseMap;

var hasLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap;

var setLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap;

var unsafeGetLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap;

var setLightMaterialShininess = LightMaterialAPI$Wonderjs.setLightMaterialShininess;

var getLightMaterialShininess = LightMaterialAPI$Wonderjs.getLightMaterialShininess;

var setLightMaterialSpecularColor = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor;

var getLightMaterialSpecularColor = LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor;

var setLightMaterialDiffuseColor = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor;

var getLightMaterialDiffuseColor = LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor;

var unsafeGetLightMaterialGameObjects = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects;

var createLightMaterial = LightMaterialAPI$Wonderjs.createLightMaterial;

var setScriptIsActive = ScriptAPI$Wonderjs.setScriptIsActive;

var unsafeGetScriptIsActive = ScriptAPI$Wonderjs.unsafeGetScriptIsActive;

var setScriptAttributeFieldDefaultValueAndValue = ScriptAPI$Wonderjs.setScriptAttributeFieldDefaultValueAndValue;

var unsafeGetScriptAttributeFieldDefaultValue = ScriptAPI$Wonderjs.unsafeGetScriptAttributeFieldDefaultValue;

var unsafeGetScriptAttribute = ScriptAPI$Wonderjs.unsafeGetScriptAttribute;

var unsafeGetScriptAttributeEntries = ScriptAPI$Wonderjs.unsafeGetScriptAttributeEntries;

var replaceScriptAttribute = ScriptAPI$Wonderjs.replaceScriptAttribute;

var removeScriptAttribute = ScriptAPI$Wonderjs.removeScriptAttribute;

var addScriptAttribute = ScriptAPI$Wonderjs.addScriptAttribute;

var unsafeGetScriptEventFunctionDataEntries = ScriptAPI$Wonderjs.unsafeGetScriptEventFunctionDataEntries;

var replaceScriptEventFunctionData = ScriptAPI$Wonderjs.replaceScriptEventFunctionData;

var removeScriptEventFunctionData = ScriptAPI$Wonderjs.removeScriptEventFunctionData;

var addScriptEventFunctionData = ScriptAPI$Wonderjs.addScriptEventFunctionData;

var unsafeGetScriptGameObject = ScriptAPI$Wonderjs.unsafeGetScriptGameObject;

var createScript = ScriptAPI$Wonderjs.createScript;

var getScriptAttributeEntries = ScriptAttributeAPI$Wonderjs.getScriptAttributeEntries;

var removeScriptAttributeField = ScriptAttributeAPI$Wonderjs.removeScriptAttributeField;

var addScriptAttributeFieldJsObj = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj;

var createScriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute;

var isScriptEventFunctionEnable = ScriptEventFunctionAPI$Wonderjs.isScriptEventFunctionEnable;

var disableScriptEventFunction = ScriptEventFunctionAPI$Wonderjs.disableScriptEventFunction;

var enableScriptEventFunction = ScriptEventFunctionAPI$Wonderjs.enableScriptEventFunction;

var createScriptEventFunctionData = ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData;

var clearInitShaderCache = ShaderAPI$Wonderjs.clearInitShaderCache;

var mergeSparseMaps = SparseMapAPI$Wonderjs.mergeSparseMaps;

var setSparseMapValue = SparseMapAPI$Wonderjs.setSparseMapValue;

var getSparseMapValue = SparseMapAPI$Wonderjs.getSparseMapValue;

var unsafeGetSparseMapValue = SparseMapAPI$Wonderjs.unsafeGetSparseMapValue;

var createSparseMap = SparseMapAPI$Wonderjs.createSparseMap;

var setArrayBufferViewSourceTextureName = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureName;

var unsafeGetArrayBufferViewSourceTextureName = ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureName;

var setArrayBufferViewSourceTextureHeight = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight;

var setArrayBufferViewSourceTextureWidth = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth;

var setArrayBufferViewSourceTextureFlipY = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFlipY;

var getArrayBufferViewSourceTextureFlipY = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFlipY;

var setArrayBufferViewSourceTextureType = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureType;

var getArrayBufferViewSourceTextureType = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureType;

var setArrayBufferViewSourceTextureFormat = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFormat;

var getArrayBufferViewSourceTextureFormat = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFormat;

var setArrayBufferViewSourceTextureMinFilter = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter;

var getArrayBufferViewSourceTextureMinFilter = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMinFilter;

var setArrayBufferViewSourceTextureMagFilter = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter;

var getArrayBufferViewSourceTextureMagFilter = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMagFilter;

var setArrayBufferViewSourceTextureWrapT = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT;

var getArrayBufferViewSourceTextureWrapT = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapT;

var setArrayBufferViewSourceTextureWrapS = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapS;

var getArrayBufferViewSourceTextureWrapS = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapS;

var getArrayBufferViewSourceTextureHeight = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureHeight;

var getArrayBufferViewSourceTextureWidth = ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWidth;

var setArrayBufferViewSourceTextureSource = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource;

var unsafeGetArrayBufferViewSourceTextureSource = ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureSource;

var createArrayBufferViewSourceTexture = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture;

var disposeBasicSourceTexture = BasicSourceTextureAPI$Wonderjs.disposeBasicSourceTexture;

var setBasicSourceTextureIsNeedUpdate = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureIsNeedUpdate;

var getBasicSourceTextureIsNeedUpdate = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureIsNeedUpdate;

var setBasicSourceTextureName = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName;

var unsafeGetBasicSourceTextureName = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName;

var getBasicSourceTextureName = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureName;

var setBasicSourceTextureFlipY = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY;

var getBasicSourceTextureFlipY = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY;

var setBasicSourceTextureType = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType;

var getBasicSourceTextureType = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType;

var setBasicSourceTextureFormat = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat;

var getBasicSourceTextureFormat = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat;

var setBasicSourceTextureMinFilter = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter;

var getBasicSourceTextureMinFilter = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter;

var setBasicSourceTextureMagFilter = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter;

var getBasicSourceTextureMagFilter = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter;

var setBasicSourceTextureWrapT = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT;

var getBasicSourceTextureWrapT = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT;

var setBasicSourceTextureWrapS = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS;

var getBasicSourceTextureWrapS = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS;

var getBasicSourceTextureHeight = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureHeight;

var getBasicSourceTextureWidth = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWidth;

var setBasicSourceTextureSource = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource;

var unsafeGetBasicSourceTextureSource = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource;

var createBasicSourceTexture = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture;

var initCubemapTexture = CubemapTextureAPI$Wonderjs.initCubemapTexture;

var disposeCubemapTexture = CubemapTextureAPI$Wonderjs.disposeCubemapTexture;

var getAllTextures = CubemapTextureAPI$Wonderjs.getAllTextures;

var setCubemapTextureIsNeedUpdate = CubemapTextureAPI$Wonderjs.setCubemapTextureIsNeedUpdate;

var getCubemapTextureIsNeedUpdate = CubemapTextureAPI$Wonderjs.getCubemapTextureIsNeedUpdate;

var setCubemapTextureName = CubemapTextureAPI$Wonderjs.setCubemapTextureName;

var unsafeGetCubemapTextureName = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureName;

var getCubemapTextureName = CubemapTextureAPI$Wonderjs.getCubemapTextureName;

var setCubemapTextureFlipY = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY;

var getCubemapTextureFlipY = CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY;

var setCubemapTextureNZType = CubemapTextureAPI$Wonderjs.setCubemapTextureNZType;

var getCubemapTextureNZType = CubemapTextureAPI$Wonderjs.getCubemapTextureNZType;

var setCubemapTexturePZType = CubemapTextureAPI$Wonderjs.setCubemapTexturePZType;

var getCubemapTexturePZType = CubemapTextureAPI$Wonderjs.getCubemapTexturePZType;

var setCubemapTextureNYType = CubemapTextureAPI$Wonderjs.setCubemapTextureNYType;

var getCubemapTextureNYType = CubemapTextureAPI$Wonderjs.getCubemapTextureNYType;

var setCubemapTexturePYType = CubemapTextureAPI$Wonderjs.setCubemapTexturePYType;

var getCubemapTexturePYType = CubemapTextureAPI$Wonderjs.getCubemapTexturePYType;

var setCubemapTextureNXType = CubemapTextureAPI$Wonderjs.setCubemapTextureNXType;

var getCubemapTextureNXType = CubemapTextureAPI$Wonderjs.getCubemapTextureNXType;

var setCubemapTexturePXType = CubemapTextureAPI$Wonderjs.setCubemapTexturePXType;

var getCubemapTexturePXType = CubemapTextureAPI$Wonderjs.getCubemapTexturePXType;

var setCubemapTextureNZFormat = CubemapTextureAPI$Wonderjs.setCubemapTextureNZFormat;

var getCubemapTextureNZFormat = CubemapTextureAPI$Wonderjs.getCubemapTextureNZFormat;

var setCubemapTexturePZFormat = CubemapTextureAPI$Wonderjs.setCubemapTexturePZFormat;

var getCubemapTexturePZFormat = CubemapTextureAPI$Wonderjs.getCubemapTexturePZFormat;

var setCubemapTextureNYFormat = CubemapTextureAPI$Wonderjs.setCubemapTextureNYFormat;

var getCubemapTextureNYFormat = CubemapTextureAPI$Wonderjs.getCubemapTextureNYFormat;

var setCubemapTexturePYFormat = CubemapTextureAPI$Wonderjs.setCubemapTexturePYFormat;

var getCubemapTexturePYFormat = CubemapTextureAPI$Wonderjs.getCubemapTexturePYFormat;

var setCubemapTextureNXFormat = CubemapTextureAPI$Wonderjs.setCubemapTextureNXFormat;

var getCubemapTextureNXFormat = CubemapTextureAPI$Wonderjs.getCubemapTextureNXFormat;

var setCubemapTexturePXFormat = CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat;

var getCubemapTexturePXFormat = CubemapTextureAPI$Wonderjs.getCubemapTexturePXFormat;

var setCubemapTextureMinFilter = CubemapTextureAPI$Wonderjs.setCubemapTextureMinFilter;

var getCubemapTextureMinFilter = CubemapTextureAPI$Wonderjs.getCubemapTextureMinFilter;

var setCubemapTextureMagFilter = CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter;

var getCubemapTextureMagFilter = CubemapTextureAPI$Wonderjs.getCubemapTextureMagFilter;

var setCubemapTextureWrapT = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapT;

var getCubemapTextureWrapT = CubemapTextureAPI$Wonderjs.getCubemapTextureWrapT;

var setCubemapTextureWrapS = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapS;

var getCubemapTextureWrapS = CubemapTextureAPI$Wonderjs.getCubemapTextureWrapS;

var setCubemapTextureNZSource = CubemapTextureAPI$Wonderjs.setCubemapTextureNZSource;

var unsafeGetCubemapTextureNZSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource;

var setCubemapTexturePZSource = CubemapTextureAPI$Wonderjs.setCubemapTexturePZSource;

var unsafeGetCubemapTexturePZSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource;

var setCubemapTextureNYSource = CubemapTextureAPI$Wonderjs.setCubemapTextureNYSource;

var unsafeGetCubemapTextureNYSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource;

var setCubemapTexturePYSource = CubemapTextureAPI$Wonderjs.setCubemapTexturePYSource;

var unsafeGetCubemapTexturePYSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource;

var setCubemapTextureNXSource = CubemapTextureAPI$Wonderjs.setCubemapTextureNXSource;

var unsafeGetCubemapTextureNXSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource;

var setCubemapTexturePXSource = CubemapTextureAPI$Wonderjs.setCubemapTexturePXSource;

var unsafeGetCubemapTexturePXSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource;

var createCubemapTexture = CubemapTextureAPI$Wonderjs.createCubemapTexture;

var setMainWorkerCustomData = WorkerDataAPI$Wonderjs.setMainWorkerCustomData;

var getMainWorkerCustomData = WorkerDataAPI$Wonderjs.getMainWorkerCustomData;

var getRenderWorkerCustomData = WorkerDataAPI$Wonderjs.getRenderWorkerCustomData;

var setScriptAPIJsObj = APIAPI$Wonderjs.setScriptAPIJsObj;

var getScriptAPIJsObj = APIAPI$Wonderjs.getScriptAPIJsObj;

var convertWorldToScreen = CoordinateAPI$Wonderjs.convertWorldToScreen;

var setStencilOp = DeviceManagerAPI$Wonderjs.setStencilOp;

var setStencilFunc = DeviceManagerAPI$Wonderjs.setStencilFunc;

var setStencilMask = DeviceManagerAPI$Wonderjs.setStencilMask;

var setStencilTest = DeviceManagerAPI$Wonderjs.setStencilTest;

var setSide = DeviceManagerAPI$Wonderjs.setSide;

var setScissorTest = DeviceManagerAPI$Wonderjs.setScissorTest;

var setScissor = DeviceManagerAPI$Wonderjs.setScissor;

var setViewport = DeviceManagerAPI$Wonderjs.setViewport;

var unsafeGetGl = DeviceManagerAPI$Wonderjs.unsafeGetGl;

var startDirector = DirectorAPI$Wonderjs.startDirector;

var loopBody = DirectorAPI$Wonderjs.loopBody;

var initDirector = DirectorAPI$Wonderjs.initDirector;

var setGameObjectIsActive = GameObjectAPI$Wonderjs.setGameObjectIsActive;

var unsafeGetGameObjectIsActive = GameObjectAPI$Wonderjs.unsafeGetGameObjectIsActive;

var getAllDirectionLightComponents = GameObjectAPI$Wonderjs.getAllDirectionLightComponents;

var getAllLightMaterialComponents = GameObjectAPI$Wonderjs.getAllLightMaterialComponents;

var getAllBasicMaterialComponents = GameObjectAPI$Wonderjs.getAllBasicMaterialComponents;

var getAllPerspectiveCameraProjectionComponents = GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents;

var getAllBasicCameraViewComponents = GameObjectAPI$Wonderjs.getAllBasicCameraViewComponents;

var getAllArcballCameraControllerComponents = GameObjectAPI$Wonderjs.getAllArcballCameraControllerComponents;

var getAllFlyCameraControllerComponents = GameObjectAPI$Wonderjs.getAllFlyCameraControllerComponents;

var getAllGeometryComponents = GameObjectAPI$Wonderjs.getAllGeometryComponents;

var getAllPointLightComponents = GameObjectAPI$Wonderjs.getAllPointLightComponents;

var getAllPointLightComponentsOfGameObject = GameObjectAPI$Wonderjs.getAllPointLightComponentsOfGameObject;

var getAllDirectionLightComponentsOfGameObject = GameObjectAPI$Wonderjs.getAllDirectionLightComponentsOfGameObject;

var getAllGameObjects = GameObjectAPI$Wonderjs.getAllGameObjects;

var getAllChildrenTransform = GameObjectAPI$Wonderjs.getAllChildrenTransform;

var setGameObjectIsRoot = GameObjectAPI$Wonderjs.setGameObjectIsRoot;

var unsafeGetGameObjectIsRoot = GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot;

var setGameObjectName = GameObjectAPI$Wonderjs.setGameObjectName;

var unsafeGetGameObjectName = GameObjectAPI$Wonderjs.unsafeGetGameObjectName;

var getGameObjectName = GameObjectAPI$Wonderjs.getGameObjectName;

var cloneGameObject = GameObjectAPI$Wonderjs.cloneGameObject;

var batchDisposeGameObjectKeepOrder = GameObjectAPI$Wonderjs.batchDisposeGameObjectKeepOrder;

var batchDisposeGameObject = GameObjectAPI$Wonderjs.batchDisposeGameObject;

var initGameObject = GameObjectAPI$Wonderjs.initGameObject;

var disposeGameObjectRemoveTexture = GameObjectAPI$Wonderjs.disposeGameObjectRemoveTexture;

var disposeGameObjectDisposeGeometryRemoveMaterial = GameObjectAPI$Wonderjs.disposeGameObjectDisposeGeometryRemoveMaterial;

var disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial;

var disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometry;

var disposeGameObjectKeepOrder = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder;

var disposeGameObject = GameObjectAPI$Wonderjs.disposeGameObject;

var isGameObjectAlive = GameObjectAPI$Wonderjs.isGameObjectAlive;

var disposeGameObjectObjectInstanceComponent = GameObjectAPI$Wonderjs.disposeGameObjectObjectInstanceComponent;

var unsafeGetGameObjectObjectInstanceComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectObjectInstanceComponent;

var addGameObjectObjectInstanceComponent = GameObjectAPI$Wonderjs.addGameObjectObjectInstanceComponent;

var disposeGameObjectSourceInstanceComponent = GameObjectAPI$Wonderjs.disposeGameObjectSourceInstanceComponent;

var hasGameObjectSourceInstanceComponent = GameObjectAPI$Wonderjs.hasGameObjectSourceInstanceComponent;

var unsafeGetGameObjectSourceInstanceComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectSourceInstanceComponent;

var addGameObjectSourceInstanceComponent = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent;

var hasGameObjectPointLightComponent = GameObjectAPI$Wonderjs.hasGameObjectPointLightComponent;

var unsafeGetGameObjectPointLightComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectPointLightComponent;

var disposeGameObjectPointLightComponent = GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent;

var addGameObjectPointLightComponent = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent;

var hasGameObjectDirectionLightComponent = GameObjectAPI$Wonderjs.hasGameObjectDirectionLightComponent;

var unsafeGetGameObjectDirectionLightComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectDirectionLightComponent;

var disposeGameObjectDirectionLightComponent = GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent;

var addGameObjectDirectionLightComponent = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent;

var hasGameObjectMeshRendererComponent = GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent;

var unsafeGetGameObjectMeshRendererComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent;

var disposeGameObjectMeshRendererComponent = GameObjectAPI$Wonderjs.disposeGameObjectMeshRendererComponent;

var addGameObjectMeshRendererComponent = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent;

var hasGameObjectLightMaterialComponent = GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent;

var unsafeGetGameObjectLightMaterialComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent;

var disposeGameObjectLightMaterialComponentRemoveTexture = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponentRemoveTexture;

var disposeGameObjectLightMaterialComponent = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent;

var addGameObjectLightMaterialComponent = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent;

var hasGameObjectBasicMaterialComponent = GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent;

var unsafeGetGameObjectBasicMaterialComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent;

var disposeGameObjectBasicMaterialComponent = GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent;

var addGameObjectBasicMaterialComponent = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent;

var hasGameObjectGeometryComponent = GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent;

var unsafeGetGameObjectGeometryComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent;

var removeGameObjectLightMaterialComponent = GameObjectAPI$Wonderjs.removeGameObjectLightMaterialComponent;

var removeGameObjectBasicMaterialComponent = GameObjectAPI$Wonderjs.removeGameObjectBasicMaterialComponent;

var removeGameObjectGeometryComponent = GameObjectAPI$Wonderjs.removeGameObjectGeometryComponent;

var disposeGameObjectGeometryComponent = GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent;

var addGameObjectGeometryComponent = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent;

var hasGameObjectTransformComponent = GameObjectAPI$Wonderjs.hasGameObjectTransformComponent;

var unsafeGetGameObjectTransformComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent;

var disposeGameObjectTransformComponent = GameObjectAPI$Wonderjs.disposeGameObjectTransformComponent;

var addGameObjectTransformComponent = GameObjectAPI$Wonderjs.addGameObjectTransformComponent;

var hasGameObjectArcballCameraControllerComponent = GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent;

var unsafeGetGameObjectArcballCameraControllerComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent;

var disposeGameObjectArcballCameraControllerComponent = GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent;

var addGameObjectArcballCameraControllerComponent = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent;

var hasGameObjectFlyCameraControllerComponent = GameObjectAPI$Wonderjs.hasGameObjectFlyCameraControllerComponent;

var unsafeGetGameObjectFlyCameraControllerComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectFlyCameraControllerComponent;

var disposeGameObjectFlyCameraControllerComponent = GameObjectAPI$Wonderjs.disposeGameObjectFlyCameraControllerComponent;

var addGameObjectFlyCameraControllerComponent = GameObjectAPI$Wonderjs.addGameObjectFlyCameraControllerComponent;

var hasGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent;

var unsafeGetGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

var disposeGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent;

var addGameObjectPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent;

var hasGameObjectBasicCameraViewComponent = GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent;

var unsafeGetGameObjectBasicCameraViewComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent;

var disposeGameObjectBasicCameraViewComponent = GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent;

var addGameObjectBasicCameraViewComponent = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent;

var hasGameObjectScriptComponent = GameObjectAPI$Wonderjs.hasGameObjectScriptComponent;

var unsafeGetGameObjectScriptComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectScriptComponent;

var disposeGameObjectScriptComponent = GameObjectAPI$Wonderjs.disposeGameObjectScriptComponent;

var addGameObjectScriptComponent = GameObjectAPI$Wonderjs.addGameObjectScriptComponent;

var createGameObject = GameObjectAPI$Wonderjs.createGameObject;

var setMeshRendererIsRender = MeshRendererAPI$Wonderjs.setMeshRendererIsRender;

var getMeshRendererIsRender = MeshRendererAPI$Wonderjs.getMeshRendererIsRender;

var setMeshRendererDrawMode = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode;

var getMeshRendererDrawMode = MeshRendererAPI$Wonderjs.getMeshRendererDrawMode;

var unsafeGetMeshRendererGameObject = MeshRendererAPI$Wonderjs.unsafeGetMeshRendererGameObject;

var createMeshRenderer = MeshRendererAPI$Wonderjs.createMeshRenderer;

var findGameObjectsByName = SceneAPI$Wonderjs.findGameObjectsByName;

var addSceneChildren = SceneAPI$Wonderjs.addSceneChildren;

var addSceneChild = SceneAPI$Wonderjs.addSceneChild;

var setSceneGameObject = SceneAPI$Wonderjs.setSceneGameObject;

var getSceneGameObject = SceneAPI$Wonderjs.getSceneGameObject;

var setAmbientLightColor = SceneAPI$Wonderjs.setAmbientLightColor;

var getAmbientLightColor = SceneAPI$Wonderjs.getAmbientLightColor;

var removeCubemapTexture = SceneAPI$Wonderjs.removeCubemapTexture;

var setCubemapTexture = SceneAPI$Wonderjs.setCubemapTexture;

var setScreenSize = ScreenAPI$Wonderjs.setScreenSize;

var markSourceInstanceModelMatrixIsStatic = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic;

var getSourceInstanceObjectInstanceTransformArray = SourceInstanceAPI$Wonderjs.getSourceInstanceObjectInstanceTransformArray;

var createObjectInstanceGameObject = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject;

var unsafeGetSourceInstanceGameObject = SourceInstanceAPI$Wonderjs.unsafeGetSourceInstanceGameObject;

var createSourceInstance = SourceInstanceAPI$Wonderjs.createSourceInstance;

var setIsDebug = StateAPI$Wonderjs.setIsDebug;

var setStateToData = StateAPI$Wonderjs.setStateToData;

var setState = StateAPI$Wonderjs.setState;

var createState = StateAPI$Wonderjs.createState;

var getStateFromData = StateAPI$Wonderjs.getStateFromData;

var unsafeGetState = StateAPI$Wonderjs.unsafeGetState;

var createStateData = StateAPI$Wonderjs.createStateData;

var getStateData = StateAPI$Wonderjs.getStateData;

var restoreState = StateAPI$Wonderjs.restoreState;

var deepCopyForRestore = StateAPI$Wonderjs.deepCopyForRestore;

var getFps = TimeControllerAPI$Wonderjs.getFps;

var getGameTime = TimeControllerAPI$Wonderjs.getGameTime;

var changeChildOrder = TransformAPI$Wonderjs.changeChildOrder;

var rotateWorldOnAxis = TransformAPI$Wonderjs.rotateWorldOnAxis;

var rotateLocalOnAxis = TransformAPI$Wonderjs.rotateLocalOnAxis;

var getTransformLocalToWorldMatrixTypeArray = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray;

var lookAtWithUp = TransformAPI$Wonderjs.lookAtWithUp;

var lookAt = TransformAPI$Wonderjs.lookAt;

var setTransformEulerAngles = TransformAPI$Wonderjs.setTransformEulerAngles;

var getTransformEulerAngles = TransformAPI$Wonderjs.getTransformEulerAngles;

var setTransformLocalEulerAngles = TransformAPI$Wonderjs.setTransformLocalEulerAngles;

var getTransformLocalEulerAngles = TransformAPI$Wonderjs.getTransformLocalEulerAngles;

var setTransformScale = TransformAPI$Wonderjs.setTransformScale;

var getTransformScale = TransformAPI$Wonderjs.getTransformScale;

var setTransformLocalScale = TransformAPI$Wonderjs.setTransformLocalScale;

var getTransformLocalScale = TransformAPI$Wonderjs.getTransformLocalScale;

var setTransformRotation = TransformAPI$Wonderjs.setTransformRotation;

var getTransformRotation = TransformAPI$Wonderjs.getTransformRotation;

var setTransformLocalRotation = TransformAPI$Wonderjs.setTransformLocalRotation;

var getTransformLocalRotation = TransformAPI$Wonderjs.getTransformLocalRotation;

var setTransformPosition = TransformAPI$Wonderjs.setTransformPosition;

var getTransformPosition = TransformAPI$Wonderjs.getTransformPosition;

var setTransformLocalPosition = TransformAPI$Wonderjs.setTransformLocalPosition;

var getTransformLocalPosition = TransformAPI$Wonderjs.getTransformLocalPosition;

var unsafeGetTransformChildren = TransformAPI$Wonderjs.unsafeGetTransformChildren;

var setTransformParentKeepOrder = TransformAPI$Wonderjs.setTransformParentKeepOrder;

var setTransformParent = TransformAPI$Wonderjs.setTransformParent;

var hasTransformParent = TransformAPI$Wonderjs.hasTransformParent;

var unsafeGetTransformParent = TransformAPI$Wonderjs.unsafeGetTransformParent;

var unsafeGetTransformGameObject = TransformAPI$Wonderjs.unsafeGetTransformGameObject;

var createTransform = TransformAPI$Wonderjs.createTransform;

var create = RecordAPIRenderWorkerService$Wonderjs.create;

var setIMGUIAPIJsObj = RecordAPIRenderWorkerService$Wonderjs.setIMGUIAPIJsObj;

var getIMGUIAPIJsObj = RecordAPIRenderWorkerService$Wonderjs.getIMGUIAPIJsObj;

export {
  buildDependencyRelation ,
  generateAllABs ,
  buildResourceData ,
  generateSingleRAB ,
  generateSingleSAB ,
  assembleStreamWDB ,
  assembleWholeWDB ,
  assembleWholeGLB ,
  isDefaultGeometryName ,
  isDefaultCubemapTextureName ,
  isDefaultBasicSourceTextureName ,
  isDefaultBasicMaterialName ,
  isDefaultLightMaterialName ,
  isDefaultImageName ,
  convertGLBToWDB ,
  generateWDB ,
  generateGLBData ,
  loadIMGUIAsset ,
  loadStreamWDB ,
  loadWholeWDB ,
  loadConfig ,
  isBindArcballCameraControllerEvent ,
  unbindArcballCameraControllerPointScaleEvent ,
  unbindArcballCameraControllerEvent ,
  bindArcballCameraControllerEvent ,
  setArcballCameraControllerDirectionArray ,
  hasArcballCameraControllerDirection ,
  unsafeGetArcballCameraControllerDirectionArray ,
  setArcballCameraControllerRotateSpeed ,
  unsafeGetArcballCameraControllerRotateSpeed ,
  setArcballCameraControllerMoveSpeedY ,
  unsafeGetArcballCameraControllerMoveSpeedY ,
  setArcballCameraControllerMoveSpeedX ,
  unsafeGetArcballCameraControllerMoveSpeedX ,
  setArcballCameraControllerTarget ,
  unsafeGetArcballCameraControllerTarget ,
  setArcballCameraControllerThetaMargin ,
  unsafeGetArcballCameraControllerThetaMargin ,
  setArcballCameraControllerTheta ,
  unsafeGetArcballCameraControllerTheta ,
  setArcballCameraControllerPhi ,
  unsafeGetArcballCameraControllerPhi ,
  setArcballCameraControllerWheelSpeed ,
  unsafeGetArcballCameraControllerWheelSpeed ,
  setArcballCameraControllerMinDistance ,
  unsafeGetArcballCameraControllerMinDistance ,
  setArcballCameraControllerDistance ,
  unsafeGetArcballCameraControllerDistance ,
  unsafeGetArcballCameraControllerGameObject ,
  createArcballCameraController ,
  isBindFlyCameraControllerEvent ,
  unbindFlyCameraControllerPointScaleEvent ,
  unbindFlyCameraControllerEvent ,
  bindFlyCameraControllerEvent ,
  setFlyCameraControllerDirectionArray ,
  hasFlyCameraControllerDirection ,
  unsafeGetFlyCameraControllerDirectionArray ,
  setFlyCameraControllerRotateSpeed ,
  unsafeGetFlyCameraControllerRotateSpeed ,
  setFlyCameraControllerWheelSpeed ,
  unsafeGetFlyCameraControllerWheelSpeed ,
  setFlyCameraControllerMoveSpeed ,
  unsafeGetFlyCameraControllerMoveSpeed ,
  unsafeGetFlyCameraControllerGameObject ,
  createFlyCameraController ,
  getActiveBasicCameraView ,
  setActiveBasicCameraView ,
  unactiveBasicCameraView ,
  activeBasicCameraView ,
  isActiveBasicCameraView ,
  getBasicCameraViewWorldToCameraMatrix ,
  unsafeGetBasicCameraViewGameObject ,
  createBasicCameraView ,
  markPerspectiveCameraProjectionNotDirty ,
  markPerspectiveCameraProjectionDirty ,
  getAllPerspectiveCameraProjections ,
  setPerspectiveCameraProjectionFar ,
  unsafeGetPerspectiveCameraFar ,
  setPerspectiveCameraProjectionNear ,
  unsafeGetPerspectiveCameraNear ,
  setPerspectiveCameraProjectionAspect ,
  unsafeGetPerspectiveCameraAspect ,
  setPerspectiveCameraProjectionFovy ,
  unsafeGetPerspectiveCameraFovy ,
  unsafeGetPerspectiveCameraProjectionGameObject ,
  unsafeGetPerspectiveCameraProjectionPMatrix ,
  createPerspectiveCameraProjection ,
  isSupportRenderWorkerAndSharedArrayBuffer ,
  getPointEventEventOfEvent ,
  getPointEventMovementDeltaOfEvent ,
  getPointEventWheelOfEvent ,
  getPointEventButtonOfEvent ,
  getPointEventLocationOfEvent ,
  getPointEventLocationInViewOfEvent ,
  getCustomEventUserData ,
  createCustomEvent ,
  emitCustomGameObjectEvent ,
  broadcastCustomGameObjectEvent ,
  triggerCustomGameObjectEvent ,
  triggerCustomGlobalEvent ,
  stopPropagationCustomEvent ,
  offCustomGameObjectEventByHandleFunc ,
  offCustomGameObjectEventByTarget ,
  onCustomGameObjectEvent ,
  offCustomGlobalEventByHandleFunc ,
  offCustomGlobalEventByEventName ,
  onCustomGlobalEvent ,
  offTouchEventByHandleFunc ,
  offKeyboardEventByHandleFunc ,
  offMouseEventByHandleFunc ,
  onTouchEvent ,
  onKeyboardEvent ,
  onMouseEvent ,
  getPointDragDropEventName ,
  getPointDragOverEventName ,
  getPointDragStartEventName ,
  getPointScaleEventName ,
  getPointMoveEventName ,
  getPointTapEventName ,
  getPointUpEventName ,
  getPointDownEventName ,
  getGeometryIndicesCount ,
  hasGeometryIndices32 ,
  hasGeometryIndices16 ,
  hasGeometryIndices ,
  hasGeometryTexCoords ,
  hasGeometryNormals ,
  hasGeometryVertices ,
  batchDisposeGeometry ,
  getAllGeometrys ,
  setGeometryName ,
  unsafeGetGeometryName ,
  unsafeGetGeometryGameObjects ,
  setGeometryIndices32 ,
  getGeometryIndices32 ,
  setGeometryIndices16 ,
  getGeometryIndices16 ,
  setGeometryNormals ,
  getGeometryNormals ,
  setGeometryTexCoords ,
  getGeometryTexCoords ,
  setGeometryVertices ,
  getGeometryVertices ,
  createPlaneGeometry ,
  createConeGeometry ,
  createCylinderGeometry ,
  createSphereGeometry ,
  createBoxGeometry ,
  createGeometry ,
  hasGameObjectCameraGroupComponents ,
  unsafeGetGameObjectCameraGroupComponents ,
  disposeGameObjectCameraGroupComponents ,
  addGameObjectCameraGroupComponents ,
  createCameraGroup ,
  replaceMaterial ,
  hasGameObjectRenderGroupComponents ,
  unsafeGetGameObjectRenderGroupComponents ,
  disposeGameObjectRenderGroupComponents ,
  addGameObjectRenderGroupComponents ,
  createRenderGroup ,
  buildRenderGroup ,
  initSettedAssets ,
  addSettedAssetCustomImageData ,
  getSettedAssetCustomImageDataArr ,
  hasSettedAssetCustomImageData ,
  setSettedAssetBitmapData ,
  hasSettedAssetBitmapData ,
  unsafeGetSettedAssetBitmapName ,
  getSettedAssetBitmapName ,
  unsafeGetSettedAssetBitmapArrayBuffer ,
  getSettedAssetBitmapArrayBuffer ,
  setSettedAssetFntData ,
  hasSettedAssetFntData ,
  unsafeGetSettedAssetFntName ,
  getSettedAssetFntName ,
  unsafeGetSettedAssetFntContent ,
  getSettedAssetFntContent ,
  unsafeGetExecOrder ,
  getExecOrder ,
  unsafeGetCustomData ,
  getCustomData ,
  unsafeGetExecFunc ,
  getExecFunc ,
  clearExecFuncDataArr ,
  removeExecFuncData ,
  addExecFuncData ,
  hasExecFuncData ,
  createDefaultButtonSkinData ,
  createButtonSkinData ,
  setButtonSkinData ,
  getButtonSkinData ,
  getDefaultSkinName ,
  setSkinData ,
  createDefaultSkinData ,
  unsafeGetDefaultSkinData ,
  unsafeGetSkinData ,
  createSkinData ,
  removeSkinData ,
  addSkinData ,
  hasSkinData ,
  removeSingleCustomStyleData ,
  addSingleCustomStyleData ,
  removeCustomStyleData ,
  addCustomStyleData ,
  createSingleCustomStyleData ,
  createAllCustomStyleData ,
  removeCustomControl ,
  registerCustomControl ,
  hasCustomControl ,
  image ,
  label ,
  sendNoTextureProgramUniformProjectionMatData ,
  sendFontTextureProgramUniformProjectionMatData ,
  sendCustomTextureProgramUniformProjectionMatData ,
  loadImageDataArr ,
  loadImage ,
  getIntersectedPointWithMesh ,
  isIntersectWithMesh ,
  checkIntersectMesh ,
  createPerspectiveCameraRayFromEvent ,
  removeWorkerMainLoopJob ,
  addWorkerMainLoopJob ,
  removeWorkerMainInitJob ,
  addWorkerMainInitJob ,
  removeNoWorkerLoopJob ,
  removeNoWorkerInitJob ,
  addNoWorkerLoopJob ,
  addNoWorkerInitJob ,
  registerNoWorkerLoopJob ,
  registerNoWorkerInitJob ,
  resetDisposeCount ,
  reallocateGeometry ,
  initGeometryBufferData ,
  reAllocateToBuffer ,
  isGeometryBufferNearlyFull ,
  isDisposeTooMany ,
  reallocateGameObjectByDisposeCount ,
  draw ,
  sendUniformRenderObjectMaterialData ,
  sendUniformRenderObjectModelData ,
  sendAttributeData ,
  useByShaderIndex ,
  getShaderIndex ,
  setGameObjectsNeedDrawOutline ,
  setOutlineColor ,
  getOutlineColor ,
  setDirectionLightIsRender ,
  getDirectionLightIsRender ,
  setDirectionLightIntensity ,
  getDirectionLightIntensity ,
  setDirectionLightColor ,
  getDirectionLightColor ,
  unsafeGetDirectionLightGameObject ,
  createDirectionLight ,
  isMaxCount ,
  setPointLightIsRender ,
  getPointLightIsRender ,
  setPointLightRangeLevel ,
  setPointLightRange ,
  getPointLightRange ,
  setPointLightQuadratic ,
  getPointLightQuadratic ,
  setPointLightLinear ,
  getPointLightLinear ,
  setPointLightConstant ,
  getPointLightConstant ,
  setPointLightIntensity ,
  getPointLightIntensity ,
  setPointLightColor ,
  getPointLightColor ,
  unsafeGetPointLightGameObject ,
  createPointLight ,
  batchDisposeBasicMaterial ,
  getAllBasicMaterials ,
  setBasicMaterialName ,
  unsafeGetBasicMaterialName ,
  setBasicMaterialAlpha ,
  getBasicMaterialAlpha ,
  setBasicMaterialIsDepthTest ,
  getBasicMaterialIsDepthTest ,
  setBasicMaterialColor ,
  getBasicMaterialColor ,
  unsafeGetBasicMaterialGameObjects ,
  createBasicMaterial ,
  batchDisposeLightMaterialRemoveTexture ,
  batchDisposeLightMaterial ,
  getAllLightMaterials ,
  reInitMaterials ,
  setLightMaterialName ,
  unsafeGetLightMaterialName ,
  removeLightMaterialSpecularMap ,
  hasLightMaterialSpecularMap ,
  setLightMaterialSpecularMap ,
  unsafeGetLightMaterialSpecularMap ,
  removeLightMaterialDiffuseMap ,
  hasLightMaterialDiffuseMap ,
  setLightMaterialDiffuseMap ,
  unsafeGetLightMaterialDiffuseMap ,
  setLightMaterialShininess ,
  getLightMaterialShininess ,
  setLightMaterialSpecularColor ,
  getLightMaterialSpecularColor ,
  setLightMaterialDiffuseColor ,
  getLightMaterialDiffuseColor ,
  unsafeGetLightMaterialGameObjects ,
  createLightMaterial ,
  setScriptIsActive ,
  unsafeGetScriptIsActive ,
  setScriptAttributeFieldDefaultValueAndValue ,
  unsafeGetScriptAttributeFieldDefaultValue ,
  unsafeGetScriptAttribute ,
  unsafeGetScriptAttributeEntries ,
  replaceScriptAttribute ,
  removeScriptAttribute ,
  addScriptAttribute ,
  unsafeGetScriptEventFunctionDataEntries ,
  replaceScriptEventFunctionData ,
  removeScriptEventFunctionData ,
  addScriptEventFunctionData ,
  unsafeGetScriptGameObject ,
  createScript ,
  getScriptAttributeEntries ,
  removeScriptAttributeField ,
  addScriptAttributeFieldJsObj ,
  createScriptAttribute ,
  isScriptEventFunctionEnable ,
  disableScriptEventFunction ,
  enableScriptEventFunction ,
  createScriptEventFunctionData ,
  clearInitShaderCache ,
  mergeSparseMaps ,
  setSparseMapValue ,
  getSparseMapValue ,
  unsafeGetSparseMapValue ,
  createSparseMap ,
  setArrayBufferViewSourceTextureName ,
  unsafeGetArrayBufferViewSourceTextureName ,
  setArrayBufferViewSourceTextureHeight ,
  setArrayBufferViewSourceTextureWidth ,
  setArrayBufferViewSourceTextureFlipY ,
  getArrayBufferViewSourceTextureFlipY ,
  setArrayBufferViewSourceTextureType ,
  getArrayBufferViewSourceTextureType ,
  setArrayBufferViewSourceTextureFormat ,
  getArrayBufferViewSourceTextureFormat ,
  setArrayBufferViewSourceTextureMinFilter ,
  getArrayBufferViewSourceTextureMinFilter ,
  setArrayBufferViewSourceTextureMagFilter ,
  getArrayBufferViewSourceTextureMagFilter ,
  setArrayBufferViewSourceTextureWrapT ,
  getArrayBufferViewSourceTextureWrapT ,
  setArrayBufferViewSourceTextureWrapS ,
  getArrayBufferViewSourceTextureWrapS ,
  getArrayBufferViewSourceTextureHeight ,
  getArrayBufferViewSourceTextureWidth ,
  setArrayBufferViewSourceTextureSource ,
  unsafeGetArrayBufferViewSourceTextureSource ,
  createArrayBufferViewSourceTexture ,
  disposeBasicSourceTexture ,
  setBasicSourceTextureIsNeedUpdate ,
  getBasicSourceTextureIsNeedUpdate ,
  setBasicSourceTextureName ,
  unsafeGetBasicSourceTextureName ,
  getBasicSourceTextureName ,
  setBasicSourceTextureFlipY ,
  getBasicSourceTextureFlipY ,
  setBasicSourceTextureType ,
  getBasicSourceTextureType ,
  setBasicSourceTextureFormat ,
  getBasicSourceTextureFormat ,
  setBasicSourceTextureMinFilter ,
  getBasicSourceTextureMinFilter ,
  setBasicSourceTextureMagFilter ,
  getBasicSourceTextureMagFilter ,
  setBasicSourceTextureWrapT ,
  getBasicSourceTextureWrapT ,
  setBasicSourceTextureWrapS ,
  getBasicSourceTextureWrapS ,
  getBasicSourceTextureHeight ,
  getBasicSourceTextureWidth ,
  setBasicSourceTextureSource ,
  unsafeGetBasicSourceTextureSource ,
  createBasicSourceTexture ,
  initCubemapTexture ,
  disposeCubemapTexture ,
  getAllTextures ,
  setCubemapTextureIsNeedUpdate ,
  getCubemapTextureIsNeedUpdate ,
  setCubemapTextureName ,
  unsafeGetCubemapTextureName ,
  getCubemapTextureName ,
  setCubemapTextureFlipY ,
  getCubemapTextureFlipY ,
  setCubemapTextureNZType ,
  getCubemapTextureNZType ,
  setCubemapTexturePZType ,
  getCubemapTexturePZType ,
  setCubemapTextureNYType ,
  getCubemapTextureNYType ,
  setCubemapTexturePYType ,
  getCubemapTexturePYType ,
  setCubemapTextureNXType ,
  getCubemapTextureNXType ,
  setCubemapTexturePXType ,
  getCubemapTexturePXType ,
  setCubemapTextureNZFormat ,
  getCubemapTextureNZFormat ,
  setCubemapTexturePZFormat ,
  getCubemapTexturePZFormat ,
  setCubemapTextureNYFormat ,
  getCubemapTextureNYFormat ,
  setCubemapTexturePYFormat ,
  getCubemapTexturePYFormat ,
  setCubemapTextureNXFormat ,
  getCubemapTextureNXFormat ,
  setCubemapTexturePXFormat ,
  getCubemapTexturePXFormat ,
  setCubemapTextureMinFilter ,
  getCubemapTextureMinFilter ,
  setCubemapTextureMagFilter ,
  getCubemapTextureMagFilter ,
  setCubemapTextureWrapT ,
  getCubemapTextureWrapT ,
  setCubemapTextureWrapS ,
  getCubemapTextureWrapS ,
  setCubemapTextureNZSource ,
  unsafeGetCubemapTextureNZSource ,
  setCubemapTexturePZSource ,
  unsafeGetCubemapTexturePZSource ,
  setCubemapTextureNYSource ,
  unsafeGetCubemapTextureNYSource ,
  setCubemapTexturePYSource ,
  unsafeGetCubemapTexturePYSource ,
  setCubemapTextureNXSource ,
  unsafeGetCubemapTextureNXSource ,
  setCubemapTexturePXSource ,
  unsafeGetCubemapTexturePXSource ,
  createCubemapTexture ,
  setMainWorkerCustomData ,
  getMainWorkerCustomData ,
  getRenderWorkerCustomData ,
  setScriptAPIJsObj ,
  getScriptAPIJsObj ,
  convertWorldToScreen ,
  setStencilOp ,
  setStencilFunc ,
  setStencilMask ,
  setStencilTest ,
  setSide ,
  setScissorTest ,
  setScissor ,
  setViewport ,
  unsafeGetGl ,
  startDirector ,
  loopBody ,
  initDirector ,
  setGameObjectIsActive ,
  unsafeGetGameObjectIsActive ,
  getAllDirectionLightComponents ,
  getAllLightMaterialComponents ,
  getAllBasicMaterialComponents ,
  getAllPerspectiveCameraProjectionComponents ,
  getAllBasicCameraViewComponents ,
  getAllArcballCameraControllerComponents ,
  getAllFlyCameraControllerComponents ,
  getAllGeometryComponents ,
  getAllPointLightComponents ,
  getAllPointLightComponentsOfGameObject ,
  getAllDirectionLightComponentsOfGameObject ,
  getAllGameObjects ,
  getAllChildrenTransform ,
  setGameObjectIsRoot ,
  unsafeGetGameObjectIsRoot ,
  setGameObjectName ,
  unsafeGetGameObjectName ,
  getGameObjectName ,
  cloneGameObject ,
  batchDisposeGameObjectKeepOrder ,
  batchDisposeGameObject ,
  initGameObject ,
  disposeGameObjectRemoveTexture ,
  disposeGameObjectDisposeGeometryRemoveMaterial ,
  disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial ,
  disposeGameObjectKeepOrderRemoveGeometry ,
  disposeGameObjectKeepOrder ,
  disposeGameObject ,
  isGameObjectAlive ,
  disposeGameObjectObjectInstanceComponent ,
  unsafeGetGameObjectObjectInstanceComponent ,
  addGameObjectObjectInstanceComponent ,
  disposeGameObjectSourceInstanceComponent ,
  hasGameObjectSourceInstanceComponent ,
  unsafeGetGameObjectSourceInstanceComponent ,
  addGameObjectSourceInstanceComponent ,
  hasGameObjectPointLightComponent ,
  unsafeGetGameObjectPointLightComponent ,
  disposeGameObjectPointLightComponent ,
  addGameObjectPointLightComponent ,
  hasGameObjectDirectionLightComponent ,
  unsafeGetGameObjectDirectionLightComponent ,
  disposeGameObjectDirectionLightComponent ,
  addGameObjectDirectionLightComponent ,
  hasGameObjectMeshRendererComponent ,
  unsafeGetGameObjectMeshRendererComponent ,
  disposeGameObjectMeshRendererComponent ,
  addGameObjectMeshRendererComponent ,
  hasGameObjectLightMaterialComponent ,
  unsafeGetGameObjectLightMaterialComponent ,
  disposeGameObjectLightMaterialComponentRemoveTexture ,
  disposeGameObjectLightMaterialComponent ,
  addGameObjectLightMaterialComponent ,
  hasGameObjectBasicMaterialComponent ,
  unsafeGetGameObjectBasicMaterialComponent ,
  disposeGameObjectBasicMaterialComponent ,
  addGameObjectBasicMaterialComponent ,
  hasGameObjectGeometryComponent ,
  unsafeGetGameObjectGeometryComponent ,
  removeGameObjectLightMaterialComponent ,
  removeGameObjectBasicMaterialComponent ,
  removeGameObjectGeometryComponent ,
  disposeGameObjectGeometryComponent ,
  addGameObjectGeometryComponent ,
  hasGameObjectTransformComponent ,
  unsafeGetGameObjectTransformComponent ,
  disposeGameObjectTransformComponent ,
  addGameObjectTransformComponent ,
  hasGameObjectArcballCameraControllerComponent ,
  unsafeGetGameObjectArcballCameraControllerComponent ,
  disposeGameObjectArcballCameraControllerComponent ,
  addGameObjectArcballCameraControllerComponent ,
  hasGameObjectFlyCameraControllerComponent ,
  unsafeGetGameObjectFlyCameraControllerComponent ,
  disposeGameObjectFlyCameraControllerComponent ,
  addGameObjectFlyCameraControllerComponent ,
  hasGameObjectPerspectiveCameraProjectionComponent ,
  unsafeGetGameObjectPerspectiveCameraProjectionComponent ,
  disposeGameObjectPerspectiveCameraProjectionComponent ,
  addGameObjectPerspectiveCameraProjectionComponent ,
  hasGameObjectBasicCameraViewComponent ,
  unsafeGetGameObjectBasicCameraViewComponent ,
  disposeGameObjectBasicCameraViewComponent ,
  addGameObjectBasicCameraViewComponent ,
  hasGameObjectScriptComponent ,
  unsafeGetGameObjectScriptComponent ,
  disposeGameObjectScriptComponent ,
  addGameObjectScriptComponent ,
  createGameObject ,
  setMeshRendererIsRender ,
  getMeshRendererIsRender ,
  setMeshRendererDrawMode ,
  getMeshRendererDrawMode ,
  unsafeGetMeshRendererGameObject ,
  createMeshRenderer ,
  findGameObjectsByName ,
  addSceneChildren ,
  addSceneChild ,
  setSceneGameObject ,
  getSceneGameObject ,
  setAmbientLightColor ,
  getAmbientLightColor ,
  removeCubemapTexture ,
  setCubemapTexture ,
  setScreenSize ,
  markSourceInstanceModelMatrixIsStatic ,
  getSourceInstanceObjectInstanceTransformArray ,
  createObjectInstanceGameObject ,
  unsafeGetSourceInstanceGameObject ,
  createSourceInstance ,
  setIsDebug ,
  setStateToData ,
  setState ,
  createState ,
  getStateFromData ,
  unsafeGetState ,
  createStateData ,
  getStateData ,
  restoreState ,
  deepCopyForRestore ,
  getFps ,
  getGameTime ,
  changeChildOrder ,
  rotateWorldOnAxis ,
  rotateLocalOnAxis ,
  getTransformLocalToWorldMatrixTypeArray ,
  lookAtWithUp ,
  lookAt ,
  setTransformEulerAngles ,
  getTransformEulerAngles ,
  setTransformLocalEulerAngles ,
  getTransformLocalEulerAngles ,
  setTransformScale ,
  getTransformScale ,
  setTransformLocalScale ,
  getTransformLocalScale ,
  setTransformRotation ,
  getTransformRotation ,
  setTransformLocalRotation ,
  getTransformLocalRotation ,
  setTransformPosition ,
  getTransformPosition ,
  setTransformLocalPosition ,
  getTransformLocalPosition ,
  unsafeGetTransformChildren ,
  setTransformParentKeepOrder ,
  setTransformParent ,
  hasTransformParent ,
  unsafeGetTransformParent ,
  unsafeGetTransformGameObject ,
  createTransform ,
  create ,
  setIMGUIAPIJsObj ,
  getIMGUIAPIJsObj ,
  
}
/* JobAPI-Wonderjs Not a pure module */
