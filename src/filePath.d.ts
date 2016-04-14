/// <reference path="../lib/inner/bowser/bowser.d.ts"/>
/// <reference path="../lib/inner/rsvp/rsvp.d.ts"/>
/// <reference path="../lib/inner/Wonder-CommonLib/dist/wdCb.d.ts"/>
/// <reference path="../lib/inner/Wonder-FRP/dist/wdFrp.core.d.ts"/>

/// <reference path="../lib/outer/cannon/cannon.d.ts"/>

/// <reference path="config/DebugConfig"/>

/// <reference path="debug/DebugStatistics"/>

/// <reference path="extend/wdFrp"/>




/// <reference path="definition/typescript/decorator/contract"/>
/// <reference path="definition/typescript/decorator/cache"/>
/// <reference path="definition/typescript/decorator/virtual"/>
/// <reference path="definition/typescript/decorator/rigidBody"/>
/// <reference path="definition/typescript/decorator/script"/>
/// <reference path="definition/typescript/decorator/control"/>
/// <reference path="definition/typescript/decorator/clone"/>

/// <reference path="definition/Global"/>


/// <reference path="math/Global"/>
/// <reference path="math/Vector2"/>
/// <reference path="math/Vector3"/>
/// <reference path="math/Vector4"/>
/// <reference path="math/Matrix4"/>
/// <reference path="math/Matrix3"/>
/// <reference path="math/Quaternion"/>
/// <reference path="math/Plane"/>
/// <reference path="math/Ray"/>

/// <reference path="core/Entity"/>
/// <reference path="core/Component"/>
/// <reference path="core/Scheduler"/>
/// <reference path="core/Director"/>
/// <reference path="core/Main"/>
/// <reference path="core/DomEventManager"/>
/// <reference path="core/entityObject/EntityObject"/>
/// <reference path="core/entityObject/UIObject"/>
/// <reference path="core/entityObject/GameObject"/>
/// <reference path="core/entityObject/SceneDispatcher"/>
/// <reference path="core/entityObject/Scene"/>
/// <reference path="core/entityObject/GameObjectScene"/>
/// <reference path="core/entityObject/UIObjectScene"/>




/// <reference path="event/structure/EventListenerMap"/>
/// <reference path="event/structure/CustomEventListenerMap"/>
/// <reference path="event/structure/DomEventListenerMap"/>

/// <reference path="event/object/EEventType"/>
/// <reference path="event/object/EventNameHandler"/>
/// <reference path="event/object/EEventPhase"/>
/// <reference path="event/object/EventTable"/>
/// <reference path="event/object/Event"/>
/// <reference path="event/object/DomEvent"/>
/// <reference path="event/object/MouseEvent"/>
/// <reference path="event/object/KeyboardEvent"/>
/// <reference path="event/object/CustomEvent"/>
/// <reference path="event/object/EMouseButton"/>
/// <reference path="event/listener/EventListener"/>
/// <reference path="event/handler/EventHandler"/>
/// <reference path="event/handler/DomEventHandler"/>
/// <reference path="event/handler/MouseEventHandler"/>
/// <reference path="event/handler/KeyboardEventHandler"/>
/// <reference path="event/handler/CustomEventHandler"/>

/// <reference path="event/dispatcher/EventDispatcher"/>
/// <reference path="event/dispatcher/CustomEventDispatcher"/>
/// <reference path="event/dispatcher/DomEventDispatcher"/>

/// <reference path="event/binder/EventRegister"/>
/// <reference path="event/binder/CustomEventRegister"/>
/// <reference path="event/binder/DomEventRegister"/>

/// <reference path="event/binder/EventBinder"/>
/// <reference path="event/binder/CustomEventBinder"/>
/// <reference path="event/binder/DomEventBinder"/>

/// <reference path="event/factory/EventHandlerFactory"/>
/// <reference path="event/factory/EventBinderFactory"/>
/// <reference path="event/factory/EventDispatcherFactory"/>

/// <reference path="event/utils/EventUtils"/>

/// <reference path="event/EventManager"/>
/// <reference path="event/EEngineEvent"/>




/// <reference path="component/data/ComponentInitOrderTable"/>


/// <reference path="component/lod/LOD"/>
/// <reference path="component/lod/ELODGeometryState"/>


