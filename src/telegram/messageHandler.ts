/**
 * Message Handler Module
 *
 * This module handles incoming telegram messages and convert them into
 * a processed message format.
 */

import { TelegramMessage, ProcessedMessage } from "../types";

export const handleMessage = (msg: TelegramMessage): ProcessedMessage => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  return {
    chatId,
    text,
  };
};
