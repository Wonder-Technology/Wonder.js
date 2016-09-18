var rendererTool = {
    renderGameObjectScene: function(){
        var renderer = wd.WebGLRenderer.create(),
            director = wd.Director.getInstance();

        director.scene.gameObjectScene.render(renderer);
        renderer.render();
    },
    triggerMaterialAddShaderLib: function(material){
        this.setFakeGeometry(material);

        material.init();

        //wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT));
    },
    setFakeGeometry: function(material){
        if(!material.geometry){
            material.geometry = {
                entityObject:wd.GameObject.create()
            }
        }
    },
    convertSource: function(source){
        return source.split("\n").join("")
    },
    createSingleDrawCommand: function(sandbox){
        var quadCmd = wd.SingleDrawCommand.create();


        vertices = [1,2,3];
        //texCoords = [0.1,0.2];

        quadCmd.buffers = {
            getChild:sandbox.stub()
        };



        quadCmd.mMatrix = wd.Matrix4.create();
        quadCmd.vMatrix = wd.Matrix4.create();
        quadCmd.pMatrix = wd.Matrix4.create();


        quadCmd.buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertices);

        return quadCmd;
    },
    createQuadCommand: function(sandbox){
        var quadCmd = new wd.QuadCommand();
        quadCmd.draw = sandbox.stub();


        vertices = [1,2,3];
        //texCoords = [0.1,0.2];

        quadCmd.buffers = {
            getChild:sandbox.stub()
        };



        quadCmd.mMatrix = wd.Matrix4.create();
        quadCmd.vMatrix = wd.Matrix4.create();
        quadCmd.pMatrix = wd.Matrix4.create();


        quadCmd.buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertices);

        return quadCmd;
    }
};
