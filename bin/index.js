#!/usr/bin/env node

const inquirer = require('inquirer');
const cards = require('./cards');
const CliFrames = require('cli-frames');

const asciiloader = [ '*', '*:', '*:･', '*:･ﾟ', '*:･ﾟ✧', '*:･ﾟ✧*', '*:･ﾟ✧*:', '*:･ﾟ✧*:･', '*:･ﾟ✧*:･ﾟ', '*:･ﾟ✧*:･ﾟ✧' ]

const loader = new CliFrames();
loader.load(asciiloader);

const { deck } = cards;

const greeting = `
.------.                              .------.
| .--. | ┌─┐┌─┐┌─┐┬┬  ┌┬┐┌─┐┬─┐┌─┐┌┬┐ | .--. | 
| :/\\\: | ├─┤└─┐│  ││───│ ├─┤├┬┘│ │ │  | :/\\\: |
| :\\\/: | ┴ ┴└─┘└─┘┴┴   ┴ ┴ ┴┴└─└─┘ ┴  | :\\\/: |
| '--' |                              | '--' |
\`------'                              \`------'
`;
console.log(greeting);

const pickspread = [
    {
        type: 'list',
        name: 'spread',
        message: 'Select your spread',
        choices: ['One card', 'Three cards', 'Celtic cross', 'Show me the deck'],
        filter: function(val) {
            return val;
        }
    }
]

const exit = [
    {
        type: 'confirm',
        name: 'exit',
        message: 'Finished?',
        default: true
    }
]

function displayCard(x) {
    console.log(deck[x].name);
    console.log(deck[x].card);
}

function pickCard(message) {
    setTimeout(function() {
        console.log(message);
        setTimeout(function() {
            const chosenCard = Math.floor(Math.random() * deck.length);
            displayCard(chosenCard);
        }, 1000);
    }, 1000);
}

function end() {
    inquirer.prompt(exit).then(answer => {
        if (answer.exit) {
            loader.start();
            setTimeout(function() {
                console.log('Goodbye');
            }, 1000);
            return;
        } else { 
            run(); 
        }
    });
}

function displaySpread(type) {
    console.log(type);
    switch (type) {
        case 'One card':
            loader.start();
            pickCard('Your card is:');
            setTimeout(() => {
                end();
            }, 5000);
            return;
        case 'Three cards':
            loader.start();
            pickCard('Past:');
            setTimeout(function(){
                loader.start();
                pickCard('Present:');
            }, 3000);
            setTimeout(function(){
                loader.start();
                pickCard('Future:');
            }, 6000);
            setTimeout(() => {
                end();
            }, 11000);
            return;
        case 'Celtic cross':
            loader.start();
            pickCard('Yourself:');
            setTimeout(function(){
                loader.start();
                pickCard('Your obstacle:');
            }, 4000);
            setTimeout(function(){
                loader.start();
                pickCard('Root of the question:');
            }, 8000);
            setTimeout(function(){
                loader.start();
                pickCard('The past:');
            }, 12000);
            setTimeout(function(){
                loader.start();
                pickCard('Hopes/fears:');
            }, 16000);
            setTimeout(function(){
                loader.start();
                pickCard('The future:');
            }, 20000);
            setTimeout(function(){
                loader.start();
                pickCard('The root of the outcome:');
            }, 24000);
            setTimeout(function(){
                loader.start();
                pickCard('Others in the outcome:');
            }, 28000);
            setTimeout(function(){
                loader.start();
                pickCard('Hopes/fears for outcome:');
            }, 32000);
            setTimeout(function(){
                loader.start();
                pickCard('Outcome:');
            }, 36000);
            setTimeout(() => {
                end();
            }, 41000);
            return;
        case 'Show me the deck':
            for (let i = 0; i < 78; i++) {
                (function (i) {
                    setTimeout(function() {
                        displayCard(i);
                    }, 2000*i);
                })(i);
            };
            setTimeout(() => {
                end();
            }, 159000);
            return;
    }
}

function run() {
    inquirer.prompt(pickspread).then(answer => {
        const type = answer.spread;
        displaySpread(type);
    });
}

run();