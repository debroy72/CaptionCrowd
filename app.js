document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const subtitleContainer = document.getElementById('subtitle-container');
  let alteredSubtitles = []; // Altered subtitles
  let originalSubtitles = []; // Original subtitles
  let clickedWordsWithTimestamp = [];
  let videoCount = 0;
  let currentVideoName = '';
  let accumulatedData = [];

  const videoSources = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    // Add more video sources as needed
  ];

  function loadNextVideo() {
    if (videoCount < videoSources.length) {
      const videoSource = videoSources[videoCount];
      video.src = videoSource;

      // Load altered subtitles
      fetch(`/captions/captions${videoCount + 1}_altered.srt`)
        .then(response => response.text())
        .then(data => {
          alteredSubtitles = parseSRT(data);
        });

      // Load original subtitles
      fetch(`/captions/captions${videoCount + 1}.srt`)
        .then(response => response.text())
        .then(data => {
          originalSubtitles = parseSRT(data);
        });
    } else {
      generateCombinedCSVFile(accumulatedData);
    }
  }

  loadNextVideo();

  video.addEventListener('loadedmetadata', function () {
    updateSubtitle();
  });

  video.addEventListener('timeupdate', function () {
    updateSubtitle();
  });

  subtitleContainer.addEventListener('mousedown', function (event) {
    const clickedWord = event.target.closest('.word');
    if (clickedWord) {
      const clickedWordText = clickedWord.textContent.trim();
      const positionInSubtitle = getPositionInSubtitle(subtitleContainer, clickedWord);
      clickedWord.classList.toggle('clicked-word');
      updateClickedWords(clickedWordText, positionInSubtitle);
    }
  });

  video.addEventListener('ended', function () {
    const userNameInput = document.getElementById('user-name');
    const userName = userNameInput.value.trim();

    if (userName !== '') {
      videoCount++;
      const videoData = {
        userName,
        videoCount,
        videoName: currentVideoName,
        clickedWordsWithTimestamp,
      };
      accumulatedData.push(videoData);
      loadNextVideo();
    } else {
      alert('Please enter your name.');
    }
  });

  function getPositionInSubtitle(subtitleContainer, clickedWord) {
    const words = Array.from(subtitleContainer.querySelectorAll('.word'));
    const clickedIndex = words.indexOf(clickedWord);
    return clickedIndex + 1;
  }

  function updateSubtitle() {
    const currentTime = video.currentTime;
    let subtitleText = '';

    for (let i = 0; i < alteredSubtitles.length; i++) {
      const subtitle = alteredSubtitles[i];
      if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime) {
        subtitleText = subtitle.text;
        subtitleContainer.innerHTML = subtitleText
          .split(/\b(\w+)\b/g)
          .map(word => {
            const timestamp = formatTime(currentTime);
            return word.match(/\b(\w+)\b/) ? `<span class="word" data-timestamp="${timestamp}">${word}</span>` : word;
          })
          .join('');
        break;
      }
    }
  }

  function updateClickedWords(clickedWord, positionInSubtitle) {
    const currentTime = video.currentTime;
    const subtitleNumber = getSubtitleNumber(alteredSubtitles, currentTime);
    const exactWord = getExactWordFromOriginal(subtitleNumber, positionInSubtitle);

    console.log(`Clicked Word: ${clickedWord}, Timestamp: ${formatTime(currentTime)}, Subtitle Number: ${subtitleNumber}, Position in Subtitle: ${positionInSubtitle}, Exact Word: ${exactWord}`);
    clickedWordsWithTimestamp.push({ clickedWord, timestamp: formatTime(currentTime), subtitleNumber, positionInSubtitle, exactWord });
  }

  function getExactWordFromOriginal(subtitleNumber, positionInSubtitle) {
    const matchingSubtitle = originalSubtitles.find(subtitle => subtitle.index === subtitleNumber);
    if (matchingSubtitle) {
      const words = matchingSubtitle.text.split(/\s+/);
      return words[Math.min(positionInSubtitle - 1, words.length - 1)];
    }
    return 'Word not found';
  }

  function getSubtitleNumber(subtitles, currentTime) {
    for (let i = 0; i < subtitles.length; i++) {
      const subtitle = subtitles[i];
      if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime) {
        return subtitle.index;
      }
    }
    return -1;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function parseSRT(srtData) {
    const subtitleObjects = [];
    const subtitleBlocks = srtData.split(/\n\s*\n/);

    subtitleBlocks.forEach(block => {
      const lines = block.split('\n').map(line => line.trim());
      const index = parseInt(lines[0]);
      if (lines.length >= 3) {
        const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
        if (timeMatch) {
          const startTime = convertTimeToSeconds(timeMatch[1]);
          const endTime = convertTimeToSeconds(timeMatch[2]);
          const text = lines.slice(2).join('\n').trim();

          subtitleObjects.push({
            index,
            startTime,
            endTime,
            text
          });
        }
      }
    });

    return subtitleObjects;
  }

  function convertTimeToSeconds(timeString) {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseFloat(timeParts[2].replace(',', '.'));

    return hours * 3600 + minutes * 60 + seconds;
  }

  function generateCombinedCSVFile(dataArray) {
    const combinedCSVContent = dataArray.map(videoData => {
      return videoData.clickedWordsWithTimestamp.map(entry => `${videoData.userName},${videoData.videoCount},${videoData.videoName},${entry.clickedWord},${entry.timestamp},${entry.subtitleNumber},${entry.positionInSubtitle},${entry.exactWord}`).join('\n');
    }).join('\n');

    const userName = dataArray[0].userName;
    const fileName = `${userName}_clicked_word_detail.csv`;
    const header = 'User Name,Video Count,Video Name,Clicked Word,Timestamp,Subtitle Number,Position in Subtitle,Exact Word\n';
    const csvContent = header + combinedCSVContent;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  }
});
