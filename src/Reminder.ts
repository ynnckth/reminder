import {ReminderMessage} from './ReminderMessage';
import {Job, scheduleJob} from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';

class Reminder {

  private chatIds: number[] = [];
  private scheduledJobs: Job[] = [];

  constructor(private reminders: ReminderMessage[], private bot: TelegramBot) {
  }

  registerChatId(chatId: number): boolean {
    if (this.chatIds.includes(chatId)) {
      console.log(`Chat id ${chatId} is already registered`);
      return false;
    }
    this.chatIds.push(chatId);
    console.log(`Registered chat id ${chatId}`);
    this.reminders.forEach(reminder => {
      this.scheduledJobs.push(
        scheduleJob(
          reminder.name,
          reminder.schedule,
          async () => {
          await this.bot.sendMessage(chatId, `☑️ ${reminder.message}`);
          console.log('Sent reminder to chat id', chatId);
        }));
      console.log('Scheduled reminder for chat id', chatId);
    });
    return true;
  }

  getAllReminders() {
    return this.reminders.map(reminder => reminder.name);
  }

  isChatIdRegistered(chatId: number) {
    return this.chatIds.includes(chatId);
  }
}

export default Reminder;