import TelegramBot from 'node-telegram-bot-api';
import Reminder from './Reminder';

class RemindmeagainBot {

  constructor(private telegramBot: TelegramBot, private reminder: Reminder) {
  }

  startListening() {
    // /remindme command
    this.telegramBot.onText(/\/remindme/, async (msg) => {
      const chatId = msg.chat.id;
      const registered = this.reminder.registerChatId(chatId);
      const replyMessage = registered
        ? 'OK, I\'ll start reminding you'
        : 'You\'re already being reminded'
      await this.sendMessage(chatId, replyMessage);
    });

    // /status command
    this.telegramBot.onText(/\/status/, async (msg) => {
      const chatId = msg.chat.id;
      const allReminders = this.reminder.getAllReminders();
      const replyMessage = `Currently registered reminders: \n${allReminders.map(reminder => `\t •️ ${reminder} \n`).join('')} \n ${this.reminder.isChatIdRegistered(chatId) ? 'Reminders are enabled for this chat' : 'Reminders are disabled for this chat'}`;
      await this.sendMessage(chatId, replyMessage);
    });
  }

  private async sendMessage(chatId: number, message: string) {
    return this.telegramBot.sendMessage(chatId, message);
  }
}

export default RemindmeagainBot;

