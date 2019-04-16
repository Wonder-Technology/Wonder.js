open AllABType;

type dependencyRelation =
  WonderCommonlib.ImmutableHashMapService.t(array(abRelativePath));

type bufferDataNameMap =
  WonderCommonlib.ImmutableHashMapService.t(
    WonderCommonlib.ImmutableHashMapService.t(bool),
  );

/* type dependencyRelation = {
     imageDependencyRelation,
     geometryDependencyRelation
   }; */

/* {

   }; */

/* type imageDependencyData = {

   };


   type geometryDependencyData = {

   };

   type dependencyData = {
   image: imageDependencyData,
   geometry: geometryDependencyData
   }; */