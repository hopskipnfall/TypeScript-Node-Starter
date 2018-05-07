export function createClient(options: ClientOptions): ChallongeClient;

export type ClientOptions = {
  /** Your challonge API Key. */
  apiKey: string,
  /** Sets the subdomain and automatically passes tournament[subdomain] and prefixes the subdomain to tournament urls.  If you don't want to pass a subdomain to the constructor, and want to use an organization (or multiple organizations), you must use client.setSubdomain('subdomain') before making api calls. */
  subdomain: string,
};

export interface ChallongeClient {
  tournaments: Tournaments;
}


/**
 * See https://api.challonge.com/v1/documents/tournaments/create.
 */
export type CreateTournamentOptions = {
  name: string,
  url: string,
  tournamentType: string | undefined,
  private: boolean | undefined,
  description: string | undefined,
  openSignup: boolean | undefined,
};
export type TypeWrapper = {
  tournament: any, // CreateTournamentOptions,
  callback: (error: any, data: any) => void,
};
export interface Tournaments {
  create(stuff: TypeWrapper): any;
}
