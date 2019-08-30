/**
 * Once your bot steps into the screen with webhook action enabled, it requests your webhook URL with a full set of currently available variables.
 * Here you can add handlers for such actions to calculate any data for your bot.
 * Every handler is a simple function that accepts an object with variables from your bot and can modify it.
 * Once the handler has modified or added some variables, the bot receives them and continues to execute blocks in scenario.
 * Please read more here https://github.com/aimylogic/nodejs-webhook
 */

'use strict';


const https = require('https');

module.exports = (webhook) => {
  webhook.on('sort', (session) => {
      return new Promise((resolve, reject) => {
         https.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSt0XvHjnahlX57fHa_H12m-Bfa0C0WAfWAH5lhaQGg2V-PLUtRikiQ7ZuqUBPhNYr2FcJQ2oM4Nvvc/pubhtml', (resp) => {
             session.variable = 'result';
             resolve(); // Промис выполнен
         });
      });
  });
};
