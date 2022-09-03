// Packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./generateMarkdown.js");
const fs = require("fs/promises");
// Array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        validate: (titleInput) => {
            if (titleInput) {
                return true;
            } else {
                console.log("Please enter your title!");
                return false;
            }
        },
    },
    /////
    {
        type: "input",
        message: "Please write a short description of your project.",
        name: "description",
        validate: (answer) => {
            if (answer.length < 1) {
                return console.log(
                    "You must enter a valid project description to continue."
                );
            }
            return true;
        },
    },

    /////
    {
        type: "input",
        name: "githubUsername",
        message: "What is your GitHub Username?",
        validate: (githubInput) => {
            if (githubInput) {
                return true;
            } else {
                console.log("Please enter your GitHub username!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?",
        validate: (githubInput) => {
            if (githubInput) {
                return true;
            } else {
                console.log("Please enter your email address!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "what",
        message: "What is your project and what problem will it solve?",
        validate: (whatInput) => {
            if (whatInput) {
                return true;
            } else {
                console.log("Please enter what your project is!");
                return false;
            }
        },
    },

    {
        type: "input",
        name: "how",
        message: "How will someone use this?",
        validate: (howInput) => {
            if (howInput) {
                return true;
            } else {
                console.log("Please enter what your project is!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "installation",
        message:
            "Please provide step-by-step installation instructions for your project",
        validate: (installInput) => {
            if (installInput) {
                return true;
            } else {
                console.log("Please enter your installation instructions!");
                return false;
            }
        },
    },
    {
        type: "list",
        name: "license",
        message: "Which license will you use for your project?",
        choices: ["agpl", "Apache-2.0", "mit", "no license"],
    },
    {
        type: "confirm",
        name: "confirmContributers",
        message: "Would you like to allow other developers to contribute?",
        default: true,
    },
    {
        type: "input",
        name: "contribute",
        message: "Please provide guidelines for contributing",
        when: ({ confirmContributers }) => {
            if (confirmContributers) {
                return true;
            } else {
                return false;
            }
        },
        validate: (contributerInput) => {
            if (contributerInput) {
                return true;
            } else {
                console.log("Please enter contributer guidelines!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "test",
        message: "Please provide instructions on how to test the app.",
        validate: (testInput) => {
            if (testInput) {
                return true;
            } else {
                console.log("Please enter your use test instructions!");
                return false;
            }
        },
    },
];

// function to write README file
const writeFile = (fileContent) => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/generated-README.md", fileContent, (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: "File created!",
            });
        });
    });
};

// function to prompt questions and store user inputs
const init = () => {
    return inquirer.prompt(questions).then((readmeData) => {
        return readmeData;
    });
};

// Function call to initialize app
init()
    .then((readmeData) => {
        console.log(readmeData);
        writeFile(generateMarkdown({ ...readmeData }));
    })
    .catch((err) => {
        console.log(err);
    });