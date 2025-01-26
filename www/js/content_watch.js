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
        poster="http://cdn.enviloup.com/thumbnails/${videoId}/default.webp"
        controls>
        <source src="http://cdn.enviloup.com/videos/${videoId}/master.m3u8"
            type="application/x-mpegURL">
        Your browser does not support the video tag.
      </video>
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
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  }
}

loadVideo();
