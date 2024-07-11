import TelegramBot from "node-telegram-bot-api";

export interface ProcessedMessage {
  chatId: number;
  text: string;
}

export type TelegramMessage = TelegramBot.Message;
