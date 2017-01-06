export class GLTFLightUtils{
    public static convertLights(resultJson: any) {
        if (this._isExtensionExist(resultJson, "lights")) {
            resultJson.lights = this._getExtensionData(resultJson, "lights");

            this._convertLightRange(resultJson.lights);

            if (resultJson.nodes) {
                for (let name in resultJson.nodes) {
                    if (resultJson.nodes.hasOwnProperty(name)) {
                        let node = resultJson.nodes[name];

                        if (this._isExtensionExist(node, "light")) {
                            node.light = this._getExtensionData(node, "light");
                        }
                    }
                }
            }
        }
    }

    private static _convertLightRange(lights: any) {
        for (let name in lights) {
            if (lights.hasOwnProperty(name)) {
                let light = lights[name];

                if (light.type === "point") {
                    /*! in gltf,  A value of zero indicates infinite distance; and in engine, range === null(default value) means infinite distance
                     so if distance === 0, not set range = 0, just keep its default value(null)
                     */
                    let pointLightData = light.point;

                    if (pointLightData.distance !== void 0) {
                        if (pointLightData.distance !== 0) {
                            pointLightData.range = pointLightData.distance;

                        }

                        delete pointLightData.distance;
                    }
                }
            }
        }
    }

    private static _isExtensionExist(json: any, target: string) {
        return json.extensions
            && json.extensions.KHR_materials_common
            && json.extensions.KHR_materials_common[target];
    }

    private static _getExtensionData(json: any, target: string) {
        return json.extensions.KHR_materials_common[target];
    }

}