/// <reference path="component/instance/Instance"/>
/// <reference path="component/instance/SourceInstance"/>
/// <reference path="component/instance/ObjectInstance"/>
/// <reference path="component/instance/EInstanceTag"/>

/// <reference path="component/event/detector/EventTriggerDetector"/>
/// <reference path="component/event/detector/UIEventTriggerDetector"/>
/// <reference path="component/event/detector/RayCasterEventTriggerDetector"/>
/// <reference path="component/event/detector/SceneEventTriggerDetector"/>
/// <reference path="component/event/detector/EventTriggerDetectorUtils"/>

/// <reference path="component/event/EventTriggerTable"/>


/// <reference path="component/script/IScriptBehavior"/>
/// <reference path="component/script/IEventScriptBehavior"/>
/// <reference path="component/script/Script"/>



/// <reference path="component/transform/Transform"/>
/// <reference path="component/transform/ThreeDTransform"/>
/// <reference path="component/transform/RectTransform"/>
/// <reference path="component/transform/ETransformState"/>

/// <reference path="component/container/ComponentContainer"/>
/// <reference path="component/container/ActionManager"/>
/// <reference path="component/container/UIManager"/>


/// <reference path="component/scene/SceneComponent"/>

/// <reference path="component/scene/manager/ShadowManager"/>
/// <reference path="component/scene/manager/ShadowMapManager"/>
/// <reference path="component/scene/manager/LightManager"/>
/// <reference path="component/scene/manager/RenderTargetRendererManager"/>

/// <reference path="component/scene/CollisionDetector"/>

/// <reference path="component/scene/manager/structure/ShadowLayerList"/>



/// <reference path="component/shadow/Shadow"/>
/// <reference path="component/shadow/ShadowUtils"/>
/// <reference path="component/shadow/EShadowLayer"/>
/// <reference path="component/shadow/EShadowMapSoftType"/>


/// <reference path="component/animation/Animation"/>
/// <reference path="component/animation/MorphAnimation"/>
/// <reference path="component/animation/ArticulatedAnimation"/>
/// <reference path="component/animation/EKeyFrameInterpolation"/>
/// <reference path="component/animation/EArticulatedAnimationTarget"/>

/// <reference path="component/geometry/Geometry"/>
/// <reference path="component/geometry/GeometryUtils"/>
/// <reference path="component/geometry/CustomGeometry"/>
/// <reference path="component/geometry/ModelGeometry"/>
/// <reference path="component/geometry/BoxGeometry"/>
/// <reference path="component/geometry/RectGeometry"/>
/// <reference path="component/geometry/PlaneGeometry"/>
/// <reference path="component/geometry/ESphereDrawMode"/>
/// <reference path="component/geometry/SphereGeometry"/>
/// <reference path="component/geometry/TriangleGeometry"/>
/// <reference path="component/geometry/TerrainGeometry"/>

/// <reference path="component/geometry/data/GeometryData"/>
/// <reference path="component/geometry/data/CommonGeometryData"/>
/// <reference path="component/geometry/data/MorphGeometryData"/>
/// <reference path="component/geometry/data/BufferContainer"/>
/// <reference path="component/geometry/data/CommonBufferContainer"/>
/// <reference path="component/geometry/data/MorphBufferContainer"/>

/// <reference path="component/camera/Camera"/>
/// <reference path="component/camera/OrthographicCamera"/>
/// <reference path="component/camera/PerspectiveCamera"/>
/// <reference path="component/camera/controller/CameraController"/>
/// <reference path="component/camera/controller/basic/BasicCameraController"/>
/// <reference path="component/camera/controller/fly/FlyCameraController"/>
/// <reference path="component/camera/controller/fly/FlyCameraControl"/>
/// <reference path="component/camera/controller/fly/FlyPerspectiveCameraControl"/>
/// <reference path="component/camera/controller/fly/FlyOrthographicCameraControl"/>
/// <reference path="component/camera/controller/arcball/ArcballCameraController"/>

/// <reference path="component/action/Action"/>
/// <reference path="component/action/ActionInstant"/>
/// <reference path="component/action/CallFunc"/>
/// <reference path="component/action/ActionInterval"/>
/// <reference path="component/action/Control"/>
/// <reference path="component/action/Sequence"/>
/// <reference path="component/action/Spawn"/>
/// <reference path="component/action/DelayTime"/>
/// <reference path="component/action/Repeat"/>
/// <reference path="component/action/RepeatForever"/>
/// <reference path="component/action/Tween"/>

