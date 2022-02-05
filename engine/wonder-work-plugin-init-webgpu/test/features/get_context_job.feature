Feature: GetContext Job
    As a Job
    I want to get context
    So that I can use it

    Scenario: Set context to po
        When I exec job
        Then I can get a context from po
