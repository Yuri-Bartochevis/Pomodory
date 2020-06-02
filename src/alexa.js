const Alexa = require('ask-sdk-core');

const Launch = require('./handlers/Launch');
const TechniqueStart = require('./handlers/TechniqueStart');
const TechniqueConfig = require('./handlers/TechniqueConfiguration');
const Yes = require('./handlers/Yes');
const No = require('./handlers/No');
const Help = require('./handlers/Help');
const Stop = require('./handlers/Stop');
const TechniqueYield = require('./handlers/TechniqueYield');
const alexa = async (req, res) => {
    let skill = Alexa.SkillBuilders.custom()
        .withSkillId("amzn1.ask.skill.305c2328-faae-42fe-943c-be7be047e38a")
        .addRequestHandlers(
            Launch,
            TechniqueStart,
            TechniqueConfig.Initial,
            TechniqueConfig.DurationTimer,
            TechniqueConfig.BreakTimer,
            Yes,
            No,
            Help,
            Stop,
            TechniqueYield
            )
        .withApiClient(new Alexa.DefaultApiClient())
        .create();

    return await skill.invoke(req.body)
        .then(function (responseBody) {
            res.json(responseBody);
        })
        .catch(function (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        });
};

module.exports = alexa;