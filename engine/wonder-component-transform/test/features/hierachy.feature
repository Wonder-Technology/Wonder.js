Feature: Hierachy
    As a Hierachy
    I want to operate transform's parent
    So that I can move them together

    Background: get data and create a state
        When I get data
        And create a state

    Rule: the change of parent before setted as parent should affect child

        Scenario: test one(parent)-one(child)
            When create two transforms as parent1, child1
            And set parent1's local position to pos1
            And set child1's parent to parent1
            Then get parent1's local position should return pos1
            And get parent1's position should return pos1
            And get child1's local position should return default data
            And get child1's position should return pos1

        Scenario: test one(parent)-two(child)
            When create three transforms as parent1, child1, child2
            And set parent1's local position to pos1
            And set child2's local position to pos2
            And set child1's parent to parent1
            And set child2's parent to parent1
            Then get parent1's local position should return pos1
            And get parent1's position should return pos1
            And get child1's local position should return default data
            And get child1's position should return pos1
            And get child2's local position should return pos2
            And get child2's position should return pos1 + pos2

    Rule: if child already has parent

        Scenario: can set the same parent
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            And set child1's parent to parent1
            Then get child1's parent should be parent1

        Scenario: can set a different parent
            When create three transforms as parent1, parent2, child1
            And set child1's parent to parent1
            And set child1's parent to parent2
            Then get child1's parent should be parent2

        Scenario: set different parents should change its current parent's children order
            When create four transforms as parent1, child1, child2, child3
            And set child1's parent to parent1
            And set child2's parent to parent1
            And set child3's parent to parent1
            And set child1's parent to child3
            Then get parent1's children should be [child3, child2]

    Rule: fix set parent bug

        Scenario: test two(parent)-two(child)
            When create four transforms as parent1, parent2, child1, child2
            And set child1's parent to parent1
            And set child2's parent to parent2
            And set parent1's local position to pos1
            And set parent2's local position to pos2
            And set child1's local position to pos3
            And set child2's local position to pos4
            Then get parent1's position should return pos1
            And get parent2's position should return pos2
            And get child1's position should return pos3 + pos1
            And get child2's position should return pos4 + pos2


    Rule: remove parent

        Scenario: test one(parent)-one(child) for remove parent
            When create two transforms as parent1, child1
            And set parent1's local position to pos1
            And set child1's parent to parent1
            And remove child1's parent
            Then child1 should not have parent
            And get parent1's local position should return pos1
            And get parent1's position should return pos1
            And get child1's local position should return default data
            And get child1's position should return default data

        Scenario: test one(parent)-two(child) for remove parent
            When create three transforms as parent1, child1, child2
            And set parent1's local position to pos1
            And set child1's parent to parent1
            And set child2's local position to pos2
            And set child2's parent to parent1
            And remove child2's parent
            Then get parent1's local position should return pos1
            And get parent1's position should return pos1
            And get child1's local position should return default data
            And get child1's position should return pos1
            And get child2's local position should return pos2
            And get child2's position should return pos2


    Rule: has parent

        Scenario: has no parent
            When create a transform as transform1
            Then transform1 should not have parent

        Scenario: has parent
            When create two transforms as parent1, child1
            And set child1's parent to parent1
            Then child1 should have parent


    Rule: get children

        Scenario: get parent's all children
            When create three transforms as parent1, child1, child2
            And set child1's parent to parent1
            And set child2's parent to parent1
            Then get parent1's children should return [child1, child2]