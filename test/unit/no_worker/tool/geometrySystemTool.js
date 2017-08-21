var geometrySystemTool = (function () {
    return {
        prepareDisposeVao: function(state, getCreateVertexArray){
            var geo1 = boxGeometryTool.create();
            var geo2 = boxGeometryTool.create();

            var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
            var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

            var obj1 = data1.gameObject,
                obj2 = data2.gameObject;

            directorTool.init(state);


            var buffer1 = {},
                buffer2 = { a: 2 };

            getCreateVertexArray().onCall(0).returns(buffer1);
            getCreateVertexArray().onCall(1).returns(buffer2);


            // directorTool.loopBody(state);

            return {
                obj1:obj1,
                obj2:obj2,
                buffer1:buffer1,
                buffer2:buffer2
            }
        },
        judgeDisposeVao: function(state, getCreateVertexArray, getDeleteVertexArray){
            // var geo1 = boxGeometryTool.create();
            // var geo2 = boxGeometryTool.create();
            //
            // var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
            // var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);
            //
            // var obj1 = data1.gameObject,
            //     obj2 = data2.gameObject;
            //
            // directorTool.init(state);
            //
            //
            // var buffer1 = {},
            //     buffer2 = { a: 2 };
            //
            // getCreateVertexArray().onCall(0).returns(buffer1);
            // getCreateVertexArray().onCall(1).returns(buffer2);
            //
            //

            var data = geometrySystemTool.prepareDisposeVao(state, getCreateVertexArray);

            var obj1 = data.obj1;
            var obj2 = data.obj2;
            var buffer1 = data.buffer1;
            var buffer2 = data.buffer2;


            directorTool.loopBody(state);




            gameObjectTool.dispose(obj1);


            expect(getDeleteVertexArray().callCount).toEqual(0);


            gameObjectTool.dispose(obj2);

            expect(getDeleteVertexArray().callCount).toEqual(2);
            expect(getDeleteVertexArray().firstCall).toCalledWith(buffer1)
            expect(getDeleteVertexArray().getCall(1)).toCalledWith(buffer2)
        }
    }
})()
