open AllABType;

type imageDependencyRelation =
  WonderCommonlib.ImmutableHashMapService.t(array(abPath));

type geometryDependencyRelation =
  WonderCommonlib.ImmutableHashMapService.t(array(abPath));

/* type dependencyRelation =
   WonderCommonlib.ImmutableHashMapService.t(array(abPath)); */

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