/// <reference path="component/renderer/RendererComponent"/>
/// <reference path="component/renderer/MeshRenderer"/>
/// <reference path="component/renderer/SkyboxRenderer"/>
/// <reference path="component/renderer/UIRenderer"/>
/// <reference path="component/renderer/EUIRendererState"/>



/// <reference path="component/space_partition/SpacePartition"/>
/// <reference path="component/space_partition/Octree"/>
/// <reference path="component/space_partition/OctreeNode"/>


/// <reference path="component/collider/colliderForFirstCheck/ColliderForFirstCheck"/>
/// <reference path="component/collider/colliderForFirstCheck/BoxColliderForFirstCheck"/>

/// <reference path="component/collider/Collider"/>
/// <reference path="component/collider/BoxCollider"/>
/// <reference path="component/collider/SphereCollider"/>
/// <reference path="component/collider/BoundingRegion"/>
/// <reference path="component/collider/BoxBoundingRegion"/>
/// <reference path="component/collider/SphereBoundingRegion"/>
/// <reference path="component/collider/BoundingRegionUtils"/>

/// <reference path="component/collider/Shape"/>
/// <reference path="component/collider/AABBShape"/>
/// <reference path="component/collider/SphereShape"/>
/// <reference path="component/collider/EColliderType"/>
/// <reference path="component/collider/ColliderUtils"/>

/// <reference path="component/physics/RigidBody"/>
/// <reference path="component/physics/DynamicRigidBody"/>
/// <reference path="component/physics/KinematicRigidBody"/>
/// <reference path="component/physics/StaticRigidBody"/>

/// <reference path="component/physics/model/PhysicsConstraintModel"/>

/// <reference path="component/physics/engine/PhysicsEngineFactory"/>
/// <reference path="component/physics/engine/adapter/IPhysicsEngineAdapter"/>
/// <reference path="component/physics/engine/adapter/EPhysicsEngineType"/>

/// <reference path="component/physics/engine/adapter/cannon/structure/CannonDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/CannonGameObjectDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/CannonMaterialList"/>

/// <reference path="component/physics/engine/adapter/cannon/structure/constraint/CannonConstraintDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/constraint/CannonSingleConstraintDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/constraint/CannonLockConstraintDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/constraint/CannonPointToPointConstraintDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/constraint/CannonDistanceConstraintDataList"/>
/// <reference path="component/physics/engine/adapter/cannon/structure/constraint/CannonHingeConstraintDataList"/>


/// <reference path="component/physics/engine/adapter/cannon/CannonUtils"/>
/// <reference path="component/physics/engine/adapter/cannon/CannonAdapter"/>

/// <reference path="component/physics/engine/adapter/cannon/body/CannonBody"/>
/// <reference path="component/physics/engine/adapter/cannon/body/CannonDynamicBody"/>
/// <reference path="component/physics/engine/adapter/cannon/body/CannonKinematicBody"/>
/// <reference path="component/physics/engine/adapter/cannon/body/CannonStaticBody"/>

/// <reference path="component/physics/engine/adapter/cannon/constraint/CannonConstraint"/>
/// <reference path="component/physics/engine/adapter/cannon/constraint/CannonSingleConstraint"/>
/// <reference path="component/physics/engine/adapter/cannon/constraint/CannonLockConstraint"/>
/// <reference path="component/physics/engine/adapter/cannon/constraint/CannonPointToPointConstraint"/>
/// <reference path="component/physics/engine/adapter/cannon/constraint/CannonDistanceConstraint"/>
/// <reference path="component/physics/engine/adapter/cannon/constraint/CannonHingeConstraint"/>


/// <reference path="component/light/Light"/>
/// <reference path="component/light/AmbientLight"/>
/// <reference path="component/light/SourceLight"/>
/// <reference path="component/light/DirectionLight"/>
/// <reference path="component/light/PointLight"/>
/// <reference path="component/light/Attenuation"/>
/// <reference path="component/light/ELightModel"/>


/// <reference path="component/ui/UI"/>


/// <reference path="component/ui/font/EFontXAlignment"/>
/// <reference path="component/ui/font/EFontYAlignment"/>
/// <reference path="component/ui/font/EFontDimension"/>
/// <reference path="component/ui/font/Font"/>
/// <reference path="component/ui/font/PlainFont"/>
/// <reference path="component/ui/font/BitmapFont"/>
/// <reference path="component/ui/font/CharFont"/>

