const getVideoInfoById = async (id) => {
  try {
    const response = await fetch(
      "http://content.api.enviloup.localhost/videos/" + id
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

function renderVideoPlayer(videoId) {
  const html = `
    <div class="relative w-full bg-black">
      <video id="videoPlayer" class="w-full h-auto"
        poster="http://cdn.enviloup.com/thumbnails/${videoId}/default.webp">
        <source src="http://cdn.enviloup.com/videos/${videoId}/master.m3u8"
            type="application/x-mpegURL">
        Your browser does not support the video tag.
      </video>
      <div class="controls d-flex align-items-center">
        <button id="playPauseBtn" class="text-light">▷</button>
        <select name="quality" id="qualityBtn"></select>
        <select name="speed" id="speedBtn">
            <option value="0.25">0.25</option>
            <option value="0.5">0.5</option>
            <option value="0.75">0.75</option>
            <option value="1" selected>1</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
        </select>
        
        
        <div class="volume-control">
            <label for="volumeRange">🔊</label>
            <input type="range" id="volumeRange" min="0" max="1" step="0.1" value="1">
        </div>

        <input type="range" id="seekBar" min="0" value="0" style="width: 70%;">
        <div id="currentTime" class="text-light">00:00/00:00</div>
      </div>
    </div>
  `;
  document.getElementById("videoContainer").innerHTML = html;
}

function renderVideoInfo(videoInfo) {
  const html = `
    <div class="w-full mb-4">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-4 pt-4 pb-2 flex flex-col gap-2">
          <h5 class="text-xl font-semibold text-gray-800 truncate">${videoInfo.title}</h5>
          <p class="text-gray-600">${videoInfo.description.replace(/\n/g, "<br>")}</p>
          <div class="flex items-center space-x-4 text-gray-500">
            <span>2028 views</span>
            <span>5 days ago</span>
            <span class="flex space-x-2">
              <img src="static/like.svg" class="h-12 w-12 cursor-pointer">
              <img src="static/dislike.svg" class="h-12 w-12 cursor-pointer">
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("videoInfo").innerHTML = html;
}

async function loadVideo() {
  const url = new URL(window.location.href);
  const videoId = url.searchParams.get("id");
  const videoInfo = await getVideoInfoById(videoId);

  renderVideoPlayer(videoId);
  renderVideoInfo(videoInfo);

  if (Hls.isSupported()) {
    var video = document.getElementById("videoPlayer");
    var hls = new Hls();
    hls.loadSource(`http://cdn.enviloup.com/videos/${videoId}/master.m3u8`);
    hls.attachMedia(video);

    setupVideoPlayerControls(hls);
  }
}

async function setupVideoPlayerControls(hls) {

  const qualitySelector = document.getElementById('qualityBtn');  

  hls.on(Hls.Events.MANIFEST_PARSED, function () {

    // Создаем кнопки для выбора качества на основе разрешений
    hls.levels.forEach((level, index) => {
        const resolution = level.height;
        const option = document.createElement('option');
        option.textContent = resolution;
        option.value = index;
        qualitySelector.appendChild(option);
    });

  });

  const videoPlayer = document.getElementById('videoPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const speedBtn = document.getElementById('speedBtn');
  const volumeRange = document.getElementById('volumeRange');
  const seekBar = document.getElementById('seekBar');

  // Перемотка видео
  seekBar.addEventListener('input', () => {
      videoPlayer.currentTime = seekBar.value;
  });

  // Воспроизведение/остановка видео
  playPauseBtn.addEventListener('click', () => {
      if (videoPlayer.paused) {
          videoPlayer.play();
          playPauseBtn.textContent = '⏸';
      } else {
          videoPlayer.pause();
          playPauseBtn.textContent = '▷';
      }
  });

  // Переключение качества
  qualitySelector.addEventListener('change', () => {
      hls.levels.forEach((level, index) => {
          if (index === parseInt(qualitySelector.value)) {
              hls.currentLevel = index;
          }
      });
  });

  // Изменение скорости
  speedBtn.addEventListener('change', () => {
      videoPlayer.playbackRate = speedBtn.value;
  });

  // Изменение громкости
  volumeRange.addEventListener('input', () => {
      videoPlayer.volume = volumeRange.value; // Устанавливаем громкость
  });

  // Форматирование времени
  function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Прокрутка видео
  videoPlayer.addEventListener('timeupdate', () => {
      seekBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100; // Обновляем ползунок времени
      const currentTime = formatTime(videoPlayer.currentTime);
      const videoDuration = formatTime(videoPlayer.duration);

      document.getElementById('currentTime').textContent = `${currentTime}/${videoDuration}`;

      if (videoPlayer.duration === "NaN:NaN") {
          document.getElementById('currentTime').textContent = '00:00/00:00';
      }

  });

  seekBar.addEventListener('input', () => {
          const newTime = (seekBar.value / 100) * videoPlayer.duration; // Вычисляем новое время
          videoPlayer.currentTime = newTime; // Устанавливаем новое время
      });


  // Save the current time of the video to local storage
  function saveControlsData() {
      localStorage.setItem('videoCurrentTime', videoPlayer.currentTime);
      localStorage.setItem('videoQuality', hls.currentLevel);
      localStorage.setItem('videoSpeed', videoPlayer.playbackRate);
  }

  // Load the saved time from local storage
  function loadControlsData() {
      const savedTime = localStorage.getItem('videoCurrentTime');
      const savedQuality = localStorage.getItem('videoQuality');
      const savedSpeed = localStorage.getItem('videoSpeed');
      if (savedTime) {
          videoPlayer.currentTime = parseFloat(savedTime);
      }
      if (savedQuality) {
          hls.currentLevel = parseInt(savedQuality);
          qualitySelector.value = savedQuality;
      }
      if (savedSpeed) {
          videoPlayer.playbackRate = parseFloat(savedSpeed);
          speedBtn.value = parseFloat(savedSpeed);
      }
  }

  // Event listener to save the current time before the page unloads
  window.addEventListener('beforeunload', saveControlsData);

  // Load the saved time when the page is loaded
  window.addEventListener('load', loadControlsData);


  // Генератор таймкода
  const timecodes = document.querySelectorAll('p');

  timecodes.forEach(paragraph => {
      const text = paragraph.textContent;
      const matches = text.match(/\b(\d{2}:\d{2})\b/g) || [];
      matches.forEach(time => {
          const timecodeLink = document.createElement('span');
          const timeParts = time.split(':'); // Разделяем текст на минуты и секунды
          const timeInMilliseconds = (parseInt(timeParts[0]) * 60 + parseInt(timeParts[1])); // Переводим в миллисекунды

          timecodeLink.style.color = 'blue';
          timecodeLink.style.textDecoration = 'underline';
          timecodeLink.style.cursor = 'pointer';
          timecodeLink.className = 'timecode-link';
          timecodeLink.dataset.time = timeInMilliseconds;
          timecodeLink.textContent = time;
          paragraph.innerHTML = paragraph.innerHTML.replace(time, timecodeLink.outerHTML);
      });
  });

  // Воспроизведение по таймкоду
  document.querySelectorAll('.timecode-link').forEach(link => {
      link.addEventListener('click', () => {
          videoPlayer.currentTime = link.dataset.time; // Устанавливаем текущее время видео в секундах
      });
  });
}

loadVideo();
