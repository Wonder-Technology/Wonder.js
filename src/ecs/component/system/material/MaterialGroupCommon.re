open MaterialType;

let getGroupCount = (material, groupCountMap) =>
  GroupUtils.getGroupCount(material, groupCountMap);

let isGroupMaterial = (material, groupCountMap) =>
  GroupUtils.isGroupComponent(material, groupCountMap);

let increaseGroupCount = (material, groupCountMap) =>
  GroupUtils.increaseGroupCount(material, groupCountMap);

let decreaseGroupCount = (material, groupCountMap) =>
  GroupUtils.decreaseGroupCount(material, groupCountMap);