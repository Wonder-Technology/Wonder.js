open MaterialType;

let getGroupCount = (material, groupCountMap) =>
  GroupService.getGroupCount(material, groupCountMap);

let isGroupMaterial = (material, groupCountMap) =>
  GroupService.isGroupComponent(material, groupCountMap);

let increaseGroupCount = (material, groupCountMap) =>
  GroupService.increaseGroupCount(material, groupCountMap);

let decreaseGroupCount = (material, groupCountMap) =>
  GroupService.decreaseGroupCount(material, groupCountMap);