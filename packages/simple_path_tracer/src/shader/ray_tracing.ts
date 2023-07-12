export var computeShader = `
struct RayPayload {
   radiance: vec3<f32>,
}

struct Ray {
   rayTarget: vec2<f32>,
}


struct RingIntersect {
  isClosestHit: bool,
  layer: u32,
  instanceIndex: f32,
}

// struct AABB2D {
//   worldMin : vec2<f32>,
//   worldMax : vec2<f32>,
// }


struct TopLevel {
  worldMin : vec2<f32>,
  worldMax : vec2<f32>,

	leafInstanceOffset: f32,
	leafInstanceCountAndMaxLayer: f32,
	child1Index: f32,
	child2Index: f32
}

struct BottomLevel {
  worldMin : vec2<f32>,
  worldMax : vec2<f32>,

  instanceIndex: f32,
  layer: f32,
  // TODO remove pad?
  pad_0: f32,
  pad_1: f32,
  // pad_2: f32,
}

struct Instance {
  geometryIndex: f32,
  materialIndex: f32,

  localPosition: vec2<f32>,

  // layer: f32,
  // // TODO remove pad?
  // pad_0: f32,
  // pad_1: f32,
  // pad_2: f32,
}


struct Geometry {
  c: vec2<f32>,
  w: f32,
  r: f32,
  // // TODO remove pad?
  // pad_0: f32,
  // pad_1: f32,
}

struct Material {
  color: vec3<f32>,
  // TODO remove pad?
  pad_0: f32,
}

 struct TopLevels {
  topLevels : array<TopLevel>,
}

 struct BottomLevels {
  bottomLevels : array<BottomLevel>,
}

 struct Instances {
  instances :  array<Instance>,
}

 struct Geometrys {
  geometrys :  array<Geometry>,
}

 struct Materials {
  materials :  array<Material>,
}

 struct Pixels {
  pixels : array<vec4<f32>>
}

 struct ScreenDimension {
  resolution : vec2<f32>
}


@binding(0) @group(0) var<storage> topLevel : TopLevels;
@binding(1) @group(0) var<storage> bottomLevel : BottomLevels;
@binding(2) @group(0) var<storage, read> sceneInstanceData :  Instances;
@binding(3) @group(0) var<storage, read> sceneGeometryData :  Geometrys;
@binding(4) @group(0) var<storage, read> sceneMaterialData :  Materials;

@binding(5) @group(0) var<storage, read_write> pixelBuffer :  Pixels;

@binding(6) @group(0) var<uniform> screenDimension : ScreenDimension;

// fn _isIntersectWithAABB2D(ray: Ray, aabb: AABB2D) -> bool {
//   var rayTarget = ray.rayTarget;
//   var worldMin = aabb.worldMin;
//   var worldMax = aabb.worldMax;

// return rayTarget.x > worldMin.x && rayTarget.x < worldMax.x && rayTarget.y > worldMin.y && rayTarget.y < worldMax.y;
// }


// fn _isIntersectWithRing(ray: Ray, instance: Instance, geometry: Geometry) -> bool {
fn _isIntersectWithRing(point: vec2<f32>, instance: Instance, geometry: Geometry) -> bool {
  // var rayTarget = ray.rayTarget;

var localPosition = instance.localPosition;

  var c = geometry.c;
  var w = geometry.w;
  var r = geometry.r;

  var worldPosition = localPosition + c;

  var distanceSquare = pow(point.x - worldPosition.x, 2.0) + pow( point.y - worldPosition.y, 2.0);

  return distanceSquare >= pow(r, 2) && distanceSquare <= pow(r + w, 2);
}

fn _isPointIntersectWithAABB(point: vec2<f32>, worldMin: vec2<f32>, worldMax: vec2<f32>) -> bool {
return point.x > worldMin.x && point.x < worldMax.x && point.y > worldMin.y && point.y < worldMax.y;
}

fn _isPointIntersectWithTopLevelNode(point: vec2<f32>, node: TopLevel) -> bool {
return _isPointIntersectWithAABB(point, node.worldMin, node. worldMax);
}

fn _isLeafNode(leafInstanceCount:u32) -> bool {
  return leafInstanceCount != 0;
}

fn _hasChild(childIndex: u32) -> bool {
  return childIndex != 0;
}

fn _getMaxLayer(leafInstanceCountAndMaxLayer: u32) -> u32 {
  return leafInstanceCountAndMaxLayer & 0xff;
}

fn _getLeafInstanceCount(leafInstanceCountAndMaxLayer: u32) -> u32 {
  return (leafInstanceCountAndMaxLayer >> 8) & 0xffffff;
}

// fn _handleIntersectWithLeafNode (intersectResult, isIntersectWithInstance, point, node: topLevelNodeData, bottomLevelArr: bottomLevelArr) -> void {
// }

fn _intersectScene(ray: Ray)->RingIntersect {
const MAX_DEPTH = 20;

  var intersectResult: RingIntersect;

  intersectResult.isClosestHit = false;
  intersectResult.layer = 0;

var point = ray.rayTarget;

var rootNode = topLevel.topLevels[0];

// var stackContainer:array<TopLevel> = [rootNode];
// var stackContainer:array<TopLevel>;
// var<uniform> directions: array<vec3<f32>>;
// var<uniform> stackContainer:array<TopLevel>;

var stackContainer:array<TopLevel, MAX_DEPTH>;

var stackSize:u32 = 1;
stackContainer[0] = rootNode;

var child1Index: u32;
var child2Index: u32;

while(stackSize > 0){
		let currentNode = stackContainer[stackSize - 1];
		stackSize = stackSize - 1;

		var leafInstanceCountAndMaxLayer = u32(currentNode.leafInstanceCountAndMaxLayer);

 var maxLayer =   _getMaxLayer(leafInstanceCountAndMaxLayer);

//  if(maxLayer == 0){
//    break;
//  }

 if(maxLayer <= intersectResult.layer){
//  if(maxLayer < intersectResult.layer ){
   continue;
 }

		if (_isPointIntersectWithTopLevelNode(point, currentNode)) {
			var leafInstanceCount = _getLeafInstanceCount(leafInstanceCountAndMaxLayer);


			if (_isLeafNode(leafInstanceCount)) {
				// _handleIntersectWithLeafNode(intersectResult, isIntersectWithInstance, point, currentNode, bottomLevelArr);

var leafInstanceOffset = u32(currentNode.leafInstanceOffset);
// var leafInstanceCount = u32(currentNode.leafInstanceCount);
// var leafInstanceOffset = 0;
// var leafInstanceCount = 2;

while(leafInstanceCount > 0){
var bottomLevel = bottomLevel.bottomLevels[leafInstanceOffset];

if(_isPointIntersectWithAABB(point, bottomLevel.worldMin, bottomLevel.worldMax)){
var instance: Instance = sceneInstanceData.instances[u32(bottomLevel.instanceIndex)];
var geometryIndex = u32(instance.geometryIndex);
 var geometry:Geometry = sceneGeometryData.geometrys[geometryIndex];


      if (_isIntersectWithRing(point,instance, geometry)) {
 var layer = u32(bottomLevel.layer);

        if (!intersectResult.isClosestHit || layer > intersectResult.layer) {
          intersectResult.isClosestHit = true;
          intersectResult.layer = layer;
          intersectResult.instanceIndex = bottomLevel.instanceIndex;

if(layer == maxLayer){
  break;
}
        }
      }
}

leafInstanceCount = leafInstanceCount - 1;
leafInstanceOffset = leafInstanceOffset + 1;
}


				// if (intersectResult.isClosestHit) {
				// 	break;
				// }
			}
			else {
        child1Index = u32(currentNode.child1Index);
        child2Index = u32(currentNode.child2Index);

				if (_hasChild(child1Index)) {
					stackContainer[stackSize] = topLevel.topLevels[child1Index];
					stackSize += 1;
				}
				if (_hasChild(child2Index)) {
					stackContainer[stackSize] = topLevel.topLevels[child2Index];
					stackSize += 1;
				}
			}
		}
}

  return intersectResult;
}

fn _handleRayClosestHit(payload: ptr<function,RayPayload>, ray: Ray, intersectResult: RingIntersect)->bool {
var instance: Instance = sceneInstanceData.instances[u32(intersectResult.instanceIndex)];
var materialIndex = u32(instance.materialIndex);

 var material:Material = sceneMaterialData.materials[materialIndex];

(*payload).radiance = material.color;

return false;
}

fn _handleRayMiss(payload: ptr<function,RayPayload>)->bool {
(*payload).radiance = vec3<f32>(0.0, 0.0, 0.0);
// (*payload).radiance = vec3<f32>(1.0, 1.0, 0.0);

return false;
}

fn _traceRay(ray: Ray, payload: ptr<function,RayPayload>)->bool {
  var intersectResult: RingIntersect = _intersectScene(ray);

  if (intersectResult.isClosestHit) {
    return _handleRayClosestHit(payload, ray, intersectResult);
  }

  return _handleRayMiss(payload);
}

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) GlobalInvocationID : vec3<u32>) {
  var ipos = vec2<u32>(GlobalInvocationID.x, GlobalInvocationID.y);

  var resolution = vec2<f32>(screenDimension.resolution);

  var pixelColor = vec3<f32>(0.0, 0.0, 0.0);


    // vec4 origin = uCamera.viewInverse * vec4(0, 0, 0, 1);
    var origin = vec4<f32>(0, 0, 0, 1);

    var sampledPixel = vec2<f32>(f32(ipos.x) + 0.5, f32(ipos.y) + 0.5);

    var uv = (sampledPixel / resolution) * 2.0 - 1.0;

    // vec4 rayTarget = uCamera.projectionInverse * (vec4(uv.x, uv.y, -1, 1));
    // var rayTarget = vec4<f32>(uv.x, uv.y, -1, 1);
    var rayTarget = vec3<f32>(uv.x, uv.y, 1);

    // var direction =
    //     // normalize(uCamera.viewInverse * vec4(normalize(rayTarget.xyz), 0));
    //     vec4<f32>(normalize(rayTarget.xyz), 0);

    // var wi = direction.xyz;


  var payload: RayPayload;
    payload.radiance = vec3<f32>(0.0, 0.0, 0.0);


var isContinueBounce = _traceRay( Ray(rayTarget.xy), &payload);


    pixelColor = payload.radiance;

  var pixelIndex = ipos.y * u32(resolution.x) + ipos.x;
  pixelBuffer.pixels[pixelIndex] = vec4<f32>(pixelColor, 1.0);
  // pixelBuffer.pixels[pixelIndex] = vec4<f32>(1.0,0.0,0.0, 1.0);
}
`