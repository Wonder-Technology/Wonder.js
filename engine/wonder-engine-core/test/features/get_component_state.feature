Feature: Get Component State
    As a Get Component State
    I want to get registerd component's state
    So that I can use it

    Scenario: get registerd component's state
        Given prepare register
        And register component data
        And create and set component state
        Then get registerd component's state should return the component state
