Feature: Get Data
    As a Get Data
    I want to get gameObject data
    So that I can set it

    Scenario: create a state
        When I get data
        Then createStateFunc should create a state

    Scenario: create a gameObject
        When I get data
        And create a state
        Then createGameObjectFunc should create a gameObject

    Scenario: get all gameObjects
        When I get data
        And create a state
        And create two gameObjects
        Then getAllGameObjects should return them
