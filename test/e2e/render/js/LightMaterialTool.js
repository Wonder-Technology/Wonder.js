var LightMaterialTool = (function () {
    return {
        createDefaultLightMaterial: function (state) {
            var record = wd.createLightMaterial(state);
            var state = record[0];
            var material = record[1];

            state = wd.setLightMaterialDiffuseColor(material, [0.0, 0.5, 0.2], state);
            state = wd.setLightMaterialSpecularColor(material, [0.3, 0.1, 0.6], state);

            return [state, material];
        }
    }
})()