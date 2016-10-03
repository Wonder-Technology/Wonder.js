describe("TerrainGeometry", function() {
    var sandbox = null;
    var geo = null;
    var entityObject = null;

    function prepareGeo(){
        geo.material = {
            init: sandbox.stub(),
            shading: wd.EShading.FLAT
        }

        entityObject = {
            transform:{
                scale:wd.Vector3.create(1,1,1),
                position:wd.Vector3.create()
            }
        }

        geo.entityObject = entityObject;

    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        geo = new wd.TerrainGeometry();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("rangeWidth(getter)", function(){
        beforeEach(function(){

        });

        it("if rangeWidth is setted, return it", function(){
            geo.rangeWidth = 100;

            expect(geo.rangeWidth).toEqual(100);
        });

        describe("else if have readed height map data", function(){
           beforeEach(function(){
               prepareGeo();
           });

            it("if isHeightMapStoreHeightInEachPixel === true, return height map width * 4", function (done) {
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function(){
                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");
                    geo.isHeightMapStoreHeightInEachPixel = true;

                    geo.init();

                    expect(geo.rangeWidth).toEqual(geo.heightMapAsset.width * 4);

                    done();
                });
            });
            it("else, return height map width", function (done) {
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function(){
                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");
                    geo.isHeightMapStoreHeightInEachPixel = false;

                    geo.init();

                    expect(geo.rangeWidth).toEqual(geo.heightMapAsset.width);

                    done();
                });
            });
        });

        it("else, return the default value", function () {
            expect(geo.rangeWidth).toEqual(256);
        });
    });

    describe("test heightMap", function(){
        beforeEach(function(){
            prepareGeo();
        });

        describe("generate terrain from heightMap", function(){
            beforeEach(function(){
            });

            it("compute normals;generate single texture coordinate", function(done){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function(){
                    geo.subdivisions = 3;
                    geo.rangeWidth = 100;
                    geo.rangeHeight = 100;
                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");



                    geo.init();



                    var data = geo.buffers.geometryData;
                    expect(testTool.getValues(data.vertices, 1)).toEqual(
                        [
                            -50, 0, 50, -16.7, 0, 50, 16.7, 0, 50, 50, 0, 50, -50, 0, 16.7, -16.7, 5.9, 16.7, 16.7, 5.3, 16.7, 50, 0, 16.7, -50, 0, -16.7, -16.7, 0.5, -16.7, 16.7, 0.5, -16.7, 50, 0, -16.7, -50, 0, -50, -16.7, 0, -50, 16.7, 0, -50, 50, 0, -50
                        ]
                    )
                    expect(testTool.getValues(data.texCoords, 1)).toEqual(
                        [
                            0, 1, 0.3, 1, 0.7, 1, 1, 1, 0, 0.7, 0.3, 0.7, 0.7, 0.7, 1, 0.7, 0, 0.3, 0.3, 0.3, 0.7, 0.3, 1, 0.3, 0, 0, 0.3, 0, 0.7, 0, 1, 0
                        ]
                    )
                    expect(data.indices).toEqual(
                        [
                            0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2, 3, 7, 2, 7, 6, 4, 5, 9, 4, 9, 8, 5, 6, 10, 5, 10, 9, 6, 7, 11, 6, 11, 10, 8, 9, 13, 8, 13, 12, 9, 10, 14, 9, 14, 13, 10, 11, 15, 10, 15, 14
                        ])
                    expect(testTool.getValues(data.normals, 1)).toEqual(
                        [
                            -0.2, 1, 0, 0, 1, 0.2, 0.2, 1, 0.2, 0, 1, 0, 0, 1, 0, 0, 1, -0.2, 0, 1, -0.1, 0.2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
                        ])

                    done();
                });
            });
        });

        describe("getHeightAtCoordinates", function(){
            function judge1(done, isInit){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function() {
                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");

                    if(isInit){
                        geo.init();
                    }


                    var height = geo.getHeightAtCoordinates(1, 2);

                    expect(Math.floor(height)).toEqual(Math.floor(30.9));

                    done();
                });
            }

            function judge2(done, isInit){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function() {
                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");

                    if(isInit){
                        geo.init();
                    }

                    entityObject.transform.scale = wd.Vector3.create(2,3,4);
                    entityObject.transform.position = wd.Vector3.create(10,20,30);


                    var height = geo.getHeightAtCoordinates(1, 2);

                    expect(Math.floor(height)).toEqual(Math.floor(30.9 * 3 + 20));

                    done();
                });
            }

            beforeEach(function(){
                geo.subdivisions = 100;
                geo.rangeWidth = 100;
                geo.rangeHeight = 100;
                geo.minHeight = 0;
                geo.maxHeight = 50;
            });

            describe("support get height before geo.computeData", function () {
                it("get height from heightMap data", function (done) {
                    judge1(done, false);
                });
                it("consider transform->scale.y and position.y", function (done) {
                    judge2(done, false);
                });
            });


            describe("support get height after geo.computeData", function () {
                it("get height from heightMap data", function (done) {
                    judge1(done, true);
                });
                it("consider transform->scale.y and position.y", function (done) {
                    judge2(done, true);
                });
            });

            it("if the height getted from heightCache is undefined, get the height from height map data", function(done){
                geo.subdivisions = 2;

                judge1(done, true);
            });
        });

        describe("test cache", function(){
            it("if getHeightAtCoordinates before geo.computeData, geo.computeData should use height map image data cache", function(done){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function() {
                    sandbox.spy(geo, "_readHeightMapData");

                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");

                    geo.getHeightAtCoordinates(1,2);

                    geo.init();

                    expect(geo._readHeightMapData).toCalledOnce();

                    done();
                });
            });
            it("if getHeightAtCoordinates after geo.computeData, getHeightAtCoordinates should use height map image data cache", function(done){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function() {
                    sandbox.spy(geo, "_readHeightMapData");

                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");


                    geo.init();

                    geo.getHeightAtCoordinates(1,2);

                    expect(geo._readHeightMapData).toCalledOnce();

                    done();
                });
            });

            it("computeData should cache height data", function (done) {
                geo.subdivisions = 100;
                geo.rangeWidth = 100;
                geo.rangeHeight = 100;
                geo.minHeight = 0;
                geo.maxHeight = 50;

                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function() {
                    sandbox.spy(geo, "_getHeightByReadHeightMapData");

                    geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");


                    geo.init();

                    var callCount = geo._getHeightByReadHeightMapData.callCount;

                    geo.getHeightAtCoordinates(1,2);

                    expect(geo._getHeightByReadHeightMapData.callCount).toEqual(callCount);

                    done();
                });
            });
        });
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("share heightMapAsset->source", function () {
            var source = {};
            var heightMapAsset = wd.ImageTextureAsset.create(source);


            cloneTool.extend(geo, {
                heightMapAsset:heightMapAsset
            })

            var result = geo.clone();

            expect(result.heightMapAsset === heightMapAsset).toBeFalsy();
            expect(result.heightMapAsset.source === source).toBeTruthy();
        });
        it("clone range", function () {
            var rangeWidth = 20,
                rangeHeight = 50;


            cloneTool.extend(geo, {
                rangeWidth:rangeWidth,
                rangeHeight:rangeHeight
            })

            var result = geo.clone();

            expect(result.rangeWidth).toEqual(rangeWidth);
            expect(result.rangeHeight).toEqual(rangeHeight);
        });
        it("clone data", function(){
            var subdivisions = 10,
                isHeightMapStoreHeightInEachPixel = false,
                minHeight = 11,
                maxHeight = 50;

            cloneTool.extend(geo, {
                subdivisions: subdivisions,
                minHeight: minHeight,
                maxHeight: maxHeight,
                isHeightMapStoreHeightInEachPixel:isHeightMapStoreHeightInEachPixel
            })

            var result = geo.clone();

            expect(result.subdivisions).toEqual(subdivisions);
            expect(result.minHeight).toEqual(minHeight);
            expect(result.maxHeight).toEqual(maxHeight);
            expect(result.isHeightMapStoreHeightInEachPixel).toEqual(isHeightMapStoreHeightInEachPixel);
        });
    });
});

