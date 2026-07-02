import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      '__PADDLE_ENV__': JSON.stringify(env),
      'process.env.PADDLE_CLIENT_TOKEN': JSON.stringify(env.PADDLE_CLIENT_TOKEN || ''),
      'process.env.VITE_PADDLE_CLIENT_TOKEN': JSON.stringify(env.VITE_PADDLE_CLIENT_TOKEN || ''),
      'process.env.VITE_PADDLE_PRICE_BUILD_SINGLE': JSON.stringify(env.VITE_PADDLE_PRICE_BUILD_SINGLE || ''),
      'process.env.VITE_PADDLE_PRICE_LAUNCH_SINGLE': JSON.stringify(env.VITE_PADDLE_PRICE_LAUNCH_SINGLE || ''),
      'process.env.VITE_PADDLE_PRICE_TEAM_MONTHLY': JSON.stringify(env.VITE_PADDLE_PRICE_TEAM_MONTHLY || ''),
      'process.env.VITE_PADDLE_PRICE_TEAM_YEARLY': JSON.stringify(env.VITE_PADDLE_PRICE_TEAM_YEARLY || ''),
      'process.env.VAPI_PUBLIC_API_KRY': JSON.stringify(env.VAPI_PUBLIC_API_KRY || ''),
      'process.env.VAPI_PUBLIC_API_KEY': JSON.stringify(env.VAPI_PUBLIC_API_KEY || ''),
      'process.env.VITE_VAPI_PUBLIC_API_KEY': JSON.stringify(env.VITE_VAPI_PUBLIC_API_KEY || ''),
      'process.env.VAPI_PUBLIC_KEY': JSON.stringify(env.VAPI_PUBLIC_KEY || env.VAPI_PUBLIC_KEY?.trim() || ''),
      'process.env.VAPI_ASSISTANT_ID': JSON.stringify(env.VAPI_ASSISTANT_ID || ''),
      'process.env.VITE_VAPI_ASSISTANT_ID': JSON.stringify(env.VITE_VAPI_ASSISTANT_ID || ''),
      'process.env.ASSISTANT_ID': JSON.stringify(env.ASSISTANT_ID || env.ASSISTANT_ID?.trim() || ''),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
