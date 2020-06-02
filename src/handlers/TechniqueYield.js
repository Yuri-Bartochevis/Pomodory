const messages = require('../config/messages');
const { getYieldTime } = require('../services/configurationService');

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TechniqueYieldIntent';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        let yieldTime = await getYieldTime(getSession(handlerInput).email);

        if(yieldTime === 0 || yieldTime == null){
            return responseBuilder.speak(messages.ZERO_EFFORT)
            .getResponse();
        }else{
        return responseBuilder.speak(messages.CALCULATE_EFFORT(yieldTime))
            .getResponse();
        }
    }
};

function getSession(handlerInput) {
    return handlerInput.attributesManager.getSessionAttributes();
}