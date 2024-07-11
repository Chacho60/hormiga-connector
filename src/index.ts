/**
 * Index Module
 *
 * Handles the init for the telegram bot and starts the processing of messages
 * from the queue.
 */

import "dotenv/config";
import { Bot } from "./telegram/bot.js";
import { receiveFromQueue } from "./queue/queueService.js";
import { ProcessedMessage } from "./types.js";

const bot = new Bot();
bot.start();

const processQueueMessage = (msg: ProcessedMessage) => {
  // Handle the message
  console.log(`Processing message from queue: ${JSON.stringify(msg)}`);
  bot.sendMessage(msg.chatId, `${msg.text}`);
};

receiveFromQueue(processQueueMessage);
