This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## installation steps

# install - shadcn/ui
- npx shadcn@latest init

# create button and other component
- npx shadcn@latest add button (it will create component folder under project then ui folder and button.jsx)
- npx shadcn@latest add badge alert-dialog card dialog dropdown-menu input label progress radio-group select sonner tabs textarea

# install dark theme from shadcn

- npm install next-themes

# Run Project
- npm run dev

# create clerk login(Authentication)
- npm install @clerk/nextjs

# dark theme for clerk
- npm install @clerk/theme

# connect with POSTGRES DataBase with
- POSTGRESSQL_DATABASE_URL

# Background job handleing with inngest
- npm i inngest
- npx inngest-cli@latest dev
## Click on local machine Link to see inngest dashboard locally
Inngest Dev Server online at 0.0.0.0:8288, visible at the following URLs:

         - http://127.0.0.1:8288 (http://localhost:8288)
         - http://192.168.1.223:8288