/// <reference path="../lib/inner/bowser/bowser.d.ts"/>
/// <reference path="../lib/inner/rsvp/rsvp.d.ts"/>
/// <reference path="../lib/inner/DYCommonLib/dist/dyCb.d.ts"/>
/// <reference path="../lib/inner/DYReactive/dist/dyRt.core.d.ts"/>

/// <reference path="extend/dyRt"/>

/// <reference path="core/Entity"/>
/// <reference path="core/Component"/>
/// <reference path="core/Transform"/>
/// <reference path="core/GameObject"/>
/// <reference path="core/Scheduler"/>
/// <reference path="core/Director"/>
/// <reference path="core/Main"/>
/// <reference path="core/entity/Stage"/>
/// <reference path="core/entity/LightManager"/>
/// <reference path="core/entity/Skybox"/>




/// <reference path="math/Global"/>
/// <reference path="math/Vector2"/>
/// <reference path="math/Vector3"/>
/// <reference path="math/Vector4"/>
/// <reference path="math/Matrix"/>
/// <reference path="math/Quaternion"/>
/// <reference path="math/Plane"/>


/// <reference path="component/geometry/Geometry"/>
/// <reference path="component/geometry/BoxGeometry"/>
/// <reference path="component/geometry/RectGeometry"/>
/// <reference path="component/geometry/PlaneGeometry"/>
/// <reference path="component/geometry/SphereDrawMode"/>
/// <reference path="component/geometry/SphereGeometry"/>
/// <reference path="component/geometry/TriangleGeometry"/>
/// <reference path="component/behavior/Behavior"/>
/// <reference path="component/behavior/Camera"/>
/// <reference path="component/behavior/action/Action"/>
/// <reference path="component/behavior/action/ActionInstant"/>
/// <reference path="component/behavior/action/CallFunc"/>
/// <reference path="component/behavior/action/ActionInterval"/>
/// <reference path="component/behavior/action/Control"/>
/// <reference path="component/behavior/action/Sequence"/>
/// <reference path="component/behavior/action/Spawn"/>
/// <reference path="component/behavior/action/DelayTime"/>
/// <reference path="component/behavior/action/Repeat"/>
/// <reference path="component/behavior/action/RepeatForever"/>
/// <reference path="component/behavior/action/Tween"/>
/// <reference path="component/behavior/action/ActionManager"/>
/// <reference path="component/renderer/RendererComponent"/>
/// <reference path="component/renderer/MeshRenderer"/>
/// <reference path="component/renderer/SkyboxRenderer"/>
/// <reference path="component/collider/Collider"/>
/// <reference path="component/collider/TopCollider"/>
/// <reference path="component/script/Script"/>
/// <reference path="component/script/IScriptBehavior"/>

/// <reference path="component/light/Light"/>
/// <reference path="component/light/AmbientLight"/>
/// <reference path="component/light/DirectionLight"/>
/// <reference path="component/light/PointLight"/>
/// <reference path="component/light/Attenuation"/>


/// <reference path="utils/Color"/>
/// <reference path="utils/JudgeUtils"/>
/// <reference path="utils/time/TimeController"/>
/// <reference path="utils/time/DirectorTimeController"/>
/// <reference path="utils/time/CommonTimeController"/>

/// <reference path="renderer/Renderer"/>
/// <reference path="renderer/WebGLRenderer"/>
/// <reference path="renderer/BufferType"/>
/// <reference path="renderer/DrawMode"/>
/// <reference path="renderer/Buffer"/>
/// <reference path="renderer/ElementBuffer"/>
/// <reference path="renderer/ArrayBuffer"/>
/// <reference path="renderer/Program"/>
/// <reference path="renderer/QuadCommand"/>