/// <reference path="component/ui/progressBar/ProgressBar"/>

/// <reference path="component/ui/image/Image"/>

/// <reference path="component/ui/interaction/InteractionUI"/>
/// <reference path="component/ui/interaction/button/Button"/>
/// <reference path="component/ui/interaction/button/EButtonObjectName"/>

/// <reference path="component/ui/interaction/state/EUIState"/>
/// <reference path="component/ui/interaction/state/UIStateMachine"/>

/// <reference path="component/ui/interaction/transition/Transition"/>
/// <reference path="component/ui/interaction/transition/SpriteTransition"/>
/// <reference path="component/ui/interaction/transition/ColorTransition"/>
/// <reference path="component/ui/interaction/transition/ETransitionMode"/>
/// <reference path="component/ui/interaction/transition/TransitionManager"/>



/// <reference path="component/ui/utils/RoundedRectUtils"/>



/// <reference path="utils/JudgeUtils"/>
/// <reference path="utils/MathUtils"/>
/// <reference path="utils/CoordinateUtils"/>
/// <reference path="utils/RenderUtils"/>
/// <reference path="utils/InstanceUtils"/>
/// <reference path="utils/IterateUtils"/>
/// <reference path="utils/Log"/>
/// <reference path="utils/time/TimeController"/>
/// <reference path="utils/time/DirectorTimeController"/>
/// <reference path="utils/time/CommonTimeController"/>

/// <reference path="renderer/renderTargetRenderer/RenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/CommonRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/TwoDRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/MirrorRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/RefractionRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/TwoDShadowMapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/CubemapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/CubemapShadowMapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/DynamicCubemapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/utils/ShadowMapRenderTargetRendererUtils"/>
/// <reference path="renderer/renderTargetRenderer/utils/CubemapShadowMapRenderTargetRendererUtils"/>
/// <reference path="renderer/renderTargetRenderer/utils/TwoDShadowMapRenderTargetRendererUtils"/>

/// <reference path="renderer/renderer/Renderer"/>
/// <reference path="renderer/renderer/WebGLRenderer"/>

/// <reference path="renderer/state/WebGLState"/>
/// <reference path="renderer/state/BasicState"/>
/// <reference path="renderer/state/BuildShadowMapState"/>

/// <reference path="renderer/EDrawMode"/>
/// <reference path="renderer/buffer/EBufferType"/>
/// <reference path="renderer/buffer/EBufferDataType"/>
/// <reference path="renderer/buffer/EBufferUsage"/>
/// <reference path="renderer/buffer/Buffer"/>
/// <reference path="renderer/buffer/ElementBuffer"/>
/// <reference path="renderer/buffer/ArrayBuffer"/>
/// <reference path="renderer/buffer/InstanceBuffer"/>
/// <reference path="renderer/buffer/BufferDataTable"/>
/// <reference path="renderer/Program"/>
/// <reference path="renderer/command/RenderCommand"/>
/// <reference path="renderer/command/QuadCommand"/>
/// <reference path="renderer/command/SingleDrawCommand"/>
/// <reference path="renderer/command/InstanceCommand"/>
/// <reference path="renderer/command/ProceduralCommand"/>
/// <reference path="renderer/command/IInstanceDrawer"/>
/// <reference path="renderer/command/InstanceDrawer"/>
/// <reference path="renderer/command/InstanceDrawerProxy"/>
/// <reference path="renderer/command/ModelMatrixInstanceDrawer"/>
/// <reference path="renderer/command/NormalMatrixModelMatrixInstanceDrawer"/>
/// <reference path="renderer/command/EInstanceGLSLData"/>

/// <reference path="renderer/GlUtils"/>

/// <reference path="renderer/buffer/FrameBuffer"/>

