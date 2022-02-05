Feature: Transform API
    As a Transform API
    I want to provide transform related api
    So that I can use it to operate transform

    Background: prepare
        Given prepare register
        And register transform data
        And create and set all component states
        And create a transform

    Scenario: lookAt
        When look at a target
        Then change localToWorld matrix
