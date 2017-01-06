describe("wd light assembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection;
    var Vector2 = wd.Vector2;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;

    function getComponent(data, _class){
        return wdAssemblerTool.getComponent(data, _class);
    }

    function setComponent(animData){
        wdAssemblerTool.setComponent(parseData, animData);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new wd.WDAssembler();

        parseData = {
        };
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("build", function(){
        beforeEach(function(){

        });

        describe("build model", function(){

            beforeEach(function(){

            });

            describe("add components", function(){
                beforeEach(function(){

                });

                describe("add light component", function(){
                    var color;

                    beforeEach(function(){
                        color = wd.Color.create("#123456");
                    });

                    it("add AmbientLight", function(){
                        setComponent({
                            type:"ambient",
                            intensity:2,
                            color:color
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.AmbientLight);
                        //expect(component).toBeInstanceOf(wd.AmbientLight);

                        expect(component.intensity).toEqual(2);
                        expect(component.color).toEqual(color);
                    });
                    it("add DirectionLight", function(){
                        setComponent({
                            type:"directional",
                            color:color
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.DirectionLight);
                        //expect(component).toBeInstanceOf(wd.DirectionLight);
                        expect(component.color).toEqual(color);
                    });
                    it("add PointLight", function(){
                        setComponent({
                            type:"point",
                            color:color,
                            range: 10,
                            constantAttenuation:1,
                            linearAttenuation:0.1,
                            quadraticAttenuation:0.001
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.PointLight);
                        //expect(component).toBeInstanceOf(wd.PointLight);

                        expect(component.color).toEqual(color);
                        expect(component.range).toEqual(10);
                        expect(component.linear).toEqual(0.1);
                        expect(component.quadratic).toEqual(0.001);
                    });
                });
            });
        });
    });
});

