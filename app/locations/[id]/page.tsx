"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/db";
import Link from "next/link";

declare global {
  interface Window {
    CORRECT_GUESS?: string;
  }
}

const room = db.room();

export default function LocationPage() {
  const { id } = useParams();

  const { data } = db.useQuery({ locations: {} });

  const publishReset = room.usePublishTopic("reset");

  useEffect(() => {
    // @ts-expect-error wip
    publishReset(true);
  }, [publishReset]);

  const locations = data?.locations.sort((a, b) => a.order - b.order) ?? [];

  const location = locations.find((l) => l.id === id);
  const indexOfLocation = locations.findIndex((l) => l.id === id);
  const nextLocation =
    indexOfLocation !== -1 ? locations[indexOfLocation + 1] : null;

  window.CORRECT_GUESS = location?.state;

  const [guesses, setGuesses] = useState<{ name: string; guess: string }[]>([]);

  room.useTopicEffect("guesses", (data: { name: string; guess: string }) => {
    setGuesses((guesses) => [data, ...guesses]);

    if (data.guess === window.CORRECT_GUESS) {
      alert(`${data.name} got it right — ${window.CORRECT_GUESS}!`);
    }
  });

  if (data && !location) {
    return <div>Location with ID {id} not found</div>;
  }

  return (
    <div className="grid grid-cols-[1fr_350px]">
      <div className="relative">
        <iframe src={location?.iframeUrl} className="h-screen w-full" />
        <div className="bg-black h-20 w-48 absolute top-0 left-0" />
      </div>

      <div className="p-4 h-screen overflow-hidden">
        {nextLocation && (
          <Link
            href={`/locations/${nextLocation.id}`}
            className="block text-right"
          >
            Next &rarr;
          </Link>
        )}

        {guesses.map((guess) => (
          <div key={guess.name + guess.guess} className="text-xl">
            <span>{guess.name}: </span>
            <span>{guess.guess}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
