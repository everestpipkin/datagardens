const rita = require("rita");

var exports = (module.exports = {});

const randValue = array => {
    return array[Math.floor(Math.random() * (array.length - 1)) + 1];
};

exports.createSentences = (pos, entities) => {
    let sentences = [];

    for (let i = 0; i < 10; i++) {
        let randVerb = randValue(pos.verbs);
        randVerb = nlp(randVerb)
            .verbs()
            .toPastTense()
            .out("text");

        const randTopic = randValue(entities.topics);
        const randNoun = randValue(pos.nouns);
        const randAdverb = randValue(pos.adverbs);
        const randAdjective = randValue(pos.adjectives);
        const randOrg = randValue(entities.orgs);

        let sentence;

        if (Math.round(Math.random())) {
            sentence = randTopic + " " + randVerb + " " + randNoun;
        } else {
            sentence = randNoun + " " + randVerb + " " + randTopic;
        }

        sentences.push(sentence.toLowerCase());
    }
    return sentences;
};
