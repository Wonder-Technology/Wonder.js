var eventScriptTool = (function () {
    return {
        createGameObject: function (url) {
            var gameObject = wd.GameObject.create();

            var eventTriggerDetector = wd.RayCasterEventTriggerDetector.create();

            gameObject.addComponent(eventTriggerDetector);


            gameObject.addComponent(wd.Script.create(url));


            var material = wd.BasicMaterial.create();


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 2;
            geometry.height = 2;
            geometry.depth = 2;

            gameObject.addComponent(geometry);


            var collider = wd.BoxCollider.create();

            gameObject.addComponent(collider);


            gameObject.addComponent(wd.MeshRenderer.create());


            return gameObject;
        }
    }
})();
