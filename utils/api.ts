const FOOTBALL_API_BASE = 'https://api.football-data.org';

type RequestMethod = 'GET' | 'POST';

interface FetchOptions extends RequestInit {
  data?: unknown;
  apiVersion?: 'v1' | 'v2' | 'v3' | 'v4';
}

interface ApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
  status: number;
}

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

export async function fetchCompetions() {
  const response = await fetch(`${FOOTBALL_API_BASE}/competitions`, {
    headers: {},
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

// Create the base fetcher
const createApiFetcher = () => {
  const fetchWithConfig = async <T>(
    endpoint: string,
    method: RequestMethod,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> => {
    const { apiVersion = 'v4', data, ...customOptions } = options;

    try {
      // Get token only if auth is required
      let headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.FOOTBALL_API_KEY!,
      };

      const response = await fetch(
        `${FOOTBALL_API_BASE}/${apiVersion}/${endpoint}`,
        {
          method,
          headers,
          ...(data ? { body: JSON.stringify(data) } : {}),
          ...customOptions,
        }
      );

      const status = response.status;

      if (!response.ok) {
        if (status === 401) {
          return {
            data: null,
            error: { message: 'Unauthorized' },
            status,
          };
        }

        return {
          data: null,
          error: { message: `HTTP error! status: ${status}` },
          status,
        };
      }

      // Handle 204 No Content
      if (status === 204) {
        return { data: null, error: null, status };
      }

      //Ensure that we get a response back to prevent unexpected json input
      const responseData =
        status !== 204 && response.headers.get('Content-Length') !== '0'
          ? await response.json()
          : null;

      return { data: responseData, error: null, status };
    } catch (error) {
      return {
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'Network error',
        },
        status: 0,
      };
    }
  };

  // Return API methods
  return {
    get: <T>(endpoint: string, options?: FetchOptions) =>
      fetchWithConfig<T>(endpoint, 'GET', options),
    post: <T>(endpoint: string, data: unknown, options?: FetchOptions) =>
      fetchWithConfig<T>(endpoint, 'POST', { ...options, data }),
  };
};

// Export a singleton instance
export const api = createApiFetcher();
