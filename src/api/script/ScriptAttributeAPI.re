let createScriptAttribute = () =>
  OperateScriptAttributeDataMainService.createScriptAttribute();

let addScriptAttributeField = (fieldName, attributeFieldJsObj, attribute) =>
  OperateScriptAttributeDataMainService.addScriptAttributeField(
    fieldName,
    attributeFieldJsObj,
    attribute,
  );

let removeScriptAttributeField = (fieldName, attribute) =>
  OperateScriptAttributeDataMainService.removeScriptAttributeField(
    fieldName,
    attribute,
  );

let getScriptAttributeEntries = attribute =>
  OperateScriptAttributeDataMainService.getScriptAttributeEntries(attribute);