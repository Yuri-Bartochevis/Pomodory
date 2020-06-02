const messages = require('../config/messages');
const EMAIL_PERMISSIONS = ['alexa::profile:email:read']
const REMINDER_PERMISSIONS = ['alexa::alerts:reminders:skill:readwrite'];

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const { serviceClientFactory, responseBuilder } = handlerInput;

        const consentToken = handlerInput.requestEnvelope.context.System.apiAccessToken;
        if (!consentToken) {
            return responseBuilder
                .speak(messages.NOTIFY_MISSING_PERMISSIONS.REMINDER)
                .withAskForPermissionsConsentCard(REMINDER_PERMISSIONS)
                .getResponse();
        }

        try {
            const upsServiceClient = serviceClientFactory.getUpsServiceClient();
            email = await upsServiceClient.getProfileEmail();
        let sessionAttributes = getSession(handlerInput);
        sessionAttributes.email = email;
        saveSession(handlerInput, sessionAttributes);
        } catch (error) {
            return responseBuilder
                .speak(messages.NOTIFY_MISSING_EMAIL_PERMISSIONS)
                .withAskForPermissionsConsentCard(EMAIL_PERMISSIONS)
                .getResponse();
        }
        return responseBuilder.speak(messages.WELCOME.INITIAL)
            .reprompt(messages.WELCOME.REPROMPT)
            .withShouldEndSession(false)
            .getResponse();
    }
};

function getSession(handlerInput) {
    return handlerInput.attributesManager.getSessionAttributes();
}

function saveSession(handlerInput, sessionAttributes) {
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
}