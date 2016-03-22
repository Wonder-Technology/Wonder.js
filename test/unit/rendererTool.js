var rendererTool = {
    triggerMaterialAddShaderLib: function(material){
        material.init();

        //wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT));
    },
    convertSource: function(source){
        return source.split("\n").join("")
    },
    createQuadCommand: function(sandbox){
        var quadCmd = new wd.QuadCommand();
        quadCmd.draw = sandbox.stub();


        vertices = [1,2,3];
        //texCoords = [0.1,0.2];

        quadCmd.buffers = {
            getChild:sandbox.stub()
        };



        //quadCmd.mMatrix = wd.Matrix4.create();
        quadCmd.vMatrix = wd.Matrix4.create();
        quadCmd.pMatrix = wd.Matrix4.create();


        quadCmd.buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertices);

        return quadCmd;
    }
};
