/* --- 1. FIREBASE CONFIGURATION --- */
const firebaseConfig = {
    apiKey: "AIzaSyDoZ15ZyJRRg-J9l2vX_OaNAjqdRQdcvQc",
    authDomain: "tic-tac-toe-emoji-quest-nest.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-emoji-quest-nest-default-rtdb.firebaseio.com",
    projectId: "tic-tac-toe-emoji-quest-nest",
    storageBucket: "tic-tac-toe-emoji-quest-nest.firebasestorage.app",
    messagingSenderId: "577925713120",
    appId: "1:577925713120:web:d20becfc0b2545e0925485",
    measurementId: "G-WNBEJPDK3P"
};

let db = null;

try {
    if (typeof firebase !== 'undefined') {
        // Fix: Check if an app already exists before initializing
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.database();
    }
} catch (e) {
    console.error("Firebase init failed:", e);
}

/* --- 2. GLOBAL CONSTANTS & QUESTS --- */
const playerEmojis = ['😊', '😂', '😍', '🤔', '😎', '🔥', '🏆', '⚔️', '💩', '👍', '👎', '👋', '🎉', '💔', '👀', '🤪', '👽', '👻', '🤡', '🥳', '🥶', '🤬', '🦄', '🐶', '🐱', '💀'];
const chatEmojis = ['😊', '😂', '😍', '🤔', '😎', '🔥', '🏆', '⚔️', '💩', '👍', '👎', '👋', '🎉', '💔', '👀', '🤪', '👽', '👻', '🤡', '🥳', '🥶', '🤬', '🦄', '🐶', '🐱', '💀'];
const ALL_QUESTS = [
    { id: 1, title: "Win 2 Matches", goal: 2, reward: 500, icon: "🏆", type: "wins" },
    { id: 2, title: "Win 5 Matches", goal: 5, reward: 1200, icon: "🏆", type: "wins" },
    { id: 3, title: "Win 10 Matches", goal: 10, reward: 2500, icon: "🏆", type: "wins" },
    { id: 4, title: "Play 3 Games", goal: 3, reward: 300, icon: "🎮", type: "plays" },
    { id: 5, title: "Play 7 Games", goal: 7, reward: 800, icon: "🎮", type: "plays" },
    { id: 6, title: "Play 15 Games", goal: 15, reward: 1800, icon: "🎮", type: "plays" },
    { id: 7, title: "Block 5 Cells", goal: 5, reward: 400, icon: "🛡️", type: "blocks" },
    { id: 8, title: "Block 12 Cells", goal: 12, reward: 1000, icon: "🛡️", type: "blocks" },
    { id: 9, title: "Block 20 Cells", goal: 20, reward: 2000, icon: "🛡️", type: "blocks" },
    { id: 10, title: "Get 2 Draws", goal: 2, reward: 400, icon: "🤝", type: "draws" },
    { id: 11, title: "Get 5 Draws", goal: 5, reward: 1000, icon: "🤝", type: "draws" },
    { id: 12, title: "Win 3 Matches in a row", goal: 3, reward: 1000, icon: "🔥", type: "streak" },
    { id: 13, title: "Reach Win Streak 5", goal: 5, reward: 2000, icon: "🔥", type: "streak" },
    { id: 14, title: "Play 5 Local Matches", goal: 5, reward: 600, icon: "👥", type: "mode_local" },
    { id: 15, title: "Play 5 Bot Matches", goal: 5, reward: 600, icon: "🤖", type: "mode_bot" },
    { id: 16, title: "Win 1 Match on 5x5 Board", goal: 1, reward: 500, icon: "📏", type: "win_size_5" },
    { id: 17, title: "Win 1 Match on 7x7 Board", goal: 1, reward: 800, icon: "📏", type: "win_size_7" },
    { id: 18, title: "Play 20 Games Total", goal: 20, reward: 2500, icon: "📈", type: "plays" },
    { id: 19, title: "Win with Challenge Mode 3 times", goal: 3, reward: 1500, icon: "🔥", type: "win_challenge" },
    { id: 20, title: "Block 30 Cells Total", goal: 30, reward: 3000, icon: "🛡️", type: "blocks" },
    { id: 21, title: "Play 10 Games in one day", goal: 10, reward: 1200, icon: "☀️", type: "plays" },
    { id: 22, title: "Win 8 Matches", goal: 8, reward: 2000, icon: "🏆", type: "wins" },
    { id: 23, title: "Complete 50 Moves", goal: 50, reward: 800, icon: "♟️", type: "moves" },
    { id: 24, title: "Complete 100 Moves", goal: 100, reward: 1800, icon: "♟️", type: "moves" },
    { id: 25, title: "Win 4 Matches", goal: 4, reward: 1000, icon: "🥇", type: "wins" },
    { id: 26, title: "Play 4 Games", goal: 4, reward: 400, icon: "🕹️", type: "plays" },
    { id: 27, title: "Block 8 Cells", goal: 8, reward: 700, icon: "🚧", type: "blocks" },
    { id: 28, title: "Win 1 Match on 3x3 Board", goal: 1, reward: 200, icon: "🔳", type: "win_size_3" },
    { id: 29, title: "Get 1 Draw", goal: 1, reward: 200, icon: "⚖️", type: "draws" },
    { id: 30, title: "Win 12 Matches", goal: 12, reward: 3500, icon: "💎", type: "wins" },
    { id: 31, title: "Play 12 Games", goal: 12, reward: 1500, icon: "🎡", type: "plays" },
    { id: 32, title: "Block 15 Cells", goal: 15, reward: 1400, icon: "🧱", type: "blocks" },
    { id: 33, title: "Reach Win Streak 2", goal: 2, reward: 400, icon: "✨", type: "streak" },
    { id: 34, title: "Reach Win Streak 4", goal: 4, reward: 1500, icon: "⚡", type: "streak" },
    { id: 35, title: "Play 2 Games on 5x5", goal: 2, reward: 500, icon: "🏁", type: "play_size_5" },
    { id: 36, title: "Play 2 Games on 7x7", goal: 2, reward: 700, icon: "🏁", type: "play_size_7" },
    { id: 37, title: "Win 6 Matches", goal: 6, reward: 1500, icon: "🏅", type: "wins" },
    { id: 38, title: "Play 6 Games", goal: 6, reward: 700, icon: "🎮", type: "plays" },
    { id: 39, title: "Block 10 Cells", goal: 10, reward: 900, icon: "🛡️", type: "blocks" },
    { id: 40, title: "Get 3 Draws", goal: 3, reward: 700, icon: "🤝", type: "draws" },
    { id: 41, title: "Win 2 Matches in a row", goal: 2, reward: 500, icon: "🔥", type: "streak" },
    { id: 42, title: "Play 8 Games", goal: 8, reward: 900, icon: "🎮", type: "plays" },
    { id: 43, title: "Win 7 Matches", goal: 7, reward: 1800, icon: "🏆", type: "wins" },
    { id: 44, title: "Block 6 Cells", goal: 6, reward: 500, icon: "🛡️", type: "blocks" },
    { id: 45, title: "Win 1 Match on 5x5 or 7x7", goal: 1, reward: 200, icon: "🌟", type: "win_big_board" },
    { id: 46, title: "Play 10 Local Matches", goal: 10, reward: 1500, icon: "👥", type: "mode_local" },
    { id: 47, title: "Play 10 Bot Matches", goal: 10, reward: 1500, icon: "🤖", type: "mode_bot" },
    { id: 48, title: "Get 4 Draws", goal: 4, reward: 900, icon: "🤝", type: "draws" },
    { id: 49, title: "Win 15 Matches", goal: 15, reward: 5000, icon: "👑", type: "wins" },
    { id: 50, title: "Play 25 Games", goal: 25, reward: 4000, icon: "🎊", type: "plays" }
];

/* --- 3. STATE --- */
const state = {
    board: [],
    size: 3,
    winCondition: 3,
    currentPlayer: 'X',
    gameActive: false,
    mode: 'bot',
    isMuted: false,
    vibrationEnabled: true,
    timerInterval: null,
    timeLeft: 20,
    timeLeftX: 20,
    timeLeftO: 20,
    botIntelligence: 0.5,
    mySymbol: 'X',
    gameId: null,
    p1: {
        name: "Guest", emoji: "😊", wins: 0, losses: 0, draws: 0,
        trophies: 0, gold: 0, streak: 0, rank: "Rookie",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
        isLoggedIn: false, uid: null, lastQuestResetDate: "", achievements: []
    },
    p2: {
        name: "Señor Beep Boop", emoji: "🤖", streak: 0, trophies: 0,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bot"
    },
    blockedIndicesX: [],
    blockedIndicesO: [],
    isChallengeActiveX: false,
    isChallengeActiveO: false,
    firstMoveMadeX: false,
    firstMoveMadeO: false,
    gameStartTime: null,
    currentScreen: 'menu',
    quests: [],
    friends: [],
    messages: {},
    leaderboardCache: [],
    matchmakingRef: null,
    matchmakingTimeout: null
};
let chatListener = null;

/* --- 4. CORE SYSTEM FUNCTIONS --- */
const Sound = {
    play: function(type) { if (!state.isMuted && window.AndroidInterface?.playSound) window.AndroidInterface.playSound(type); },
    vibrate: function(ms) { if (state.vibrationEnabled !== false && window.AndroidInterface?.vibrate) window.AndroidInterface.vibrate(ms); }
};
function loginWith(p) { Sound.play('click'); if (window.AndroidInterface) { if (p === 'google') window.AndroidInterface.loginWithGoogle(); else window.AndroidInterface.loginWithFacebook(); } }
function onNativeLoginSuccess(user) {
    state.p1.isLoggedIn = true; state.p1.name = user.name || state.p1.name; state.p1.avatar = user.photoUrl || state.p1.avatar; state.p1.uid = user.uid;
    // Store linked providers for showing/hiding login buttons
    state.p1.providers = user.providers || [];
    if (db) {
        db.ref(`users/${user.uid}`).update({
            name: state.p1.name, avatar: state.p1.avatar, trophies: state.p1.trophies, streak: state.p1.streak, wins: state.p1.wins
        });
        fetchFriends();
    }
    saveGlobalData(); updateHeaderProfile(); updateAccountScreen(); showScreen('menu'); renderFriends();
}
function logout() { Sound.play('click'); if (window.AndroidInterface) window.AndroidInterface.logout(); else onNativeLogout(); }
function onNativeLogout() {
    state.p1 = { name: "Guest", emoji: "😊", wins: 0, losses: 0, draws: 0, trophies: 0, gold: 0, streak: 0, rank: "Rookie", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest", isLoggedIn: false };
    state.friends = []; saveGlobalData(); updateHeaderProfile(); updateAccountScreen(); showScreen('menu');
}
function showScreen(id) {
    state.currentScreen = id;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`screen-${id}`);
    if (el) el.classList.add('active');
    Sound.play('click');
    if (id === 'leaderboard') renderLeaderboard();
    if (id === 'my-account') updateAccountScreen();
    if (id === 'menu') renderFriends();
    if (id === 'dm-chat') renderChat();
    if (id === 'game-setup') prepareSetupScreen();
}
function updateHeaderProfile() {
    const ids = { myName: state.p1.name, myGold: state.p1.gold, myTrophies: state.p1.trophies, myRank: "🥉 " + state.p1.rank };
    for (let id in ids) { const el = document.getElementById(id); if (el) el.innerText = ids[id]; }
    const av = document.getElementById('myAvatar'); if (av) av.src = state.p1.avatar;
}
function closeModal() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); }

