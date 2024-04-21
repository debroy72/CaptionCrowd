document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const subtitleContainer = document.getElementById('subtitle-container');
  const startButton = document.getElementById('start-button');
  let alteredSubtitles = [];
  let originalSubtitles = [];
  let clickedWordsWithTimestamp = [];
  let videoCount = 0;
  let currentUserId = 0;
  let accumulatedData = [];
  const maxUsers = 1;
  let sessionNumber = 0;

  let allVideoSources = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
    '/videos/video4.mp4',
    '/videos/video5.mp4',
    '/videos/video6.mp4',
    '/videos/video7.mp4',
    '/videos/video8.mp4',
    '/videos/video9.mp4',
    '/videos/video10.mp4',
    '/videos/video11.mp4',
    '/videos/video12.mp4',
    '/videos/video13.mp4',
    '/videos/video14.mp4',
    '/videos/video15.mp4',
    '/videos/video16.mp4',
    '/videos/video17.mp4',
    '/videos/video18.mp4',
    '/videos/video19.mp4',
    '/videos/video20.mp4',
    '/videos/video21.mp4',
    '/videos/video22.mp4',
    '/videos/video23.mp4',
    '/videos/video24.mp4',
    '/videos/video25.mp4',
    '/videos/video26.mp4',
    '/videos/video27.mp4',
    '/videos/video28.mp4',
    '/videos/video29.mp4',
    '/videos/video30.mp4',
    '/videos/video31.mp4',
    '/videos/video32.mp4',
    '/videos/video33.mp4',
    '/videos/video34.mp4',
    '/videos/video35.mp4',
    '/videos/video36.mp4',
    '/videos/video37.mp4',
    '/videos/video38.mp4',
    '/videos/video39.mp4',
    '/videos/video40.mp4',
    '/videos/video41.mp4',
    '/videos/video42.mp4',
    '/videos/video43.mp4',
    '/videos/video44.mp4',
    '/videos/video45.mp4',
    '/videos/video46.mp4',
    '/videos/video47.mp4',
    '/videos/video48.mp4',
    '/videos/video49.mp4',
    '/videos/video50.mp4'
  ];

  let allCaptionSources = {
    '/videos/video1.mp4': { altered: '/captions/captions1_altered.srt', original: '/captions/captions1.srt' },
    '/videos/video2.mp4': { altered: '/captions/captions2_altered.srt', original: '/captions/captions2.srt' },
    '/videos/video3.mp4': { altered: '/captions/captions3_altered.srt', original: '/captions/captions3.srt' },
    '/videos/video4.mp4': { altered: '/captions/captions4_altered.srt', original: '/captions/captions4.srt' },
    '/videos/video5.mp4': { altered: '/captions/captions5_altered.srt', original: '/captions/captions5.srt' },
    '/videos/video6.mp4': { altered: '/captions/captions6_altered.srt', original: '/captions/captions6.srt' },
    '/videos/video7.mp4': { altered: '/captions/captions7_altered.srt', original: '/captions/captions7.srt' },
    '/videos/video8.mp4': { altered: '/captions/captions8_altered.srt', original: '/captions/captions8.srt' },
    '/videos/video9.mp4': { altered: '/captions/captions9_altered.srt', original: '/captions/captions9.srt' },
    '/videos/video10.mp4': { altered: '/captions/captions10_altered.srt', original: '/captions/captions10.srt' },
    '/videos/video11.mp4': { altered: '/captions/captions11_altered.srt', original: '/captions/captions11.srt' },
    '/videos/video12.mp4': { altered: '/captions/captions12_altered.srt', original: '/captions/captions12.srt' },
    '/videos/video13.mp4': { altered: '/captions/captions13_altered.srt', original: '/captions/captions13.srt' },
    '/videos/video14.mp4': { altered: '/captions/captions14_altered.srt', original: '/captions/captions14.srt' },
    '/videos/video15.mp4': { altered: '/captions/captions15_altered.srt', original: '/captions/captions15.srt' },
    '/videos/video16.mp4': { altered: '/captions/captions16_altered.srt', original: '/captions/captions16.srt' },
    '/videos/video17.mp4': { altered: '/captions/captions17_altered.srt', original: '/captions/captions17.srt' },
    '/videos/video18.mp4': { altered: '/captions/captions18_altered.srt', original: '/captions/captions18.srt' },
    '/videos/video19.mp4': { altered: '/captions/captions19_altered.srt', original: '/captions/captions19.srt' },
    '/videos/video20.mp4': { altered: '/captions/captions20_altered.srt', original: '/captions/captions20.srt' },
    '/videos/video21.mp4': { altered: '/captions/captions21_altered.srt', original: '/captions/captions21.srt' },
    '/videos/video22.mp4': { altered: '/captions/captions22_altered.srt', original: '/captions/captions22.srt' },
    '/videos/video23.mp4': { altered: '/captions/captions23_altered.srt', original: '/captions/captions23.srt' },
    '/videos/video24.mp4': { altered: '/captions/captions24_altered.srt', original: '/captions/captions24.srt' },
    '/videos/video25.mp4': { altered: '/captions/captions25_altered.srt', original: '/captions/captions25.srt' },
    '/videos/video26.mp4': { altered: '/captions/captions26_altered.srt', original: '/captions/captions26.srt' },
    '/videos/video27.mp4': { altered: '/captions/captions27_altered.srt', original: '/captions/captions27.srt' },
    '/videos/video28.mp4': { altered: '/captions/captions28_altered.srt', original: '/captions/captions28.srt' },
    '/videos/video29.mp4': { altered: '/captions/captions29_altered.srt', original: '/captions/captions29.srt' },
    '/videos/video30.mp4': { altered: '/captions/captions30_altered.srt', original: '/captions/captions30.srt' },
    '/videos/video31.mp4': { altered: '/captions/captions31_altered.srt', original: '/captions/captions31.srt' },
    '/videos/video32.mp4': { altered: '/captions/captions32_altered.srt', original: '/captions/captions32.srt' },
    '/videos/video33.mp4': { altered: '/captions/captions33_altered.srt', original: '/captions/captions33.srt' },
    '/videos/video34.mp4': { altered: '/captions/captions34_altered.srt', original: '/captions/captions34.srt' },
    '/videos/video35.mp4': { altered: '/captions/captions35_altered.srt', original: '/captions/captions35.srt' },
    '/videos/video36.mp4': { altered: '/captions/captions36_altered.srt', original: '/captions/captions36.srt' },
    '/videos/video37.mp4': { altered: '/captions/captions37_altered.srt', original: '/captions/captions37.srt' },
    '/videos/video38.mp4': { altered: '/captions/captions38_altered.srt', original: '/captions/captions38.srt' },
    '/videos/video39.mp4': { altered: '/captions/captions39_altered.srt', original: '/captions/captions39.srt' },
    '/videos/video40.mp4': { altered: '/captions/captions40_altered.srt', original: '/captions/captions40.srt' },
    '/videos/video41.mp4': { altered: '/captions/captions41_altered.srt', original: '/captions/captions41.srt' },
    '/videos/video42.mp4': { altered: '/captions/captions42_altered.srt', original: '/captions/captions42.srt' },
    '/videos/video43.mp4': { altered: '/captions/captions43_altered.srt', original: '/captions/captions43.srt' },
    '/videos/video44.mp4': { altered: '/captions/captions44_altered.srt', original: '/captions/captions44.srt' },
    '/videos/video45.mp4': { altered: '/captions/captions45_altered.srt', original: '/captions/captions45.srt' },
    '/videos/video46.mp4': { altered: '/captions/captions46_altered.srt', original: '/captions/captions46.srt' },
    '/videos/video47.mp4': { altered: '/captions/captions47_altered.srt', original: '/captions/captions47.srt' },
    '/videos/video48.mp4': { altered: '/captions/captions48_altered.srt', original: '/captions/captions48.srt' },
    '/videos/video49.mp4': { altered: '/captions/captions49_altered.srt', original: '/captions/captions49.srt' },
    '/videos/video50.mp4': { altered: '/captions/captions50_altered.srt', original: '/captions/captions50.srt' }
  };

  let availableVideoSources = [...allVideoSources];
  let videoSources = [];
  let originalCSVData = [];
  let sessionUserCount = 0
  console.log("Initial sessionUserCount:", sessionUserCount);
  let isCSVAvailable = false;

  async function fetchAndParseCSV(url) {
    // Check if the CSV file is supposed to exist
    if (!isCSVAvailable) {
      // If the CSV does not exist, start with an empty dataset
      originalCSVData = ["User ID,User Name,Session Number,Clicked Word,Timestamp,Subtitle Number,Position in Subtitle,Exact Word,Video Name"];
      return { parsedCSV: [], lastUserId: 0 };
    } else {
      // Fetch and parse the CSV if it exists
      const response = await fetch(url);
      const csvText = await response.text();
      originalCSVData = csvText.split('\n');
      const parsedCSV = originalCSVData.map(row => row.split(','));
      const lastUserId = parsedCSV.length > 1 ? parseInt(parsedCSV[parsedCSV.length - 2][0]) : 0;
      return { parsedCSV, lastUserId };
    }
  }


