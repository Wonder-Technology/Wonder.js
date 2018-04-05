open ComponentType;

open TransformType;

open GeometryType;

open BoxGeometryType;

open MeshRendererType;

open MaterialType;

open SourceInstanceType;

open ObjectInstanceType;

type gameObject = int;

type gameObjectDisposedUidMap = array(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = array(component);

type gameObjectTransformMap = array(transform);

type gameObjectCameraViewMap = array(component);

type gameObjectCameraProjectionMap = array(component);

type gameObjectGeometryMap = array(geometry);

type gameObjectMeshRendererMap = array(meshRenderer);

type gameObjectMaterialMap = array(material);

type gameObjectSourceInstanceMap = array(sourceInstance);

type gameObjectObjectInstanceMap = array(objectInstance);

type gameObjectLightMap = array(int);