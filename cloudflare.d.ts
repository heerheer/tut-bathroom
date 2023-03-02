import type { CloudflareResponseBody } from 'vite-plugin-cloudflare-functions/worker';

import 'vite-plugin-cloudflare-functions/client';

declare module 'vite-plugin-cloudflare-functions/client' {
  interface PagesResponseBody {
    '/api/book': {
      GET: CloudflareResponseBody<typeof import('functions/api/book')['onRequestGet']>;
    };
    '/api/hello': {
      GET: CloudflareResponseBody<typeof import('functions/api/hello')['onRequestGet']>;
      POST: CloudflareResponseBody<typeof import('functions/api/hello')['onRequestPost']>;
    };
    '/api/order': {
      GET: CloudflareResponseBody<typeof import('functions/api/order')['onRequestGet']>;
      POST: CloudflareResponseBody<typeof import('functions/api/order')['onRequestPost']>;
      DELETE: CloudflareResponseBody<typeof import('functions/api/order')['onRequestDelete']>;
    };
    '/api/qrcode': {
      GET: CloudflareResponseBody<typeof import('functions/api/qrcode')['onRequestGet']>;
    };
    '/api/room': {
      GET: CloudflareResponseBody<typeof import('functions/api/room')['onRequestGet']>;
    };
    '/api/user': {
      GET: CloudflareResponseBody<typeof import('functions/api/user')['onRequestGet']>;
    };
  }
}
