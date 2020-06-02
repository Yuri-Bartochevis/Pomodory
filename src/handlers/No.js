const messages = require('../config/messages');

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const {responseBuilder} = handlerInput;
        return responseBuilder.speak(messages.CONFIGURATION.INITIAL)
            .withShouldEndSession(false)
            .getResponse();
    }
};