import { GameDetails } from '@/components/game-details';
import { api } from '@/utils/api';
import { MatchesResponse } from '@/utils/types';

export default async function Index() {
  const { data: matches, error } = await api.get<MatchesResponse>('matches');
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!matches) {
    return <div>No matches found</div>;
  }

  return (
    <>
      <GameDetails matches={matches} />
    </>
  );
}
