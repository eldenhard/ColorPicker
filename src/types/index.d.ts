export {};
export interface IElectronAPI {
  onGlobalShortcut: (callback: (message: string) => void) => void;
  getCursorPosition: () => Promise<{ x: number; y: number }>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
      ping: () => Promise<void>;
    };
  }
}