/* --- BACK BUTTON HANDLER --- */
// Returns: 'handled' if we closed something, 'menu' if already at home (ready for exit confirmation)
function handleBackButton() {
    // 1. Check for leave game or reset game confirmation modals first
    const leaveModal = document.getElementById('leaveGameModal');
    if (leaveModal && leaveModal.classList.contains('active')) {
        leaveModal.classList.remove('active');
        return 'handled';
    }
    const resetModal = document.getElementById('resetGameModal');
    if (resetModal && resetModal.classList.contains('active')) {
        resetModal.classList.remove('active');
        return 'handled';
    }

    // 2. Check for any other active modals
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        closeModal();
        return 'handled';
    }

    // 3. Check for loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay && loadingOverlay.style.display !== 'none') {
        loadingOverlay.style.display = 'none';
        // Cancel matchmaking if active
        if (state.mode === 'online' && state.matchId) {
            cancelMatchmaking();
        }
        return 'handled';
    }

    // 4. Check for rank up overlay
    const rankUpOverlay = document.getElementById('rankUpOverlay');
    if (rankUpOverlay && rankUpOverlay.style.display !== 'none') {
        rankUpOverlay.style.display = 'none';
        return 'handled';
    }

    // 5. If in game area with active game, show leave confirmation
    if (state.currentScreen === 'game-area') {
        // Check if game is active (timer running or game not finished)
        const gameActive = state.timerInterval || (!state.board.every(c => c === '') && !document.querySelector('.modal.active'));

        if (gameActive && state.mode !== 'local') {
            // Show leave game confirmation modal
            showLeaveGameModal();
            return 'handled';
        } else {
            // Game not active or local mode - just go back
            cleanupAndGoToMenu();
            return 'handled';
        }
    }

    // 6. If in any sub-screen, go back to menu
    if (state.currentScreen !== 'menu') {
        showScreen('menu');
        return 'handled';
    }

    // 7. Already at menu - tell Android to handle exit confirmation
    return 'menu';
}

// Grace period constant (4 seconds)
const GRACE_PERIOD_MS = 4000;

// Check if we're in grace period (first 4 seconds, no moves made)
function isInGracePeriod() {
    if (!state.gameStartTime) return false;
    const elapsed = Date.now() - state.gameStartTime;
    const noMovesMade = !state.firstMoveMadeX && !state.firstMoveMadeO;
    return elapsed < GRACE_PERIOD_MS && noMovesMade;
}

