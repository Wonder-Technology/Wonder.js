export var computeShader = /* wgsl */ `
const PI=3.141592653589793;
const TWO_PI=6.283185307179586;
const POSITIVE_INFINITY=10000000;
const MAX_LAMBERTIAN_MATERIAL_COUNT = 10;
const MAX_SPECULAR_REFLECTION_MATERIAL_COUNT = 10;

struct RayPayload {
   radiance: vec3<f32>,
   scatterDirection: vec3<f32>,
   throughput: vec3<f32>,
   seed: u32,
   worldHitPoint: vec3<f32>,
   isRayBounceFromSpecularReflectionMaterial: bool
}

struct Ray {
   origin: vec3<f32>,
   direction: vec3<f32>,
   tMin: f32,
   tMax: f32,
}


struct TriangleIntersect {
  t: f32,
  barycentric: vec3<f32>,
  isClosestHit: bool,
  primitiveIndex: f32,
  instanceIndex: f32,
}

struct Triangle {
  p0WorldPosition: vec3<f32>,
  p1WorldPosition: vec3<f32>,
  p2WorldPosition: vec3<f32>,
}

struct TopLevel {
  worldMin : vec3<f32>,
	leafInstanceOffset: f32,
  worldMax : vec3<f32>,
	leafInstanceCount: f32,


	child1Index: f32,
	child2Index: f32,
  pad_0: f32,
  pad_1: f32,
}

struct BottomLevel {
  worldMin : vec3<f32>,
  primitiveIndex: f32,

  worldMax : vec3<f32>,
  instanceIndex: f32,

  p0WorldPosition: vec3<f32>,
  pad_0: f32,
  p1WorldPosition: vec3<f32>,
  pad_1: f32,
  p2WorldPosition: vec3<f32>,
  pad_2: f32,
}

struct Instance {
  geometryIndex: f32,
  materialIndex: f32,
  materialType: f32,
  pad_0: f32,

  // localPosition: vec2<f32>,
  // worldPosition: vec3<f32>,
  // pad_1: f32,

  // normalMatrix: mat4x3<f32>,
  normalMatrix: mat3x4<f32>,
}

struct Vertex {
  normal: vec4<f32>,
}

struct PointIndexData {
  vertexIndex: u32,
  faceIndex: u32,
  pad_0: f32,
  pad_1: f32,
}

struct BRDFLambertianMaterial {
  diffuse: vec3<f32>,
  isRectAreaLight: f32,
}

struct BRDFSpecularReflectionMaterial {
  isRectAreaLight: f32,
  pad_0: f32,
  pad_1: f32,
  pad_2: f32,
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

 struct AllPointIndexData {
  allPointIndexData :  array<PointIndexData>,
}

 struct Vertices {
  vertices :  array<Vertex>,
}

 struct Indices {
  indices :  array<u32>,
}


 struct BRDFLambertianMaterials {
  lambertianMaterials :  array<BRDFLambertianMaterial, MAX_LAMBERTIAN_MATERIAL_COUNT>,
}

 struct BRDFSpecularReflectionMaterials {
  specularReflectionMaterials :  array<BRDFSpecularReflectionMaterial, MAX_SPECULAR_REFLECTION_MATERIAL_COUNT>,
}


 struct RectAreaLight {
  lemit : vec4<f32>,

  minX : f32,
  maxX : f32,
  minY : f32,
  maxY : f32,

  // normalMatrix: mat4x3<f32>,
  normalMatrix: mat3x4<f32>,
  modelMatrix: mat4x4<f32>,
}

 struct Pixels {
  pixels : array<vec4<f32>>
}

 struct Camera {
  viewInverse: mat4x4<f32>,
  projectionInverse: mat4x4<f32>,

  near : f32,
  far : f32,
  pad_0 : f32,
  pad_1 : f32,
}

 struct ScreenDimension {
  resolution : vec2<f32>
}

 struct CommonData {
  sampleCountPerPixel : u32,
  totalSampleCount : u32,
  pad_0 : u32,
  pad_1 : u32,
}


@binding(0) @group(0) var<storage> topLevel : TopLevels;
@binding(1) @group(0) var<storage> bottomLevel : BottomLevels;
@binding(2) @group(0) var<storage, read> sceneInstanceData :  Instances;
@binding(3) @group(0) var<storage, read> scenePointIndexData :  AllPointIndexData;
@binding(4) @group(0) var<storage, read> sceneVerticesData :  Vertices;
@binding(5) @group(0) var<storage, read> sceneIndicesData :  Indices;
// @binding(6) @group(0) var<storage, read> sceneBRDFLambertianMaterialData :  BRDFLambertianMaterials;
@binding(6) @group(0) var<uniform> sceneBRDFLambertianMaterialData :  BRDFLambertianMaterials;
// @binding(7) @group(0) var<storage, read> sceneBRDFSpecularReflectionMaterialData :  BRDFSpecularReflectionMaterials;
@binding(7) @group(0) var<uniform> sceneBRDFSpecularReflectionMaterialData :  BRDFSpecularReflectionMaterials;

@binding(8) @group(0) var<uniform> uRectAreaLight :  RectAreaLight;

@binding(9) @group(0) var<storage, read_write> pixelBuffer :  Pixels;

@binding(10) @group(0) var<uniform> uCamera : Camera;

@binding(11) @group(0) var<uniform> screenDimension : ScreenDimension;

@binding(12) @group(0) var<uniform> pushC : CommonData;

// Generate a random unsigned int from two unsigned int values, using 16 pairs
// of rounds of the Tiny Encryption Algorithm. See Zafar, Olano, and Curtis,
// "GPU Random Numbers via the Tiny Encryption Algorithm"
fn tea(val0:u32, val1:u32)->u32 {
  var v0 = val0;
  var v1 = val1;
  var s0:u32 = u32(0);

  for (var n = 0; n < 16; n++) {
    s0 += 0x9e3779b9;
    v0 += ((v1 << 4) + 0xa341316c) ^ (v1 + s0) ^ ((v1 >> 5) + 0xc8013ea4);
    v1 += ((v0 << 4) + 0xad90777d) ^ (v0 + s0) ^ ((v0 >> 5) + 0x7e95761e);
  }

  return v0;
}

// Generate a random unsigned int in [0, 2^24) given the previous RNG state
// using the Numerical Recipes linear congruential generator
fn lcg(prev:ptr<function, u32>)->u32 {
  var LCG_A = 1664525u;
  var LCG_C = 1013904223u;
  *prev = (LCG_A * *prev + LCG_C);
  return *prev & 0x00FFFFFF;
}

// Generate a random float in [0, 1) given the previous RNG state
fn rnd(prev: ptr<function, u32>)->f32 { return (f32(lcg(prev)) / f32(0x01000000)); }

// fn randInUnitDisk(seed:ptr<function, u32>)->vec2<f32> {
//   var p = vec2(0);
//   do {
//     p = 2 * vec2(rnd(&seed), rnd(&seed)) - 1;
//   } while (dot(p, p) >= 1);
//   return p;
// }

fn _isIntersectWithTriangle(barycentric:vec3<f32>)->bool {
  return barycentric.x >= 0 && barycentric.y >= 0 && barycentric.z >= 0;
}

fn _swap(a:ptr<function, f32>, b:ptr<function, f32>) {
  let temp = *a;
  *a = *b;
  *b = temp;
}

// fn _isRayIntersectWithAABB(ray: Ray, worldMin: vec3<f32>, worldMax: vec3<f32>) -> bool {
fn _isRayIntersectWithAABB(ray: Ray, worldMin: vec3<f32>, worldMax: vec3<f32>) -> vec2<f32> {
  // var min = worldMin;
  // var max = worldMax;

  // var origin = ray.origin;
  // var direction = ray.direction;

  // var txmin = (min.x - origin.x) / direction.x;
  // var txmax = (max.x - origin.x) / direction.x;

  // if (txmin > txmax){
  //   _swap(&txmin, &txmax);
  // }

  // var tymin = (min.y - origin.y) / direction.y;
  // var tymax = (max.y - origin.y) / direction.y;

  // if (tymin > tymax){
  //   _swap(&tymin, &tymax);
  // }

  // if ((txmin > tymax) || (tymin > txmax)) {
  //   return false;
  // }

  // if (tymin > txmin){
  //   txmin = tymin;
  // }

  // if (tymax < txmax){
  //   txmax = tymax;
  // }

  // var tzmin = (min.z - origin.z) / direction.z;
  // var tzmax = (max.z - origin.z) / direction.z;

  // if (tzmin > tzmax){
  //   _swap(&tzmin, &tzmax);
  // }

  // if ((txmin > tzmax) || (tzmin > txmax)){
  //   return false;
  // }

  // if (tzmin > txmin){
  //   txmin = tzmin;
  // }

  // if (tzmax < txmax){
  //   txmax = tzmax;
  // }

  // return true;


  var boxMin = worldMin;
  var boxMax = worldMax;

  var rayOrigin = ray.origin;
  var rayDir = ray.direction;

  var tMin = (boxMin - rayOrigin) / rayDir;
     var tMax = (boxMax - rayOrigin) / rayDir;
     var t1 = min(tMin, tMax);
     var t2 = max(tMin, tMax);
     var  tNear = max(max(t1.x, t1.y), t1.z);
     var  tFar = min(min(t2.x, t2.y), t2.z);
    return vec2(tNear, tFar);
}

fn _getBarycentricAndT(ray: Ray, tri: Triangle) -> vec4<f32> {
  var e1 = tri.p1WorldPosition - tri.p0WorldPosition;
  var e2 = tri.p2WorldPosition - tri.p0WorldPosition;
  var s = ray.origin - tri.p0WorldPosition;
  var s1 = cross(ray.direction, e2);
  var s2 = cross(s, e1);

  var result =
      1 / dot(s1, e1) * vec3(dot(s2, e2), dot(s1, s), dot(s2, ray.direction));

  var t = result.x;
  var b1 = result.y;
  var b2 = result.z;
  var b0 = 1 - b1 - b2;

  return vec4(b0, b1, b2, t);
}

fn _isRayIntersectWithTopLevelNode(ray: Ray, node: TopLevel) -> vec2<f32> {
return _isRayIntersectWithAABB(ray, node.worldMin, node.worldMax);
}

fn _isLeafNode(leafInstanceCount:u32) -> bool {
  return leafInstanceCount != 0;
}

fn _hasChild(childIndex: u32) -> bool {
  return childIndex != 0;
}


fn _intersectSceneWithoutBVH(ray: Ray)->TriangleIntersect {
  var intersectResult: TriangleIntersect;

  intersectResult.isClosestHit = false;
  intersectResult.t = POSITIVE_INFINITY;

var l = arrayLength(&bottomLevel.bottomLevels);
  for (var i:u32 = 0; i < l; i++) {
          var bottomLevel = bottomLevel.bottomLevels[i];

          // if(_isRayIntersectWithAABB(ray, bottomLevel.worldMin, bottomLevel.worldMax)){

var tResult = _isRayIntersectWithAABB(ray, bottomLevel.worldMin, bottomLevel.worldMax);
          // note: traverse order not improve fps!
          if(tResult.x <= tResult.y && 
      tResult.x < intersectResult.t
){


      var barycentricAndT = _getBarycentricAndT(
          ray, Triangle(bottomLevel.p0WorldPosition.xyz, bottomLevel.p1WorldPosition.xyz,
                        bottomLevel.p2WorldPosition.xyz));
      var barycentric = barycentricAndT.xyz;
      var t = barycentricAndT.w;

                if (_isIntersectWithTriangle(barycentric)) {
                  if (t >= 0.0 &&
                      (!intersectResult.isClosestHit || (t < intersectResult.t))) {
                    intersectResult.isClosestHit = true;
                    intersectResult.barycentric = barycentric;
                    intersectResult.t = t;
                    intersectResult.primitiveIndex = bottomLevel.primitiveIndex;
                    intersectResult.instanceIndex = bottomLevel.instanceIndex;
                  }
                }
          }
  }

  return intersectResult;
}

fn _intersectSceneWithBVH(ray: Ray)->TriangleIntersect {
const MAX_DEPTH = 10;

  var intersectResult: TriangleIntersect;

  intersectResult.isClosestHit = false;
  intersectResult.t = POSITIVE_INFINITY;

var rootNode = topLevel.topLevels[0];

var stackContainer:array<TopLevel, MAX_DEPTH>;

var stackSize:u32 = 1;
stackContainer[0] = rootNode;

var child1Index: u32;
var child2Index: u32;

while(stackSize > 0){
		let currentNode = stackContainer[stackSize - 1];
		stackSize = stackSize - 1;

		var leafInstanceCount= u32(currentNode.leafInstanceCount);


var tResult = _isRayIntersectWithTopLevelNode(ray, currentNode);

		if (tResult.x <= tResult.y && 
      tResult.x < intersectResult.t
      ) {
			if (_isLeafNode(leafInstanceCount)) {
        var leafInstanceOffset = u32(currentNode.leafInstanceOffset);

        while(leafInstanceCount > 0){
          var bottomLevel = bottomLevel.bottomLevels[leafInstanceOffset];

tResult = _isRayIntersectWithAABB(ray, bottomLevel.worldMin, bottomLevel.worldMax);
          if(tResult.x <= tResult.y && 
      tResult.x < intersectResult.t
){
      var barycentricAndT = _getBarycentricAndT(
          ray, Triangle(bottomLevel.p0WorldPosition.xyz, bottomLevel.p1WorldPosition.xyz,
                        bottomLevel.p2WorldPosition.xyz));
      var barycentric = barycentricAndT.xyz;
      var t = barycentricAndT.w;


                if (_isIntersectWithTriangle(barycentric)) {
                  if (t >= 0.0 &&
                      (!intersectResult.isClosestHit || (t < intersectResult.t))) {
                    intersectResult.isClosestHit = true;
                    intersectResult.barycentric = barycentric;
                    intersectResult.t = t;
                    intersectResult.primitiveIndex = bottomLevel.primitiveIndex;
                    intersectResult.instanceIndex = bottomLevel.instanceIndex;
                  }
                }
          }

          leafInstanceCount = leafInstanceCount - 1;
          leafInstanceOffset = leafInstanceOffset + 1;
        }
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

//   var intersectResult: TriangleIntersect;

//   intersectResult.isClosestHit = false;
//   intersectResult.t = POSITIVE_INFINITY;

// var l = arrayLength(&bottomLevel.bottomLevels);
//   for (var i:u32 = 0; i < l; i++) {
//           var bottomLevel = bottomLevel.bottomLevels[i];

//           // if(_isRayIntersectWithAABB(ray, bottomLevel.worldMin, bottomLevel.worldMax)){

// var tResult = _isRayIntersectWithAABB(ray, bottomLevel.worldMin, bottomLevel.worldMax);
//           if(tResult.x <= tResult.y && 
//       tResult.x < intersectResult.t
// ){


//       var barycentricAndT = _getBarycentricAndT(
//           ray, Triangle(bottomLevel.p0WorldPosition.xyz, bottomLevel.p1WorldPosition.xyz,
//                         bottomLevel.p2WorldPosition.xyz));
//       var barycentric = barycentricAndT.xyz;
//       var t = barycentricAndT.w;

//                 if (_isIntersectWithTriangle(barycentric)) {
//                   if (t >= 0.0 &&
//                       (!intersectResult.isClosestHit || (t < intersectResult.t))) {
//                     intersectResult.isClosestHit = true;
//                     intersectResult.barycentric = barycentric;
//                     intersectResult.t = t;
//                     intersectResult.primitiveIndex = bottomLevel.primitiveIndex;
//                     intersectResult.instanceIndex = bottomLevel.instanceIndex;
//                   }
//                 }
//           }
//   }

//   return intersectResult;
}


fn _getVertexIndex(pointIndexData:PointIndexData )->u32 {
  return pointIndexData.vertexIndex;
}

fn _getFaceIndex(pointIndexData:PointIndexData )->u32 {
  return pointIndexData.faceIndex;
}

fn _getTriangleIndices(faceIndex:u32, primitiveIndex:u32)->vec3<u32> {
  return vec3<u32>(sceneIndicesData.indices[faceIndex + 3 * primitiveIndex + 0],
               sceneIndicesData.indices[faceIndex + 3 * primitiveIndex + 1],
               sceneIndicesData.indices[faceIndex + 3 * primitiveIndex + 2]);
}

fn _getTriangleVertex(vertexIndex:u32, index:u32)->Vertex {
  return sceneVerticesData.vertices[vertexIndex + index];
}

fn _getVertices(instanceIndex:u32, primitiveIndex:u32, v0: ptr<function,Vertex>,
v1: ptr<function,Vertex>,v2: ptr<function,Vertex>,
                  ) {
  var instance = sceneInstanceData.instances[instanceIndex];

  var geometryIndex = u32(instance.geometryIndex);

  var pointIndexData = scenePointIndexData.allPointIndexData[geometryIndex];
  var vertexIndex = _getVertexIndex(pointIndexData);
  var faceIndex = _getFaceIndex(pointIndexData);

  // Indices of the triangle
  var ind = _getTriangleIndices(faceIndex, primitiveIndex);

  // Vertex of the triangle
  *v0 = _getTriangleVertex(vertexIndex, ind.x);
  *v1 = _getTriangleVertex(vertexIndex, ind.y);
  *v2 = _getTriangleVertex(vertexIndex, ind.z);
}

fn _blerp(barycentric:vec3<f32>, p1:vec3<f32>, p2:vec3<f32>, p3:vec3<f32>)->vec3<f32> {
  return barycentric.z * p1 + barycentric.x * p2 + barycentric.y * p3;
}

fn _isFromOutside(wo:vec3<f32>, n:vec3<f32>)->bool { return dot(wo, n) > 0.0; }


fn _getLambertianMaterial(materialIndex: u32) -> BRDFLambertianMaterial  {
  return sceneBRDFLambertianMaterialData.lambertianMaterials[materialIndex];
}

 
fn _getSpecularReflectionMaterial(materialIndex: u32) -> BRDFSpecularReflectionMaterial {
  return sceneBRDFSpecularReflectionMaterialData.specularReflectionMaterials[materialIndex];
}

fn _isHitEmitInstance(isRectAreaLight: f32) -> bool { return bool(isRectAreaLight); }

fn _getRectAreaLightLe()->vec3<f32> { return uRectAreaLight.lemit.rgb; }


fn _getBRDFLambertianMaterialLe()->vec3<f32> { return vec3(0.0); }

fn _getBRDFSpecularReflectionMaterialLe()->vec3<f32> { return vec3(0.0); }

fn _cosinSamplePdf(NdotL:f32)->f32 { return NdotL / PI; }

fn _computeLambertianBRDFPdf(NdotL:f32)->f32 { return _cosinSamplePdf(NdotL); }

fn _evalLambertianBRDF(albedo:vec3<f32>)->vec3<f32> { return albedo / PI; }

fn _computeSpecularReflectionBRDFPdf()->f32 { return 1.0; }

fn _evalSpecularReflectionBRDF(fresnelReflectivity:vec3<f32>, wr:vec3<f32>, n:vec3<f32>,
                                 isWiEqualWr:bool)->vec3<f32> {
  if (!isWiEqualWr) {
    return vec3(0.0);
  }

  return fresnelReflectivity / dot(n, wr);
}

fn _sampleRectAreaLight(r1:f32, r2:f32)->vec3<f32> {
  var localPoint = vec4(
      uRectAreaLight.minX + r1 * (uRectAreaLight.maxX - uRectAreaLight.minX),
      uRectAreaLight.minY + r2 * (uRectAreaLight.maxY - uRectAreaLight.minY),
      0.0, 1.0);

  return (uRectAreaLight.modelMatrix * localPoint).xyz;
}

fn _computeRectAreaLightPdf()->f32 {
  var area = (uRectAreaLight.maxX - uRectAreaLight.minX) *
               (uRectAreaLight.maxY - uRectAreaLight.minY);

  return 1 / area;
}

fn _isHitRectAreaLight(isRectAreaLight:f32)->bool {
  return bool(isRectAreaLight);
}

fn _isShadowedByTraceShadowRay(ray:Ray)->bool {
  // var intersectResult = _intersectSceneWithBVH(ray);
  var intersectResult = _intersectSceneWithoutBVH(ray);

  if (intersectResult.isClosestHit) {
    var instanceIndex = u32(intersectResult.instanceIndex);

    var instance = sceneInstanceData.instances[instanceIndex];
    var materialIndex = u32(instance.materialIndex);
    var materialType = u32(instance.materialType);

    var isRectAreaLight = 0.0;

    switch (materialType) {
      case 0:{
        isRectAreaLight = _getLambertianMaterial(materialIndex).isRectAreaLight;
        break;
      }
      case 1, default:{
        isRectAreaLight =
            _getSpecularReflectionMaterial(materialIndex).isRectAreaLight;
        break;
      }
    }

    return !_isHitRectAreaLight(isRectAreaLight);
  }

  return false;
}

fn _isLightVisibleFromTheSurface(ray:Ray, NdotL:f32, lightCosine:f32)->bool {
  if (NdotL <= 0 || lightCosine <= 0) {
    return false;
  }

  return !_isShadowedByTraceShadowRay(ray);
}

fn _computeDistanceSquare(worldSamplePoint:vec3<f32>, worldHitPoint:vec3<f32>)->f32 {
  var temp = worldSamplePoint - worldHitPoint;

  return temp.x * temp.x + temp.y * temp.y + temp.z * temp.z;
}

fn _getFresnelReflectivity()->vec3<f32> { return vec3(1.0); }

fn _computeDirectLight(
  seed:u32,
  worldHitPoint:vec3<f32>,
  worldNormal:vec3<f32>,
  ray:Ray, diffuse:vec3<f32>
)->vec3<f32> {
  var seed_ = seed;
  var worldSamplePoint = _sampleRectAreaLight(rnd(&seed_), rnd(&seed_));

  var lightDir = normalize(worldSamplePoint - worldHitPoint);

  var NdotL = dot(lightDir, worldNormal);

  var rectAreaLightWorldNormal =
      // normalize(uRectAreaLight.normalMatrix * vec3(0.0, 0.0, 1.0));
      normalize(( uRectAreaLight.normalMatrix * vec3(0.0, 0.0, 1.0) ).xyz);

  var lightCosine = dot(-lightDir, rectAreaLightWorldNormal);

  if (!_isLightVisibleFromTheSurface(
          Ray(worldHitPoint, lightDir, uCamera.near, uCamera.far), NdotL,
          lightCosine)) {
    return vec3(0.0);
  }

  return _evalLambertianBRDF(diffuse) * _getRectAreaLightLe() * NdotL *
         lightCosine /
         (_computeDistanceSquare(worldSamplePoint, worldHitPoint)) /
         _computeRectAreaLightPdf();
}

fn _buildTBN(n:vec3<f32>, t:ptr<function, vec3<f32>>, b:ptr<function, vec3<f32>>) {
  // const u = abs(n.z) > 0.999 ? vec3(1, 0, 0) : vec3(0, 0, 1);
  var u=vec3(0.0);
  if(abs(n.z) > 0.999 ){
    u = vec3(1, 0, 0);
  }
  else{
    u = vec3(0, 0, 1);
  }

  *t = normalize(cross(u, n));
  *b = cross(n, *t);
}

fn _cosineSampleHemisphereInSphereCoordinateSystem(r1:f32, r2:f32,
                                                     n:vec3<f32>)->vec3<f32> {
  var phi = TWO_PI * r1;
  var sinTheta = sqrt(r2);
  var x = cos(phi) * sinTheta;
  var y = sin(phi) * sinTheta;
  var z = sqrt(max(0.0, 1.0 - r2));

  var t=vec3(0.0);
  var b=vec3(0.0);
  _buildTBN(n, &t, &b);

  return t * x + b * y + n * z;
}

fn _sampleLambertianMaterial(payload: ptr<function, RayPayload> ,  materialIndex: u32,
                               ray: Ray, worldNormal: vec3<f32>,
                                isCameraRay: bool) -> bool {
  var mat = _getLambertianMaterial(materialIndex);

  if (isCameraRay && _isHitEmitInstance(mat.isRectAreaLight)) {
    ( *payload ).radiance = _getRectAreaLightLe();

    return false;
  }

  if ((*payload).isRayBounceFromSpecularReflectionMaterial &&
      _isHitEmitInstance(mat.isRectAreaLight)) {
    ( *payload ).radiance += _getRectAreaLightLe() * (*payload).throughput;

    return false;
  }

  ( *payload ).radiance += (_getBRDFLambertianMaterialLe() +
                       _computeDirectLight((*payload).seed, (*payload).worldHitPoint,
                                           worldNormal, ray, mat.diffuse)) *
                      (*payload).throughput;

  if (_isHitEmitInstance(mat.isRectAreaLight)) {
    return false;
  } else {
    ( *payload ).isRayBounceFromSpecularReflectionMaterial = false;

    var seed = (*payload).seed;
    var wi = _cosineSampleHemisphereInSphereCoordinateSystem(
        rnd(&(seed)), rnd(&(seed)), worldNormal);

    ( *payload ).scatterDirection = wi;

    var NdotL = abs(dot(wi, worldNormal));

    ( *payload ).throughput *= _evalLambertianBRDF(mat.diffuse) * NdotL /
                          _computeLambertianBRDFPdf(NdotL);

    return true;
  }
}

fn _reflect(wo:vec3<f32>, n:vec3<f32>)->vec3<f32> { return -wo + 2 * dot(n, wo) * n; }

fn _sampleSpecularReflectionMaterial(payload:ptr<function, RayPayload>,
                                        materialIndex:u32,  ray:Ray,
                                       worldNormal:vec3<f32>)->bool {
  var mat =
      _getSpecularReflectionMaterial(materialIndex);

  if (_isHitEmitInstance(mat.isRectAreaLight)) {
    ( *payload ).radiance += _getRectAreaLightLe() * (*payload).throughput;

    return false;
  } else {
    ( *payload ).isRayBounceFromSpecularReflectionMaterial = true;

    var wo = -ray.direction;

    var wi = _reflect(wo, worldNormal);

    var NdotL = abs(dot(wi, worldNormal));

    ( *payload ).radiance +=
        _getBRDFSpecularReflectionMaterialLe() * (*payload).throughput;
    ( *payload ).scatterDirection = wi;

    ( *payload ).throughput *= _evalSpecularReflectionBRDF(_getFresnelReflectivity(),
                                                      wi, worldNormal, true) *
                          NdotL / _computeSpecularReflectionBRDFPdf();

    return true;
  }
}

fn _handleRayClosestHit(payload: ptr<function,RayPayload>, ray: Ray, intersectResult: TriangleIntersect, isCameraRay: bool)->bool {
  var primitiveIndex = u32(intersectResult.primitiveIndex);
  var instanceIndex = u32(intersectResult.instanceIndex);

  var instance: Instance = sceneInstanceData.instances[instanceIndex];

  var v0: Vertex;
  var v1: Vertex;
  var v2: Vertex;

  _getVertices(instanceIndex, primitiveIndex, &v0, &v1, &v2);

  var n0 = v0.normal.xyz;
  var n1 = v1.normal.xyz;
  var n2 = v2.normal.xyz;

  var n = _blerp(intersectResult.barycentric, n0.xyz, n1.xyz, n2.xyz);

  var normalMatrix = instance.normalMatrix;

  // n = normalize(normalMatrix * n);
  n = normalize(( normalMatrix * n ).xyz);

  // var bias = 0.001 * (_isFromOutside(-ray.direction, n) ? n : -n);
  var bias=vec3(0.001);
   if(_isFromOutside(-ray.direction, n)) {
     bias *= n;
   }
   else{
     bias *= -n;
   }

  ( *payload ).worldHitPoint =
      ray.origin.xyz + intersectResult.t * ray.direction + bias;

  var materialIndex = u32(instance.materialIndex);
  var materialType = u32(instance.materialType);

  var isContinueBounce=false;

  switch (materialType) {
    case 0:{
      isContinueBounce =
          _sampleLambertianMaterial(payload, materialIndex, ray, n, isCameraRay);
      break;
    }
    case 1, default:{
      isContinueBounce =
          _sampleSpecularReflectionMaterial(payload, materialIndex, ray, n);
      break;
    }
  }

  return isContinueBounce;
}

// fn _getEnvLE()->vec3<f32> { return vec3(0.0, 0.0, 0.0); }
fn _getEnvLE()->vec3<f32> { return vec3(0.0, 0.0, 1.0); }

fn _handleRayMiss(payload: ptr<function,RayPayload>)->bool {
(*payload).radiance = _getEnvLE() * (*payload).throughput;

return false;
}

fn _traceRay(ray: Ray, payload: ptr<function,RayPayload>, isCameraRay: bool)->bool {
  // var intersectResult: TriangleIntersect = _intersectSceneWithBVH(ray);
  var intersectResult: TriangleIntersect = _intersectSceneWithoutBVH(ray);


  if (intersectResult.isClosestHit) {
    return _handleRayClosestHit(payload, ray, intersectResult, isCameraRay);
    // (*payload).radiance = vec3(1.0, 0.0, 0.0);
    // return false;
  }

  return _handleRayMiss(payload);
}

fn _luminance(color:vec3<f32>)->f32 {
  return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) GlobalInvocationID : vec3<u32>) {
  var ipos = vec2<u32>(GlobalInvocationID.x, GlobalInvocationID.y);

  var resolution = vec2<f32>(screenDimension.resolution);

  // var sampleCountPerPixel = pushC.sampleCountPerPixel;
  var totalSampleCount = pushC.totalSampleCount;


  var payload: RayPayload;
    payload.seed = tea(tea(ipos.x, ipos.y), totalSampleCount);

  var pixelColor = vec3<f32>(0.0, 0.0, 0.0);


    var origin = uCamera.viewInverse * vec4<f32>(0, 0, 0, 1);

    var sampledPixel = vec2<f32>(f32(ipos.x) + 0.5, f32(ipos.y) + 0.5);

    var uv = (sampledPixel / resolution) * 2.0 - 1.0;

    var target_ = uCamera.projectionInverse * (vec4<f32>(uv.x, uv.y, -1, 1));

    var direction = normalize(uCamera.viewInverse * vec4<f32>(normalize(target_.xyz), 0));

    var wi = direction.xyz;


    payload.radiance = vec3<f32>(0.0, 0.0, 0.0);
    payload.throughput = vec3<f32>(1.0, 1.0, 1.0);
    payload.scatterDirection = vec3<f32>(0.0, 0.0, 0.0);

    var isCameraRay = true;

    payload.isRayBounceFromSpecularReflectionMaterial = false;

    while(true){
      var isContinueBounce = _traceRay( Ray(origin.xyz, wi, uCamera.near, uCamera.far), &payload, isCameraRay);

      if (!isContinueBounce) {
        break;
      }


      var seed =payload.seed;
      var ksi = rnd(&seed);
      var p_rr = _luminance(payload.throughput);
      if (ksi > p_rr) {
        break;
      } else {
        payload.throughput /= p_rr;
      }

      origin = vec4<f32>(payload.worldHitPoint, 0.0);
      wi = payload.scatterDirection;

      isCameraRay = false;
    }

    pixelColor = payload.radiance;

  var pixelIndex = ipos.y * u32(resolution.x) + ipos.x;
  pixelBuffer.pixels[pixelIndex] = vec4<f32>(pixelBuffer.pixels[pixelIndex].rgb + pixelColor, 1.0);
  // pixelBuffer.pixels[pixelIndex] = vec4<f32>(pixelColor, 1.0);
  // pixelBuffer.pixels[pixelIndex] = vec4<f32>(1.0,0.0,0.0, 1.0);
}
`