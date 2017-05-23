describe("Material", function() {
    var sandbox = null;
    var material = null;
    var obj;
    var director;

    var Color = wd.Color;
    var MaterialData = wd.MaterialData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        material = basicMaterialTool.create();

        obj = gameObjectTool.create();

        gameObjectTool.addComponent(obj, material);

        director = directorTool.getDirector();
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("getColor", function() {
        beforeEach(function(){

        });

        it("default color is #ffffff", function(){
            expect(materialTool.getColor(material)).toEqual(Color.create("#ffffff"));
        });
    });

    describe("setColor", function() {
        beforeEach(function(){

        });

        it("set color", function(){
            var color = Color.create("#123456");

            materialTool.setColor(material, color);

            expect(materialTool.getColor(material)).toEqual(color);
        });
    });
    
    describe("init", function() {
        beforeEach(function(){
            
        });
        
        it("should not dispose any material before init", function(){
            var mat2 = basicMaterialTool.create();

            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);

            gameObjectTool.disposeComponent(obj, material);

            expect(function(){
                directorTool.init(sandbox);
            }).toThrow("index should === count");
        });
    });

    describe("disposeComponent", function() {
        var count;

        beforeEach(function(){
            count = MaterialData.count;
            gameObjectTool.disposeComponent(obj, material);
        });

        it("remove from gameObject", function () {
            expect(gameObjectTool.hasComponent(obj, wd.Material)).toBeFalsy();
            expect(materialTool.getGameObject(material)).toBeUndefined();
        });
        it("remove from shaderMap", function () {
            expect(MaterialData.shaderMap[material.index]).toBeUndefined();
        });
        it("remove from materialClassNameMap", function () {
            expect(MaterialData.materialClassNameMap[material.index]).toBeUndefined();
        });
        it("remove from colorMap", function () {
            expect(materialTool.getColor(material)).toBeUndefined();
        });
        it("count - 1", function () {
            expect(MaterialData.count).toEqual(count - 1);
        });
        it("test gameObject add new material after dispose old one", function () {
            stateTool.setState(stateTool.createFakeGLState(sandbox));
            var mat2 = basicMaterialTool.create();

            gameObjectTool.addComponent(obj, mat2);

            basicMaterialTool.initMaterial(mat2);


            expect(materialTool.getColor(material)).toBeUndefined();
            expect(materialTool.getColor(mat2)).toBeExist();
        });
    });
});
