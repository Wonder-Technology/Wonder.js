var physicsTool = (function () {
    return {
        judgePos: function (obj, pos) {
            expect(testTool.getValues(
                obj.transform.position)
            ).toEqual(
                pos
            );
        },
        setStartTime: function (sandbox, time) {
            var director = wd.Director.getInstance();

            sandbox.stub(director._timeController, "getNow").returns(time);
        },
        setEngineType: function (type) {
            var director = wd.Director.getInstance();

            director.scene.physics.engine = type || wd.PhysicsEngineType.CANNON;
        },
        setPhysicsSetting: function (setting) {
            var director = wd.Director.getInstance();

            director.scene.physics.enable = true;
            director.scene.physics.gravity = setting.gravity || wd.Vector3.create(0, 0, 0);
            director.scene.physics.iterations = setting.iterations || 10;
        },
        createRigidBody: function(options){
            var _class = options.class || wd.DynamicRigidBody;

            var rigidBody = _class.create();
            rigidBody.mass = options.mass || 5;
            rigidBody.linearDamping = options.linearDamping || 0;
            rigidBody.angularDamping = options.angularDamping || 0;
            rigidBody.velocity = options.velocity || wd.Vector3.create(0, 0, 0);
            rigidBody.friction = options.friction || 0;
            rigidBody.restitution = options.restitution || 0;

            return rigidBody;
        },

        createSphere: function (colliderClass, rigidBody) {
            var material = wd.BasicMaterial.create(),
                colliderClass = colliderClass || wd.SphereCollider;

            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;


            var collider = colliderClass.create();

            var gameObject = wd.GameObject.create();


            if (rigidBody) {
                gameObject.addComponent(rigidBody);
            }

            gameObject.addComponent(geometry);

            gameObject.addComponent(collider);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        }
    }
})();

