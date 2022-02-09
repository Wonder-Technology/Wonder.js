Feature: GameObject
    As a GameObject
    I want to be setted
    So that I can use it

    Background: prepare
        Given prepare register
        When set gameObject data
        And create and set the gameObject state

    Scenario: create a gameObject
        Then createGameObject should create a gameObject

    Scenario: get all gameObjects
        When create two gameObjects
        Then getAllGameObjects should return them
