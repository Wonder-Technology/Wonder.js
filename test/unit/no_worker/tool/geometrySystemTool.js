var geometrySystemTool = (function () {
    return {
        judgeDisposeVao: function(state, getCreateVertexArray, getDeleteVertexArray){
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
