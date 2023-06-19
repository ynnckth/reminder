# Reminder
*A Telegram bot for scheduled recurring reminders*

## Usage

Register your reminders under `/src/reminders.json`.
Example: 
```
[
  {
    "name": "Drink coffee: daily at 10:00",
    "schedule": "00 10 * * *",
    "humanReadableSchedule": "Daily at 10:00",
    "message": "Coffee time!"
  }
]
```

Add the follwng telegram bot to a chat group: 
> reminderbot (@RemindmeagainBot)

#### Available chat commands

Start receiving messages: 
> /remindme

Check the current status:
> /status

Help: 
> /help


## Running the application

Using docker:
```
# Build the docker image
$ docker build -t reminder .

# Run a container
$ docker run -d -p 5000:5000 --name reminder --restart unless-stopped -e TELEGRAM_TOKEN=xxx reminder
```
