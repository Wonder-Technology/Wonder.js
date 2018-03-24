var CustomGeometryTool = (function () {
    return {
        createTriangle: function (state) {
            var record = wd.createBasicMaterial(state);
            var state = record[0];
            var material = record[1];

            state = wd.setBasicMaterialColor(material, [0.0, 0.5, 0.2], state);

            var record = wd.createMeshRenderer(state);
            var state = record[0];
            var meshRenderer = record[1];

            var record = wd.createGameObject(state);
            var state = record[0];
            var obj = record[1];

            state = wd.addGameObjectBasicMaterialComponent(obj, material, state);
            state = wd.addGameObjectMeshRendererComponent(obj, meshRenderer, state);


            var record = wd.createCustomGeometry(state);
            var state = record[0];
            var geometry = record[1];


            var state = wd.setCustomGeometryVertices(geometry,
                new Float32Array([
                    0.0, 1.0, 0.0,
                    -1.0, -1.0, 0.0,
                    1.0, -1.0, 0.0,
                ]),
                state
            );

            var state = wd.setCustomGeometryIndices(geometry,
                new Uint16Array([
                    0, 1, 2
                ]),
                state
            );



            state = wd.addGameObjectCustomGeometryComponent(obj, geometry, state);

            return [state, obj];
        }
    }
})()