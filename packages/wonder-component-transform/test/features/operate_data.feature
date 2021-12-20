Feature: Operate data
    As a Operate data
    I want to operate transform's data
    So that I can use it

    Background: get data and create a state
        When I get data
        And create a state

    Rule: set local position

        Scenario: change parent's localPosition should affect children
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local position to pos1
            And set child1's local position to pos2
            And set parent1's local position to pos2
            Then get parent1's local position should return pos2
            And get parent1's position should return pos2
            And get child1's local position should return pos2
            And get child1's position should return pos2 + pos2

        Scenario: change child's localPosition should not affect parent
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local position to pos1
            And set child1's local position to pos2
            And set child1's local position to pos1
            Then get parent1's local position should return pos1
            And get parent1's position should return pos1
            And get child1's local position should return pos1
            And get child1's position should return pos1 + pos1

    Rule: get normal matrix

        Scenario Outline: get normal matrix
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local rotation to <X1>, <Y1>, <Z1>, <W1>
            And set child1's local rotation to <X2>, <Y2>, <Z2>, <W2>
            And update child1
            Then get child1's normal matrix should <A00>, <A01>,<A02>,<A10>,<A11>,<A12>,<A20>,<A21>,<A22>

            Examples:
                | X1  | Y1  | Z1  | W1  | X2   | Y2  | Z2  | W2  | A00                 | A01                | A02                | A10                  | A11                  | A12                 | A20                  | A21                  | A22                |
                | 1.0 | 2.0 | 3.0 | 2.5 | 10.0 | 2.0 | 2.0 | 5.5 | 0.11175134032964706 | 0.2789168655872345 | 0.3949948847293854 | 0.022318610921502113 | 0.055687714368104935 | 0.07865391671657562 | 0.021334320306777954 | 0.053898513317108154 | 0.0761214941740036 |

    Rule: get position

        Scenario: get the position in world coordinate system
            When create two transforms as parent1, child1
            And set parent1's local position to pos1
            And set child1's parent to parent1
            Then get child1's position should return pos1

    Rule: set position in world coordinate system

        Scenario: change parent's position should affect children
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local position to pos1
            And set child1's local position to pos2
            And set parent1's position to pos2
            Then get parent1's local position should return pos2
            And get parent1's position should return pos2
            And get child1's local position should return pos2
            And get child1's position should return pos2 + pos2

        Scenario: change child's position should not affect parent
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local position to pos1
            And set child1's local position to pos2
            And set child1's position to pos3
            Then get parent1's local position should return pos1
            And get parent1's position should return pos1
            And get child1's local position should return pos3 - pos1
            And get child1's position should return pos3

    Rule: get rotation

        Scenario: get the rotation in world coordinate system
            When create two transforms as parent1, child1
            And set parent1's local rotation to rotation1
            And set child1's parent to parent1
            Then get child1's rotation should return rotation1

    Rule: set rotation in world coordinate system

        Scenario: change parent's rotation should affect children
            When create two transforms as parent1, child1
            And set parent1's local rotation to rotation1
            And set child1's local rotation to rotation2
            And set child1's parent to parent1
            And set parent1's rotation to rotation2
            Then get parent1's local rotation should return rotation2
            And get parent1's rotation should return rotation2
            And get child1's local rotation should return rotation2
            And get child1's rotation should return rotation3

        Scenario: change child's rotation should not affect parent
            When create two transforms as parent1, child1
            And set parent1's local rotation to rotation1
            And set child1's local rotation to rotation2
            And set child1's parent to parent1
            And set child1's rotation to rotation3
            Then get parent1's local rotation should return rotation1
            And get parent1's rotation should return rotation1
            And get child1's local rotation should return rotation4
            And get child1's rotation should return rotation5

    Rule: get euler angles

        Scenario: get the euler angles in world coordinate system
            When create two transforms as parent1, child1
            And set parent1's local euler angles to euler angles1
            And set child1's parent to parent1
            Then get child1's euler angles should return euler angles1

    Rule: set euler angles in world coordinate system

        Scenario: change parent's euler angles should affect children
            When create two transforms as parent1, child1
            And set parent1's local euler angles to euler angles1
            And set child1's local euler angles to euler angles2
            And set child1's parent to parent1
            And set parent1's euler angles to euler angles2
            Then get parent1's local euler angles should return euler angles2
            And get parent1's euler angles should return euler angles2
            And get child1's local euler angles should return euler angles2
            And get child1's euler angles should return euler angles3

        Scenario: change child's euler angles should not affect parent
            When create two transforms as parent1, child1
            And set parent1's local euler angles to euler angles1
            And set child1's local euler angles to euler angles2
            And set child1's parent to parent1
            And set child1's euler angles to euler angles3
            Then get parent1's local euler angles should return euler angles1
            And get parent1's euler angles should return euler angles1
            And get child1's local euler angles should return euler angles4
            And get child1's euler angles should return euler angles5

    Rule: get scale

        Scenario: get the scale in world coordinate system
            When create two transforms as parent1, child1
            And set parent1's local scale to scale1
            And set child1's parent to parent1
            Then get child1's scale should return scale1

    Rule: set scale in world coordinate system

        Scenario: change parent's scale should affect children
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local scale to scale1
            And set child1's local scale to scale2
            And set parent1's scale to scale2
            Then get parent1's local scale should return scale2
            And get parent1's scale should return scale2
            And get child1's local scale should return scale2
            And get child1's scale should return scale2 * scale2

        Scenario: change child's scale should not affect parent
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set parent1's local scale to scale1
            And set child1's local scale to scale2
            And set child1's scale to scale3
            Then get parent1's local scale should return scale1
            And get parent1's scale should return scale1
            And get child1's local scale should return scale3 / scale1
            And get child1's scale should return scale3


    Rule: fix bug

        Scenario: the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms
            When create two transforms as transform1, transform2
            Then get transform2's localToWorldMatrix should return identity matrix4

        Scenario Outline: get the data from Float32Array may not equal to the value which is setted
            When create a transform
            And set the transform's local position to <X1>, <Y1>, <Z1>
            Then get the transform's local position to <X2>, <Y2>, <Z2>

            Examples:
                | X1  | Y1  | Z1  | X2                  | Y2  | Z2  |
                | 0.1 | 0.0 | 0.0 | 0.10000000149011612 | 0.0 | 0.0 |