async function filterVideosForUser(userName) {
  console.log("filterVideosForUser called for:", userName);
  const { parsedCSV, lastUserId } = await fetchAndParseCSV('/input/user_interactions.csv');
  console.log("CSV Data:", parsedCSV);

  const userRows = parsedCSV.filter(row => row.includes(userName));
  console.log("User Rows:", userRows); // Log filtered user rows

  const watchedVideos = userRows.map(row => row[row.length - 1]);
  console.log("Watched Videos:", watchedVideos); // Log watched videos

  const filteredVideos = allVideoSources.filter(video => !watchedVideos.includes(video));
  console.log("Filtered videos for user:", filteredVideos); // Log filtered videos

  return filteredVideos;
}


  

async function assignRandomVideosToUser(userName) {
  console.log("assignRandomVideosToUser called with:", userName);
  let filteredVideos = await filterVideosForUser(userName);
  console.log("Filtered videos:", filteredVideos);
  videoSources = [];

  for (let i = 0; i < 5; i++) {
    if (filteredVideos.length === 0) {
      console.log("No more unique videos available for this user.");
      break;
    }
    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    videoSources.push(filteredVideos[randomIndex]);
    filteredVideos.splice(randomIndex, 1);
  }
  console.log("Assigned videos for user:", videoSources); // Add this line
}



