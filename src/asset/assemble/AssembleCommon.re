let addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. parentMap, child) =>
         WonderCommonlib.MutableSparseMapService.set(
           child,
           parent,
           parentMap,
         ),
       parentMap,
     ),
  WonderCommonlib.MutableSparseMapService.set(parent, children, childMap),
);