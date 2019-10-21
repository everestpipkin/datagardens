const nlp = require("compromise");
const Sentiment = require("sentiment");
const rita = require("rita");

var exports = (module.exports = {});

// create an object with the entities from the text
exports.extractEntities = text => {
    to = [];
    or = [];

    // select 200 random sentences to use
    let sentences = [];
    for (let i = 0; i < 200; i++) {
        const sent = text[Math.floor(Math.random() * (text.length - 1)) + 1];
        sentences.push(sent);
    }

    for (const sentence of sentences) {
        to.push(
            nlp(sentence)
                .topics()
                .out("array")
        );
        // or.push(
        //     nlp(sentence)
        //         .organizations()
        //         .out("array")
        // );
    }

    return {
        people: [],
        orgs: [].concat.apply([], or),
        places: [],
        topics: [].concat.apply([], to) // can use to.flat() in Node 12.0
    };
};

// get the mean sentiment of an array of strings and normalize on (-10, 10)
// randomly select a smaller portion of string to check so we save time
exports.sentiment = text => {
    // take 60 random samples from the array
    const samples = text.length <= 60 ? text.length : 60;

    let rands = [];
    for (let i = 0; i < samples; i++) {
        rands.push(Math.floor(Math.random() * (text.length - 1)) + 1);
    }

    const sentiment = new Sentiment();
    let total = 0;

    for (const rand of rands) {
        total += sentiment.analyze(text[rand]).comparative;
    }

    return Math.min(Math.max((total / samples) * 100, -10), 10);
};

// get the most common topic in the list to use as the summary's title
// https://codereview.stackexchange.com/a/177989
exports.extractTitle = topics => {
    let counted = topics.reduce((acc, curr) => {
        if (curr in acc) {
            acc[curr]++;
        } else {
            acc[curr] = 1;
        }
        return acc;
    }, {});

    let mode = Object.keys(counted).reduce((a, b) =>
        counted[a] > counted[b] ? a : b
    );
    return mode;
};

// get parts of speech similar in sentiment to the text's overall sentiment
exports.getSimPOS = (senti, text) => {
    const sentiment = new Sentiment();
    const sentimentSign = Math.sign(senti);

    let res = { nouns: [], verbs: [], adverbs: [], adjectives: [] };

    // select 300 random sentences to use
    let sentences = [];
    for (let i = 0; i < 300; i++) {
        const sent = text[Math.floor(Math.random() * (text.length - 1)) + 1];
        sentences.push(sent);
    }

    for (const sentence of sentences) {
        const tokens = rita.tokenize(sentence);
        for (const token of tokens) {
            const scoreSign = Math.sign(sentiment.analyze(token).score);
            if (scoreSign == sentimentSign || scoreSign == 0) {
                if (
                    rita.isNoun(token) &&
                    !rita.isVerb(token) &&
                    !rita.isAdverb(token) &&
                    !rita.isAdjective(token)
                ) {
                    res.nouns.push(token);
                } else if (rita.isVerb(token) && !rita.isNoun(token)) {
                    res.verbs.push(token);
                } else if (rita.isAdverb) {
                    res.adverbs.push(token);
                } else if (rita.isAdjective) {
                    res.adjective.push(token);
                }
            }
        }
    }
    return res;
};
