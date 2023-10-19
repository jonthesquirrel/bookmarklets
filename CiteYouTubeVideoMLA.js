javascript:(() => {
  function getUploadDate() {
    const scrapedDate = document.querySelector("#info-container #info span:nth-of-type(3)").innerText;
    let dateObject = new Date(scrapedDate);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  }
  const uploadDate = getUploadDate();

  if (uploadDate === "Invalid Date") {
    alert("Click the video description to expand the full upload date, then run the bookmarklet again.");
    return;
  }

  function getTitle() {
    const scrapedTitle = document.querySelector("#title>h1").innerText;
    return scrapedTitle;
  }

  const title = getTitle();

  function getAuthor() {
    const scrapedAuthor = document.querySelector("#channel-name a").innerText;
    return scrapedAuthor;
  }

  const author = getAuthor();

  function timestampToSeconds(timestamp) {
    const timestampParts = timestamp.split(":").map(Number);
    let hours, minutes, seconds;
    if (timestampParts.length === 2) {
      hours = 0;
      minutes = timestampParts[0];
      seconds = timestampParts[1];
    }
    if (timestampParts.length === 3) {
      hours = timestampParts[0];
      minutes = timestampParts[1];
      seconds = timestampParts[2];
    }
    const totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
    return totalSeconds;
  }

  function getURL() {
    const scrapedURL = window.location.href;
    const videoID = scrapedURL.match(/(?<=\?v=)[^&\n]+/)[0];

    const scrapedTimestamp = document.querySelector(".ytp-time-current").innerText;
    const timestampAsSeconds = timestampToSeconds(scrapedTimestamp);

    const includeTimestamp = confirm("Include timestamp in citation?");

    let shortURL;

    if (includeTimestamp) {
      shortURL = `https://youtu.be/${videoID}?t=${timestampAsSeconds}`;
    } else {
      shortURL = `https://youtu.be/${videoID}`;
    }

    return shortURL;
  }

  const url = getURL();

  const citation = `"${title}" *YouTube*, uploaded by ${author}, ${uploadDate}, ${url}.`;

  navigator.clipboard.writeText(citation);

  alert(`Citation copied to clipboard:\n${citation}`);
})();
