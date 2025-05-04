/**
 * Represents a message sent between two users.
 */
export interface Message {
  /**
   * The sender's user ID.
   */
  senderId: string;
  /**
   * The recipient's user ID.
   */
  recipientId: string;
  /**
   * The content of the message.
   */
  content: string;
  /**
   * The timestamp of when the message was sent.
   */
  timestamp: Date;
}

/**
 * Asynchronously sends a message from one user to another.
 *
 * @param senderId The ID of the user sending the message.
 * @param recipientId The ID of the user receiving the message.
 * @param content The content of the message.
 * @returns A promise that resolves when the message is sent successfully.
 */
export async function sendMessage(
  senderId: string,
  recipientId: string,
  content: string
): Promise<void> {
  // TODO: Implement this by calling an API.

  return;
}

/**
 * Asynchronously retrieves messages between two users.
 *
 * @param userId1 The ID of the first user.
 * @param userId2 The ID of the second user.
 * @returns A promise that resolves to an array of Message objects.
 */
export async function getMessages(
  userId1: string,
  userId2: string
): Promise<Message[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      senderId: 'user1',
      recipientId: 'user2',
      content: 'Hello!',
      timestamp: new Date(),
    },
    {
      senderId: 'user2',
      recipientId: 'user1',
      content: 'Hi there!',
      timestamp: new Date(),
    },
  ];
}
