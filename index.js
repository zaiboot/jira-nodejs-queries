"use strict";

(function () {

    const JiraClient = require('jira-connector');

    const jira = new JiraClient({
        host: 'kareodev.atlassian.net',
        basic_auth: {
            username: '',
            password: ''
        }
    });

    let issues = [];
    const sprintId = 1885;

    jira.sprint.getSprintIssues({ sprintId: sprintId, jql: 'type=Story', fields: 'summary' }).then(function (data) {
        let issues = data.issues;
        console.log("Total issues => " + issues.length);
        issues.forEach(t => {
            var issue = { key: t.key, summary: t.fields.summary };
            issues.push(issue);
            jira.issue.getComments({ issueKey: issue.key }).then(function (result) {
                var comment = " No Comments found"
                if (result.comments.length > 0) {
                    comment = result.comments[0].body;
                }
                console.log(issue.key + " - " + comment);
            });

        });
    });

    // for (let index = 0; index < issues.length; index++) {
    //     const element = issues[index];
    //     console.log("Getting comments for ticket: " + element.key);
    // }



})();