const express = require("express");
const request = require("request");
const path = require("path");

const parsing = require("./helpers/parse");
const nlp = require("./helpers/nlp");
const generation = require("./helpers/generation");

const app = express();
const port = 8081;

app.use(express.static("static"));
app.set("views", __dirname + "/templates");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/templates/index.html"));
});

app.get("/poem", async (req, res) => {
    if (req.query.page === undefined) {
        res.sendStatus(404);
    }
    request(req.query.page, (err, resp, body) => {
        const cleanText = parsing.parse(body);
        // takes too long on large texts; clean after generation
        //cleanText = parsing.clean(cleanText);
        const entities = nlp.extractEntities(cleanText);
        const title = nlp.extractTitle(entities.topics);
        const sentiment = nlp.sentiment(cleanText);
        const pos = nlp.getSimPOS(sentiment, cleanText);

        const sentences = generation.createSentences(pos, entities);

        res.render("index", { sentences: sentences, title: title });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
