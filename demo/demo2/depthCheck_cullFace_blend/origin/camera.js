dy.Script.create("camera", function (director) {
    function Camera(gameObject){
        this.gameObject = gameObject;
    }


    Camera.prototype.onStartLoop = function () {
        var stage = director.stage.script.getChild("stage"),
            cameraComponent = this.gameObject.getComponent(dy.Camera);

        this.move();
        if (stage.isRotate) {
            this.gameObject.transform.eulerAngles = dy.Vector3.create(stage.rotateX, stage.rotateY, 0);
            stage.isRotate = false;
        }
        this.zoom(cameraComponent);
    };

    Camera.prototype.move = function() {
        var stage = director.stage.script.getChild("stage");
        var speed = 1.2;

        if (stage.keyState["a"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(-speed, 0, 0));
        }
        else if (stage.keyState["d"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(speed, 0, 0));
        }
        else if (stage.keyState["w"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(0, 0, -speed));
        }
        else if (stage.keyState["s"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(0, 0, speed));
        }
    };

    Camera.prototype.zoom = function(cameraComponent) {
        var stage = director.stage.script.getChild("stage");
        var speed = 10;

        if (stage.keyState["g"]) {
            cameraComponent.zoomIn(speed);
        }
        else if (stage.keyState["h"]) {
            cameraComponent.zoomOut(speed);
        }
    };

    return Camera;
});
