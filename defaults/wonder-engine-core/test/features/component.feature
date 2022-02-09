Feature: Component
    As a Component
    I want to be registered
    So that I can use it

    Background: prepare register
        Given prepare register

    Rule: register component

        Scenario: register one component
            When register component data
            Then should add component data

        Scenario: register the same component twice
            Given open debug
            When register component data
            And register component data
            Then should contract error: "expect not register before, but actual not"

    Rule: unregister component

        Scenario: register one component and unregister it
            When register component data
            And unregister it
            Then should not has component data

        Scenario: register two components and unregister the first one
            When register component1 data
            And register component2 data
            And unregister component1 data
            Then should only has component2 data

    Rule: operate component

        Background: prepare component
            Given register component data
            And create and set component state

        Scenario: create component
            When create a component as c1
            Then c1 should be correct
            And component state is updated

        Scenario: has component
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            Then g1 should has c1

        Scenario: get component
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            Then get gameObject's component should return c1

        Scenario: get all components
            Given create two gameObjects as g1, g2
            And create two components as c1, c2
            And add c1 to g1
            And add c2 to g2
            Then get all components should return [c1, c2]

        Scenario: get component's gameObjects
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            Then get c1's gameObjects should return [g1]

        Scenario: operate component's data
            Given create a component as c1
            When set c1's data1
            Then get c1's data1 should the setted data