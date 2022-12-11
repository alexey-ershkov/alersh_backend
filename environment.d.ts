declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      GITHUB_AUTH_TOKEN: string;
      TELEGRAM_BOT_TOKEN: string;
      CHAT_ID: string;
      PORT?: string;
      ALLOW_LIST: string;
    }
  }
}

export {};
