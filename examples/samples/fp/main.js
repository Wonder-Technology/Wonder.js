import { Transform } from "./Transform";
import { updateLogicWorld, world } from "./LogicWorld";
import { getPosition } from "./TransformSystem";
export var init = function () {
    var parent = Transform.of();
    parent.setPosition(2);
    var child = Transform.of();
    child.setPosition(4);
    var tra2 = Transform.of();
    tra2.setPosition(10);
    parent.add(child);
    world.add(parent);
    world.add(tra2);
    updateLogicWorld(world, 1);
    updateLogicWorld(world, 2);
    console.log(getPosition(parent.indexInArrayBuffer));
    console.log(getPosition(child.indexInArrayBuffer));
    console.log(getPosition(tra2.indexInArrayBuffer));
};
//# sourceMappingURL=main.js.map