'use client';
import { Input } from '@/components/ui/input';
import { MatchesResponse } from '@/utils/types';
import Image from 'next/image';
type GameDetailsProps = {
  matches: MatchesResponse;
};

export const GameDetails = ({ matches }: GameDetailsProps) => {
  console.log(matches);

  const todaysMatches = Object.groupBy(
    matches.matches,
    (match) => match.competition.id
  );

  return (
    <>
      <header className='flex items-center justify-between bg-white p-4 rounded-xl w-full mb-4'>
        <h1>Today's Matches</h1>
        <Input
          className='w-56 rounded-full border-none bg-gray-100 ml-2'
          placeholder='Search'
        />
      </header>

      {Object.keys(todaysMatches).map((competitionId) => {
        const matches = todaysMatches[+competitionId];

        if (!matches || matches.length === 0) {
          return null;
        }

        return matches.map((match) => {
          return (
            <section key={match.id} className='bg-white rounded-xl w-full mb-4'>
              <header className='flex items-center gap-2 p-4 py-2 bg-gray-50 rounded-t-xl'>
                <Image
                  src={match.competition.emblem}
                  alt={match.competition.name}
                  width={24}
                  height={24}
                />
                <h2 className='font-bold'>{match.competition.name}</h2>
              </header>
              <div className='p-4'>
                <h3>{match.homeTeam.name}</h3>
                <h3>{match.awayTeam.name}</h3>
              </div>
            </section>
          );
        });
      })}
    </>
  );
};
