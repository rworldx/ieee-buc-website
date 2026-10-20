# Quick start

Requirements: Node.js 24 LTS and npm.

```sh
npm ci
npm run dev -- --port 3100
```

Open http://localhost:3100. Arabic: http://localhost:3100/ar.

Use the appearance controls in the desktop header or mobile menu to select Light, Dark or Auto. The language link opens the corresponding page.

Before deployment, set `NEXT_PUBLIC_BASE_URL` to your HTTPS origin and run `npm run lint`, `npm test`, `npm run build`, and `npm audit --omit=dev`.

The contact form opens an email draft; it does not send or store messages. See [README.md](README.md) for content editing and hosting details.
