import nodemailer from 'nodemailer';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assets } from './assets.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Helper function to get MIME type
function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    txt: 'text/plain',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    eot: 'application/vnd.ms-fontobject',
    otf: 'font/otf'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

const port = process.env.PORT || 8080;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_ADDR = process.env.EMAIL_ADDR;
const oneDay = 86400000;


const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL_ADDR,
        pass: EMAIL_PASS
    }
});


const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Root path - serve index.html
    if (pathname === '/') {
      return new Response(assets.html['index.html'], {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Contact form submission
    if (pathname === '/contact' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const mailoptions = {
          from: 'daniel@knownastheway.com',
          to: 'aaron@knownastheway.com',
          replyTo: email,
          generateTextFromHTML: true,
          subject: `Website contact from: ${name}`,
          html: `<!DOCTYPE html><html><body><div><h3>${name} (${email}) filled out the contact us form at knownastheway.com: </h3><p>${message}</p></div></body></html>`
        };

        await smtpTransport.sendMail(mailoptions);
        return new Response(
          "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Sweet!</strong> Thanks for reaching out! We received your email and will respond as soon as possible.</div>",
          { headers: { 'Content-Type': 'text/html' } }
        );
      } catch (err) {
        console.error(err);
        return new Response('There was a problem with the contact form.', { status: 500 });
      }
    }

    // Static asset serving from bundled assets
    const cleanPath = pathname.slice(1); // Remove leading slash

    // CSS files
    if (cleanPath.startsWith('css/')) {
      const filename = cleanPath.replace('css/', '');
      if (assets.css[filename]) {
        return new Response(assets.css[filename], {
          headers: { 'Content-Type': 'text/css' }
        });
      }
    }

    // JavaScript files
    if (cleanPath.startsWith('scripts/')) {
      const filename = cleanPath.replace('scripts/', '');
      if (assets.scripts[filename]) {
        return new Response(assets.scripts[filename], {
          headers: { 'Content-Type': 'application/javascript' }
        });
      }
    }

    // Component files
    if (cleanPath.startsWith('components/')) {
      const filename = cleanPath.replace('components/', '');
      if (assets.components[filename]) {
        return new Response(assets.components[filename], {
          headers: { 'Content-Type': 'application/javascript' }
        });
      }
    }

    // Image files
    if (cleanPath.startsWith('images/')) {
      const filename = cleanPath.replace('images/', '');
      if (assets.images[filename]) {
        return new Response(assets.images[filename], {
          headers: { 'Content-Type': getMimeType(filename) }
        });
      }
    }

    // HTML views
    if (cleanPath.startsWith('views/')) {
      if (assets.html[cleanPath]) {
        return new Response(assets.html[cleanPath], {
          headers: { 'Content-Type': 'text/html' }
        });
      }
    }

    // Try to serve other files from assets
    if (assets.images[cleanPath]) {
      return new Response(assets.images[cleanPath], {
        headers: { 'Content-Type': getMimeType(cleanPath) }
      });
    }

    // Try to serve from filesystem for assets not bundled (fallback)
    try {
      const file = Bun.file(resolve(__dirname, 'public', cleanPath));
      if (await file.exists()) {
        return new Response(file, {
          headers: { 'Content-Type': getMimeType(cleanPath) }
        });
      }
    } catch (err) {
      // Fall through to 404
    }

    return new Response('Not Found', { status: 404 });
  }
});

console.log(`Server listening on localhost:${port}`);
