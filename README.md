
# ECommerce with Bitrix

It's a online shop with bitrix integration.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

## frontend

`VITE_SERVER_URL`

## backend

`DATABASE_URL`

`JWT_SECRET`

`BITRIX_HOOK`

## Installation

Install project with pnpm


## backend
```bash
  cd backend
  pnpm install
  npx prisma db push
  pnpm start
```

## frontend
```bash
  cd frontend
  pnpm install
  pnpm run dev
```
