open AllABType;

type imageDependencyRelation =
  WonderCommonlib.ImmutableHashMapService.t(array(abRelativePath));

type geometryDependencyRelation =
  WonderCommonlib.ImmutableHashMapService.t(array(abRelativePath));

/* type dependencyRelation =
   WonderCommonlib.ImmutableHashMapService.t(array(abRelativePath)); */

type dependencyRelation = {
  imageDependencyRelation,
  geometryDependencyRelation
};

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