// Dependencies
const inquirer = require("inquirer");
const fs = require("fs");

// Construct Requirements
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const Manager = require("./lib/manager")
const Staff = require("./lib/staff")

let finalTeamArray = [];


function startingPrompt() {
    inquirer.prompt([
        {
            message: "Please write your team name:",
            name: "teamname"
        }
    ])
        .then(function(data){
            const teamName = data.teamname
            finalTeamArray.push(teamName)
            addManager();
        })

    
}

function addManager() {
    inquirer.prompt([
        {
            message: "What is your team manager's name?",
            name: "name"
        },
        {
            message: "What is your team manager's email address?",
            name: "email"
        },
        {
            type: "number",
            message: "What is your team manager's ID number?",
            name: "IDNumber"
        },
    ])

        .then(function (data) {
            const name = data.name
            const id = 1
            const email = data.email
            const IDNumber = data.IDNumber
            const staff = new Manager(name, id, email, IDNumber)
            finalTeamArray.push(staff)
            addstaffs();
        });

}

function addstaffs() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more staff?",
            choices: ["Yes, please add an engineer", 
            "Yes, please add an intern", 
            "No, my team is complete"],
            name: "addstaffData"
        }
    ])

        .then(function (data) {

            switch (data.addstaffData) {
                case "Yes, please add an engineer":
                    addEngineer();
                    break;

                case "Yes, please add an intern":
                    addIntern();
                    break;
                case "No, my team is complete":
                    compileTeam();
                    break;
            }
        });
}

function addEngineer() {
    inquirer.prompt([
        {
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            message: "What is this engineer's email address?",
            name: "email"
        },
        {
            message: "What is this engineer's Github profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = finalTeamArray.length + 1
            const email = data.email
            const github = data.github
            const staff = new Engineer(name, id, email, github)
            finalTeamArray.push(staff)
            addstaffs()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            message: "What is this intern's name?",
            name: "name"
        },
        {
            message: "What is this intern's email address?",
            name: "email"
        },
        {
            message: "What is this intern's school?",
            name: "school"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = finalTeamArray.length + 1
            const email = data.email
            const school = data.school
            const staff = new Intern(name, id, email, school)
            finalTeamArray.push(staff)
            addstaffs()
        });

};

function compileTeam() {
    console.log("Your Team is Now Created!")

    const htmlArray = []
    const htmlBeginning = `

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">
    
    <title>Document</title>
    
<style>
    body {
        background-color: silver;
    }
    
    .banner-bar {
        border-color: blue;
        border-style: groove;
        font-family: 'Times New Roman', Times, serif;
        font-size: 45%;
        font-style: bold;
        text-align: center;
        margin-left: 50px;
        margin-right: 50px;
    }
    
    .card-container {
        font-family: 'Times New Roman', Times, serif;
        font-style: bold;
        text-align: center;
    }
    
    h1,
    h2 {
        font-family: 'Times New Roman', Times, serif;
        font-style: bold;
        font-size: 72px;
        border-bottom: 35px;
    }
    
    h3 {
        border-right: 10px;
        border-left: 10px;
        border-color: rgb(67, 97, 197);
        border-style: solid;
        font-family: 'Times New Roman', Times, serif;
        font-size: 60px;
        font-style: bold;
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 35px;
    }
    
    .card-bottom {
        border-right: 10px;
        border-left: 10px;
        border-color: white;
        border-style: solid;
        margin-left: 30%;
        margin-right: 30%;
        margin-bottom: 35px;
        font-family: 'Times New Roman', Times, serif;
        font-size: 35px;
    }
    
</style>

</head>

<body>
    
    <div class="container-fluid">
    <div class="row">
        <div class="col-12 jumbotron mb-3 team-heading">
            <h1 class="text-center">The Team</h1>
        </div>
    </div>
    </div>


    <div class="banner-bar">
        <h2>${finalTeamArray[0]}</h2>
    </div>
    <div class="card-container">
    `
htmlArray.push(htmlBeginning);

for (let i = 1; i < finalTeamArray.length; i++) {
    let object = `
    <div class="staff-card">
        <div class="card-top">
            <h3>${finalTeamArray[i].name}</h3>
        </div>
        <div class="card-bottom">
            <p>Staff ID: ${finalTeamArray[i].id}</p>
            <p>Email: <a href="mailto:${finalTeamArray[i].email}">${finalTeamArray[i].email}</a>></p>
        `
    if (finalTeamArray[i].IDNumber) {
        object += `
        <p>${finalTeamArray[i].IDNumber}</p>
            `
        }
    if (finalTeamArray[i].github) {
        object += `
        <p>GitHub: <a href="https://github.com/${finalTeamArray[i].github}">${finalTeamArray[i].github}</a></p>
            `
        }
    if (finalTeamArray[i].school) {
        object += `
        <p>School: ${finalTeamArray[i].school}</p>
            `
        }
        object += `
        </div>
        </div>
        `
        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./output/${finalTeamArray[0]}.html`, htmlArray.join(""), function (err) {
        
    })
}

startingPrompt()