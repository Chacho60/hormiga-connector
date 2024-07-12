## Description

Connector and Telegram Bot service for Hormiga.

## Table of Contents

1. Installation
2. Configuration
3. Usage
4. Overview

## Installation

To install the application, follow these steps:

1. Clone the repository:
    
    ```bash
    git clone https://github.com/Chacho60/hormiga-connector.git
    cd hormiga-connector
    ```
    
2. Install the required dependencies:
    
    ```bash
    npm install
    ```
    
3. Build the application:
    
    ```bash
    npm run build
    ```
    

## Configuration

Configure your environment variables in a `.env` file at the root of the project. Here is an example of the variables you might need:

```
TELEGRAM_TOKEN=
QUEUE_URL=
OUTGOING_QUEUE=
INCOMING_QUEUE=
```

## Usage

To start the application, use the following command:

```bash
npm start
```

This will start the server on the port specified in the `.env` file.

## Overview

Typescript connector service for [hormiga-bot](https://github.com/Chacho60/hormiga-bot), it uses the Telegram API to receive messages and RabbitMQ to add those messages to a queue that will be consumed by hormiga-bot. It also uses an outgoing queue to send back messages to the telegram user.

This service is meant to be run alongside hormiga-bot, the .env.example file has values that have a local configuration, so it can be tested when using the docker in hormiga-bot. The only value not provided is the TELEGRAM_TOKEN which you’ll have to get by creating  a new bot.

Also, a live version of the bot hosted in railway, supbase and cloudamqp is available at https://t.me/chacho_ant_bot