startButton.addEventListener('click', async function () {
  const userNameInput = document.getElementById('user-name');
  const sessionNumberInput = document.getElementById('session-number');
  const userName = userNameInput.value.trim();
  sessionNumber = sessionNumberInput.value.trim();

  if (!userName || !sessionNumber) {
    alert("Please enter a valid name and session number.");
    return;
  }
  isCSVAvailable = parseInt(sessionNumber) > 1;
  if (sessionUserCount >= maxUsers) {
    console.log("Max user limit reached. Current count:", sessionUserCount, "Max Users:", maxUsers);
    alert("All user sessions completed.");
    return;
  }

  if (sessionUserCount === 0) {
      const { lastUserId } = await fetchAndParseCSV('/input/user_interactions.csv');
      currentUserId = lastUserId + 1;
  } else {
      currentUserId++; // Increment for subsequent users within the same session
  }

  await assignRandomVideosToUser(userName);
  video.style.display = 'block';
  videoCount = 0;
  clickedWordsWithTimestamp = [];
  loadNextVideo();
  console.log("Start button clicked. Current sessionUserCount:", sessionUserCount);
  sessionUserCount++; // Increment session user count after successful start
  console.log("After incrementing in start button click, sessionUserCount:", sessionUserCount);
});





  function loadNextVideo() {
    if (videoCount < videoSources.length) {
      const videoSource = videoSources[videoCount];
      console.log("Loading video:", videoSource);
      video.src = videoSource;
      loadSubtitles(videoSource);
      video.load(); // Ensure the video is reloaded with the new source
      video.play(); // Play the video
    } else {
      accumulatedData.push({
        userId: currentUserId,
        userName: document.getElementById('user-name').value.trim(),
        sessionNumber: sessionNumber,
        clickedWordsWithTimestamp: [...clickedWordsWithTimestamp]
      });

      clickedWordsWithTimestamp = [];
      videoCount = 0; // Reset for the next user

      if (sessionUserCount < maxUsers) {
        initializeForNewUser();
      } else {
        generateCombinedCSVFile(accumulatedData);
      }
    }
  }


  function loadSubtitles(videoSource) {
    let captionSources = allCaptionSources[videoSource];
    console.log("Loading subtitles for:", videoSource);

    fetch(captionSources.altered)
    .then(response => response.text())
    .then(data => {
      alteredSubtitles = parseSRT(data);
      console.log("Altered subtitles loaded for:", videoSource);
    })
    .catch(error => {
      console.error("Error loading altered subtitles:", error);
    });

    fetch(captionSources.original)
    .then(response => response.text())
    .then(data => {
      originalSubtitles = parseSRT(data);
      console.log("Original subtitles loaded for:", videoSource);
    })
    .catch(error => {
      console.error("Error loading original subtitles:", error);
    });
  }

  video.addEventListener('loadedmetadata', updateSubtitle);
  video.addEventListener('timeupdate', updateSubtitle);

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
    videoCount++;
    if (videoCount < videoSources.length) {
      loadNextVideo();
    } else {
      const userNameInput = document.getElementById('user-name');
      const userName = userNameInput.value.trim();
      accumulatedData.push({
        userId: currentUserId,
        userName: userName,
        sessionNumber: sessionNumber,
        clickedWordsWithTimestamp: [...clickedWordsWithTimestamp]
      });
  
      clickedWordsWithTimestamp = [];
      videoCount = 0; // Reset video count for the next user
  
      if (sessionUserCount < maxUsers) {
        initializeForNewUser();
      } else {
        generateCombinedCSVFile(accumulatedData);
      }
    }
  });
  
  

  function initializeForNewUser() {
    console.log("Before Initializing new user. Current count:", sessionUserCount, "Max Users:", maxUsers);
    if (sessionUserCount >= maxUsers) {
      console.log("Max user limit reached during initialization. Current count:", sessionUserCount, "Max Users:", maxUsers);
      alert("Maximum number of user sessions reached.");
      generateCombinedCSVFile(accumulatedData);
      return;
    }
  
    // Increment currentUserId for each new user in the session, no need to fetch from CSV
    currentUserId++;
  
    // Prompt for user details
    const userName = prompt(`Enter name for User ${currentUserId}:`);
    sessionNumber = prompt(`Enter session number for User ${currentUserId}:`);
  
    if (userName && sessionNumber) {
      document.getElementById('user-name').value = userName;
      document.getElementById('session-number').value = sessionNumber;
  
      assignRandomVideosToUser(userName);
      loadNextVideo();
      sessionUserCount++; // Increment here after successful input
      console.log("After initializing new user. Current sessionUserCount:", sessionUserCount);
    } else {
      alert("Please enter a valid name and session number.");
      currentUserId--; // Decrement if the user input was invalid to retry with the same ID
    }
    console.log("After initializing new user. Current sessionUserCount:", sessionUserCount);
  }
  
  
  

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
    const currentVideoName = video.src.split('/').pop();

    console.log(`Clicked Word: ${clickedWord}, Timestamp: ${formatTime(currentTime)}, Subtitle Number: ${subtitleNumber}, Position in Subtitle: ${positionInSubtitle}, Exact Word: ${exactWord}, Video: ${currentVideoName}`);
    clickedWordsWithTimestamp.push({ clickedWord, timestamp: formatTime(currentTime), subtitleNumber, positionInSubtitle, exactWord, video: currentVideoName });
  }

  function getExactWordFromOriginal(subtitleNumber, positionInSubtitle) {
    const matchingSubtitle = originalSubtitles.find(subtitle => subtitle.index === subtitleNumber);
    if (matchingSubtitle) {
      // Ensure consistent word splitting as in updateSubtitle function
      const words = matchingSubtitle.text.split(/\b(\w+)\b/g).filter(word => /\w/.test(word));
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

  function generateCombinedCSVFile(_newDataArray) {
    let csvContent = "data:text/csv;charset=utf-8,";
    //csvContent += "User ID,User Name,Session Number,Clicked Word,Timestamp,Subtitle Number,Position in Subtitle,Exact Word,Video Name\n";
    csvContent += originalCSVData[0] + "\n";
// Append original CSV data
    for (let i = 1; i < originalCSVData.length; i++) {
      csvContent += originalCSVData[i] + "\n";
    }

    // Append new session data
  _newDataArray.forEach(session => {
    session.clickedWordsWithTimestamp.forEach(entry => {
      csvContent += `${session.userId},${session.userName},${session.sessionNumber},${entry.clickedWord},${entry.timestamp},${entry.subtitleNumber},${entry.positionInSubtitle},${entry.exactWord},${entry.video}\n`;
    });
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "combined_user_interactions.csv");
  document.body.appendChild(link);

  link.click(); // Trigger download
  }
});
