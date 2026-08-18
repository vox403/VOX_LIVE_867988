(() => {
  const $ = (id) => document.getElementById(id);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const imageFiles = ["1.png", "2.png", "4.png", "5.png", "6.png", "11.png", "12.png", "15.png", "17.png", "18.png", "voxtek.png"];
  const comments = [
    ["복스님바라기", "복스님 멋져요"],
    ["오직복스만", "복스님 사랑해요"],
    ["VOXSTAN_666", "😍😍😍😍😍😍"],
    ["DADDY", "VOX LOVE!!!!"],
    ["ASHTRAY", "복스님 제 코멘트 읽어주세요!"],
    ["HELLFIBEATSLUVR", "존나 잘생긴 TV!!"],
    ["HANDER", "당신은 최고예요"],
    ["최고의V", "다음 계획은 무엇인가요?"],
    ["KINGVOX", "경배하라!!"],
    ["GLITTRBBY", "복스테크는 최고의 회사입니다."],
    ["블루스크린러버", "이 방송만 기다렸어요"],
    ["채널고정중", "복스님 목소리 더 들려주세요!"],
    ["ALTO", "vox populi! vox populi!"],
    ["NEONSAINT", "THAT SCREEN SMILE IS EVERYTHING."],
    ["SIGNALBOOSTER", "ALL HAIL THE FUTURE OF HELL."],
    ["BLUESTATIC", "VOXTEK NEVER MISSES."],
    ["PRIMETIME666", "THE RATINGS KING IS LIVE."],
    ["VOXTEKSUPPORT", "VOX! VOX! VOX! VOX!"],
    ["REMOTECTRL", "SAY MY USERNAME, BOSS!"],
    ["CHANNELSURFER", "BEST BROADCAST IN THE PENTAGRAM."],
    ["PIXELHEART", "HE LOOKED AT THE CAMERA!!!"],
    ["VEE4EVER", "TRUST US. ALWAYS."],
    ["NO_SIGNAL", "MY SCREEN JUST GOT HOT."],
    ["UPLINKED", "WE ARE SO BACK."]
  ];
  const moderated = [
    ["EGGBOYS", "발렌티노님이랑 사귄다는 소문이 사실인가요?"],
    ["BROKENSCREEN", "머리만 남았던 영상 아직도 인터넷에 돌아다녀요ㅋㅋ"],
    ["PRIVACYWHO", "복스테크 제품이 사용자들을 감시한다는 게 사실인가요?"],
    ["ZENDEST", "알래스터한테 졌다면서요?"]
  ];
  const handFrames = [
    ["4.png", 900, ""],
    ["5.png", 180, "싫어."],
    ["6.png", 180, "싫어."],
    ["4.png", 420, "싫어."],
    ["1.png", 0, ""]
  ];
  const donationFrames = [
    ["11.png", 480],
    ["12.png", 170],
    ["11.png", 420],
    ["12.png", 160],
    ["11.png", 390],
    ["12.png", 210],
    ["15.png", 920],
    ["12.png", 520],
    ["17.png", 610],
    ["18.png", 1250],
    ["17.png", 480],
    ["1.png", 0]
  ];
  let nickname = "";
  let entered = false;
  let busy = false;
  let step = 0;
  let viewers = 42333;
  let seconds = 0;
  let reactions = 0;
  let combo = 0;
  let lastHeart = 0;
  let blinkTimer;
  let commentTimer;
  let viewerTimer;
  let clockTimer;
  let glitchTimer;
  let toastTimer;
  let comboTimer;
  const initial = [
    ["KINGVOX", "경배하라!!"],
    ["BLUESTATIC", "VOXTEK NEVER MISSES."],
    ["복스님바라기", "복스님 멋져요"],
    ["ALTO", "vox populi! vox populi!"]
  ];

  imageFiles.forEach((file) => {
    const image = new Image();
    image.src = file;
  });

  $("loginLogo").src = "voxtek.png";
  $("channelLogo").src = "voxtek.png";
  $("voxFrame").src = "1.png";
  $("bgm").src = "cat.mp3";

  function setFrame(file) {
    $("voxFrame").src = file;
  }
  function formatTime(value) {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value % 3600 / 60);
    const secondsValue = value % 60;
    return [hours, minutes, secondsValue].map((part) => String(part).padStart(2, "0")).join(":");
  }
  function addMessage(name, text, kind = "normal", deletable = false) {
    const p = document.createElement("p");
    p.className = `chat-message ${kind}${deletable ? " awaiting-delete" : ""}`;
    if (name) {
      const strong = document.createElement("strong");
      strong.textContent = name + ":";
      p.append(strong, " ");
    }
    const span = document.createElement("span");
    span.textContent = text;
    p.append(span);
    $("chatFeed").append(p);
    while ($("chatFeed").children.length > 11) $("chatFeed").firstElementChild.remove();
    $("chatFeed").scrollTop = $("chatFeed").scrollHeight;
    return p;
  }
  function showToast(text) {
    clearTimeout(toastTimer);
    $("toastText").textContent = text;
    $("toast").classList.remove("hidden");
    toastTimer = setTimeout(() => $("toast").classList.add("hidden"), 2200);
  }
  function scheduleBlink() {
    clearTimeout(blinkTimer);
    if (!entered || busy) return;
    blinkTimer = setTimeout(async () => {
      setFrame("2.png");
      await sleep(145);
      setFrame("1.png");
      scheduleBlink();
    }, 2300 + Math.random() * 3500);
  }
  function scheduleComment() {
    clearTimeout(commentTimer);
    if (!entered) return;
    commentTimer = setTimeout(() => {
      if (Math.random() < 0.14) {
        const [name, text] = moderated[Math.floor(Math.random() * moderated.length)];
        const message = addMessage(name, text, "normal", true);
        setTimeout(() => {
          if (!message.isConnected) return;
          message.className = "chat-message deleted";
          message.textContent = "[관리자에 의해 삭제된 코멘트입니다.]";
        }, 2700);
      } else {
        const [name, text] = comments[Math.floor(Math.random() * comments.length)];
        addMessage(name, text);
      }
      scheduleComment();
    }, 1700 + Math.random() * 1900);
  }
  function startBroadcast() {
    entered = true;
    $("login").classList.add("hidden");
    $("broadcast").classList.remove("hidden");
    $("chatFeed").replaceChildren();
    initial.forEach(([n, t]) => addMessage(n, t));
    addMessage("", `[${nickname}] 님이 입장하셨습니다.`, "system");
    seconds = 0;
    viewers = 42333;
    viewerTimer = setInterval(() => {
      const pull = viewers > 62000 ? -1 : viewers < 47000 ? 1 : Math.random() > 0.48 ? 1 : -1;
      viewers = Math.min(70000, Math.max(42001, viewers + Math.floor(35 + Math.random() * 260) * pull));
      $("viewerCount").textContent = viewers.toLocaleString("en-US");
    }, 2200);
    clockTimer = setInterval(() => {
      $("liveTime").textContent = formatTime(++seconds);
    }, 1000);
    glitchTimer = setInterval(() => {
      $("broadcast").classList.add("signal-glitch");
      setTimeout(() => $("broadcast").classList.remove("signal-glitch"), 190);
    }, 9500);
    scheduleBlink();
    scheduleComment();
    const audio = $("bgm");
    const muteButton = $("muteButton");
    audio.volume = 0.36;
    muteButton.classList.toggle("is-muted", audio.muted);
    muteButton.setAttribute("aria-pressed", String(audio.muted));
    audio.play().catch(() => {
      audio.muted = true;
      muteButton.classList.add("is-muted");
      muteButton.setAttribute("aria-pressed", "true");
    });
  }
  function exitBroadcast() {
    entered = false;
    busy = false;
    clearTimeout(blinkTimer);
    clearTimeout(commentTimer);
    clearInterval(viewerTimer);
    clearInterval(clockTimer);
    clearInterval(glitchTimer);
    $("bgm").pause();
    $("bgm").currentTime = 0;
    $("broadcast").classList.add("hidden");
    $("login").classList.remove("hidden");
    setFrame("1.png");
    step = 0;
    reactions = 0;
    $("reactionCount").textContent = "0";
    updateCommentButton();
  }
  function toggleMute() {
    const audio = $("bgm");
    const muteButton = $("muteButton");
    audio.muted = !audio.muted;
    muteButton.classList.toggle("is-muted", audio.muted);
    muteButton.setAttribute("aria-label", audio.muted ? "음악 켜기" : "음악 끄기");
    muteButton.setAttribute("aria-pressed", String(audio.muted));
    if (!audio.muted) audio.play().catch(() => undefined);
  }
  function updateCommentButton() {
    const label = $("commentButton").querySelector("span");
    label.textContent = busy ? "TRANSMITTING" : "COMMENT";
  }
  async function playFrames(frames) {
    busy = true;
    $("broadcast").classList.add("is-busy");
    $("choiceMenu").classList.add("hidden");
    updateCommentButton();
    clearTimeout(blinkTimer);
    for (const [name, duration, subtitle] of frames) {
      setFrame(name);
      if (subtitle) {
        $("voxSubtitle").textContent = subtitle;
        $("voxSubtitle").classList.remove("hidden");
      } else $("voxSubtitle").classList.add("hidden");
      if (duration) await sleep(duration);
    }
    $("voxSubtitle").classList.add("hidden");
    busy = false;
    $("broadcast").classList.remove("is-busy");
    updateCommentButton();
    scheduleBlink();
  }
  function openChoice() {
    if (busy) return;
    const button = $("choiceButton");
    button.replaceChildren();
    if (step === 0) {
      button.textContent = "손하트 해주세요!";
    } else {
      const amount = document.createElement("em");
      amount.textContent = "$10,000";
      button.append(amount, "를 후원한다.");
    }
    $("choiceMenu").classList.toggle("hidden");
  }
  async function selectChoice() {
    if (busy) return;
    if (step === 0) {
      addMessage(nickname, "손하트 해주세요!");
      step = 1;
      await playFrames(handFrames);
    } else {
      showDonation();
      await playFrames(donationFrames);
    }
  }
  function chime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const startTime = context.currentTime + index * 0.11;
        oscillator.type = "triangle";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.42);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.46);
      });
      setTimeout(() => void context.close(), 700);
    } catch {
      return;
    }
  }
  function showDonation() {
    const field = $("confettiField");
    field.replaceChildren();
    const colors = ["#00f7ff", "#19a7ff", "#fff", "#ff174f", "#7dfdff"];
    for (let i = 0; i < 46; i++) {
      const piece = document.createElement("i");
      piece.style.left = `${i * 37 % 100}%`;
      piece.style.animationDelay = `${i % 12 * 42}ms`;
      piece.style.animationDuration = `${950 + i % 7 * 110}ms`;
      piece.style.backgroundColor = colors[i % 5];
      field.append(piece);
    }
    const donationText = $("donationText");
    const amount = document.createElement("em");
    amount.textContent = "$10,000";
    donationText.replaceChildren(`[${nickname}] 님께서 `, amount, "를 후원하셨습니다.");
    $("donationOverlay").classList.remove("hidden");
    addMessage("", `[${nickname}] 님께서 $10,000를 후원하셨습니다.`, "donation");
    chime();
    setTimeout(() => $("donationOverlay").classList.add("hidden"), 4300);
  }
  function sendHearts() {
    const now = Date.now();
    combo = now - lastHeart < 720 ? Math.min(99, combo + 1) : 1;
    lastHeart = now;
    clearTimeout(comboTimer);
    if (combo > 2) {
      $("heartCombo").textContent = `×${combo}`;
      $("heartCombo").classList.remove("hidden");
    }
    comboTimer = setTimeout(() => {
      $("heartCombo").classList.add("hidden");
      combo = 0;
    }, 920);
    reactions++;
    $("reactionCount").textContent = reactions.toLocaleString();
    for (let i = 0; i < 4; i++) {
      const heart = document.createElement("span");
      heart.textContent = "♥";
      heart.style.left = `${8 + Math.random() * 70}%`;
      heart.style.fontSize = `${22 + Math.random() * 22}px`;
      heart.style.animationDelay = `${i * 70}ms`;
      heart.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
      $("heartStream").append(heart);
      setTimeout(() => heart.remove(), 2600);
    }
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(location.href);
    } catch {
      const t = document.createElement("textarea");
      t.value = location.href;
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.append(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    showToast("링크가 복사되었습니다.");
  }
  $("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    nickname = $("nicknameInput").value.trim().slice(0, 18);
    if (!nickname) {
      showToast("닉네임을 입력해주세요.");
      return;
    }
    startBroadcast();
  });
  $("exitButton").addEventListener("click", exitBroadcast);
  $("muteButton").addEventListener("click", toggleMute);
  $("commentButton").addEventListener("click", openChoice);
  $("choiceButton").addEventListener("click", selectChoice);
  $("heartButton").addEventListener("click", sendHearts);
  $("stage").addEventListener("dblclick", sendHearts);
  $("shareButton").addEventListener("click", share);
  $("creditsButton").addEventListener("click", () => $("creditsBackdrop").classList.remove("hidden"));
  $("creditsClose").addEventListener("click", () => $("creditsBackdrop").classList.add("hidden"));
  $("creditsBackdrop").addEventListener("click", (e) => {
    if (e.target === $("creditsBackdrop")) $("creditsBackdrop").classList.add("hidden");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!$("creditsBackdrop").classList.contains("hidden")) $("creditsBackdrop").classList.add("hidden");
      else $("choiceMenu").classList.add("hidden");
    }
    if (!entered) return;
    if (e.key.toLowerCase() === "h") sendHearts();
    if (e.key.toLowerCase() === "m") toggleMute();
  });
})();
