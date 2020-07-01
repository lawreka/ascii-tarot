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

function pickCard(message, chosenCard) {
    setTimeout(function() {
        console.log(message);
        setTimeout(function() {
            displayCard(chosenCard);
        }, 1000);
    }, 1000);
}

function pickCardNumber(cardsAlreadyDrawn = new Set([])) {
    const chosenCard = Math.floor(Math.random() * deck.length);
    while (cardsAlreadyDrawn.has(chosenCard))  {
        chosenCard = Math.floor(Math.random() * deck.length);
    }
    return chosenCard;
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
            pickCard('Your card is:', pickCardNumber());
            setTimeout(() => {
                end();
            }, 5000);
            return;
        case 'Three cards':
            loader.start();
            pickedCards = new Set([]);
            pastCard = pickCardNumber(pickedCards);
            pickCard('Past:', pastCard);
            pickedCards.add(pastCard);
            setTimeout(function(){
                loader.start();
                presentCard = pickCardNumber(pickedCards);
                pickCard('Present:', presentCard);
                pickedCards.add(presentCard);
            }, 3000);
            setTimeout(function(){
                loader.start();
                futureCard = pickCardNumber(pickedCards);
                pickCard('Future:', futureCard);
                pickedCards.add(futureCard);
            }, 6000);
            setTimeout(() => {
                end();
            }, 11000);
            return;
        case 'Celtic cross':
            loader.start();
            pickedCards = new Set([]);
            card = pickCardNumber(pickedCards);
            pickCard('Yourself:', card);
            pickedCards.add(card);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('Your obstacle:', card);
                pickedCards.add(card);
            }, 4000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('Root of the question:', card);
                pickedCards.add(card);
            }, 8000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('The past:', card);
                pickedCards.add(card);
            }, 12000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('Hopes/fears:', card);
                pickedCards.add(card);
            }, 16000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('The future:', card);
                pickedCards.add(card);
            }, 20000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('The root of the outcome:', card);
                pickedCards.add(card);
            }, 24000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('Others in the outcome:', card);
                pickedCards.add(card);
            }, 28000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('Hopes/fears for outcome:', card);
                pickedCards.add(card);
            }, 32000);
            setTimeout(function(){
                loader.start();
                card = pickCardNumber(pickedCards);
                pickCard('Outcome:', card);
                pickedCards.add(card);
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