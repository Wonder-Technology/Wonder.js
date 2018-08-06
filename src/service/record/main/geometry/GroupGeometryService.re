open GeometryType;

let getGroupCount = (geometry, record) =>
  GroupService.getGroupCount(geometry, record.groupCountMap);

let isGroupGeometry = (geometry, record) =>
  GroupService.isGroupComponent(geometry, record.groupCountMap);

let increaseGroupCount =
  [@bs]
  (
    (geometry, {groupCountMap} as record) => {
      ...record,
      groupCountMap: groupCountMap |> GroupService.increaseGroupCount(geometry)
    }
  );

let decreaseGroupCount = (geometry, {groupCountMap} as record) => {
  ...record,
  groupCountMap: groupCountMap |> GroupService.decreaseGroupCount(geometry)
};