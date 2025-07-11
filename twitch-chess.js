// --- Twitch Chess Integration ---

// Ustaw te dane na swoje!
const TWITCH_CLIENT_ID = '6ett8vyjp3x0cvxa2wzleuwh5sw4hk'; // <- Uzupełnij!
const TWITCH_REDIRECT_URI = 'https://nusmass.github.io/chess-game-twitch/';
const TWITCH_SCOPE = 'chat:read';

const connectBtn = document.getElementById('twitch-connect-btn');
const channelInput = document.getElementById('twitch-channel-input');
const usernameInput = document.getElementById('twitch-username-input');

if (connectBtn) {
  connectBtn.onclick = function () {
    // Zapisz wybrane dane do localStorage, by były dostępne po redirect
    if (channelInput && usernameInput) {
      localStorage.setItem('TWITCH_CHANNEL', channelInput.value.trim());
      localStorage.setItem('TWITCH_USERNAME', usernameInput.value.trim());
    }
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(TWITCH_REDIRECT_URI)}` +
      `&response_type=token&scope=${encodeURIComponent(TWITCH_SCOPE)}`;
    window.location.href = url;
  };
}

// 2. Pobierz access_token z URL po autoryzacji
function getTwitchAccessToken() {
  const hash = window.location.hash;
  if (hash && hash.includes('access_token=')) {
    return hash.match(/access_token=([^&]+)/)[1];
  }
  return null;
}

const twitchAccessToken = getTwitchAccessToken();

// 3. Połącz z czatem przez tmi.js
if (twitchAccessToken && typeof tmi !== 'undefined') {
  // Ukryj przycisk po połączeniu
  if (connectBtn) connectBtn.style.display = 'none';

  // Pobierz dane z localStorage lub domyślne
  const TWITCH_CHANNEL = localStorage.getItem('TWITCH_CHANNEL') || 'nusmasito';
  const TWITCH_USERNAME = localStorage.getItem('TWITCH_USERNAME') || 'nusmasito';

  const twitchClient = new tmi.Client({
    options: { debug: true },
    identity: {
      username: TWITCH_USERNAME,
      password: 'oauth:' + twitchAccessToken
    },
    channels: [TWITCH_CHANNEL]
  });

  twitchClient.connect();

  // System natychmiastowego ruchu czarnych
  let czarneMogaRuszac = true;

  twitchClient.on('message', (channel, tags, message, self) => {
    if (typeof window.turn === 'undefined') return;
    // Tylko tura czarnych, tylko pierwszy legalny ruch
    if (window.turn === 'b' && czarneMogaRuszac && /^[a-h][1-8][a-h][1-8]$/.test(message.trim())) {
      // Sprawdź legalność ruchu przez chess.js
      const fromCol = message.charCodeAt(0) - 97;
      const fromRow = 8 - parseInt(message[1]);
      const toCol = message.charCodeAt(2) - 97;
      const toRow = 8 - parseInt(message[3]);
      if (typeof getLegalMoves === 'function') {
        const legalMoves = getLegalMoves(fromRow, fromCol);
        const move = legalMoves.find(m => m.row === toRow && m.col === toCol);
        if (move) {
          window.selected = { row: fromRow, col: fromCol };
          window.possibleMoves = legalMoves;
          if (typeof window.onSquareClick === 'function') {
            window.onSquareClick({ currentTarget: { dataset: { row: toRow, col: toCol } } });
            czarneMogaRuszac = false;
          }
        }
      }
    }
  });

  // Po każdym ruchu białych odblokuj czarne
  window.onTurnChange = function(turn) {
    if (turn === 'b') czarneMogaRuszac = true;
  };
} 