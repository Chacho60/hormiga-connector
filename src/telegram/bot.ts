/**
 * Telegram Bot Module
 *
 * This module defines a Bot class for using Telegram's bot API,
 * handling incoming messages, and sending messages to a queue.
 */

import TelegramBot from "node-telegram-bot-api";
import { handleMessage } from "./messageHandler.js";
import { sendToQueue } from "../queue/queueService.js";
import { TelegramMessage } from "../types.js";

export class Bot {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });
  }

  public start() {
    this.bot.on("message", async (msg: TelegramMessage) => {
      try {
        const response = handleMessage(msg);
        await sendToQueue(response);
      } catch (error) {
        console.error("Error processing message:", error);
        this.bot.sendMessage(
          msg.chat.id,
          "An error occurred while processing your message. Please try again."
        );
      }
    });

    this.bot.on("polling_error", (error) => {
      console.error("Polling error:", error);
    });
  }

  public sendMessage(chatId: number, text: string) {
    this.bot.sendMessage(chatId, text);
  }
}
