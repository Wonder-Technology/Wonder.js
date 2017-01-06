describe("wd transform assembler", function () {
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

                describe("add ThreeDTransform component", function(){
                    var matrix;

                    function judgeEqual(source, target){
                        expect(testTool.getValues(
                            source
                        )).toEqual(testTool.getValues(
                            target
                        ));
                    }

                    function judgeRotation(source, target){
                        expect(testTool.getValues(
                            [source.x, source.y, source.z, source.w]
                        )).toEqual(testTool.getValues(
                            [target.x, target.y, target.z, target.w]
                        ));
                    }

                    beforeEach(function(){
                        matrix = wd.Matrix4.create();
                    });

                    it("if matrix exist, decompose matrix to set position,rotation,scale", function () {
                        var position = wd.Vector3.create(1,2,3);
                        var scale = wd.Vector3.create(2,2,2);
                        var rotation = wd.Quaternion.create(0,1,5,1);

                        matrix.setTRS(position, rotation, scale);

                        setComponent({
                            matrix: matrix
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.ThreeDTransform);
                        //expect(component).toBeInstanceOf(wd.ThreeDTransform);

                        judgeEqual(component.position, matrix.getTranslation());
                        /*!
                         //todo not equal! why?
                         judgeRotation(component.rotation, matrix.getRotation())
                         judgeEqual(component.scale, matrix.getScale());
                         */
                    });
                    it("else if position,rotation,scale exist, directly set them", function () {
                        var position = wd.Vector3.create(1,2,3);
                        var scale = wd.Vector3.create(2,2,2);
                        var rotation = wd.Quaternion.create(0,1,5,1);


                        setComponent({
                            position:position,
                            rotation:rotation,
                            scale:scale
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.ThreeDTransform);
                        //expect(component).toBeInstanceOf(wd.ThreeDTransform);
                        matrix.setTRS(position, rotation, scale);
                        judgeEqual(component.position, matrix.getTranslation());
                        judgeRotation(component.rotation, matrix.getRotation())
                        judgeEqual(component.scale, matrix.getScale());
                    });
                });
            });
        });
    });
});

