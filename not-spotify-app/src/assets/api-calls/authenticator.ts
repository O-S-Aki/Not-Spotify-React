export const getCredentials = () => {
  const CREDENTIALS = {
    ClientId: '959f29fb894a4d7b834017f37700999d',
    ClientSecret: 'e0c8d1c95dc845cfa9d811cb116912f5',
    RedirectUri: 'http://localhost:3000',
    BaseUrl: 'https://api.spotify.com/v1',
    AuthEndpoint: 'https://accounts.spotify.com/authorize',
    Scopes: [
      'user-read-private',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-read-email',
      'user-library-read',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming',
      'app-remote-control',
      'user-top-read',
    ].join('%20'),
  }
  return CREDENTIALS;
};

export const getAuthUrl = () => {
  const credentials = getCredentials();
  const authUrl = `${credentials.AuthEndpoint}?client_id=${credentials.ClientId}&response_type=token&redirect_uri=${encodeURIComponent(credentials.RedirectUri)}&scope=${credentials.Scopes}`;
  return authUrl
}