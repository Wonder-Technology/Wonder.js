let getGroupCount = (component: int, groupCountMap) =>
  switch (groupCountMap |> WonderCommonlib.SparseMapSystem.get(component)) {
  | None => 0
  | Some(count) => count
  };

let isGroupComponent = (component: int, groupCountMap) =>
  getGroupCount(component, groupCountMap) > 0;

let increaseGroupCount = (component: int, groupCountMap) => {
  groupCountMap
  |> WonderCommonlib.SparseMapSystem.set(
       component,
       getGroupCount(component, groupCountMap) |> succ
     );
  groupCountMap
};

let decreaseGroupCount = (component: int, groupCountMap) => {
  groupCountMap
  |> WonderCommonlib.SparseMapSystem.set(
       component,
       getGroupCount(component, groupCountMap) |> pred
     );
  groupCountMap
};