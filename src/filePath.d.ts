/// <reference path="../lib/inner/bowser/bowser.d.ts"/>
/// <reference path="../lib/inner/rsvp/rsvp.d.ts"/>
/// <reference path="../lib/inner/Wonder-CommonLib/dist/wdCb.d.ts"/>
/// <reference path="../lib/inner/Wonder-FRP/dist/wdFrp.core.d.ts"/>

/// <reference path="../lib/outer/cannon/cannon.d.ts"/>

/// <reference path="config/DebugConfig"/>

/// <reference path="extend/wdFrp"/>


/// <reference path="definition/typescript/decorator/contract"/>
/// <reference path="definition/typescript/decorator/cache"/>
/// <reference path="definition/typescript/decorator/virtual"/>
/// <reference path="definition/typescript/decorator/rigidBody"/>
/// <reference path="definition/Global"/>
/// <reference path="definition/Variable"/>


/// <reference path="math/Global"/>
/// <reference path="math/Vector2"/>
/// <reference path="math/Vector3"/>
/// <reference path="math/Vector4"/>
/// <reference path="math/Matrix4"/>
/// <reference path="math/Matrix3"/>
/// <reference path="math/Quaternion"/>
/// <reference path="math/Plane"/>

/// <reference path="core/Entity"/>
/// <reference path="core/Component"/>
/// <reference path="core/Transform"/>
/// <reference path="core/GameObject"/>
/// <reference path="core/Scheduler"/>
/// <reference path="core/Director"/>
/// <reference path="core/Main"/>
/// <reference path="core/entity/Scene"/>
/// <reference path="core/entity/LightManager"/>
/// <reference path="core/entity/Skybox"/>


/// <reference path="collision/CollisionDetector"/>




/// <reference path="component/animation/Animation"/>
/// <reference path="component/animation/MorphAnimation"/>
/// <reference path="component/geometry/Geometry"/>
/// <reference path="component/geometry/GeometryUtils"/>
/// <reference path="component/geometry/CustomGeometry"/>
/// <reference path="component/geometry/ModelGeometry"/>
/// <reference path="component/geometry/BoxGeometry"/>
/// <reference path="component/geometry/RectGeometry"/>
/// <reference path="component/geometry/PlaneGeometry"/>
/// <reference path="component/geometry/SphereDrawMode"/>
/// <reference path="component/geometry/SphereGeometry"/>
/// <reference path="component/geometry/TriangleGeometry"/>
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
/// <reference path="component/action/ActionManager"/>

/// <reference path="component/renderer/RendererComponent"/>
/// <reference path="component/renderer/MeshRenderer"/>
/// <reference path="component/renderer/SkyboxRenderer"/>
/// <reference path="component/renderer/UIRenderer"/>

/// <reference path="component/collider/Collider"/>
/// <reference path="component/collider/BoxCollider"/>
/// <reference path="component/collider/SphereCollider"/>
/// <reference path="component/collider/BoundingRegion"/>
/// <reference path="component/collider/BoxBoundingRegion"/>
/// <reference path="component/collider/SphereBoundingRegion"/>
/// <reference path="component/collider/Shape"/>
/// <reference path="component/collider/AABBShape"/>
/// <reference path="component/collider/SphereShape"/>
/// <reference path="component/collider/ColliderType"/>

/// <reference path="component/physics/RigidBody"/>
/// <reference path="component/physics/DynamicRigidBody"/>
/// <reference path="component/physics/DynamicRigidBody"/>

/// <reference path="component/physics/model/PhysicsConstraintModel"/>

/// <reference path="component/physics/engine/PhysicsEngineFactory"/>
/// <reference path="component/physics/engine/adapter/IPhysicsEngineAdapter"/>
/// <reference path="component/physics/engine/adapter/PhysicsEngineType"/>

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



/// <reference path="component/script/Script"/>
/// <reference path="component/script/IScriptBehavior"/>

/// <reference path="component/light/Light"/>
/// <reference path="component/light/AmbientLight"/>
/// <reference path="component/light/DirectionLight"/>
/// <reference path="component/light/PointLight"/>
/// <reference path="component/light/Attenuation"/>


/// <reference path="component/ui/font/FontXAlignment"/>
/// <reference path="component/ui/font/FontYAlignment"/>
/// <reference path="component/ui/font/FontDimension"/>
/// <reference path="component/ui/font/Font"/>
/// <reference path="component/ui/font/CanvasFont"/>
/// <reference path="component/ui/font/PlainFont"/>
/// <reference path="component/ui/font/BitmapFont"/>
/// <reference path="component/ui/font/CharFont"/>



/// <reference path="utils/JudgeUtils"/>
/// <reference path="utils/MathUtils"/>
/// <reference path="utils/CoordinateUtils"/>
/// <reference path="utils/Log"/>
/// <reference path="utils/time/TimeController"/>
/// <reference path="utils/time/DirectorTimeController"/>
/// <reference path="utils/time/CommonTimeController"/>

/// <reference path="renderer/renderTargetRenderer/RenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/TwoDRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/MirrorRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/TwoDShadowMapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/CubemapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/CubemapShadowMapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/DynamicCubemapRenderTargetRenderer"/>
/// <reference path="renderer/renderTargetRenderer/utils/ShadowMapRenderTargetRendererUtils"/>
/// <reference path="renderer/renderTargetRenderer/utils/CubemapShadowMapRenderTargetRendererUtils"/>
/// <reference path="renderer/renderTargetRenderer/utils/TwoDShadowMapRenderTargetRendererUtils"/>
/// <reference path="renderer/Renderer"/>
/// <reference path="renderer/WebGLRenderer"/>
/// <reference path="renderer/DrawMode"/>
/// <reference path="renderer/buffer/BufferType"/>
/// <reference path="renderer/buffer/BufferDataType"/>
/// <reference path="renderer/buffer/BufferUsage"/>
/// <reference path="renderer/buffer/Buffer"/>
/// <reference path="renderer/buffer/ElementBuffer"/>
/// <reference path="renderer/buffer/ArrayBuffer"/>
/// <reference path="renderer/buffer/BufferDataTable"/>
/// <reference path="renderer/Program"/>
/// <reference path="renderer/QuadCommand"/>
/// <reference path="renderer/buffer/FrameBuffer"/>

