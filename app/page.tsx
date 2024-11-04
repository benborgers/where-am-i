"use client";

import { useState } from "react";
import Select from "react-select";
import { db } from "./db";

const options = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "Arkansas", label: "Arkansas" },
  { value: "California", label: "California" },
  { value: "Colorado", label: "Colorado" },
  { value: "Connecticut", label: "Connecticut" },
  { value: "Delaware", label: "Delaware" },
  { value: "Florida", label: "Florida" },
  { value: "Georgia", label: "Georgia" },
  { value: "Hawaii", label: "Hawaii" },
  { value: "Idaho", label: "Idaho" },
  { value: "Illinois", label: "Illinois" },
  { value: "Indiana", label: "Indiana" },
  { value: "Iowa", label: "Iowa" },
  { value: "Kansas", label: "Kansas" },
  { value: "Kentucky", label: "Kentucky" },
  { value: "Louisiana", label: "Louisiana" },
  { value: "Maine", label: "Maine" },
  { value: "Maryland", label: "Maryland" },
  { value: "Massachusetts", label: "Massachusetts" },
  { value: "Michigan", label: "Michigan" },
  { value: "Minnesota", label: "Minnesota" },
  { value: "Mississippi", label: "Mississippi" },
  { value: "Missouri", label: "Missouri" },
  { value: "Montana", label: "Montana" },
  { value: "Nebraska", label: "Nebraska" },
  { value: "Nevada", label: "Nevada" },
  { value: "New Hampshire", label: "New Hampshire" },
  { value: "New Jersey", label: "New Jersey" },
  { value: "New Mexico", label: "New Mexico" },
  { value: "New York", label: "New York" },
  { value: "North Carolina", label: "North Carolina" },
  { value: "North Dakota", label: "North Dakota" },
  { value: "Ohio", label: "Ohio" },
  { value: "Oklahoma", label: "Oklahoma" },
  { value: "Oregon", label: "Oregon" },
  { value: "Pennsylvania", label: "Pennsylvania" },
  { value: "Rhode Island", label: "Rhode Island" },
  { value: "South Carolina", label: "South Carolina" },
  { value: "South Dakota", label: "South Dakota" },
  { value: "Tennessee", label: "Tennessee" },
  { value: "Texas", label: "Texas" },
  { value: "Utah", label: "Utah" },
  { value: "Vermont", label: "Vermont" },
  { value: "Virginia", label: "Virginia" },
  { value: "Washington", label: "Washington" },
  { value: "West Virginia", label: "West Virginia" },
  { value: "Wisconsin", label: "Wisconsin" },
  { value: "Wyoming", label: "Wyoming" },
];

const room = db.room();

export default function Home() {
  const publishGuess = room.usePublishTopic("guesses");

  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const [guess, setGuess] = useState<string | null>(null);

  const [guessesUsed, setGuessesUsed] = useState<number>(0);

  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameSubmitted(true);
  };

  const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuessesUsed((i) => i + 1);
    setGuess(null);

    // @ts-expect-error wip
    publishGuess({ name, guess });
  };

  room.useTopicEffect("reset", () => {
    setGuessesUsed(0);
  });

  return (
    <div className="p-4 pt-12">
      <h1 className="text-2xl font-black text-center italic">Where Am I?</h1>

      <div className="mt-24">
        {!nameSubmitted && (
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border-gray-300 focus:ring-teal-500 focus:border-teal-500 placeholder:text-gray-400"
              required
              placeholder="Enter your team name..."
            />
            <button className="mt-4 block w-full bg-teal-500 text-white font-semibold p-2">
              Connect
            </button>
          </form>
        )}

        {nameSubmitted && guessesUsed < 2 ? (
          <form onSubmit={handleGuessSubmit}>
            <div>
              <Select
                options={options}
                value={guess ? options.find((x) => x.value === guess) : null}
                onChange={(e) => setGuess(e!.value)}
              />
            </div>
            <button className="mt-4 block w-full bg-teal-500 text-white font-semibold p-2">
              Submit
            </button>
          </form>
        ) : (
          nameSubmitted &&
          guessesUsed >= 2 && (
            <div className="text-center text-gray-500">
              All guesses used for this round
            </div>
          )
        )}
      </div>
    </div>
  );
}
