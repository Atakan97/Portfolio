# Personal Portfolio Website

Personal portfolio website of Atakan Arda Celik, Software Engineer who is interested in Full-stack, Data and AI Engineering.

## Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Motion**: [Framer Motion](https://www.framer.com/motion/)

## AI chatbot

The portfolio includes a custom AI widget. It uses Cloudflare Workers AI and Upstash Redis on their free plans. No model calls run until the server credentials are configured and `CHAT_ENABLED=true`.

To enable the chatbot:

1. Add the variables from [.env.example](.env.example) to `.env.local`, keeping any existing settings.
2. Create a Cloudflare Workers AI token with **Workers AI Read and Edit** permissions for your account. Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`.
3. Create an Upstash Redis database on the **Free** plan. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` using its REST credentials.
4. Generate a secret with the command below and save the output as `CHAT_RATE_LIMIT_SECRET`.
5. Set `CHAT_ENABLED=true` and restart the development server with `npm run dev` (`npm.cmd run dev` in Windows PowerShell).

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```
