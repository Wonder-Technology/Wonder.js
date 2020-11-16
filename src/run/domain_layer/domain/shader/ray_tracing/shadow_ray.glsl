bool shadowRayVisibility(accelerationStructureEXT topLevelAS, uint missIndex,
                         vec3 origin, vec3 rayDir, float tMin, float tMax) {
  //   uint flags = gl_RayFlagsTerminateOnFirstHitEXT | gl_RayFlagsOpaqueEXT |
  //                gl_RayFlagsSkipClosestHitShaderEXT;

  uint flags = gl_RayFlagsNoneEXT;

  isShadowed = true;

  traceRayEXT(topLevelAS, // acceleration structure
              flags,      // rayFlags
              0xFF,       // cullMask
              1,          // sbtRecordOffset
              0,          // sbtRecordStride
              missIndex,  // missIndex
              origin,     // ray origin
              tMin,       // ray min range
              rayDir,     // ray direction
              tMax,       // ray max range
              1           // payload (location = 1)
  );
  return isShadowed;
}