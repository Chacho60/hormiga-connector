/**
 * Queue Service Module
 *
 * This module provides functions to send and receive messages from RabbitMQ.
 */

import { connect, Channel, Connection, ConsumeMessage } from "amqplib";
import { ProcessedMessage } from "../types.js";

const OUTGOING_QUEUE = process.env.OUTGOING_QUEUE!;
const INCOMING_QUEUE = process.env.INCOMING_QUEUE!;

let connection: Connection;
let channel: Channel;

export const sendToQueue = async (message: any) => {
  const connection = await connect(process.env.QUEUE_URL!);
  const channel = await connection.createChannel();
  await channel.assertQueue(INCOMING_QUEUE, { durable: true });
  channel.sendToQueue(INCOMING_QUEUE, Buffer.from(JSON.stringify(message)));
  await channel.close();
  await connection.close();
};

export const receiveFromQueue = async (
  callback: (msg: ProcessedMessage) => void
): Promise<void> => {
  try {
    if (!connection) {
      connection = await connect(process.env.QUEUE_URL!);
      channel = await connection.createChannel();
      await channel.assertQueue(OUTGOING_QUEUE, { durable: true });
    }

    channel.consume(OUTGOING_QUEUE, (msg: ConsumeMessage | null) => {
      if (msg) {
        const message: ProcessedMessage = JSON.parse(msg.content.toString());
        console.log(`Received message: ${JSON.stringify(message)}`);
        callback(message);
        channel.ack(msg);
      }
    });

    console.log(`Listening for messages on queue: ${OUTGOING_QUEUE}`);
  } catch (error) {
    console.error("Failed to receive messages from queue:", error);
  }
};
