import { AudioMessage, ImageMapMessage, ImageMessage } from '@line/bot-sdk';

export function textMessage(
  text: string,
  data?: Record<string, string>
): {
  type: 'text';
  text: string;
} {
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      text = text.replace(`{${key}}`, value);
    }
  }

  return {
    type: 'text',
    text
  };
}

export function imageMessage(url: string): ImageMessage {
  return {
    type: 'image',
    originalContentUrl: encodeURI(url),
    previewImageUrl: encodeURI(url)
  };
}

export function noBgImageMessage(url: string): ImageMapMessage {
  return {
    type: 'imagemap',
    baseUrl: encodeURI(url),
    altText: 'Send A Message to you',
    baseSize: {
      width: 300,
      height: 1040
    },
    actions: []
  };
}

export function audioMessage(url: string, duration: number): AudioMessage {
  return {
    type: 'audio',
    originalContentUrl: encodeURI(url),
    duration
  };
}
