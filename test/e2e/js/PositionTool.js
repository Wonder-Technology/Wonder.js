
var PositionTool = (function () {
    return {
        setPositionWithRange: function (gameObjects, playgroundSize, state) {

            for (var i = 0, len = gameObjects.length; i < len; i++) {
                var box = gameObjects[i];


                var transform = wd.unsafeGetGameObjectTransformComponent(box, state);


                var localPos = wd.getTransformLocalPosition(transform, state);

                state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);
            }

            return [state, gameObjects];
        },
        setPosition: function (gameObjects, state) {
            return PositionTool.setPositionWithRange(gameObjects, 500, state);
        },
        setGameObjectPosition: function (gameObject, positionArr, state) {
            var transform = wd.unsafeGetGameObjectTransformComponent(gameObject, state);

            return wd.setTransformLocalPosition(transform, positionArr, state);
        }
    }
})();