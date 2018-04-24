let getGroupCount = (component: int, groupCountMap) =>
  switch (groupCountMap |> WonderCommonlib.SparseMapService.get(component)) {
  | None => 0
  | Some(count) => count
  };

let isGroupComponent = (component: int, groupCountMap) =>
  getGroupCount(component, groupCountMap) > 0;

let increaseGroupCount = (component: int, groupCountMap) =>
  groupCountMap
  |> WonderCommonlib.SparseMapService.set(
       component,
       getGroupCount(component, groupCountMap) |> succ
     );

let decreaseGroupCount = (component: int, groupCountMap) =>
  groupCountMap
  |> WonderCommonlib.SparseMapService.set(
       component,
       getGroupCount(component, groupCountMap) |> pred
     );