/// <reference path="renderer/shader/shader/Shader"/>
/// <reference path="renderer/shader/shader/CustomShader"/>
/// <reference path="renderer/shader/shader/EngineShader"/>
/// <reference path="renderer/shader/shader/CommonShader"/>
/// <reference path="renderer/shader/shader/ProceduralShader"/>
/// <reference path="renderer/shader/shader/CommonProceduralShader"/>
/// <reference path="renderer/shader/shader/CustomProceduralShader"/>
/// <reference path="renderer/shader/shader/EShaderGLSLData"/>
/// <reference path="renderer/shader/shader/EShaderTypeOfScene"/>
/// <reference path="renderer/shader/shader/EShaderMapKeyOfScene"/>
/// <reference path="renderer/shader/shader/EShaderMapKey"/>
/// <reference path="renderer/shader/shader/mapManager/MapManager"/>
/// <reference path="renderer/shader/shader/mapManager/MapController"/>
/// <reference path="renderer/shader/shader/mapManager/ShadowMapController"/>
/// <reference path="renderer/shader/shader/mapManager/EnvMapController"/>
/// <reference path="renderer/shader/shader/mapManager/MapArrayController"/>
/// <reference path="renderer/shader/shader/mapManager/CommonMapController"/>

/// <reference path="renderer/shader/sourceBuilder/ShaderSourceBuilder"/>
/// <reference path="renderer/shader/sourceBuilder/CustomShaderSourceBuilder"/>
/// <reference path="renderer/shader/sourceBuilder/EngineShaderSourceBuilder"/>

/// <reference path="renderer/shader/variable/EVariableType"/>
/// <reference path="renderer/shader/variable/EVariableSemantic"/>
/// <reference path="renderer/shader/variable/EVariableCategory"/>
/// <reference path="renderer/shader/variable/VariableLib"/>
/// <reference path="renderer/shader/variable/VariableTypeTable"/>
/// <reference path="renderer/shader/variable/VariableNameTable"/>

/// <reference path="renderer/shader/lib/ShaderLib"/>
/// <reference path="renderer/shader/lib/CustomShaderLib"/>
/// <reference path="renderer/shader/lib/EngineShaderLib"/>
/// <reference path="renderer/shader/lib/common/CommonShaderLib"/>
/// <reference path="renderer/shader/lib/common/VerticeCommonShaderLib"/>
/// <reference path="renderer/shader/lib/common/NormalCommonShaderLib"/>
/// <reference path="renderer/shader/lib/basic/BasicShaderLib"/>
/// <reference path="renderer/shader/lib/basic/EndBasicShaderLib"/>
/// <reference path="renderer/shader/lib/animation/morph/CommonMorphShaderLib"/>
/// <reference path="renderer/shader/lib/animation/morph/VerticeMorphShaderLib"/>
/// <reference path="renderer/shader/lib/animation/morph/NormalMorphShaderLib"/>
/// <reference path="renderer/shader/lib/skybox/SkyboxShaderLib"/>

/// <reference path="renderer/shader/lib/envMap/EnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/ForBasicEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/BasicForBasicEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/ReflectionForBasicEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/RefractionForBasicEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/FresnelForBasicEnvMapShaderLib"/>

/// <reference path="renderer/shader/lib/envMap/forLight/ForLightEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/ForLightEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/BasicForLightEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/ReflectionForLightEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/RefractionForLightEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/FresnelForLightEnvMapShaderLib"/>

/// <reference path="renderer/shader/lib/map/MapShaderLib"/>
/// <reference path="renderer/shader/lib/map/BasicMapShaderLib"/>
/// <reference path="renderer/shader/lib/map/MultiMapShaderLib"/>



/// <reference path="renderer/shader/lib/light/LightCommonShaderLib"/>
/// <reference path="renderer/shader/lib/light/LightShaderLib"/>
/// <reference path="renderer/shader/lib/light/LightEndShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/BaseLightMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/CommonLightMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/LightMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/DiffuseMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/SpecularMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/EmissionMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NormalMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoLightMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoDiffuseMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoSpecularMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoEmissionMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoNormalMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/BuildShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/BuildTwoDShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/BuildCubemapShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/TotalShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/ShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/TwoDShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/CubemapShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/NoShadowMapShaderLib"/>

/// <reference path="renderer/shader/lib/utils/CustomShaderLibUtils"/>
/// <reference path="renderer/shader/lib/utils/RenderTargerRendererShaderLibUtils"/>


