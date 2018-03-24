var BasicMaterialTool = (function () {
    return {
        createDefaultBasicMaterial: function (state) {
            var record = wd.createBasicMaterial(state);
            var state = record[0];
            var material = record[1];

            state = wd.setBasicMaterialColor(material, [0.0, 0.5, 0.2], state);

            return [state, material];
        }
    }
})()