/// <reference path="renderer/shader/Shader"/>
/// <reference path="renderer/shader/ShaderSourceBuilder"/>
/// <reference path="renderer/shader/variable/VariableType"/>
/// <reference path="renderer/shader/variable/VariableCategory"/>
/// <reference path="renderer/shader/variable/VariableLib"/>
/// <reference path="renderer/shader/variable/VariableTypeTable"/>
/// <reference path="renderer/shader/variable/VariableNameTable"/>
/// <reference path="renderer/shader/lib/ShaderLib"/>
/// <reference path="renderer/shader/lib/common/CommonShaderLib"/>
/// <reference path="renderer/shader/lib/common/CommonVerticeShaderLib"/>
/// <reference path="renderer/shader/lib/common/CommonNormalShaderLib"/>
/// <reference path="renderer/shader/lib/basic/BasicShaderLib"/>
/// <reference path="renderer/shader/lib/basic/BasicEndShaderLib"/>
/// <reference path="renderer/shader/lib/animation/morph/MorphCommonShaderLib"/>
/// <reference path="renderer/shader/lib/animation/morph/MorphVerticeShaderLib"/>
/// <reference path="renderer/shader/lib/animation/morph/MorphNormalShaderLib"/>
/// <reference path="renderer/shader/lib/skybox/SkyboxShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/EnvMapForBasicShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/BasicEnvMapForBasicShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/ReflectionForBasicShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/RefractionForBasicShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forBasic/FresnelForBasicShaderLib"/>

/// <reference path="renderer/shader/lib/envMap/forLight/EnvMapForLightShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/EnvMapForLightShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/BasicEnvMapForLightShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/ReflectionForLightShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/RefractionForLightShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/forLight/FresnelForLightShaderLib"/>

/// <reference path="renderer/shader/lib/map/MapShaderLib"/>
/// <reference path="renderer/shader/lib/map/BasicMapShaderLib"/>
/// <reference path="renderer/shader/lib/map/MultiMapShaderLib"/>
/// <reference path="renderer/shader/lib/mirror/MirrorForBasicShaderLib"/>

/// <reference path="renderer/shader/lib/light/LightCommonShaderLib"/>
/// <reference path="renderer/shader/lib/light/LightShaderLib"/>
/// <reference path="renderer/shader/lib/light/LightEndShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/LightMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/DiffuseMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/SpecularMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NormalMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoDiffuseMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoSpecularMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/lightMap/NoNormalMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/BuildShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/BuildTwoDShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/BuildCubemapShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/TotalShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/ShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/TwoDShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/CubemapShadowMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/shadowMap/NoShadowMapShaderLib"/>
/// <reference path="renderer/shader/chunk/ShaderChunk"/>

/// <reference path="renderer/shader/snippet/ShaderSnippet"/>


/// <reference path="material/Material"/>
/// <reference path="material/BasicMaterial"/>
/// <reference path="material/SkyboxMaterial"/>
/// <reference path="material/LightMaterial"/>
/// <reference path="material/Shading"/>
/// <reference path="material/MapManager"/>


/// <reference path="asset/AssetType"/>

/// <reference path="asset/Loader"/>
/// <reference path="asset/FontLoader"/>
/// <reference path="asset/GLSLLoader"/>
/// <reference path="asset/JsLoader"/>
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
/// <reference path="asset/texture/TextureFilterMode"/>
/// <reference path="asset/texture/TextureWrapMode"/>
/// <reference path="asset/texture/TextureFormat"/>
/// <reference path="asset/texture/TextureType"/>
/// <reference path="asset/texture/EnvMapMode"/>
/// <reference path="asset/texture/TextureCombineMode"/>
/// <reference path="asset/texture/TextureSourceRegionMapping"/>
/// <reference path="asset/texture/TextureSourceRegionMethod"/>
/// <reference path="asset/texture/TextureTarget"/>
/// <reference path="asset/LoaderManager"/>
/// <reference path="asset/LoaderFactory"/>

/// <reference path="asset/wd/WDFileType"/>
/// <reference path="asset/wd/WDLoader"/>
/// <reference path="asset/wd/WDParser"/>
/// <reference path="asset/wd/WDObjectParser"/>
/// <reference path="asset/wd/WDBuilder"/>


/// <reference path="event/structure/EventListenerMap"/>
/// <reference path="event/structure/CustomEventListenerMap"/>
/// <reference path="event/structure/DomEventListenerMap"/>

/// <reference path="event/object/EventType"/>
/// <reference path="event/object/EventNameHandler"/>
/// <reference path="event/object/EventPhase"/>
/// <reference path="event/object/EventTable"/>
/// <reference path="event/object/Event"/>
/// <reference path="event/object/DomEvent"/>
/// <reference path="event/object/MouseEvent"/>
/// <reference path="event/object/KeyboardEvent"/>
/// <reference path="event/object/CustomEvent"/>
/// <reference path="event/object/MouseButton"/>
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

/// <reference path="event/EventManager"/>
/// <reference path="event/EngineEvent"/>

/// <reference path="device/DeviceManager"/>
/// <reference path="device/GPUDetector"/>
/// <reference path="device/ScreenSize"/>

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
/// <reference path="texture/renderTargetTexture/MirrorTexture"/>
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
