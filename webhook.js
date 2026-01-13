/**
 * Once your bot steps into the screen with webhook action enabled, it requests your webhook URL with a full set of currently available variables.
 * Here you can add handlers for such actions to calculate any data for your bot.
 * Every handler is a simple function that accepts an object with variables from your bot and can modify it.
 * Once the handler has modified or added some variables, the bot receives them and continues to execute blocks in scenario.
 * Please read more here https://github.com/aimylogic/nodejs-webhook
 */


'use strict';

const express = require('express');

const app = express();

// Инициализируем глобальный объект $session для хранения данных в памяти
// Примечание: при перезапуске скрипта данные в памяти сбросятся.
global.$session = {}; 

app.use(express.json());

app.post('/webhook', (req, res) => {
    try {
        const payload = req.body;

        // 1. Простейшая валидация входящих данных
        if (!payload || !payload.query || !payload.data) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid payload format." 
            });
        }

        // 2. Логика фильтрации (если нужно сохранять только этот эвент)
        if (payload.query === 'event:tv_apps_update') {
            console.log(`[${new Date().toISOString()}] Получены данные tv_apps_update`);

            // --- ВЫПОЛНЕНИЕ ВАШЕГО ТРЕБОВАНИЯ ---
            // Сохраняем все тело 'data' (включая pacakges) в $session.dadata
            $session.dadata = payload.data;
            
            // Если нужно сохранить ВЕСЬ запрос целиком, используйте: $session.dadata = payload;
            
            console.log('Данные успешно сохранены в переменную $session.dadata');
            console.log('Текущее содержимое $session.dadata:', JSON.stringify($session.dadata, null, 2));
        }

        // 3. Ответ клиенту
        res.status(200).json({ 
            success: true, 
            message: "Data saved to session memory" 
        });

    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

	