/// <reference path="renderer/shader/Shader"/>
/// <reference path="renderer/shader/ShaderSourceBuilder"/>
/// <reference path="renderer/shader/variable/VariableType"/>
/// <reference path="renderer/shader/variable/VariableCategory"/>
/// <reference path="renderer/shader/variable/VariableLib"/>
/// <reference path="renderer/shader/variable/VariableTypeTable"/>
/// <reference path="renderer/shader/variable/VariableNameTable"/>
/// <reference path="renderer/shader/lib/ShaderLib"/>
/// <reference path="renderer/shader/lib/common/CommonShaderLib"/>
/// <reference path="renderer/shader/lib/basic/BasicShaderLib"/>
/// <reference path="renderer/shader/lib/skybox/SkyboxShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/EnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/BasicEnvMapShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/ReflectionShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/RefractionShaderLib"/>
/// <reference path="renderer/shader/lib/envMap/FresnelShaderLib"/>
/// <reference path="renderer/shader/lib/map/MapShaderLib"/>
/// <reference path="renderer/shader/lib/map/BasicMapShaderLib"/>
/// <reference path="renderer/shader/lib/map/MultiMapShaderLib"/>
/// <reference path="renderer/shader/lib/MirrorShaderLib"/>

/// <reference path="renderer/shader/lib/light/LightShaderLib"/>
/// <reference path="renderer/shader/lib/light/LightMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/DiffuseMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/SpecularMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/NormalMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/NoDiffuseMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/NoSpecularMapShaderLib"/>
/// <reference path="renderer/shader/lib/light/NoNormalMapShaderLib"/>
/// <reference path="renderer/shader/chunk/ShaderChunk"/>

/// <reference path="renderer/shader/snippet/ShaderSnippet"/>


/// <reference path="material/Material"/>
/// <reference path="material/BasicMaterial"/>
/// <reference path="material/SkyboxMaterial"/>
/// <reference path="material/EnvMapMaterial"/>
/// <reference path="material/MapMaterial"/>
/// <reference path="material/LightMaterial"/>
/// <reference path="material/MirrorMaterial"/>

/// <reference path="asset/Loader"/>
/// <reference path="asset/GLSLLoader"/>
/// <reference path="asset/JsLoader"/>
/// <reference path="asset/VideoLoader"/>
/// <reference path="asset/TextureLoader"/>
/// <reference path="asset/utils/ImgLoader"/>
/// <reference path="asset/utils/AjaxLoader"/>
/// <reference path="asset/texture/ITextureAsset"/>
/// <reference path="asset/texture/CompressedTextureLoader"/>
/// <reference path="asset/texture/DDSParser"/>
/// <reference path="asset/texture/TextureAsset"/>
/// <reference path="asset/texture/TwoDTextureAsset"/>
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

/// <reference path="event/structure/EventListenerMap"/>
/// <reference path="event/object/EventType"/>
/// <reference path="event/object/EventName"/>
/// <reference path="event/object/EventPhase"/>
/// <reference path="event/object/EventTable"/>
/// <reference path="event/object/Event"/>
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
/// <reference path="event/binder/EventRegister"/>
/// <reference path="event/binder/EventBinder"/>
/// <reference path="event/factory/FactoryEventHandler"/>
/// <reference path="event/EventManager"/>

/// <reference path="device/DeviceManager"/>
/// <reference path="device/FrameBufferManager"/>
/// <reference path="device/GPUDetector"/>

/// <reference path="structure/Point"/>
/// <reference path="structure/RectRegion"/>
/// <reference path="structure/View"/>

/// <reference path="texture/Texture"/>
/// <reference path="texture/CommonTexture"/>
/// <reference path="texture/TwoDTexture"/>
/// <reference path="texture/VideoTexture"/>
/// <reference path="texture/cubemap/CubemapTexture"/>
/// <reference path="texture/cubemap/CubemapFaceTexture"/>
/// <reference path="texture/cubemap/CubemapFaceTwoDTexture"/>
/// <reference path="texture/cubemap/CubemapFaceCompressedTexture"/>
/// <reference path="texture/CompressedTexture"/>
/// <reference path="texture/TextureManager"/>
/// <reference path="texture/command/DrawTextureCommand"/>
/// <reference path="texture/command/DrawCompressedTextureCommand"/>
/// <reference path="texture/command/DrawTwoDTextureCommand"/>
/// <reference path="texture/command/DrawMipmapTwoDTextureCommand"/>
/// <reference path="texture/command/DrawNoMipmapTwoDTextureCommand"/>

/// <reference path="video/Video"/>
/// <reference path="video/VideoManager"/>
