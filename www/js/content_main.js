const ids = [];
const videosInfo = [];

const getIds = async () => {
  try {
    const response = await fetch(
      "http://recommendations.api.enviloup.localhost/api/v1/videos/?user=default"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

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

function renderVideos() {
  const html = `
    ${videosInfo
      .map((video) => {
        return `
          <div class="max-w rounded-lg overflow-hidden shadow-lg bg-white mb-6 flex flex-col">
            <!-- Изображение видео -->
            <img class="w-full h-48 object-fill" src="http://cdn.enviloup.com/thumbnails/${video.video_uuid}/default.webp" alt="${video.title}">
            
            <div class="px-6 py-2 flex-grow">
              <!-- Заголовок -->
              <div class="font-bold text-xl text-gray-800 mb-2">${video.title}</div>
            </div>
            
            <!-- Кнопка просмотра видео -->
            <div class="px-6 py-2 mb-4">
              <a href="/www/watch.html?id=${video.video_uuid}" class="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-blue-600" target="_blank">Watch Video</a>
            </div>
          </div>
        `;
      })
      .join("")}
  `;
  document.getElementById("videos").innerHTML = html;
}

async function loadVideos() {
  const videoIds = await getIds();
  const videoPromises = videoIds["videos"].map((id) => getVideoInfoById(id));

  const allVideoData = await Promise.all(videoPromises);

  videosInfo.push(...allVideoData);

  renderVideos();
}

loadVideos();
