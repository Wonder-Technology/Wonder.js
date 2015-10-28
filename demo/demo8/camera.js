dy.Script.create("camera", function (director) {
    function Camera(gameObject){
        this.gameObject = gameObject;
    }


    Camera.prototype.onStartLoop = function () {
        var scene = director.scene.script.getChild("scene"),
            cameraComponent = this.gameObject.getComponent(dy.Camera);

        this.move();
        if (scene.isRotate) {
            this.gameObject.transform.eulerAngles = dy.Vector3.create(scene.rotateX, scene.rotateY, 0);
            scene.isRotate = false;
        }
        this.zoom(cameraComponent);
    };

    Camera.prototype.move = function() {
        var scene = director.scene.script.getChild("scene");
        var speed = 1.2;

        if (scene.keyState["a"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(-speed, 0, 0));
        }
        else if (scene.keyState["d"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(speed, 0, 0));
        }
        else if (scene.keyState["w"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(0, 0, -speed));
        }
        else if (scene.keyState["s"]) {
            this.gameObject.transform.translateLocal(dy.Vector3.create(0, 0, speed));
        }
    };

    Camera.prototype.zoom = function(cameraComponent) {
        var scene = director.scene.script.getChild("scene");
        var speed = 10;

        if (scene.keyState["g"]) {
            cameraComponent.zoomIn(speed);
        }
        else if (scene.keyState["h"]) {
            cameraComponent.zoomOut(speed);
        }
    };

    return Camera;
});
