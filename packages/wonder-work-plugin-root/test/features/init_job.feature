Feature: Init Job
    As a Job
    I want to init
    So that I can console info

    Scenario: Console info
        When I exec job
        Then I should console "init root job exec"