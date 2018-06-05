let addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. parentMap, child) =>
         /* TODO duplicate with HierachyTransformService */
         WonderCommonlib.SparseMapService.set(
           child,
           TransformType.transformToJsUndefine(parent),
           parentMap,
         ),
       parentMap,
     ),
  WonderCommonlib.SparseMapService.set(parent, children, childMap),
);