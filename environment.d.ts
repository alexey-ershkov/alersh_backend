declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      GITHUB_AUTH_TOKEN: string;
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
