# FitLog

FitLog is a focused workout discovery app for finding exercises, reviewing their details, and building a practical training plan. Its dark, high-contrast interface is designed for quick scanning on desktop and mobile.

## Technologies Used

- Next.js 16 with the App Router
- React 19
- TypeScript and JavaScript
- Tailwind CSS v4
- FitLog REST API
- Browser `localStorage` for saved workouts and training plans

## Key Features

1. **Workout library**: Browse API-powered workout cards with exercise images, categories, duration, calories, and ratings.
2. **Workout details**: Open a dedicated page with equipment, difficulty, sets, reps, specifications, and step-by-step instructions.
3. **Today's Plan**: Add exercises to a focused plan with a five-workout limit.
4. **Save for later**: Keep favorite workouts available in the browser for future sessions.
5. **Responsive feedback**: Use loading states, error handling, toast notifications, live counters, and a custom not-found page throughout the app.

## API

FitLog reads workout data from the following endpoints:

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- One workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quality Checks

```bash
npm run lint
npm run build
```
