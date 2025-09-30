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

// Declare CSS modules to fix import errors
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
