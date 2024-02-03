import { AudioMessage, ImageMapMessage, ImageMessage, TemplateConfirm, TextMessage } from '@line/bot-sdk';

export function textMessage(text: string, data?: Record<string, string>): TextMessage {
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

export function imagemapMessage(url: string, altText: string, ratio: number): ImageMapMessage {
  return {
    type: 'imagemap',
    baseUrl: encodeURI(url),
    altText: altText,
    baseSize: {
      width: 1040,
      height: Math.round(1040 * ratio)
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

export function confirmMessage(text: string, actions: { text: string; data: string }[]): TemplateConfirm {
  return {
    type: 'confirm',
    text,
    actions: actions.map((action) => ({
      type: 'postback',
      label: action.text,
      text: action.text,
      data: action.data
    }))
  };
}
