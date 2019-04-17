/* type assembleRABData = {
     textureMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(
           BasicSourceTextureType.basicSourceTexture,
         ),
       ),
     imageMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t
           /* (WonderWebgl.DomExtendType.imageElement, Js.Typed_array.Uint8Array.t), */
           (WonderWebgl.DomExtendType.imageElement),
       ),
     basicMaterialMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(
           BasicMaterialType.basicMaterial,
         ),
       ),
     lightMaterialMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(
           LightMaterialType.lightMaterial,
         ),
       ),
     geometryMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(GeometryType.geometry),
       ),
     scriptEventFunctionDataMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(
           StateDataMainType.eventFunctionData,
         ),
       ),
     scriptAttributeMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(
           ScriptAttributeType.scriptAttribute,
         ),
       ),
   }; */

type assembleSABData = {
  isAssembled: WonderCommonlib.ImmutableHashMapService.t(bool),
  gameObjectMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(
        GameObjectPrimitiveType.gameObject,
      ),
    ),
};

/* type assetBundleRecord = {
     assembleRABData,
     assembleSABData,
   }; */

/* type assembleRABData = {
     textureMap:
       WonderCommonlib.ImmutableHashMapService.t(
         BasicSourceTextureType.basicSourceTexture,
       ),
     imageMap:
       WonderCommonlib.ImmutableHashMapService.t(
         (WonderWebgl.DomExtendType.imageElement, Js.Typed_array.Uint8Array.t),
       ),
     basicMaterialMap:
       WonderCommonlib.ImmutableHashMapService.t(MaterialType.material),
     lightMaterialMap:
       WonderCommonlib.ImmutableHashMapService.t(MaterialType.material),
     geometryMap:
       WonderCommonlib.ImmutableHashMapService.t(GeometryType.geometry),
     scriptEventFunctionMap:
       WonderCommonlib.ImmutableHashMapService.t(
         StateDataMainType.eventFunctionData,
       ),
     scriptAttributeMap:
       WonderCommonlib.ImmutableHashMapService.t(
         ScriptAttributeType.scriptAttribute,
       ),
   };

   type assembleRABMap =
     WonderCommonlib.ImmutableHashMapService.t(assembleRABData);

   type assembleSABData = {
     gameObjectMap:
       WonderCommonlib.ImmutableHashMapService.t(
         WonderCommonlib.ImmutableHashMapService.t(
           GameObjectPrimitiveType.gameObject,
         ),
       ),
   };

   type assetBundleRecord = {
     assembleRABData,
     assembleSABData,
   }; */