var geometryLODTool = (function () {
    var rendererComponent;

    return {
        prepareLod: function(sandbox){
            var model = instanceTool.createSphere();

            var geo = model.getComponent(wd.Geometry);

            rendererComponent = model.getComponent(wd.MeshRenderer);

            sandbox.spy(rendererComponent, "render");

            var geoLevel1 = this.createGeo();

            var geoLevel2 = this.createGeo();

            var lod = wd.GeometryLOD.create();

            lod.addLevel(15, geoLevel1);
            lod.addLevel(30, geoLevel2);
            lod.addLevel(40, wd.ELODState.INVISIBLE);

            model.addComponent(lod);

            return {
                model:model,
                geo:geo,
                geoLevel1:geoLevel1,
                geoLevel2:geoLevel2
            }
        },
        judgeSelectGeometry: function (callCount, geo, renderer) {
            var r = renderer || rendererComponent;

            expect(r.render.getCall(callCount).args[1].getGeometry().uid).toEqual(geo.uid);
        },
        setCameraPos: function (camera, pos) {
            camera.transform.position = pos;
        },
        createGeo: function (material) {
            var geoLevel1 = wd.SphereGeometry.create();
            geoLevel1.segments = 1;

            var matLevel1 = material || wd.BasicMaterial.create();

            geoLevel1.material = matLevel1;

            return geoLevel1;
        }
    }
})();
