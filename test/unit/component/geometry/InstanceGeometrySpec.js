describe("InstanceGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.BasicInstanceGeometry();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        describe("clone", function(){
            it("deep clone attributeData", function () {
                var attribute0Data = [1,2,3,4];
                var attribute1Data = [3,1];

                geo.addInstanceAttributes([
                    {attributeName: "a_attribute0", data: attribute0Data, size: 4, meshPerAttribute:1},
                    {attributeName: "a_attribute1", data: attribute1Data, size: 2}
                ]);


                var result = geo.clone();

                expect(result.attributeData).toEqual(geo.attributeData);
                expect(result.attributeData === geo.attributeData).toBeFalsy();

                expect(result.attributeData.getChild(0)).toEqual(geo.attributeData.getChild(0));
                expect(result.attributeData.getChild(0) === geo.attributeData.getChild(0)).toBeFalsy();

                expect(result.attributeData.getChild(0).getChild(0).data).toEqual(attribute0Data);
                expect(result.attributeData.getChild(0).getChild(0).data === attribute0Data).toBeFalsy();
            });
            it("clone geometry data", function () {
                var vertices = [1,2,3],
                    indices = [1,2,3],
                    normals = [0.1,2,-1],
                    colors = [0.1,0.2,0.3],
                    texCoords = [0.3,0.1];

                cloneTool.extend(geo, {
                    vertices: vertices,
                    indices:indices,
                    normals:normals,
                    colors: colors,
                    texCoords: texCoords
                })

                var result = geo.clone();

                expect(result.vertices).toEqual(vertices);
                expect(result.vertices === vertices).toBeFalsy();

                expect(result.indices).toEqual(indices);
                expect(result.indices === indices).toBeFalsy();

                expect(result.normals).toEqual(normals);
                expect(result.normals === normals).toBeFalsy();

                expect(result.colors).toEqual(colors);
                expect(result.colors === colors).toBeFalsy();

                expect(result.texCoords).toEqual(texCoords);
                expect(result.texCoords === texCoords).toBeFalsy();
            });
        });
    });

    describe("instanceAttributeData(getter)", function () {
        it("return first data of attributeData", function () {
            var attributeData = {attributeName: "a_attribute", data: [1,2,3,4], size: 4, meshPerAttribute:1};

            geo.addInstanceAttributes([
                attributeData
            ]);

            expect(geo.instanceAttributeData.getChild(0)).toEqual(attributeData);
        });

        describe("contract check", function(){
            beforeEach(function(){
                testTool.openContractCheck(sandbox);
            });
            afterEach(function(){
                testTool.closeContractCheck();
            });

            it("attributeData.length should > 0", function(){
                expect(
                    function () {
                        var data = geo.instanceAttributeData;
                    }
                ).toThrow();



                var attributeData = {attributeName: "a_attribute", data: [1,2,3,4], size: 4, meshPerAttribute:1};

                geo.addInstanceAttributes([
                    attributeData
                ]);

                expect(
                    function () {
                        var data = geo.instanceAttributeData;
                    }
                ).not.toThrow();
            });
            it("each data of all instance datas should be the same except the data", function(){
                var attributeData0 = {attributeName: "a_attribute0", data: [1,2,3,4], size: 4, meshPerAttribute:1};
                var attributeData1 = {attributeName: "a_attribute1", data: [1,2], size: 2, meshPerAttribute:1};

                geo.addInstanceAttributes([
                    attributeData0,
                    attributeData1
                ]);

                attributeData0.data = [2,3,4,5];
                attributeData1.data = [10,100];

                geo.addInstanceAttributes([
                    attributeData0,
                    attributeData1
                ]);



                expect(
                    function () {
                        var data = geo.instanceAttributeData;
                    }
                ).not.toThrow();





                attributeData0.data = [20,3,22,1];
                attributeData0.meshPerAttribute = 2;
                attributeData1.data = [20,300];

                geo.addInstanceAttributes([
                    attributeData0,
                    attributeData1
                ]);

                expect(
                    function () {
                        var data = geo.instanceAttributeData;
                    }
                ).toThrow("each data of all instance datas should be the same except the data");
            });
        });
    });

    describe("addInstanceAttributes", function(){
        beforeEach(function(){
        });

        describe("contract check", function(){
            beforeEach(function(){
                testTool.openContractCheck(sandbox);
            });
            afterEach(function(){
                testTool.closeContractCheck();
            });

            it("attributeName shouldn't equal vertices|normals|indices|texCoords|colors", function(){
                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "normals", data: [1,2,3,4], size: 4, meshPerAttribute:1}
                    ]);
                }).toThrow();


                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "vertices", data: [1,2,3,4], size: 4, meshPerAttribute:1}
                    ]);
                }).toThrow();

                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "indices", data: [1,2,3,4], size: 4, meshPerAttribute:1}
                    ]);
                }).toThrow();

                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "texCoords", data: [1,2,3,4], size: 4, meshPerAttribute:1}
                    ]);
                }).toThrow();

                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "colors", data: [1,2,3,4], size: 4, meshPerAttribute:1}
                    ]);
                }).toThrow();
            });
            it("data should be Array<number> or Float32Array", function(){
                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "a_test", data: [1,2,3,4], size: 4, meshPerAttribute:1}
                    ]);
                }).not.toThrow();


                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "a_test", data: new Float32Array([1,2,3,4]), size: 4, meshPerAttribute:1}
                    ]);
                }).not.toThrow();


                expect(function(){
                    geo.addInstanceAttributes([
                        {attributeName: "a_test", data: "aaa", size: 4, meshPerAttribute:1}
                    ]);
                }).toThrow();
            });
        });
    });
});
