const messages = require('../config/messages');
const DURATION_ALLOWED = [15, 25, 30, 50];
const BREAK_ALLOWED = [5, 10, 15, 20];
const { getSlotValue } = require('ask-sdk-core')
const { setUserConfig } = require('../services/configurationService');
const PERMISSION = ['alexa::profile:email:read']

const Initial = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ConfigureTechniqueIntent';
  },

  async handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.CONFIGURATION.INITIAL)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const DurationTimer = {
  canHandle(handlerInput) {
    const sessionAttributes = getSession(handlerInput);

    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'setMinutesIntent'
      && sessionAttributes.duration == undefined;
  },

  async handle(handlerInput) {
    var duration = Number(getSlotValue(handlerInput.requestEnvelope, 'time'));
    var sessionAttributes = getSession(handlerInput);

    if (!DURATION_ALLOWED.includes(duration)) {
      return handlerInput.responseBuilder
        .speak(messages.ERROR.DID_NOT_UNDERSTAND)
        .withShouldEndSession(false)
        .getResponse();
    }

    sessionAttributes.duration = duration;
    saveSession(handlerInput, sessionAttributes);

    return handlerInput.responseBuilder
      .speak(messages.CONFIGURATION.BREAK)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const BreakTimer = {
  canHandle(handlerInput) {
    const sessionAttributes = getSession(handlerInput);

    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'setMinutesIntent'
      && sessionAttributes.duration != undefined;
  },

  async handle(handlerInput) {
    //TODO persist or update configuration
    const durationTime = getSession(handlerInput).duration;
    const breakTime = Number(getSlotValue(handlerInput.requestEnvelope, 'time'));

    if (!BREAK_ALLOWED.includes(breakTime)) {
      return handlerInput.responseBuilder
        .speak(messages.ERROR.DID_NOT_UNDERSTAND)
        .withShouldEndSession(false)
        .getResponse();
    }

    let config = {
      shortBreak: breakTime,
      duration: durationTime,
      email: email
    }

    setUserConfig(config);
    return handlerInput.responseBuilder
      .speak(messages.CONFIGURATION.DONE)
      .getResponse();
  },
};

function getSession(handlerInput) {
  return handlerInput.attributesManager.getSessionAttributes();
}

function saveSession(handlerInput, sessionAttributes) {
  handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
}






module.exports = { Initial, DurationTimer, BreakTimer }