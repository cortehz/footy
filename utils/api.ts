// export async function fetchFixtures(startDate: string, endDate: string) {
//   const response = await fetch(
//     `/api/fixtures?startDate=${startDate}&endDate=${endDate}`
//   );
//   return response.json();
// }

export async function fetchFixtures(startDate: string, endDate: string) {
  const response = await fetch(
    `/api/fixtures?startDate=${startDate}&endDate=${endDate}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch EPL fixtures');
  }
  return data;
}

const FOOTBALL_API_BASE = 'https://api.football-data.org/v4';

export async function fetchFixtures2() {
  const response = await fetch(`${FOOTBALL_API_BASE}/competitions`, {
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_API_KEY!,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch EPL fixtures');
  }
  return data;
}

export async function fetchH2H(matchId: number) {
  const response = await fetch(`/api/h2h?matchId=${matchId}`);
  return response.json();
}

export async function fetchTeamForm(teamId: number) {
  const response = await fetch(`/api/team-form?teamId=${teamId}`);
  return response.json();
}

export async function predictOutcome(
  fixtureData: any,
  h2hData: any,
  teamFormData: any
) {
  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fixtureData, h2hData, teamFormData }),
  });
  return response.json();
}

export async function predictOutcome2(
  fixtureData: any,
  h2hData: any,
  teamFormData: any
) {
  const response = await fetch('/api/predict2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fixtureData, h2hData, teamFormData }),
  });
  return response.json();
}
