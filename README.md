# Slack notifier of A Township Tale

This script adds people who have joined or left A Township Tale's server to the Slack channel. it assumes the use of Node.js, Puppeteer and Crontab. It uses Node.js, Puppeteer, and Crontab. The mechanism is to scrape the dashboard at the URL https://dash.townshiptale.com/ and notify the user.

# Usage

1. install node.js
1. install puppettier (If you use linux server, please see if ubuntu [https://dev.to/chis0m/installing-puppeteer-on-an-ubuntu-aws-ec2-instance-5o7](https://dev.to/chis0m/installing-puppeteer-on-an-ubuntu-aws-ec2-instance-5o7), if centos [https://frugalisminds.com/how-to-setup-puppeteer-in-centos-7/](https://frugalisminds.com/how-to-setup-puppeteer-in-centos-7/))
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

1. Test notification with your login.

```
npm start
```

1. setting crontab -e

```
* * * * *  cd /home/username/workspace/slack-notice-township/ && /home/username/workspace/slack-notice-township/node_modules/.bin/ts-node /home/username/workspace/slack-notice-township/index.ts
```
