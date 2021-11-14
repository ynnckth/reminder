import {ReminderMessage} from './ReminderMessage';
import {Job, scheduleJob} from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';

class Reminder {

  private chatIds: number[] = [];
  private scheduledJobs: Job[] = [];

  constructor(private reminders: ReminderMessage[], private bot: TelegramBot) {
  }

  registerChatId(chatId: number) {
    if (this.chatIds.find((chatId) => chatId === chatId)) {
      console.log(`Chat id ${chatId} is already registered`);
      return;
    }
    this.chatIds.push(chatId);
    console.log(`Registered chat id ${chatId}`);
    this.reminders.forEach(reminder => {
      this.scheduledJobs.push(scheduleJob(reminder.schedule, async () => {
        await this.bot.sendMessage(chatId, reminder.message);
        console.log('Sent reminder to chat id', chatId);
      }));
      console.log('Scheduled reminder for chat id', chatId);
    });
  }
}
export default Reminder;