var bufferContainerTool = {
    judgeUpdateBufferData: function (container, gl, bufferDataType, createBufferCount, testBufferDataFunc) {
        var createBufferCount = createBufferCount || 1;

        var getChildFunc = null;

        var cacheName;

        if(bufferDataType.type && bufferDataType.name){
            cacheName = bufferDataType.name;

            getChildFunc = function(){
                return container.getChild(bufferDataType.type, bufferDataType.name);
            }
        }
        else{
            cacheName = bufferDataType;

            getChildFunc = function(){
                return container.getChild(bufferDataType);
            }
        }

        var result1 = getChildFunc();


        expect(gl.createBuffer.callCount).toEqual(createBufferCount);




        container.removeCache(cacheName);

        var result2 = getChildFunc();


        expect(gl.createBuffer.callCount).toEqual(createBufferCount);

        if(testBufferDataFunc){
            testBufferDataFunc(gl.bufferData);
        }
        else{
            expect(gl.bufferData).toCalledTwice();
            expect(gl.bufferData.secondCall.args[2]).toEqual(gl.DYNAMIC_DRAW);
        }
    },
    initGeoWithoutCache: function (geo){

        container.geometryData = geometryData;


        //not cache
        sandbox.stub(geo.buffers, "cacheAllGeometryData");


        container.init();
    }
}
