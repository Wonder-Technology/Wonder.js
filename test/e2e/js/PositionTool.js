
var PositionTool = (function () {
    return {
        setPosition: function (gameObjects, state) {
            var playgroundSize = 500;

            for (var i = 0, len = gameObjects.length; i < len; i++) {
                var box = gameObjects[i];


                var transform = wd.unsafeGetGameObjectTransformComponent(box, state);


                var localPos = wd.getTransformLocalPosition(transform, state);

                state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);
            }

            return [state, gameObjects];
        }
    }
})();