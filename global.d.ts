/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
// globals.d.ts
export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
