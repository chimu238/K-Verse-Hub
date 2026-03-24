  // -------- GROUPS PAGE --------
  fetch("../groups.json")
    .then(res => res.json())
    .then(groups => {

      const container = document.getElementById("groupsContainer");

      if (!container) return; // agar groups page nahi hai toh skip

      groups.forEach(group => {

        const div = document.createElement("div");
        div.className = "group-card";

        div.innerHTML = `
          <h3>${group.name}</h3>
          <p>👥 Members: ${group.members}</p>
          <p>📅 Debut: ${group.debut}</p>
          <p>💜 Fandom: ${group.fandom}</p>
`        ;

        container.appendChild(div);

      });

    })
    .catch(err => console.log(err));



// -------- YOUTUBE PAGE SCRIPT --------

// fetch JSON file

fetch("../youtube_official.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("liveContainer");
    if (!container) return;

    data.groups.forEach((group, index) => {
      
      const section = document.createElement("div");
      section.classList.add("live-card");

      const contentId = "content-" + index;
      const songsId = "songs-" + index;

      section.innerHTML = `
        <div class="live-group-btn" onclick="toggleLive('${contentId}')">
          ${group.name}
        </div>

        <div id="${contentId}" style="display:none;">

          <div class="live-options">
            <button class="playlist-btn" onclick="window.open('${group.channel}', '_blank')">
              🎥 Playlist
            </button>

            <button class="top-btn" onclick="showSongs('${songsId}', ${index})">
              ▶ Top Songs
            </button>
          </div>

          <div id="${songsId}" class="song-list"></div>

        </div>
      `;

      container.appendChild(section);
    });

    window.allGroups = data.groups;
  });


// open/close
function toggleLive(id) {
  const div = document.getElementById(id);
  div.style.display = div.style.display === "none" ? "block" : "none";
}


// show songs (per group)
function showSongs(songsId, index) {
  const songDiv = document.getElementById(songsId);
  const group = window.allGroups[index];

  songDiv.innerHTML = "";

  group.topSongs.forEach(song => {

  const videoId = song.url.split("youtu.be/")[1].split("?")[0];

  const div = document.createElement("div");
  div.classList.add("video-card");

  div.innerHTML = `
    <img src="https://img.youtube.com/vi/${videoId}/0.jpg">
    <p>▶ ${song.title}</p>
  `;

  div.onclick = () => {
    window.open(song.url, "_blank");
  };

  songDiv.appendChild(div);
});
}
      

const groupEmojis = {
  "BTS": "💜",
  "BLACKPINK": "🖤💗",
  "SEVENTEEN": "💎",
  "Stray Kids": "🔥",
  "TWICE": "🍭",
  "aespa": "💙",
  "ENHYPEN": "❤️",
  "TOMORROW X TOGETHER": "💙",
  "IVE": "💜",
  "NewJeans": "🐰",
  "LE SSERAFIM": "🔥",
  "(G)I-DLE": "👑",
  "ILLIT": "🌸",
  "Baby Monster": "🐉",
  "EXO": "❤️",
  "FIFTY FIFTY": "🌙",
  "Ateez": "🏴‍☠️",
  "P1Harmony": "⚡",
  "Xlov": "💫",
  "KiiiKiii": "⭐",
  "WJSN": "🌌"
};
fetch("../news.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("newsContainer");
    if (!container) return;

    data.groups.forEach((group, index) => {

      const section = document.createElement("div");
      section.classList.add("news-card");

      // Unique ID for toggle
      const contentId = "content-" + index;

      section.innerHTML = `
        <h2 class="groupTitle" onclick="toggleNews('${contentId}')">
          ${groupEmojis[group.name] || "🎤"} ${group.name} 
        </h2>

        <div id="${contentId}" class="newsContent" style="display: none;">
          <button class="mainBtn" onclick="window.open('${group.mainNews}', '_blank')">
            🌐 Main News Page
          </button>

          <h4>📰 Top News</h4>
        </div>
      `;

      // Add top news buttons
      const contentDiv = section.querySelector(`#${contentId}`);

      group.topNews.forEach(news => {
        const btn = document.createElement("button");
        btn.classList.add("newsBtn");
        btn.innerText = news.title;
        btn.onclick = () => window.open(news.url, "_blank");

        contentDiv.appendChild(btn);
      });

      container.appendChild(section);

    });

  })
  .catch(err => console.log("Error:", err));


// Toggle function
function toggleNews(id) {
  const content = document.getElementById(id);

  if (content.style.display === "none") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}