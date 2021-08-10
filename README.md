# Slack notifier of A Township Tale

This script adds people who have joined or left A Township Tale's server to the Slack channel. it assumes the use of Node.js, Puppeteer and Crontab. It uses Node.js, Puppeteer, and Crontab. The mechanism is to scrape the dashboard at the URL https://dash.townshiptale.com/ and notify the user.

# Usage

1. install node.js
1. install puppettier
1. install this scripts

```
npm i
```

1. setting config.json from config.json.example in current directory

```
{
    "username" : "<your ATT username>",
    "password" : "<your ATT password>",
    "serverID" : "<your ATT server id>",
    "webhookURL" : "<Slack Incomming Webhook URL>"
}
```

1. setting crontab -e

```
* * * * *  /home/username/workspace/slack-notice-township/node_modules/.bin/ts-node /home/username/workspace/slack-notice-township/index.ts
```
