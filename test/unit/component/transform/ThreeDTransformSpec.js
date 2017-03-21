describe("ThreeDTransform", function(){
    var sandbox = null;
    var tra1 = null;
    var tra2;
    var obj;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;
    var Transform = wd.ThreeDTransform;

    function getValues(values, digit){
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        tra2 = Transform.create();
        obj = wd.GameObject.create();
        tra1 = obj.transform;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("get parent", function(){
        beforeEach(function(){

        });

        it("default value should be null", function(){
            expect(tra1.parent).toBeNull();
        });
        it("if get parent before add to entityObject, contract error", function () {
            expect(function(){
                tra2.parent;
            }).toThrow();
        });
    });

    describe("set parent", function(){
        beforeEach(function(){

        });

        it("if set parent before add to entityObject, contract error", function () {

        });
    });

    describe("get localToWorldMatrix", function(){
        beforeEach(function(){

        });

        it("default value should be identiy matrix", function(){
            expect(tra1.localToWorldMatrix).toEqual(Matrix4.create().setIdentity());
        });
    });

    describe("get position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(tra1.position).toEqual(Vector3.create());
        });
    });

    describe("get local position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(tra1.localPosition).toEqual(Vector3.create());
        });
    });

    describe("init", function(){
        beforeEach(function(){

        });

        it("update system", function(){
            var pos = Vector3.create(1,2,3);
            tra1.position = pos.clone();

            obj.addDataOrientedComponent(tra1);

            obj.init();

            expect(tra1.position).toEqual(pos);
            expect(tra1.localToWorldMatrix.getTranslation()).toEqual(pos);
        });
    });
});
