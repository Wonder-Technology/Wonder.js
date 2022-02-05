Feature: Render Job
    As a Job
    I want to render
    So that I can console info

    Scenario: Console info
        When I exec job
        Then I should console "render root job exec"