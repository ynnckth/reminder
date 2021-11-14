import TelegramBot from 'node-telegram-bot-api';
import reminders from './reminders.json';
import Reminder from './Reminder';

require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const reminder = new Reminder(reminders, bot);

bot.onText(/\/remindme/,async (msg) => {
  const chatId = msg.chat.id;
  reminder.registerChatId(chatId);
  await bot.sendMessage(chatId, `OK, I'll start reminding you`);
});
