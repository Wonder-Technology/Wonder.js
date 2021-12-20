Feature: Get Data
    As a Get Data
    I want to get outline data
    So that I can register it

    Scenario: componentName
        When I get data
        Then componentName should be "Outline"

    Scenario: create a state
        When I get data
        Then createStateFunc should create a state

    Scenario: create a outline
        When I get data
        And create a state
        Then createComponentFunc should create a outline

    Scenario: add a outline to a gameObject
        Given create a gameObject
        When I get data
        And create a state
        And create a outline
        And add the outline to the gameObject
        Then get the gameObject's outline should be the added one

    Scenario: get all outlines
        Given create two gameObjects
        When I get data
        And create a state
        And create two outlines
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two outlines

    Scenario: judge whether a gameObject has a outline
        Given create a gameObject
        When I get data
        And create a state
        And create a outline
        And add the outline to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a outline's gameObjects
        Given create a gameObject
        When I get data
        And create a state
        And create a outline
        And add the outline to the gameObject
        Then getGameObjectsFunc should return the gameObject

    Scenario: operate outline data
        When I get data
        And create a state
        And create a outline
        And set outline's outlineColor
        Then get outline's outlineColor should return the setted data

    Rule: operate outline data error case

        Scenario: get outline's unknown data
            When I get data
            And create a state
            And create a outline
            Then get outline's data1 should error

        Scenario: set ouline's unknown data
            When I get data
            And create a state
            And create a outline
            Then set outline's data1 should error