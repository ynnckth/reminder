import TelegramBot from 'node-telegram-bot-api';
import reminders from './reminders.json';
import Reminder from './Reminder';

require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const reminder = new Reminder(reminders, bot);

bot.onText(/\/remindme/, async (msg) => {
  const chatId = msg.chat.id;
  const registered = reminder.registerChatId(chatId);
  const replyMessage = registered
    ? 'OK, I\'ll start reminding you'
    : 'Skipped'
  await bot.sendMessage(chatId, replyMessage);
});
