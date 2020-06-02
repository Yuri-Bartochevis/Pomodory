const messages = require('../config/messages');
const { getYieldTime } = require('../services/configurationService');

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest' || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && ( handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent')) ;
    },
    handle(handlerInput) {
        const {responseBuilder} = handlerInput;
            return responseBuilder.speak(messages.STOP)
            .getResponse();
        }
};
