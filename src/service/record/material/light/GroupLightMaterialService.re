open MaterialType;

open LightMaterialType;

let getGroupCount = (material, record) =>
  GroupService.getGroupCount(material, record.groupCountMap);

let isGroupMaterial = (material, record) =>
  GroupService.isGroupComponent(material, record.groupCountMap);

let increaseGroupCount =
  [@bs]
  (
    (material, record) => {
      ...record,
      groupCountMap: GroupService.increaseGroupCount(material, record.groupCountMap)
    }
  );

let decreaseGroupCount = (material, record) => {
  ...record,
  groupCountMap: GroupService.decreaseGroupCount(material, record.groupCountMap)
};
