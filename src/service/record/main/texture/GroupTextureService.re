let addMaterial = (materialData, texture, materialsMap) =>
  MaterialsMapService.addMaterial(materialData, texture, materialsMap);

let isGroup = (texture, materialsMap) =>
  switch (MaterialsMapService.getMaterialDataArr(texture, materialsMap)) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

let removeMaterial = (materialData, texture, materialsMap) =>
  MaterialsMapService.removeMaterial(materialData, texture, materialsMap);


let clearMaterial = ( texture, materialsMap) =>
  MaterialsMapService.clearMaterial( texture, materialsMap);