dy.Script.create("stage", function (director) {
    function Stage(gameObject){
        this.gameObject = gameObject;
        this.rotateX = 0;
        this.rotateY = 0;
        this.isRotate = false;
        this.keyState = {};

        this._mesh = null;
    }

    Stage.prototype._buildMesh = function(){
        var shader = dy.render.Shader.create(
            dy.GLSLLoader.getInstance().get("vs"),
            dy.GLSLLoader.getInstance().get("fs")
        );

        var material = dy.Material.create();
        material.color= dy.Color.create("rgba(255, 0, 0, 0.4)");
        material.shader = shader;
        material.textureManager.addChild(dy.TextureLoader.getInstance().get("texture1"));



        var geometry = dy.TriangleGeometry.create();
        geometry.material = material;
        geometry.width = 5;
        geometry.height = 5;


        var mesh = dy.GameObject.create();
        mesh.addComponent(geometry);

        var meshRenderer = dy.MeshRenderer.create();

        mesh.addComponent(meshRenderer);


        mesh.init();

        return mesh;
    }

    Stage.prototype.init = function () {
        this.bindCanvasEvent(director.view);
    };

    Stage.prototype.onStartLoop = function(){
        this._mesh = this._buildMesh();

        director.stage.addChild(this._mesh);
    };

    Stage.prototype.onEndLoop = function () {
        this.setAllFalse();
        this.isRotate = false;

        director.stage.removeChild(this._mesh);
        this._mesh.dispose();
    };

    Stage.prototype.onDispose = function () {
        this.removeEvent();
    };

    Stage.prototype.setAllFalse = function() {
        var i = null;

        for (i in this.keyState) {
            if (this.keyState.hasOwnProperty(i)) {
                this.keyState[i] = false;
            }
        }
    };

    Stage.prototype.bindCanvasEvent = function(canvas) {
        var stage = director.stage,
            self = this;

        // Get the three major events
        var mouseup = dy.EventManager.fromEvent(stage, dy.EventName.MOUSEUP);
        var mousemove = dy.EventManager.fromEvent(stage, dy.EventName.MOUSEMOVE);
        var mousedown = dy.EventManager.fromEvent(stage, dy.EventName.MOUSEDOWN);

        var mousedrag = mousedown.flatMap(function (e) {
            // calculate offsets when mouse down
            var startX = e.location.x,
                startY = e.location.y;

            e.stopPropagation();

            // Calculate delta with mousemove until mouseup
            return mousemove.map(function (e) {
                var x = e.location.x,
                    y = e.location.y;
                var factor = 100 / canvas.height; // The rotation ratio

//                    e.preventDefault();
                var dx = factor * (x - startX);
                var dy = factor * (y - startY);

                startX = x;
                startY = y;

                self.isRotate = true;

                return {
                    dx: dx,
                    dy: dy
                };
            }).takeUntil(mouseup);
        });

        // Update position
        var subscription = mousedrag.subscribe(function (pos) {
            self.rotateY -= pos.dx;
            self.rotateX -= pos.dy;
        });


        dy.EventManager.fromEvent(dy.EventName.KEYDOWN)
            .subscribe(function (e) {
                //console.log(e);
                self.setAllFalse();
                self.keyState[e.key] = true;
            });

    };

    Stage.prototype.removeEvent = function() {
        dy.EventManager.off(scene);
        //document.querySelector("body").off("keydown");
    };

    return Stage;
});
