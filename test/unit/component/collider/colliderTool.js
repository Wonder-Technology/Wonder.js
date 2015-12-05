var colliderTool = (function () {
    return {
        createSphere: function () {
            var material = wd.BasicMaterial.create();

            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;
            //geometry.height = 5;
            //geometry.depth = 5;


            var collider = wd.BoxCollider.create();

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(collider);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        },
        createBox: function () {
            var material = wd.BasicMaterial.create();

            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var collider = wd.BoxCollider.create();

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(collider);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        }
    }
})();

