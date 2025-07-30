const API_KEY = 'AIzaSyBtpCmb4WHmKy3I10fzVprfjfW172m8ZnQ';
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const player = document.getElementById('player');
const thumbnails = document.getElementById('thumbnails');

searchBtn.addEventListener('click', searchVideos);

function searchVideos() {
  const query = searchInput.value.trim();
  if (!query) return;

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${encodeURIComponent(query)}&type=video&maxResults=5`)
    .then(response => response.json())
    .then(data => {
      const videos = data.items;
      if (videos.length === 0) {
        player.innerHTML = '<p>Видео не найдено</p>';
        thumbnails.innerHTML = '';
        return;
      }

      // Отображение первого видео
      const firstVideoId = videos[0].id.videoId;
      loadVideo(firstVideoId);

      // Создание превьюшек
      thumbnails.innerHTML = '';
      videos.forEach(video => {
        const img = document.createElement('img');
        img.src = video.snippet.thumbnails.default.url;
        img.alt = video.snippet.title;
        img.addEventListener('click', () => loadVideo(video.id.videoId));
        thumbnails.appendChild(img);
      });
    })
    .catch(error => {
      console.error('Ошибка при загрузке видео:', error);
    });
}

function loadVideo(videoId) {
  player.innerHTML = `
    <iframe width="560" height="315" 
      src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" 
      allow="autoplay; encrypted-media" 
      allowfullscreen>
    </iframe>
  `;
}
