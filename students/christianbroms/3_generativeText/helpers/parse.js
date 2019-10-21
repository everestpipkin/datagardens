const nodeParser = require("node-html-parser");
const nlp = require("compromise");

var exports = (module.exports = {});

// parses the html to plaintext
exports.parse = html => {
    const root = nodeParser.parse(html);
    const text = root.structuredText;
    return text.split("\n");
};

// clean and normalize the sentences
exports.clean = text => {
    let cleaned = [];
    for (const sentence of text) {
        newSentence = nlp(sentence)
            .normalize()
            .out("text");
        cleaned.push(newSentence);
    }
    return cleaned;
};

exports.title = html => {
    const root = nodeParser.parse(html);
    const title = root.querySelector("title");
    return title.text;
};
