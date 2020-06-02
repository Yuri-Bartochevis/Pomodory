const messages = require('../config/messages');
const { getUserConfig, logUserEffort } = require('../services/configurationService');
const { setupReminder } = require('../services/reminderService');

const TechniqueStarts = {

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'StartTechniqueIntent';
  },

  async handle(handlerInput) {
    let email = getSession(handlerInput).email;
    let config = await getUserConfig(email);

    if (config == null || config == undefined) {
      return handlerInput.responseBuilder
        .speak(messages.TECHNIQUE.DEFAULT)
        .withShouldEndSession(false)
        .getResponse();
    }
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
  },

};

function getSession(handlerInput) {
  return handlerInput.attributesManager.getSessionAttributes();
}
module.exports = TechniqueStarts;