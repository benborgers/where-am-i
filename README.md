# Where Am I?

A [GeoGuessr](https://geoguessr.com)-inspired game where [JumboCode](https://jumbocode.org) teams can work in teams to try to guess the location of a Google Street View image.

Locations are in the U.S., and teams have 2 guesses to get the correct U.S. state.

The `/locations/[id]` page is meant to be projected, and each time is meant to have one person go to `/` to submit their guesses.

This app was built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Instant DB](https://instantdb.com).

It was built in 35 minutes over dinner on Nov 3rd, before our whole-club Hack Night. It didn’t fall over at least, but it’s some pretty rough React code (see: writing to `window` in [`locations/[id]/page.tsx`](./app/locations/[id]/page.tsx) — this is bad practice).

### Issues

- The locations aren’t [secured with permissions](https://www.instantdb.com/docs/permissions) in the database; I just hoped that no one would reverse-engineer the database in the 10 minutes that we played.
- If you refresh the page, you can get 2 more guesses — but everyone can see on the projected screen that you guessed more times than is allowed.
- Many more, I’m sure.
