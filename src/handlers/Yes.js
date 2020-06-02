const messages = require('../config/messages');
const { setupReminder } = require('../services/reminderService');
const { getUserConfig, logUserEffort} = require('../services/configurationService');

const DEFAULT_SCHEMA = { duration: 25, shortBreak: 5 }

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;

        let email = getSession(handlerInput).email;
        let config = await getUserConfig(email);

        if (config === null || config === undefined) {
            await setupReminder(handlerInput, DEFAULT_SCHEMA);
            logUserEffort({email,duration:DEFAULT_SCHEMA.duration});
            return responseBuilder.speak(messages.TECHNIQUE.DEFAULT_START)
                .withShouldEndSession(true)
                .getResponse();
        } else {
            try {
                console.log(config)
                await setupReminder(handlerInput, config);
                logUserEffort({email,duration:config.duration});
                return handlerInput.responseBuilder
                    .speak(messages.TECHNIQUE.START)
                    .getResponse();
            } catch (error) {
                return handlerInput.responseBuilder
                    .speak(messages.ERROR)
                    .getResponse();
            }
        }
    }
};

function getSession(handlerInput) {
    return handlerInput.attributesManager.getSessionAttributes();
}