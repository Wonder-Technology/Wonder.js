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
                            -50, 0, 50, -16.7, 0, 50, 16.7, 0, 50, -50, 0, 16.7, -16.7, 0.5, 16.7, 16.7, 0.5, 16.7, -50, 0, -16.7, -16.7, 5.9, -16.7, 16.7, 5.4, -16.7
                        ]
                    );
                    expect(testTool.getValues(data.texCoords, 1)).toEqual(
                        [
                            0, 1, 0.3, 1, 0.7, 1, 0, 0.7, 0.3, 0.7, 0.7, 0.7, 0, 0.3, 0.3, 0.3, 0.7, 0.3
                        ]
                    );
                    expect(data.indices).toEqual(
                        [
                            0, 1, 4, 0, 4, 3, 1, 2, 5, 1, 5, 4, 3, 4, 7, 3, 7, 6, 4, 5, 8, 4, 8, 7
                        ]);
                    expect(testTool.getValues(data.normals, 1)).toEqual(
                        [
                            0, 1, 0, 0, 1, 0, 0, 1, 0, -0.2, 1, 0, 0, 1, 0.2, 0, 1, 0.1, -0.2, 1, 0, 0, 1, 0.2, 0, 1, 0.2
                        ]);

                    done();
                });
            });
        });

        describe("getHeightAtCoordinates", function(){
            var heightMapAsset;

            function judgeSync1(isInit, x,z,height){
                var x = x === undefined ? 1 : x;
                var z = z === undefined ? 2 : z;
                var targetHeight = height === undefined ? 30.9 : height;

                geo.heightMapAsset = heightMapAsset;

                if(isInit){
                    geo.init();
                }


                var height = geo.getHeightAtCoordinates(x, z);

                expect(testTool.getValues(height, 1)).toEqual(testTool.getValues(targetHeight, 1));
            }

            function buildFakeHeightMapData(width, height) {
                var buildFakeHeight = function (index) {
                    return index % 256;
                };

                geo._heightMapImageDataCacheWidth = width || 20;
                geo._heightMapImageDataCacheHeight = height || 20;

                geo._heightMapImageDataCache = [];
                for(var i = 0; i < geo._heightMapImageDataCacheWidth * geo._heightMapImageDataCacheHeight * 4; i++){
                    geo._heightMapImageDataCache[i] = buildFakeHeight(i);
                }
            }

            beforeEach(function(){
                geo.subdivisions = 100;
                geo.rangeWidth = 100;
                geo.rangeHeight = 100;
                geo.minHeight = 0;
                geo.maxHeight = 50;


                heightMapAsset = wd.ImageTextureAsset.create({});

                sandbox.stub(geo, "_readHeightMapData");

                buildFakeHeightMapData();
            });

            it("if x/z exceed range, return 0", function () {
                judgeSync1(false, 50, 50, 11.9);

                judgeSync1(false, 51, 50, 0);
                judgeSync1(false, 50, 51, 0);
                judgeSync1(false, -51, -50, 0);
                judgeSync1(false, -50, -51, 0);
            });

            describe("get the bilinear interpolated height from height of points of the actual drawed quad where the point(x,z) is(the quad is determined by subdivisions)", function () {

                function getHeight(offset, minXMinZPoint, maxXMinZPoint, maxXMaxZPoint, minXMaxZPoint) {
                    return geo._getBilinearInterpolatedHeight(offset, geo._getCacheHeight(minXMinZPoint), geo._getCacheHeight(maxXMinZPoint), geo._getCacheHeight(maxXMaxZPoint), geo._getCacheHeight(minXMaxZPoint));
                }


                beforeEach(function(){
                    geo.subdivisions = 5;
                    geo.rangeWidth = 10;
                    geo.rangeHeight = 10;

                    geo.minHeight = 0;
                    geo.maxHeight = 50;
                });

                it("test the point is in the middle quad", function () {
                    judgeSync1(false, 0, 0, getHeight({x:0.5, y:0.5},
                        {x:7, y:7},
                        {x:11, y:7},
                        {x:11,y:11},
                        {x:7, y:11}));
                });
                it("test the point is in the first quad", function () {
                                        judgeSync1(false, -4.5, -3.5, getHeight({x:0.25, y:0.75},
                        {x:0, y:0},
                        {x:3, y:0},
                        {x:3,y:3},
                        {x:0, y:3}));
                });
                it("test the point is in the last quad", function () {
                    judgeSync1(false, 4.5, 4, getHeight({x:0.75, y:0.5},
                        {x:15, y:15},
                        {x:19, y:15},
                        {x:19,y:19},
                    {x:15, y:19}));
                });
            });


            describe("support get height before geo.computeData", function () {
                it("get height from heightMap data", function () {
                    judgeSync1(false, 0, 0, 47.8);
                });
                it("consider transform->scale.y and position.y", function () {
                    entityObject.transform.scale = wd.Vector3.create(2,3,4);
                    entityObject.transform.position = wd.Vector3.create(10,20,30);

                    judgeSync1(false, 0, 0, 47.8 * 3 + 20);
                });
            });


            describe("support get height after geo.computeData", function () {
                it("get height from heightMap data", function () {
                    judgeSync1(true, 0, 0, 47.8);
                });
                it("consider transform->scale.y and position.y", function () {
                    entityObject.transform.scale = wd.Vector3.create(2,3,4);
                    entityObject.transform.position = wd.Vector3.create(10,20,30);

                    judgeSync1(true, 0, 0, 47.8 * 3 + 20);
                });
            });
            //
            // it("if the height getted from heightCache is undefined, get the height from height map data", function(done){
            //     geo.subdivisions = 2;
            //
            //     judge1(done, true);
            // });
            //
            // describe("fix bug", function(){
            //     beforeEach(function(){
            //     });
            //
            //     it("the height from cache should equal the one getted by reading height map data", function(done){
            //         geo.subdivisions = 100;
            //         geo.rangeWidth = 100;
            //         geo.rangeHeight = 100;
            //         geo.minHeight = 0;
            //         geo.maxHeight = 50;
            //
            //         judge1(done, true, 8.2, 3.4, 25.4);
            //     });
            // });
        });

        describe("test cache", function(){
            it("if getHeightAtCoordinates before geo.computeData, geo.computeData should use height map image data cache", function(done){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/terrain/heightMap.png", id: "heightMap"}
                ]).subscribe(function(data){
                }, function(err){
                }, function() {
                            geo.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");

                    sandbox.spy(geo, "_readHeightMapData");

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

