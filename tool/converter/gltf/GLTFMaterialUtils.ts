export class GLTFMaterialUtils{
    public static convertMaterials(resultJson: any) {
        if (resultJson.materials) {
            let materials = resultJson.materials;

            for (let name in materials) {
                if (materials.hasOwnProperty(name)) {
                    let material = materials[name];

                    if (material.extensions
                        && material.extensions.KHR_materials_common) {
                        if (material.extensions.KHR_materials_common.values) {
                            this._convertMaterialValue(material.extensions.KHR_materials_common.values);
                        }

                        materials[name] = material.extensions.KHR_materials_common;

                        if (!!material.name) {
                            materials[name].name = material.name;
                        }
                    }
                }
            }
        }
    }

    private static _convertMaterialValue(values: any) {
        for (let name in values) {
            if (values.hasOwnProperty(name)) {
                let value = values[name];

                if (value.value !== void 0 && value.value !== null) {
                    values[name] = value.value;
                }
            }
        }
    }
}