/// <reference path="renderer/shader/lib/instance/InstanceShaderLib"/>
/// <reference path="renderer/shader/lib/instance/NoInstanceShaderLib"/>
/// <reference path="renderer/shader/lib/instance/ModelMatrixInstanceShaderLib"/>
/// <reference path="renderer/shader/lib/instance/NormalMatrixInstanceShaderLib"/>
/// <reference path="renderer/shader/lib/instance/ModelMatrixNoInstanceShaderLib"/>
/// <reference path="renderer/shader/lib/instance/NormalMatrixNoInstanceShaderLib"/>


/// <reference path="renderer/shader/chunk/ShaderChunk"/>

/// <reference path="renderer/shader/snippet/ShaderSnippet"/>


/// <reference path="material/Material"/>
/// <reference path="material/EngineMaterial"/>
/// <reference path="material/StandardLightMaterial"/>
/// <reference path="material/StandardBasicMaterial"/>
/// <reference path="material/BasicMaterial"/>
/// <reference path="material/SkyboxMaterial"/>
/// <reference path="material/LightMaterial"/>
/// <reference path="material/ShaderMaterial"/>
/// <reference path="material/EShading"/>
/// <reference path="material/ShaderManager"/>



/// <reference path="asset/EAssetType"/>

/// <reference path="asset/Loader"/>
/// <reference path="asset/GLSLLoader"/>
/// <reference path="asset/JsLoader"/>
/// <reference path="asset/JSONLoader"/>
/// <reference path="asset/VideoLoader"/>
/// <reference path="asset/TextureLoader"/>
/// <reference path="asset/utils/ImageLoader"/>
/// <reference path="asset/utils/AjaxLoader"/>
/// <reference path="asset/utils/ModelLoaderUtils"/>
/// <reference path="asset/texture/ITextureAsset"/>
/// <reference path="asset/texture/CompressedTextureLoader"/>
/// <reference path="asset/texture/DDSParser"/>
/// <reference path="asset/texture/TextureAsset"/>
/// <reference path="asset/texture/ImageTextureAsset"/>
/// <reference path="asset/texture/VideoTextureAsset"/>
/// <reference path="asset/texture/CompressedTextureAsset"/>
/// <reference path="asset/texture/ETextureFilterMode"/>
/// <reference path="asset/texture/ETextureWrapMode"/>
/// <reference path="asset/texture/ETextureFormat"/>
/// <reference path="asset/texture/ETextureType"/>
/// <reference path="asset/texture/EEnvMapMode"/>
/// <reference path="asset/texture/ETextureCombineMode"/>
/// <reference path="asset/texture/ETextureSourceRegionMapping"/>
/// <reference path="asset/texture/ETextureSourceRegionMethod"/>
/// <reference path="asset/texture/ETextureTarget"/>
/// <reference path="asset/LoaderManager"/>
/// <reference path="asset/LoaderFactory"/>

/// <reference path="asset/gltf/IGLTFInterface"/>
/// <reference path="asset/gltf/GLTFLoader"/>
/// <reference path="asset/gltf/GLTFAssembler"/>
/// <reference path="asset/gltf/GLTFParser"/>
/// <reference path="asset/gltf/GLTFGeometryParser"/>
/// <reference path="asset/gltf/GLTFMaterialParser"/>
/// <reference path="asset/gltf/GLTFArticulatedAnimationParser"/>
/// <reference path="asset/gltf/GLTFUtils"/>

/// <reference path="asset/wd/EWDTag"/>
/// <reference path="asset/wd/WDFileType"/>
/// <reference path="asset/wd/WDLoader"/>
/// <reference path="asset/wd/WDParser"/>
/// <reference path="asset/wd/WDObjectParser"/>
/// <reference path="asset/wd/WDBuilder"/>

/// <reference path="asset/font/FontLoader"/>
/// <reference path="asset/font/FntParser"/>
/// <reference path="asset/font/FntLoader"/>



/// <reference path="device/DeviceManager"/>
/// <reference path="device/GPUDetector"/>
/// <reference path="device/EScreenSize"/>

/// <reference path="structure/Point"/>
/// <reference path="structure/Face3"/>
/// <reference path="structure/RectRegion"/>
/// <reference path="structure/View"/>
/// <reference path="structure/Color"/>


/// <reference path="texture/Texture"/>

/// <reference path="texture/utils/TextureUtils"/>
/// <reference path="texture/utils/BasicTextureUtils"/>

