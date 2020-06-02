const messages = require('../config/messages');


const setupReminder = async (handlerInput, config) => {
    const client = handlerInput.serviceClientFactory.getReminderManagementServiceClient();

    var reminderRequest = {
      trigger: {
        type: 'SCHEDULED_RELATIVE',
        offsetInSeconds: config.duration * 60,
      },
      alertInfo: {
        spokenInfo: {
          content: [{
            locale: 'pt-BR',
            text: messages.TIMER.ROUND_END,
          }],
        },
      },
      pushNotification: {
        status: 'ENABLED',
      },
    };
    
    var reminderBreakEndRequest = {
      trigger: {
        type: 'SCHEDULED_RELATIVE',
        offsetInSeconds: config.duration + config.shortBreak * 60,
      },
      alertInfo: {
        spokenInfo: {
          content: [{
            locale: 'pt-BR',
            text: messages.TIMER.BREAK_END,
          }],
        },
      },
      pushNotification: {
        status: 'ENABLED',
      },
    };
    
    const workEndReminderResponse = await client.createReminder(reminderRequest);
    console.log(JSON.stringify("work reminder done"));
    const breakEndReminderResponse = await client.createReminder(reminderBreakEndRequest);
    console.log(JSON.stringify("break reminder done"));
    
}

module.exports = { setupReminder };