// Show leave game confirmation modal
function showLeaveGameModal() {
    // Check grace period - if within 4s and no moves, just leave without penalty
    if (isInGracePeriod()) {
        cleanupAndGoToMenu();
        return;
    }

    // Create modal if it doesn't exist
    let modal = document.getElementById('leaveGameModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'leaveGameModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="text-align: center;">
                <h2 style="margin-bottom: 10px;">⚠️ Leave Game?</h2>
                <p style="margin-bottom: 20px; color: #ff6b6b;">If you leave now, you will lose this match!</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="confirmLeaveGame()" style="background: #ff4757; padding: 12px 24px; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;">
                        🚪 Leave
                    </button>
                    <button onclick="cancelLeaveGame()" style="background: #2ed573; padding: 12px 24px; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;">
                        ✖️ Cancel
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('active');
    Sound.play('click');
}

// Confirm leaving the game (counts as loss)
function confirmLeaveGame() {
    const modal = document.getElementById('leaveGameModal');
    if (modal) modal.classList.remove('active');

    // Record loss for online/bot games (not in grace period since we checked before showing modal)
    if (state.mode === 'online' || state.mode === 'bot') {
        // Update stats as a loss
        state.p1.losses = (state.p1.losses || 0) + 1;
        state.p1.trophies = Math.max(0, state.p1.trophies - 10);
        saveGlobalData();
        updateHeaderProfile();

        // Notify opponent in online mode
        if (state.mode === 'online' && state.matchRef) {
            state.matchRef.child('forfeit').set(state.p1.uid);
        }
    }

    cleanupAndGoToMenu();
    Sound.play('click');
}

// Cancel leaving - close the modal
function cancelLeaveGame() {
    const modal = document.getElementById('leaveGameModal');
    if (modal) modal.classList.remove('active');
    Sound.play('click');
}

// Reset game button handler - shows confirmation modal
function resetCurrentGame() {
    // Check grace period - if within 4s and no moves, just reset without penalty
    if (isInGracePeriod() || state.mode === 'local') {
        startNewMatch();
        return;
    }

    // Show reset confirmation modal
    let modal = document.getElementById('resetGameModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'resetGameModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="text-align: center;">
                <h2 style="margin-bottom: 10px;">🔄 Reset Game?</h2>
                <p style="margin-bottom: 20px; color: #ff6b6b;">If you reset now, you will lose this match!</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="confirmResetGame()" style="background: #ff4757; padding: 12px 24px; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;">
                        🔄 Reset
                    </button>
                    <button onclick="cancelResetGame()" style="background: #2ed573; padding: 12px 24px; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;">
                        ✖️ Cancel
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('active');
    Sound.play('click');
}

// Confirm reset - counts as loss, then starts new game
function confirmResetGame() {
    const modal = document.getElementById('resetGameModal');
    if (modal) modal.classList.remove('active');

    // Record loss for online/bot games
    if (state.mode === 'online' || state.mode === 'bot') {
        state.p1.losses = (state.p1.losses || 0) + 1;
        state.p1.trophies = Math.max(0, state.p1.trophies - 10);
        saveGlobalData();
        updateHeaderProfile();

        // Notify opponent in online mode
        if (state.mode === 'online' && state.matchRef) {
            state.matchRef.child('forfeit').set(state.p1.uid);
        }
    }

    // Start new match
    startNewMatch();
    Sound.play('click');
}

// Cancel reset - close the modal
function cancelResetGame() {
    const modal = document.getElementById('resetGameModal');
    if (modal) modal.classList.remove('active');
    Sound.play('click');
}

// Cleanup game and go to menu
function cleanupAndGoToMenu() {
    // Clean up online game if active
    if (state.mode === 'online' && state.matchRef) {
        state.matchRef.off();
        state.matchRef = null;
    }
    // Stop any timers
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    showScreen('menu');
}

// Cancel matchmaking when backing out
function cancelMatchmaking() {
    if (state.matchId) {
        const matchRef = firebase.database().ref('matches/' + state.matchId);
        matchRef.off();
        matchRef.remove();
        state.matchId = null;
    }
    state.matchRef = null;
}

/* --- 5. GAME SETUP --- */
function prepareSetupScreen() {
    const p1NameInput = document.getElementById('p1NameInput');
    if (p1NameInput) p1NameInput.value = state.p1.name;
    updateSetupSelectionUI();

    // Add social avatar if available in the modal picker
    const avatarOptions = document.getElementById('avatarOptions');
    if (avatarOptions && state.p1.isLoggedIn && state.p1.avatar) {
        let socialAv = document.getElementById('socialAvatarOption');
        if (!socialAv) {
            socialAv = document.createElement('img');
            socialAv.id = 'socialAvatarOption';
            socialAv.className = 'avatar-option';
            socialAv.onclick = function() { selectAvatar(this.src); };
            avatarOptions.prepend(socialAv);
        }
        socialAv.src = state.p1.avatar;
    }
}
function openAvatarPicker() {
    Sound.play('click');
    document.getElementById('avatarPickerModal').classList.add('active');
}
function openEmojiPicker() {
    Sound.play('click');
    document.getElementById('emojiPickerModal').classList.add('active');
}
function selectAvatar(src) {
    state.p1.avatar = src;
    Sound.play('click');
    updateSetupSelectionUI();
    updateHeaderProfile();
    updateAccountScreen();
}
function selectEmoji(emoji) {
    state.p1.emoji = emoji;
    Sound.play('click');
    updateSetupSelectionUI();
    updateHeaderProfile();
}
function updateSetupSelectionUI() {
    const setupAvatar = document.getElementById('p1SetupAvatarImg');
    if (setupAvatar) setupAvatar.src = state.p1.avatar;

    const setupEmoji = document.getElementById('p1SetupEmoji');
    if (setupEmoji) setupEmoji.innerText = state.p1.emoji;

    // Highlight selected avatar in the modal
    document.querySelectorAll('.avatar-option').forEach(el => {
        el.classList.toggle('selected', el.src === state.p1.avatar);
    });

    // Highlight selected emoji in the modal
    document.querySelectorAll('.emoji-option').forEach(el => {
        el.classList.toggle('selected', el.innerText === state.p1.emoji);
    });
}


/* --- 6. CORE GAMEPLAY --- */
function startNewMatch() {
    // 0. RESET P2 DATA IF NOT ONLINE (Fix for lingering online opponent data)
    if (state.mode !== 'online') {
        state.p2 = {
            name: state.mode === 'bot' ? "Señor Beep Boop" : "Player 2",
            emoji: state.mode === 'bot' ? "🤖" : "👤",
            streak: 0,
            trophies: 0,
            avatar: state.mode === 'bot'
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Bot"
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=P2",
            uid: state.mode === 'bot' ? 'bot' : null
        };
    }

    // 1. KILL ALL ACTIVE TIMERS
    clearInterval(state.timerInterval);

    // 2. RESET BOARD & GAME STATE
    state.board = Array(state.size * state.size).fill('');
    state.gameActive = true;
    state.blockedIndicesX = [];
    state.blockedIndicesO = [];
    state.firstMoveMadeX = false;
    state.firstMoveMadeO = false;
    state.isChallengeActiveX = false;
    state.isChallengeActiveO = false;
    state.gameStartTime = Date.now(); // Track when game started for grace period

    // 3. RESET PLAYER TIMERS (The "Instant Win" Fix)
    state.timeLeftX = state.timeLeft;
    state.timeLeftO = state.timeLeft;

    // 4. CHOOSE STARTING PLAYER
    // In Online mode, P1 is always X. In Bot/Local, we randomize.
    if (state.mode === 'online') {
        state.currentPlayer = state.mySymbol;
    } else {
        state.currentPlayer = Math.random() > 0.5 ? 'X' : 'O';
    }

    // 5. UPDATE UI
    showScreen('game-area');
    renderBoard();
    updateTurnUI();
    updateGamePlayerInfo(); // Ensure player names are displayed correctly
    startTimer(); // Restart the clock with fresh 20s

    // 6. BOT TRIGGER (The "Bot isn't moving" Fix)
    if (state.mode === 'bot' && state.currentPlayer === 'O') {
        setTimeout(playBotMove, getBotThinkTime());
    }
}

// Bot thinking time based on board size: 1s for 3x3, 1.5s for 5x5, 2s for 7x7
function getBotThinkTime() {
    if (state.size === 3) return 800 + Math.random() * 400;  // 0.8-1.2s
    if (state.size === 5) return 1200 + Math.random() * 600; // 1.2-1.8s
    return 1600 + Math.random() * 800;                        // 1.6-2.4s for 7x7+
}
function handleStartGame() {
    const ni = document.getElementById('p1NameInput');
    if (ni && ni.value.trim() !== "") state.p1.name = ni.value;
    if (state.mode === 'online') {
        // Show the matchmaking modal and start searching for a real opponent
        document.getElementById('loadingOverlay').style.display = 'flex';
        startMatchmaking();
    } else {
        // Start local or bot game as usual
        startNewMatch();
    }
}
function playAgain() { closeModal(); startNewMatch(); }
function executeMove(index, symbol) {
    if (state.board[index] !== '') return;
    if (state.mode === 'online' && symbol !== state.currentPlayer) return;

    // BLOCKER: Check if cell is blocked for this symbol (challenge mode)
    const blockedForSymbol = symbol === 'X' ? state.blockedIndicesX : state.blockedIndicesO;
    if (blockedForSymbol.includes(index)) return;

    // Track first move for challenge mode eligibility
    if (symbol === 'X' && !state.firstMoveMadeX) state.firstMoveMadeX = true;
    if (symbol === 'O' && !state.firstMoveMadeO) state.firstMoveMadeO = true;

    state.board[index] = symbol;
    renderBoard();
    updateTurnUI(); // Update challenge button visibility immediately
    Sound.play('move');
    Sound.vibrate(30); // Short haptic feedback on move

    const winningLine = checkWin(symbol);
    if (winningLine) {
        state.gameActive = false; // Stop game immediately to prevent more moves
        clearInterval(state.timerInterval);
        highlightWinningLine(winningLine);
        setTimeout(() => endGame(symbol), 2000); // 2 second delay to see the winning line
        if (state.mode === 'online') {
            db.ref(`games/${state.gameId}`).update({
                board: state.board,
                currentPlayer: (symbol === 'X') ? 'O' : 'X',
                timeLeftX: state.timeLeftX,
                timeLeftO: state.timeLeftO
            });
        }
    } else if (state.board.every(cell => cell !== '')) {
        state.gameActive = false; // Stop game immediately
        clearInterval(state.timerInterval);
        setTimeout(() => endGame('draw'), 1000); // 1 second delay for draw too
        if (state.mode === 'online') {
            db.ref(`games/${state.gameId}`).update({
                board: state.board
            });
        }
    } else {
        // SWITCH TURNS
        state.currentPlayer = (symbol === 'X') ? 'O' : 'X';
        updateTurnUI();

        if (state.mode === 'online') {
            // Sync move and timers to Firebase
             db.ref(`games/${state.gameId}`).update({
                board: state.board,
                currentPlayer: state.currentPlayer,
                timeLeftX: state.timeLeftX,
                timeLeftO: state.timeLeftO
            });
        }

        // TRIGGER BOT IF NECESSARY
        if (state.mode === 'bot' && state.currentPlayer === 'O') {
            setTimeout(playBotMove, getBotThinkTime());
        }
    }
}
function endGame(winner) {
    state.gameActive = false;
    clearInterval(state.timerInterval);

    const isWin = (state.mode === 'online') ? winner === state.mySymbol : winner === 'X';
    const isDraw = winner === 'draw';

    // Track games played for ALL outcomes (win, lose, draw)
    updateQuestProgress('plays', 1);
    if (state.size === 5) updateQuestProgress('play_size_5', 1);
    if (state.size === 7) updateQuestProgress('play_size_7', 1);

    // 1. Logic for Stats and Quests
    if (isWin) {
        Sound.play('win');
        Sound.vibrate(300); // Celebratory vibration on win
        state.p1.wins++; state.p1.streak++;
        const mySym = (state.mode === 'online') ? state.mySymbol : 'X';
        const challengeActive = mySym === 'X' ? state.isChallengeActiveX : state.isChallengeActiveO;
        const multiplier = challengeActive ? 2 : 1;
        state.p1.gold += 5 * multiplier;
        state.p1.trophies += 10 * multiplier;

        updateQuestProgress('wins', 1);
        updateQuestProgress('streak', state.p1.streak);
        if (state.size === 3) updateQuestProgress('win_size_3', 1);
        if (state.size === 5) updateQuestProgress('win_size_5', 1);
        if (state.size === 7) updateQuestProgress('win_size_7', 1);
        if (state.size >= 5) updateQuestProgress('win_big_board', 1);
        if (challengeActive) updateQuestProgress('win_challenge', 1);
    } else if (isDraw) {
        Sound.play('draw');
        Sound.vibrate(700); // Medium vibration on draw
        state.p1.draws++;
        updateQuestProgress('draws', 1);
    } else {
        Sound.play('click');
        Sound.vibrate(2500); // Long vibration on defeat
        state.p1.losses++;
        state.p1.streak = 0;
        state.p1.trophies = Math.max(0, state.p1.trophies - 5);
    }

    // 2. Rank Update
    if (state.p1.trophies >= 1000) state.p1.rank = "Master";
    else if (state.p1.trophies >= 300) state.p1.rank = "Pro";
    else state.p1.rank = "Rookie";

    // 3. DATABASE UPDATES
    if (db && state.p1.isLoggedIn) {
        // Update Totals
        db.ref(`users/${state.p1.uid}`).update({
            wins: state.p1.wins,
            losses: state.p1.losses,
            draws: state.p1.draws,
            trophies: state.p1.trophies,
            streak: state.p1.streak
        });

        // --- NEW: RECORD MATCH HISTORY (LAST 50) ---
        if (state.mode !== 'local') {
            const historyRef = db.ref(`users/${state.p1.uid}/history`);
            const matchRecord = {
                oppName: state.p2.name,
                oppAvatar: state.p2.avatar,
                oppUid: state.p2.uid || 'bot',
                result: isWin ? 'win' : (isDraw ? 'draw' : 'loss'),
                mode: state.mode,
                size: state.size,
                timestamp: Date.now()
            };

            historyRef.push(matchRecord);

            // Cleanup: remove older than 50
            historyRef.once('value', snap => {
                if (snap.numChildren() > 50) {
                    let count = 0;
                    snap.forEach(child => {
                        if (count < snap.numChildren() - 50) child.ref.remove();
                        count++;
                    });
                }
            });
        }
    }

    // 4. UI UPDATES
    saveGlobalData();
    updateHeaderProfile();

    const rt = document.getElementById('resultTitle');
    if (rt) {
        rt.innerText = isWin ? "Victory!" : (isDraw ? "Draw!" : "Defeat");
        rt.style.color = isWin ? "#55efc4" : (isDraw ? "#ffeaa7" : "#ff7675");
    }

    const rematchBtn = document.getElementById('rematchBtn');
    const addFriendBtn = document.getElementById('addFriendBtn');
    const nextOpponentBtn = document.getElementById('nextOpponentBtn');

    const isOnline = state.mode === 'online';
    const isFriend = isOnline && state.p2.uid && state.friends.some(f => f.uid === state.p2.uid);

    if (rematchBtn) rematchBtn.style.display = 'block';
    // Only show Add Friend if online, not already friend, and not a bot
    if (addFriendBtn) addFriendBtn.style.display = (isOnline && !isFriend && state.p2.uid !== 'bot') ? 'block' : 'none';
    if (nextOpponentBtn) nextOpponentBtn.style.display = isOnline ? 'block' : 'none';

    document.getElementById('gameOverModal').classList.add('active');

    if (isOnline && state.gameId) db.ref(`games/${state.gameId}`).remove();

    checkAchievements();
}

// Helper function to add friend from game over screen
function addFriendFromGame() {
    if (state.p2 && state.p2.uid && state.p2.uid !== 'bot') {
        state.selectedPlayer = {
            uid: state.p2.uid,
            name: state.p2.name,
            avatar: state.p2.avatar
        };
        addFriendFromProfile(state.p2.uid);
        const btn = document.getElementById('addFriendBtn');
        if (btn) btn.style.display = 'none';
    }
}


/* --- 7. QUEST SYSTEM (UTC 0) --- */
function checkQuestReset() {
    if (!state.p1.isLoggedIn) return;
    const today = new Date().toISOString().split('T')[0];
    if (state.p1.lastQuestResetDate !== today || state.quests.length === 0) {
        const shuffled = [...ALL_QUESTS].sort(() => 0.5 - Math.random());
        state.quests = shuffled.slice(0, 3).map(q => ({ ...q, progress: 0, claimed: false }));
        state.p1.lastQuestResetDate = today; saveGlobalData();
    }
}
function updateQuestProgress(type, amt) {
    if (!state.p1.isLoggedIn) return;
    checkQuestReset();
    state.quests.forEach(q => { if (q.type === type && !q.claimed) q.progress = type === 'streak' ? Math.max(q.progress, amt) : Math.min(q.goal, q.progress + amt); });
    saveGlobalData();
}
function claimQuestReward(id) {
    const q = state.quests.find(x => x.id === parseInt(id));
    if (q && q.progress >= q.goal && !q.claimed) {
        q.claimed = true; state.p1.gold += q.reward; Sound.play('click');
        saveGlobalData(); updateHeaderProfile(); showQuests();
    }
}
function showQuests() {
    checkQuestReset();
    const list = document.getElementById('questsList'); const prompt = document.getElementById('questsLoginPrompt');
    if (!list || !prompt) return;
    list.innerHTML = '';
    if (!state.p1.isLoggedIn) prompt.style.display = 'block';
    else {
        prompt.style.display = 'none';
        state.quests.forEach(q => {
            const done = q.progress >= q.goal; const per = Math.min(100, (q.progress / q.goal) * 100);
            list.innerHTML += `<div class="quest-card ${q.claimed ? 'tomorrow' : (done ? 'completed' : '')}"><div class="quest-info"><b>${q.title} (${q.progress}/${q.goal})</b><div class="quest-progress-bg"><div class="quest-progress-fill" style="width:${per}%"></div></div></div><div class="quest-action">${q.claimed ? '' : (done ? `<button class="btn-xs btn-primary" onclick="claimQuestReward('${q.id}')">CLAIM</button>` : `<div class="quest-reward">💰 ${q.reward}</div>`)}</div>${q.claimed ? '<div class="tomorrow-overlay">TOMORROW</div>' : ''}</div>`;
        });
    }
    document.getElementById('questsModal').classList.add('active');
}
function closeQuests() { const m = document.getElementById('questsModal'); if(m) m.classList.remove('active'); }
function handleCellClick(index) {
    if (!state.gameActive || state.board[index] !== '') return;

    // BLOCKER: If it's Bot mode and it's O's turn, do not let the human click!
    if (state.mode === 'bot' && state.currentPlayer === 'O') {
        console.log("Wait for the Bot!");
        return;
    }

    // BLOCKER: In Online mode, only let the user click on their own turn
    if (state.mode === 'online' && state.currentPlayer !== state.mySymbol) {
        return;
    }

    // BLOCKER: Check if cell is blocked for current player (challenge mode)
    const blockedForCurrentPlayer = state.currentPlayer === 'X' ? state.blockedIndicesX : state.blockedIndicesO;
    if (blockedForCurrentPlayer.includes(index)) {
        console.log("This cell is blocked for you!");
        return;
    }

    executeMove(index, state.currentPlayer);
}


/* --- 8. BOT & MATCHMAKING --- */
function playBotMove() {
    // 1. THE "GHOST" CHECK
    // If it's not strictly 'bot' mode, or the game is over, or it's not 'O's turn: STOP.
    if (state.mode !== 'bot' || !state.gameActive || state.currentPlayer !== 'O') {
        console.log("Bot logic bypassed: Mode is", state.mode);
        return;
    }

    adjustBotIntelligence();

    // 2. STRATEGIC DECISION MAKING
    // Use findBestMove (which you have in Section 8) to prioritize.
    let m = findBestMove('O');               // Priority 1: Can I win right now?
    if (m === null) m = findBestMove('X');   // Priority 2: Is the player about to win? (Block them)
    if (m === null) m = pickPriorityMove();  // Priority 3: Take the center or a random spot.

    // 3. EXECUTION
    // Final check to ensure we aren't clicking an occupied cell
    if (m !== null && m !== undefined && state.board[m] === '') {
        executeMove(m, 'O');
    }
}
function adjustBotIntelligence() {
    let mod = state.p1.streak * 0.05;
    const bc = state.board.filter(v => v === 'O').length;
    const pc = state.board.filter(v => v === 'X').length;
    if (bc > pc) mod -= 0.1;
    state.botIntelligence = Math.min(1, Math.max(0.1, state.botIntelligence + mod));
}
function findBestMove(p) {
    for (let i = 0; i < state.board.length; i++) {
        if (state.board[i] === '') { state.board[i] = p; if (checkWin(p)) { state.board[i] = ''; return i; } state.board[i] = ''; }
    }
    return null;
}
function pickPriorityMove() {
    const c = Math.floor((state.size * state.size) / 2);
    if (state.board[c] === '') return c;
    let av = state.board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
    return av[Math.floor(Math.random() * av.length)];
}
function startMatchmaking() {
    if (!state.p1.isLoggedIn) { alert("Login to play!"); return; }
    // Reset any previous matchmaking session
    cancelMatchmaking(true);

    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    if (loadingText) loadingText.innerText = "Finding Opponent...";
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    const qRef = db.ref('matchmaking').push();
    state.matchmakingRef = qRef;
    qRef.set({
        uid: state.p1.uid,
        name: state.p1.name,
        emoji: state.p1.emoji, // Send my emoji to the lobby
        size: state.size,
        timestamp: Date.now()
    });

    // 1-minute timeout handler
    state.matchmakingTimeout = setTimeout(() => {
        if (loadingText) loadingText.innerText = "Opponent not found";
        setTimeout(() => {
            cancelMatchmaking(true);
        }, 3000);
    }, 60000);

    db.ref('matchmaking').on('value', snap => {
        const q = snap.val();
        for (let id in q) {
            if (q[id].uid !== state.p1.uid && q[id].size === state.size) {
                const gid = [state.p1.uid, q[id].uid].sort().join('_');

                // Cleanup
                db.ref(`matchmaking/${id}`).remove();
                qRef.remove();
                db.ref('matchmaking').off();
                if (state.matchmakingTimeout) {
                    clearTimeout(state.matchmakingTimeout);
                    state.matchmakingTimeout = null;
                }
                state.matchmakingRef = null;

                // ROLE ARBITRATION: Lower UID is Creator (X)
                const isCreator = state.p1.uid < q[id].uid;
                initOnlineGame(gid, q[id], isCreator);
                return;
            }
        }
    });
}
function initOnlineGame(gid, opp, isCreator) {
    // 1. CLEANUP & MODE LOCK
    db.ref('matchmaking').off();
    document.getElementById('loadingOverlay').style.display = 'none';

    state.mode = 'online';
    state.gameId = gid;
    state.mySymbol = isCreator ? 'X' : 'O';

    // 2. EMOJI CONFLICT RESOLUTION (Only use playerEmojis)
    let myEmoji = playerEmojis.includes(state.p1.emoji) ? state.p1.emoji : playerEmojis[0];
    let oppEmoji = playerEmojis.includes(opp.emoji) ? opp.emoji : playerEmojis[1];
    if (isCreator) {
        // If joiner picked the same emoji as creator, assign joiner a new one
        if (oppEmoji === myEmoji) {
            const safeEmojis = playerEmojis.filter(e => e !== myEmoji);
            oppEmoji = safeEmojis[Math.floor(Math.random() * safeEmojis.length)];
        }
        // Creator keeps their emoji
    } else {
        // If joiner picked the same emoji as creator, assign self a new one
        if (myEmoji === oppEmoji) {
            const safeEmojis = playerEmojis.filter(e => e !== oppEmoji);
            myEmoji = safeEmojis[Math.floor(Math.random() * safeEmojis.length)];
        }
    }

    // 3. SET OPPONENT DATA
    state.p2 = {
        name: opp.name || "Opponent",
        avatar: opp.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${opp.uid}`,
        uid: opp.uid,
        emoji: oppEmoji,
        streak: opp.streak || 0,
        trophies: opp.trophies || 0
    };
    state.p1.emoji = myEmoji;

    // 4. RESET LOCAL ENGINE
    state.board = Array(state.size * state.size).fill('');
    state.currentPlayer = 'X'; // X always starts
    state.gameActive = false;  // Stay paused until BOTH are connected
    state.blockedIndicesX = [];
    state.blockedIndicesO = [];
    state.firstMoveMadeX = false;
    state.firstMoveMadeO = false;
    state.isChallengeActiveX = false;
    state.isChallengeActiveO = false;

    // Set timers based on board size (3x3=20s, 5x5=40s, 7x7=60s)
    state.timeLeftX = state.timeLeft;
    state.timeLeftO = state.timeLeft;

    // 5. THE FIREBASE HANDSHAKE
    const gameRef = db.ref(`games/${gid}`);

    if (isCreator) {
        // CREATOR: Sets the foundation for the game node
        gameRef.set({
            board: state.board,
            currentPlayer: 'X',
            size: state.size,
            winCondition: state.winCondition,
            playerX_status: 'connected',
            playerO_status: 'waiting',
            playerX_emoji: state.p1.emoji,
            playerO_emoji: state.p2.emoji, // Suggest an emoji to the joiner
            timeLeftX: state.timeLeft,
            timeLeftO: state.timeLeft,
            lastMove: Date.now()
        });
    } else {
        // JOINER: Only updates their own presence
        gameRef.update({
            playerO_status: 'connected',
            playerO_emoji: state.p1.emoji // Tell the creator what emoji you are actually using
        });
    }

    // 6. UI TRANSITION
    // We hide the reset button because you can't reset an online game alone.
    const resetBtn = document.getElementById('gameResetBtn');
    if (resetBtn) resetBtn.style.display = 'none';

    showScreen('game-area');
    renderBoard();
    updateTurnUI();

    // Start listening for the other player
    listenToGame();

    // #3: Enable in-game chat for ALL online games (matchmaking AND friend challenges)
    setupOnlineGameChat(gid);
}

// #3: Setup in-game chat for online multiplayer
function setupOnlineGameChat(gameId) {
    const chatContainer = document.getElementById('onlineChatContainer');
    const reactionBar = document.getElementById('reactionBar');
    const chatMessages = document.getElementById('onlineChatMessages');

    if (chatContainer) chatContainer.style.display = 'block';
    if (reactionBar) reactionBar.style.display = 'block';
    if (chatMessages) chatMessages.innerHTML = '';

    // Listen for chat messages
    db.ref(`gameChats/${gameId}`).on('child_added', snap => {
        const msg = snap.val();
        if (!msg || !chatMessages) return;

        const isMe = msg.sender === state.p1.uid;

        // Show in speech bubble
        showSpeechBubble(msg.text, isMe, msg.isReaction);

        // Also add to chat log
        const div = document.createElement('div');
        div.style.cssText = `padding: 4px 8px; margin: 2px 0; border-radius: 8px; font-size: 12px; ${isMe ? 'text-align: right; background: rgba(108,92,231,0.2);' : 'text-align: left; background: rgba(255,255,255,0.05);'}`;
        div.innerHTML = `<b style="color:${isMe ? '#a29bfe' : '#ffeaa7'}">${msg.name || 'Player'}:</b> ${msg.text}`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Show speech bubble next to avatar
function showSpeechBubble(text, isMe, isEmoji = false) {
    const bubbleId = isMe ? 'p1SpeechBubble' : 'p2SpeechBubble';
    const bubble = document.getElementById(bubbleId);
    if (!bubble) return;

    // Check if it's just an emoji (1-2 emoji characters)
    const emojiRegex = /^[\p{Emoji}]{1,2}$/u;
    const isEmojiOnly = emojiRegex.test(text) || isEmoji;

    bubble.innerText = text;
    bubble.className = `speech-bubble ${isMe ? 'left' : 'right'}${isEmojiOnly ? ' emoji-only' : ''}`;
    bubble.style.display = 'block';

    // Hide after delay (longer for text, shorter for emojis)
    clearTimeout(bubble._hideTimeout);
    bubble._hideTimeout = setTimeout(() => {
        bubble.style.display = 'none';
    }, isEmojiOnly ? 2000 : 4000);
}

// Send quick reaction emoji
function sendReaction(emoji) {
    Sound.play('click');

    // Show locally immediately
    showSpeechBubble(emoji, true, true);

    // Send to Firebase if online game
    if (state.mode === 'online' && state.gameId && db) {
        db.ref(`gameChats/${state.gameId}`).push({
            sender: state.p1.uid,
            name: state.p1.name,
            text: emoji,
            isReaction: true,
            timestamp: Date.now()
        });
    }
}

// #3: Send chat message in online game
function sendOnlineChatMessage(text) {
    if (!text || text.trim() === '') return;

    // Show locally immediately as speech bubble
    showSpeechBubble(text.trim(), true, false);

    // Send to Firebase if online game
    if (state.mode === 'online' && state.gameId && db) {
        db.ref(`gameChats/${state.gameId}`).push({
            sender: state.p1.uid,
            name: state.p1.name,
            text: text.trim(),
            timestamp: Date.now()
        });
    }
}

function listenToGame() {
    if (!state.gameId) return;
    const gameRef = db.ref(`games/${state.gameId}`);

    // Auto-Offline Handler: Essential for Lag Monitoring
    gameRef.child(state.mySymbol === 'X' ? 'playerX_status' : 'playerO_status')
           .onDisconnect().set('disconnected');

    gameRef.on('value', snap => {
        const d = snap.val();
        if (!d || !d.board) return;

        // 1. DYNAMIC BOARD SYNC (Size & Win Condition)
        // If you joined a 5x5 game but were on 3x3 menu, this fixes it instantly.
        if (d.size && d.size !== state.size) {
            state.size = d.size;
            state.winCondition = d.winCondition || (d.size === 3 ? 3 : d.size === 5 ? 4 : 5);
            // Update CSS variable for the grid
            document.documentElement.style.setProperty('--grid-size', state.size);
        }

        // 2. EMOJI & IDENTITY SYNC
        // We pull the final "conflict-resolved" emojis from the DB.
        if (d.playerX_emoji && d.playerO_emoji) {
            if (state.mySymbol === 'X') {
                state.p1.emoji = d.playerX_emoji;
                state.p2.emoji = d.playerO_emoji;
            } else {
                state.p1.emoji = d.playerO_emoji;
                state.p2.emoji = d.playerX_emoji;
            }
        }

        // 3. KEEP GAME ACTIVE - Timer runs regardless of connection status
        // If opponent disconnects, their clock still ticks and they lose on timeout
        if (!state.gameActive) {
            state.gameActive = true;
        }

        // 4. SMART BOARD REFRESH
        // We only render if the board data has actually changed.
        const boardChanged = JSON.stringify(state.board) !== JSON.stringify(d.board);
        const turnChanged = state.currentPlayer !== d.currentPlayer;

        if (boardChanged || turnChanged) {
            state.board = d.board;
            state.currentPlayer = d.currentPlayer;

            // Sync Timers
            if (d.timeLeftX !== undefined) state.timeLeftX = d.timeLeftX;
            if (d.timeLeftO !== undefined) state.timeLeftO = d.timeLeftO;

            renderBoard();
            updateTurnUI();
            updateGamePlayerInfo();

            // Always restart the timer - game continues regardless of connection
            startTimer();
        }

        // 5. WIN CHECK with highlight and delay
        const winX = checkWin('X');
        const winO = checkWin('O');
        if (winX) {
            state.gameActive = false;
            clearInterval(state.timerInterval);
            highlightWinningLine(winX);
            setTimeout(() => endGame('X'), 2000);
        } else if (winO) {
            state.gameActive = false;
            clearInterval(state.timerInterval);
            highlightWinningLine(winO);
            setTimeout(() => endGame('O'), 2000);
        } else if (!state.board.includes('')) {
            state.gameActive = false;
            clearInterval(state.timerInterval);
            setTimeout(() => endGame('draw'), 1000);
        }
    });
}
function updateGamePlayerInfo() {
    // Player 1 (You)
    const p1Img = document.getElementById('p1Avatar');
    const p1Name = document.getElementById('p1NameDisplay');
    const p1Emo = document.getElementById('p1Emoji');
    const p1Stk = document.getElementById('p1StreakBadge');

    if(p1Img) p1Img.src = state.p1.avatar;
    if(p1Name) p1Name.innerText = state.p1.name + " (You)";
    if(p1Emo) p1Emo.innerText = state.p1.emoji;
    if(p1Stk) p1Stk.innerText = "🔥 " + state.p1.streak;

    // Player 2 (Opponent/Bot)
    const p2Img = document.getElementById('p2Avatar');
    const p2Name = document.getElementById('p2NameDisplay');
    const p2Emo = document.getElementById('p2Emoji');
    const p2Stk = document.getElementById('p2StreakBadge');

    if(p2Img) p2Img.src = state.p2.avatar;
    if(p2Name) p2Name.innerText = state.p2.name;
    if(p2Emo) p2Emo.innerText = state.p2.emoji;
    if(p2Stk) p2Stk.innerText = "🔥 " + (state.p2.streak || 0);
}
function cancelMatchmaking(silent = false) {
    if (db) db.ref('matchmaking').off();
    if (state.matchmakingRef) {
        state.matchmakingRef.remove();
        state.matchmakingRef = null;
    }
    if (state.matchmakingTimeout) {
        clearTimeout(state.matchmakingTimeout);
        state.matchmakingTimeout = null;
    }
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    if (!silent && loadingText) loadingText.innerText = "Finding Opponent...";
    if (loadingOverlay) loadingOverlay.style.display = 'none';
}

/* --- 9. SOCIAL, LEADERBOARD & CHAT --- */
function addFriendByUid(uid) { if (!state.p1.uid) return; db.ref(`users/${state.p1.uid}/friends/${uid}`).set(true); db.ref(`users/${uid}/friends/${state.p1.uid}`).set(true); }
function addFriendFromProfile(friendUid) {
    if (!state.p1.uid) return;

    // 1. Mutual Add (Update both users' lists)
    db.ref(`users/${state.p1.uid}/friends/${friendUid}`).set(true);
    db.ref(`users/${friendUid}/friends/${state.p1.uid}`).set(true);

    Sound.play('click');

    // 2. Temporarily update local list so UI refreshes immediately
    // (The fetchFriends listener will verify this later)
    if (!state.friends.some(f => f.uid === friendUid)) {
        state.friends.push(state.selectedPlayer);
    }

    // 3. Refresh Profile to show "Chat" button instead of "Add"
    openFriendProfile(state.selectedPlayer);
    alert("Friend Added!");
}
function removePlayer() {
    if (!state.p1.uid || !state.selectedPlayer) return;

    // 1. Confirm before deleting
    if (confirm(`Are you sure you want to remove ${state.selectedPlayer.name}?`)) {
        const uid = state.selectedPlayer.uid;

        // 2. Remove from BOTH lists (Mutual removal)
        db.ref(`users/${state.p1.uid}/friends/${uid}`).remove();
        db.ref(`users/${uid}/friends/${state.p1.uid}`).remove();

        Sound.play('click');

        // 3. Remove from local list immediately
        state.friends = state.friends.filter(f => f.uid !== uid);

        // 4. Refresh Profile to show "Add" button again
        openFriendProfile(state.selectedPlayer);
    }
}


function challengePlayer() {
    // 1. Validation Checks
    if (!state.p1.isLoggedIn) { alert("Login to challenge!"); return; }
    if (!state.selectedPlayer || !state.selectedPlayer.uid) { alert("Select a player!"); return; }

    // 2. Open the Size Selection Modal
    const m = document.getElementById('challengeModeModal');
    if (m) m.classList.add('active');
}
function sendChallengeRequest(selectedSize) {
    // 1. Close Modal & Show Status on Profile Button
    document.getElementById('challengeModeModal').classList.remove('active');
    const btn = document.getElementById('challengeBtn');
    if(btn) { btn.innerText = "Sending..."; btn.disabled = true; }

    // 2. Send Data (Include SIZE now!)
    db.ref(`challenges/${state.selectedPlayer.uid}/${state.p1.uid}`).set({
        fromUid: state.p1.uid,
        fromName: state.p1.name,
        fromAvatar: state.p1.avatar,
        size: selectedSize, // <--- SAVING THE SIZE
        timestamp: Date.now()
    })
    .then(() => {
        Sound.play('click');
        alert(`Invite for ${selectedSize}x${selectedSize} game sent! Waiting for acceptance...`);
        if(btn) btn.innerText = "⏳ Waiting...";

        // 3. Wait for Accept (Game Start Logic)
        const gameId = [state.p1.uid, state.selectedPlayer.uid].sort().join('_');
        const gameListener = db.ref(`games/${gameId}`);

        gameListener.on('value', snap => {
            if (snap.exists()) {
                gameListener.off();
                // Set my local size to match what I challenged
                setBoardSize(selectedSize);
                initOnlineGame(gameId, state.selectedPlayer, true);
            }
        });
    });
}
function acceptOnlineChallenge(opponentUid) {
    if (!opponentUid) return;

    // 1. READ the challenge first to get the SIZE
    db.ref(`challenges/${state.p1.uid}/${opponentUid}`).once('value', snap => {
        const challenge = snap.val();
        if (!challenge) return;

        const targetSize = challenge.size || 3; // Default to 3 if missing

        // 2. Set Local Board Size BEFORE starting
        setBoardSize(targetSize);

        // 3. Delete the challenge
        db.ref(`challenges/${state.p1.uid}/${opponentUid}`).remove();

        // 4. Start Game
        const gameId = [state.p1.uid, opponentUid].sort().join('_');
        const opponent = state.friends.find(f => f.uid === opponentUid) || {
            name: "Opponent",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + opponentUid,
            uid: opponentUid
        };

        initOnlineGame(gameId, opponent, false);
    });
}
function fetchFriends() {
    if (!state.p1.uid) return;

    // Helper function to refresh friends and update red dots
    const refreshFriendsList = async () => {
        const friendIds = (await db.ref(`users/${state.p1.uid}/friends`).once('value')).val() || {};
        const friendList = [];

        for (let uid in friendIds) {
            const fSnap = await db.ref(`users/${uid}`).once('value');
            if (fSnap.exists()) {
                const fData = fSnap.val();

                // Check for unread messages & challenges for the UI dots
                const msgSnap = await db.ref(`users/${state.p1.uid}/unread/${uid}`).once('value');
                const chalSnap = await db.ref(`challenges/${state.p1.uid}/${uid}`).once('value');

                friendList.push({
                    uid,
                    ...fData,
                    hasUnread: msgSnap.exists(),
                    matchOffered: chalSnap.exists(),
                    online: fData.status === 'online'
                });
            }
        }
        state.friends = friendList;
        renderFriends();
    };

    // --- PART 1: Listen to friends list changes ---
    db.ref(`users/${state.p1.uid}/friends`).on('value', refreshFriendsList);

    // --- PART 2: Listen to unread changes (for red dot updates when messages are read) ---
    db.ref(`users/${state.p1.uid}/unread`).on('value', refreshFriendsList);

    // --- PART 3: Listen to challenges changes (for red dot updates when challenges are accepted/rejected) ---
    db.ref(`challenges/${state.p1.uid}`).on('value', refreshFriendsList);

    // --- PART 4: Real-Time Challenge Popup (UPDATED FOR SIZE) ---
    db.ref(`challenges/${state.p1.uid}`).on('child_added', snap => {
        const challenge = snap.val();
        if (!challenge) return;

        // 1. Store the sender's UID globally
        window._challengeFromUid = challenge.fromUid;

        // 2. Populate and Show the Modal with BOARD SIZE
        const modal = document.getElementById('onlineChallengeModal');
        const info = document.getElementById('onlineChallengeInfo');

        // Default to 3 if size is missing (for older invites)
        const boardSize = challenge.size || 3;

        if (modal && info) {
            info.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:10px; margin-bottom:15px;">
                    <img src="${challenge.fromAvatar}" style="width:70px; height:70px; border-radius:50%; border:3px solid #fab1a0;">
                    <p style="font-size:16px;">
                        <strong>${challenge.fromName}</strong><br>
                        invited you to a <span style="color:#ffd700; font-weight:bold;">${boardSize}x${boardSize}</span> game!
                    </p>
                </div>
            `;
            modal.style.display = 'flex';
            Sound.play('win'); // Notification sound
        }
    });
}
function renderFriends() {
    const loggedOutDiv = document.getElementById('loggedOutSocial');
    const loggedInDiv = document.getElementById('loggedInSocial');

    // 1. Handle Logged OUT State
    if (!state.p1.isLoggedIn) {
        if (loggedOutDiv) loggedOutDiv.style.display = 'flex';
        if (loggedInDiv) loggedInDiv.style.display = 'none';

        const mailDot = document.getElementById('globalUnreadDot');
        if (mailDot) mailDot.style.display = 'none';
        return;
    }

    // 2. Handle Logged IN State - show unlinked provider buttons
    if (loggedOutDiv) {
        const providers = state.p1.providers || [];
        const hasGoogle = providers.some(p => p.includes('google'));
        const hasFacebook = providers.some(p => p.includes('facebook'));

        // Show Google button if not linked
        const googleBtn = loggedOutDiv.querySelector('.google');
        if (googleBtn) googleBtn.style.display = hasGoogle ? 'none' : 'flex';

        // Show Facebook button if not linked
        const fbBtn = loggedOutDiv.querySelector('.fb');
        if (fbBtn) fbBtn.style.display = hasFacebook ? 'none' : 'flex';

        // Show the div if at least one provider is not linked
        loggedOutDiv.style.display = (!hasGoogle || !hasFacebook) ? 'flex' : 'none';
    }

    if (loggedInDiv) {
        loggedInDiv.style.display = 'flex';
        loggedInDiv.innerHTML = ''; // Clear old list

        // Sort: Invites/Messages First, then Online status
        const sortedFriends = [...state.friends].sort((a, b) => {
            const aNotify = a.hasUnread || a.matchOffered;
            const bNotify = b.hasUnread || b.matchOffered;
            if (aNotify && !bNotify) return -1;
            if (!aNotify && bNotify) return 1;
            return (b.online ? 1 : 0) - (a.online ? 1 : 0);
        });

        let hasAnyNotification = false;

        sortedFriends.forEach(f => {
            if (f.hasUnread || f.matchOffered) hasAnyNotification = true;

            const item = document.createElement('div');
            item.className = 'friend-avatar-wrapper';

            // Build the stack: Avatar + Notification Dot
            item.innerHTML = `
                <div class="avatar-stack">
                    <img src="${f.avatar}" class="friend-scroll-avatar ${f.online ? 'online-border' : ''}">
                    ${f.matchOffered ? '<div class="notification-point match-offer"></div>' :
                     (f.hasUnread ? '<div class="notification-point new-msg"></div>' : '')}
                </div>
                <span class="friend-scroll-name">${f.name.split(' ')[0]}</span>
            `;

            item.onclick = () => {
                state.selectedPlayer = f;
                Sound.play('click');
                openFriendProfile(f);
            };
            loggedInDiv.appendChild(item);
        });

        // 3. Update the Mail Button Dot (Red dot on the menu)
        const mailDot = document.getElementById('globalUnreadDot');
        if (mailDot) mailDot.style.display = hasAnyNotification ? 'block' : 'none';
    }
}
function togglePlayerNotif() {
    if (!state.p1.isLoggedIn || !state.selectedPlayer) return;

    const isChecked = document.getElementById('fpNotifToggle').checked;
    const friendUid = state.selectedPlayer.uid;

    // Save this preference to Firebase under your own settings
    db.ref(`users/${state.p1.uid}/settings/notifications/${friendUid}`).set(isChecked)
    .then(() => {
        Sound.play('click');
        console.log(`Notifications for ${state.selectedPlayer.name}: ${isChecked}`);
    })
    .catch(err => console.error("Error saving notification preference:", err));
}
function renderLeaderboard() {
    const list = document.getElementById('leaderboardList');
    if (!list || !db) return;

    list.innerHTML = '<div class="loader-container"><p>Loading Champions...</p></div>';

    // Use .on instead of .once for a live-updating leaderboard
    db.ref('users').orderByChild('trophies').limitToLast(50).on('value', snap => {
        const users = [];
        snap.forEach(child => {
            users.push({ uid: child.key, ...child.val() });
        });

        // Firebase returns ascending, we need descending (Top 1 first)
        users.sort((a, b) => (b.trophies || 0) - (a.trophies || 0));

        // Save to cache so we can access the full object safely on click
        state.leaderboardCache = users;

        if (users.length === 0) {
            list.innerHTML = '<p style="text-align:center; padding:20px;">No players found.</p>';
            return;
        }

        list.innerHTML = users.map((p, i) => {
            const isTop3 = i < 3;
            const rankClass = isTop3 ? `top-${i + 1}` : '';
            const avatar = p.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.uid}`;

            return `
                <div class="leaderboard-item ${rankClass}" onclick="handleLeaderboardClick(${i})">
                    <div class="rank-badge">${i + 1}</div>
                    <img src="${avatar}" class="lb-avatar" alt="profile">
                    <div class="lb-info">
                        <p class="lb-name">${p.name || 'Anonymous'}</p>
                        <p class="lb-stats">🔥 ${p.streak || 0} Streak</p>
                    </div>
                    <div class="lb-score">
                        <span>🏆</span> ${p.trophies || 0}
                    </div>
                </div>
            `;
        }).join('');
    });
}
function openFriendChat() { Sound.play('click'); showScreen('dm-chat'); }
function renderChat() {
    const dmArea = document.getElementById('dmArea'); if (!dmArea || !state.selectedPlayer) return;
    document.getElementById('dmName').innerText = "Chat with " + state.selectedPlayer.name;
    if (chatListener) chatListener.off();
    const roomId = [state.p1.uid, state.selectedPlayer.uid].sort().join('_');
    chatListener = db.ref(`chats/${roomId}`);
    db.ref(`users/${state.p1.uid}/unread/${state.selectedPlayer.uid}`).remove();
    chatListener.on('value', snap => {
        const data = snap.val() || {};
        dmArea.innerHTML = '';
        Object.values(data).sort((a,b) => a.timestamp - b.timestamp).forEach(m => {
            const d = document.createElement('div');
            d.className = m.sender === state.p1.uid ? 'chat-bubble me' : 'chat-bubble friend';
            d.innerText = m.text; dmArea.appendChild(d);
        });
        dmArea.scrollTop = dmArea.scrollHeight;
    });
    renderChatEmojiPicker();
}
function renderChatEmojiPicker() {
    const p = document.getElementById('chatEmojiPicker');
    if (p) p.innerHTML = chatEmojis.map(e => `<span onclick="addChatEmoji('${e}')">${e}</span>`).join('');
}

function openChatEmojiPicker() { Sound.play('click'); const m = document.getElementById('chatEmojiModal'); if(m) m.classList.add('active'); }

function addChatEmoji(e) {
    const i = document.getElementById('dmInput'); if (i) { i.value += e; i.focus(); }
    closeModal();
}

function sendDM() {
    const i = document.getElementById('dmInput'); if (!i || !state.selectedPlayer || i.value.trim() === '' || !state.p1.isLoggedIn) return;
    const roomId = [state.p1.uid, state.selectedPlayer.uid].sort().join('_');
    db.ref(`chats/${roomId}`).push({ text: i.value.trim(), sender: state.p1.uid, timestamp: Date.now() });
    db.ref(`users/${state.selectedPlayer.uid}/unread/${state.p1.uid}`).set(true);
    i.value = ''; Sound.play('click');
}

/* --- 10. WIN LOGIC & RENDER --- */
function checkWin(p) {
    const s = state.size, w = state.winCondition, b = state.board;
    const ck = (i, st) => {
        const startCol = i % s;
        const indices = [];
        for (let k = 0; k < w; k++) {
            let idx = i + k * st;
            if (idx < 0 || idx >= b.length || b[idx] !== p) return null;
            const currentCol = idx % s;
            if (st === 1 && Math.floor(idx / s) !== Math.floor(i / s)) return null;
            if (st === s + 1 && currentCol !== startCol + k) return null;
            if (st === s - 1 && currentCol !== startCol - k) return null;
            indices.push(idx);
        }
        return indices;
    };
    for (let i = 0; i < b.length; i++) {
        let result = ck(i, 1) || ck(i, s) || ck(i, s + 1) || (i % s >= w - 1 && ck(i, s - 1));
        if (result) return result; // Return winning indices array
    }
    return null;
}

// Highlight winning cells
function highlightWinningLine(indices) {
    if (!indices || indices.length === 0) return;
    const cells = document.querySelectorAll('.cell');
    indices.forEach(idx => {
        if (cells[idx]) {
            cells[idx].classList.add('winning-cell');
        }
    });
}

function renderBoard() {
    const b = document.getElementById('gameBoard'); if (!b) return;
    b.innerHTML = ''; document.documentElement.style.setProperty('--grid-size', state.size);

    // Hidden challenge mode logic
    const mySym = state.mode === 'online' ? state.mySymbol : 'X';
    const myBlocks = mySym === 'X' ? state.blockedIndicesX : state.blockedIndicesO;

    // Determine Emojis based on Identity
    let xEmoji = state.p1.emoji, oEmoji = state.p2.emoji;
    if (state.mode === 'online' && state.mySymbol === 'O') {
        xEmoji = state.p2.emoji;
        oEmoji = state.p1.emoji;
    }

    state.board.forEach((c, i) => {
        const d = document.createElement('div'); d.className = 'cell';
        if (myBlocks.includes(i) && c === '') { d.innerText = "🔒"; d.classList.add('blocked'); }
        else if (c === 'X') d.innerText = xEmoji;
        else if (c === 'O') d.innerText = oEmoji;
        d.onclick = () => {
            if (state.mode === 'online' && state.currentPlayer !== state.mySymbol) return;
            executeMove(i, state.mode === 'online' ? state.mySymbol : state.currentPlayer);
        };
        b.appendChild(d);
    });
}

function updateTurnUI() {
    let p1Turn, p2Turn;
    if (state.mode === 'online' && state.mySymbol === 'O') {
        p1Turn = (state.currentPlayer === 'O');
        p2Turn = (state.currentPlayer === 'X');
    } else {
        // Creator (X) or Local/Bot (P1=X)
        p1Turn = (state.currentPlayer === 'X');
        p2Turn = (state.currentPlayer === 'O');
    }

    document.getElementById('p1Box').classList.toggle('active-turn', p1Turn);
    document.getElementById('p2Box').classList.toggle('active-turn', p2Turn);

    const p = state.mode === 'online' ? state.mySymbol : state.currentPlayer;
    const firstMove = p === 'X' ? state.firstMoveMadeX : state.firstMoveMadeO;
    const active = p === 'X' ? state.isChallengeActiveX : state.isChallengeActiveO;

    const btn = document.getElementById('activateChallengeBtn');
    if(btn) btn.style.display = (!firstMove && !active) ? 'block' : 'none';
    const label = document.getElementById('challengeActiveLabel');
    if(label) label.style.display = active ? 'block' : 'none';
}

function activateInGameChallenge() {
    if (!state.gameActive) return;
    const p = state.mode === 'online' ? state.mySymbol : state.currentPlayer;
    const isX = p === 'X';
    if (isX && (state.firstMoveMadeX || state.isChallengeActiveX)) return;
    if (!isX && (state.firstMoveMadeO || state.isChallengeActiveO)) return;

    let count = state.size === 3 ? 1 : (state.size === 5 ? 2 : 4);
    let empty = [];
    state.board.forEach((val, i) => { if(val === '') empty.push(i); });

    if (empty.length >= count) {
        for (let j = 0; j < count; j++) {
            const randomIndex = Math.floor(Math.random() * empty.length);
            const selectedIdx = empty.splice(randomIndex, 1)[0];
            if (isX) state.blockedIndicesX.push(selectedIdx);
            else state.blockedIndicesO.push(selectedIdx);
        }
        if (isX) state.isChallengeActiveX = true;
        else state.isChallengeActiveO = true;

        Sound.play('click');
        updateQuestProgress('blocks', count);
        renderBoard();
        updateTurnUI();
    }
}
async function openFriendProfile(p) {
    if (p.uid === state.p1.uid) { showScreen('my-account'); return; }
    state.selectedPlayer = p;

    // 1. Career Stats
    const ids = {
        fpName: p.name,
        fpStatus: p.online ? "Online" : "Offline",
        fpStreakBadge: "🔥 " + (p.streak || 0) + " Streak",
        fpWins: p.wins || 0,
        fpLosses: p.losses || 0,
        fpDraws: p.draws || 0,
        fpTrophies: p.trophies || 0
    };
    for (let id in ids) {
        const el = document.getElementById(id);
        if (el) el.innerText = ids[id];
    }

    const av = document.getElementById('fpAvatar');
    if (av) av.src = p.avatar;

    // 2. Head-to-Head & Form
    if (state.p1.isLoggedIn && db) {
        // FIXED: Using 'oppUid' to match endGame saving logic
        db.ref(`users/${state.p1.uid}/history`).orderByChild('oppUid').equalTo(p.uid).once('value', snap => {
            let hWin = 0, hDraw = 0, hLoss = 0;
            snap.forEach(child => {
                const m = child.val();
                if (m.result === 'win') hWin++;
                else if (m.result === 'draw') hDraw++;
                else hLoss++;
            });
            const h2hEl = document.getElementById('h2hStatsLabel');
            if (h2hEl) h2hEl.innerText = `VS ME: ${hWin}W - ${hDraw}D - ${hLoss}L`;
        });

        // FIXED: Using the correct function name
        renderMatchHistory(p.uid, 'friendHistoryList', 20);

        // Set toggle state
        db.ref(`users/${state.p1.uid}/settings/notifications/${p.uid}`).once('value', snap => {
            const isNotifOn = snap.exists() ? snap.val() : true;
            const toggle = document.getElementById('fpNotifToggle');
            if (toggle) toggle.checked = isNotifOn;
        });
    }

    // 3. Actions - Add/Remove in header, Chat/Challenge in main area
    const isFriend = state.friends.some(f => f.uid === p.uid);

    // Header button (Add or Remove)
    const addRemoveBtn = document.getElementById('fpAddRemoveBtn');
    if (addRemoveBtn) {
        addRemoveBtn.innerHTML = isFriend
            ? `<button class="btn-xs" style="background:#ff7675; padding: 4px 8px; font-size: 10px;" onclick="removeFriend('${p.uid}')">❌ Remove</button>`
            : `<button class="btn-xs" style="background:#00cec9; padding: 4px 8px; font-size: 10px;" onclick="addFriendFromProfile('${p.uid}')">➕ Add</button>`;
    }

    // Main action buttons (Chat & Challenge)
    const actionsDiv = document.getElementById('fpActions');
    if (actionsDiv) {
        actionsDiv.innerHTML = `<button class="btn-primary" style="flex: 1;" onclick="openFriendChat()">💬 Chat</button>`;
        actionsDiv.innerHTML += `<button class="btn-primary" style="flex: 1;" id="challengeBtn" onclick="challengePlayer()">⚔️ Challenge</button>`;
    }
    showScreen('friend-profile');
}

// #1: Remove friend function
function removeFriend(uid) {
    if (!state.p1.uid || !uid) return;
    if (confirm('Remove this friend?')) {
        db.ref(`users/${state.p1.uid}/friends/${uid}`).remove();
        db.ref(`users/${uid}/friends/${state.p1.uid}`).remove();
        state.friends = state.friends.filter(f => f.uid !== uid);
        Sound.play('click');
        if (state.selectedPlayer) openFriendProfile(state.selectedPlayer);
    }
}

function updateAccountScreen() {
    // 1. Map Career Totals to the UI
    const vals = [
        state.p1.name,
        state.p1.avatar,
        state.p1.wins,
        state.p1.draws,
        state.p1.losses,
        state.p1.trophies,
        state.p1.gold,
        state.p1.streak,
        state.p1.rank
    ];

    const ids = ['accName', 'accAvatar', 'accWins', 'accDraws', 'accLosses', 'accTrophies', 'accGold', 'accStreak', 'accRank'];

    ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'accAvatar') el.src = vals[i];
            else el.innerText = vals[i];
        }
    });

    // 2. LETHALITY MATH FIX (Wins / (Wins + Losses))
    const wins = Number(state.p1.wins) || 0;
    const losses = Number(state.p1.losses) || 0;
    const totalDecisive = wins + losses;

    const lethality = totalDecisive > 0 ? Math.round((wins / totalDecisive) * 100) : 0;

    const rateEl = document.getElementById('accWinRate');
    if (rateEl) {
        rateEl.innerText = lethality + "% LETHALITY";
        // Color coding for visual impact
        if (lethality >= 70) rateEl.style.color = "#55efc4";      // Deadly (Green)
        else if (lethality >= 45) rateEl.style.color = "#ffeaa7"; // Balanced (Yellow)
        else rateEl.style.color = "#ff7675";                     // Struggling (Red)
    }

    // 3. Trigger Match History (Last 50)
    if (state.p1.isLoggedIn && db) {
        renderMatchHistory(state.p1.uid, 'myHistoryList', 50);
    }

    // 4. Toggle Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = state.p1.isLoggedIn ? 'block' : 'none';
    }
}
function startTimer() {
    clearInterval(state.timerInterval);
    const td = document.getElementById('timerDisplay');

    state.timerInterval = setInterval(() => {
        if (!state.gameActive) return;

        // Determine who is playing and their specific clock
        let activeTime;
        let label;
        if (state.currentPlayer === 'X') {
            state.timeLeftX--;
            activeTime = state.timeLeftX;
            label = "You";
        } else {
            state.timeLeftO--;
            activeTime = state.timeLeftO;
            label = state.mode === 'bot' ? 'Bot' : 'P2';
        }

        if (td) {
            td.innerText = `⏳ ${label}: ${activeTime}s`;

            // 1. Reset to base class every tick to clear old alarms
            td.className = 'timer-pill';

            // 2. Check if in grace period (green timer)
            if (isInGracePeriod()) {
                td.classList.add('timer-grace');
            }
            // 3. Apply warning/alarm states based on your CSS
            else if (activeTime <= 5) {
                // Intense: Red background + White border + 0.5s flash
                td.classList.add('timer-alarm');
                Sound.play('tick'); // Play your tick.wav
            } else if (activeTime <= 10) {
                // Caution: Light red background + 1s flash
                td.classList.add('timer-warning');
            }
        }

        // 3. Handle Time Out
        if (activeTime <= 0) {
            clearInterval(state.timerInterval);
            // If current player runs out, the OTHER player wins
            endGame(state.currentPlayer === 'X' ? 'O' : 'X');
        }
    }, 1000);
}



/* --- 11. ACHIEVEMENTS & BADGES --- */
const achievements = [
    { id: 'first_win', title: 'First Win', desc: 'Win your first match!', icon: '🏅', check: s => s.p1.wins >= 1 },
    { id: 'ten_wins', title: '10 Wins', desc: 'Win 10 matches!', icon: '🥇', check: s => s.p1.wins >= 10 },
    { id: 'streak_5', title: 'Hot Streak', desc: 'Win 5 games in a row!', icon: '🔥', check: s => s.p1.streak >= 5 },
];
function checkAchievements() {
    if (!state.p1.achievements) state.p1.achievements = [];
    achievements.forEach(a => {
        if (!state.p1.achievements.includes(a.id) && a.check(state)) {
            state.p1.achievements.push(a.id);
            showAchievementModal(a); saveGlobalData();
        }
    });
}
function showAchievementModal(a) {
    let m = document.getElementById('achievementModal');
    if (!m) { m = document.createElement('div'); m.id = 'achievementModal'; m.className = 'modal'; document.body.appendChild(m); }
    m.innerHTML = `<div class='glass-modal'><h2>Unlocked!</h2><div style='font-size:60px;'>${a.icon}</div><h3>${a.title}</h3><p>${a.desc}</p><button class='btn-primary' onclick='document.getElementById("achievementModal").classList.remove("active")'>Close</button></div>`;
    m.classList.add('active'); Sound.play('win');
}

/* --- 12. UTILS --- */

// Settings Modal Functions
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        // Sync toggles with current state
        const soundToggle = document.getElementById('soundToggle');
        const vibrationToggle = document.getElementById('vibrationToggle');
        if (soundToggle) soundToggle.checked = !state.isMuted;
        if (vibrationToggle) vibrationToggle.checked = state.vibrationEnabled !== false;
        modal.classList.add('active');
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.remove('active');
}

function toggleSound() {
    const toggle = document.getElementById('soundToggle');
    state.isMuted = toggle ? !toggle.checked : !state.isMuted;
    saveGlobalData();
}

function toggleVibration() {
    const toggle = document.getElementById('vibrationToggle');
    state.vibrationEnabled = toggle ? toggle.checked : !state.vibrationEnabled;
    // Test vibration when enabled
    if (state.vibrationEnabled && window.AndroidInterface?.vibrate) {
        window.AndroidInterface.vibrate(50);
    }
    saveGlobalData();
}

// Legacy function for compatibility
function toggleMute() {
    state.isMuted = !state.isMuted;
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) soundToggle.checked = !state.isMuted;
    saveGlobalData();
}
function inviteNewFriend() { if(window.AndroidInterface) window.AndroidInterface.shareApp("Join Tic Tac Toe!"); }
function loadGlobalData() {
    try {
        const s = localStorage.getItem('QuestNest_Global_Data');
        if (s) {
            const d = JSON.parse(s);
            if (d.p1) Object.assign(state.p1, d.p1);
            if (d.quests) state.quests = d.quests;
            if (d.messages) state.messages = d.messages;
            if (d.isMuted !== undefined) state.isMuted = d.isMuted;
            if (d.vibrationEnabled !== undefined) state.vibrationEnabled = d.vibrationEnabled;
        }
    } catch (e) {
        console.error("Error loading data:", e);
    }
}
function openLeaderboardScreen() {     showScreen('leaderboard'); }
function setMode(m) {
    state.mode = m;
    document.querySelectorAll('.mode-btn').forEach(b => {
        b.classList.toggle('active', b.innerText.toLowerCase().includes(m));
    });
}
function setBoardSize(n) {
    state.size = parseInt(n);
    state.winCondition = n === 3 ? 3 : (n === 5 ? 4 : 5);

    // Update the base time AND both individual timers for a fresh start
    const newTime = n === 3 ? 20 : (n === 5 ? 40 : 60);
    state.timeLeft = newTime;
    state.timeLeftX = newTime;
    state.timeLeftO = newTime;

    document.querySelectorAll('.level-btn').forEach(b => {
        b.classList.toggle('active', b.innerText.includes(n + '×' + n));
    });
}
function saveGlobalData() {
    localStorage.setItem('QuestNest_Global_Data', JSON.stringify({
        p1: state.p1,
        quests: state.quests,
        messages: state.messages,
        isMuted: state.isMuted,
        vibrationEnabled: state.vibrationEnabled
    }));
}
function openWhatsApp(phone) {
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone.replace(/[^0-9+]/g, '').replace('+', '');

    // Use Android native to open WhatsApp or redirect to Play Store
    if (window.AndroidInterface && window.AndroidInterface.contactWhatsApp) {
        window.AndroidInterface.contactWhatsApp(cleanPhone);
    }
}
function openEmail(email) { if(window.AndroidInterface) window.AndroidInterface.contactEmail(email); }

// Privacy & Data Deletion Links
function openPrivacyPolicy() {
    const url = "https://marukashvili92.github.io/emoji-quest/privacy.html";
    if (window.AndroidInterface && window.AndroidInterface.openExternalUrl) {
        window.AndroidInterface.openExternalUrl(url);
    } else {
        window.open(url, "_blank");
    }
}

function openDataDeletion() {
    const url = "https://marukashvili92.github.io/emoji-quest/data-deletion.html";
    if (window.AndroidInterface && window.AndroidInterface.openExternalUrl) {
        window.AndroidInterface.openExternalUrl(url);
    } else {
        window.open(url, "_blank");
    }
}

function openNativeLeaderboard() {if(window.AndroidInterface) window.AndroidInterface.openLeaderboardScreen(); }
function closeRankUp() {
    const o = document.getElementById('rankUpOverlay');
    if (o) o.style.display = 'none';
}
// Function to fetch and display match history
function renderMatchHistory(userUid, targetElementId, limitCount) {
    const list = document.getElementById(targetElementId);
    if (!list) return;

    if (!db) {
        list.innerHTML = '<p style="text-align:center; opacity:0.5;">Offline: Stats Unavailable</p>';
        return;
    }

    list.innerHTML = '<p style="text-align:center; padding:10px; opacity:0.6;">Loading history...</p>';

    db.ref(`users/${userUid}/history`).limitToLast(limitCount).once('value', snap => {
        const matches = [];
        snap.forEach(child => { matches.push(child.val()); });
        matches.reverse();

        if (matches.length === 0) {
            list.innerHTML = `<p style="opacity:0.6; padding:10px; text-align:center;">No matches played yet.</p>`;
            return;
        }

        list.innerHTML = matches.map(m => `
            <div class="history-card ${m.result || 'draw'}"
                 style="cursor: pointer;"
                 onclick="handleHistoryClick('${m.oppUid}', '${m.oppName}', '${m.oppAvatar}')">
                <img src="${m.oppAvatar || ''}" class="history-opp-img">
                <div class="history-details">
                    <span class="history-name">${m.oppName || 'Opponent'}</span>
                    <span class="history-meta">${m.size || 3}x${m.size || 3} • ${m.timestamp ? new Date(m.timestamp).toLocaleDateString() : 'Recent'}</span>
                </div>
                <div class="history-badge">${(m.result || 'draw').toUpperCase()}</div>
            </div>
        `).join('');
    }).catch(e => {
        console.error("History fetch failed:", e);
        list.innerHTML = '<p>History currently unavailable</p>';
    });
}
function calculateH2H(friendUid) {
    if (!state.p1.uid) return;

    db.ref(`users/${state.p1.uid}/history`).orderByChild('oppUid').equalTo(friendUid).once('value', snap => {
        let w = 0, d = 0, l = 0;
        snap.forEach(child => {
            const m = child.val();
            if (m.result === 'win') w++;
            else if (m.result === 'draw') d++;
            else l++;
        });

        const el = document.getElementById('h2hStatsLabel');
        if (el) el.innerText = `VS ME: ${w}W - ${d}D - ${l}L`;
    });
}
function handleLeaderboardClick(index) {
    const playerData = state.leaderboardCache[index];
    if (playerData) {
        Sound.play('click');
        openFriendProfile(playerData);
    }
}
// 2. The Logic Handler
function handleHistoryClick(uid, name, avatar) {
    if (uid === 'bot') {
        showBotToast();
    } else {
        // If it's a real player, fetch their profile from Firebase
        if (!db) return;

        db.ref(`users/${uid}`).once('value', snap => {
            if (snap.exists()) {
                const pData = snap.val();
                pData.uid = uid; // Ensure UID is attached for the 'Add Friend' logic
                openFriendProfile(pData);
            } else {
                console.warn("Player no longer exists in database.");
            }
        });
    }
}

// 3. The "Beep Boop" Toast (0.5s-0.6s)
function showBotToast() {
    let toast = document.getElementById('botToast');
    if (!toast) {
        // Create it dynamically if you haven't added it to HTML yet
        toast = document.createElement('div');
        toast.id = 'botToast';
        toast.className = 'bot-toast-notif';
        document.body.appendChild(toast);
    }

    toast.innerText = "🤖 BEEP BOOP! I AM A BOT";
    toast.classList.add('active');
    Sound.play('click'); // Or a robotic sound if you have one

    // Quick exit after 600ms
    setTimeout(() => {
        toast.classList.remove('active');
    }, 600);
}
window.onload = () => { loadGlobalData(); updateHeaderProfile(); renderFriends(); updateAccountScreen(); if (state.p1.isLoggedIn) { fetchFriends(); checkQuestReset(); } };