/// <reference path="texture/renderTargetTexture/RenderTargetTexture"/>
/// <reference path="texture/renderTargetTexture/TwoDRenderTargetTexture"/>
/// <reference path="texture/renderTargetTexture/utils/ShadowMapTextureUtils"/>
/// <reference path="texture/renderTargetTexture/utils/IShadowMapTexture"/>
/// <reference path="texture/renderTargetTexture/LightEffectTexture"/>
/// <reference path="texture/renderTargetTexture/MirrorTexture"/>
/// <reference path="texture/renderTargetTexture/RefractionTexture"/>
/// <reference path="texture/renderTargetTexture/TwoDShadowMapTexture"/>
/// <reference path="texture/renderTargetTexture/CubemapRenderTargetTexture"/>
/// <reference path="texture/renderTargetTexture/CubemapShadowMapTexture"/>
/// <reference path="texture/renderTargetTexture/DynamicCubemapTexture"/>



/// <reference path="texture/basicTexture/BasicTexture"/>
/// <reference path="texture/basicTexture/TwoDTexture"/>
/// <reference path="texture/basicTexture/CommonTexture"/>
/// <reference path="texture/basicTexture/ImageTexture"/>
/// <reference path="texture/basicTexture/VideoTexture"/>
/// <reference path="texture/basicTexture/cubemap/CubemapTexture"/>
/// <reference path="texture/basicTexture/cubemap/CubemapFaceTexture"/>
/// <reference path="texture/basicTexture/cubemap/CubemapFaceImageTexture"/>
/// <reference path="texture/basicTexture/cubemap/CubemapFaceCompressedTexture"/>
/// <reference path="texture/basicTexture/CompressedTexture"/>
/// <reference path="texture/basicTexture/command/DrawTextureCommand"/>
/// <reference path="texture/basicTexture/command/DrawCompressedTextureCommand"/>
/// <reference path="texture/basicTexture/command/DrawTwoDTextureCommand"/>
/// <reference path="texture/basicTexture/command/DrawMipmapTwoDTextureCommand"/>
/// <reference path="texture/basicTexture/command/DrawNoMipmapTwoDTextureCommand"/>


/// <reference path="video/Video"/>
/// <reference path="video/VideoManager"/>





/// <reference path="definition/Variable"/>





/// <reference path="lib/procedural_texture_lib/ProceduralShaderLib"/>
/// <reference path="lib/procedural_texture_lib/ProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/ProceduralTexture"/>


/// <reference path="lib/procedural_texture_lib/common/CommonProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/fire/FireProceduralShaderLib"/>
/// <reference path="lib/procedural_texture_lib/fire/FireProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/fire/FireProceduralTexture"/>

/// <reference path="lib/procedural_texture_lib/marble/MarbleProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/marble/MarbleProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/marble/MarbleProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/grass/GrassProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/grass/GrassProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/grass/GrassProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/wood/WoodProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/wood/WoodProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/wood/WoodProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/road/RoadProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/road/RoadProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/road/RoadProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/cloud/CloudProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/cloud/CloudProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/cloud/CloudProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/brick/BrickProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/brick/BrickProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/brick/BrickProceduralShaderLib"/>

/// <reference path="lib/procedural_texture_lib/custom/CustomProceduralRenderTargetRenderer"/>
/// <reference path="lib/procedural_texture_lib/custom/CustomProceduralTexture"/>
/// <reference path="lib/procedural_texture_lib/custom/CustomProceduralShaderLib"/>


/// <reference path="lib/material_lib/terrain/TerrainMaterial"/>
/// <reference path="lib/material_lib/terrain/TerrainLayerShaderLib"/>

/// <reference path="lib/material_lib/water/WaterMaterial"/>
/// <reference path="lib/material_lib/water/WaterShaderLib"/>
/// <reference path="lib/material_lib/water/WaterReflectionMapShaderLib"/>
/// <reference path="lib/material_lib/water/WaterRefractionMapShaderLib"/>
/// <reference path="lib/material_lib/water/WaterFresnelShaderLib"/>
/// <reference path="lib/material_lib/water/WaterNoLightEffectShaderLib"/>
/// <reference path="lib/material_lib/water/WaterBumpMapShaderLib"/>
/// <reference path="lib/material_lib/water/WaterNoBumpMapShaderLib"/>

/// <reference path="lib/material_lib/mirror/MirrorMaterial"/>
/// <reference path="lib/material_lib/mirror/MirrorShaderLib"/>

