import { Transform } from "./Transform";
import { updateLogicWorld, world } from "./LogicWorld";
import { getPosition } from "./TransformSystem";
export var init = function () {
    var parent = Transform.of();
    parent.setPosition(1);
    var child = Transform.of();
    child.setPosition(2);
    var tra2 = Transform.of();
    tra2.setPosition(10);
    parent.add(child);
    world.add(parent);
    world.add(tra2);
    updateLogicWorld(world, 1);
    updateLogicWorld(world, 2);
    console.log(getPosition(parent.indexInArrayBuffer));
};
//# sourceMappingURL=main.js.map