# FitLog

FitLog is a dark, no-nonsense workout library for discovering lifts, reviewing exercise details, and building a focused training plan.

## Technologies

- Next.js App Router
- React
- Tailwind CSS v4
- FitLog REST API
- Browser localStorage for plan and saved workouts

## Features

- Responsive workout library with API-backed cards and remote images
- Sort workouts by duration, calories, or rating
- Detailed workout pages with specs and step-by-step instructions
- Add workouts to Today's Plan with a five-lift cap
- Save workouts for later and switch between plan and saved tabs
- Live navbar counters for plan and saved workouts
- Completion, removal, toast feedback, loading states, and a custom 404 page

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- One workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
```
