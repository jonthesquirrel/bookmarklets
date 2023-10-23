javascript:(() => {
  function getUploadDate() {
    return [...document.querySelectorAll("#info-container>#info>span")]
      .map(element => element.innerText)
      .map(text => text.replace(/Premiered /, ""))
      .filter(text => Date.parse(text))
      .map(text => new Date(text))
      .map(date =>
        `${date.getDate()} ${
          date.toLocaleString('default', {month: 'long'})
        } ${date.getFullYear()}`
      )
      .pop();
  }

  const uploadDate = getUploadDate();

  if (!uploadDate) {
    alert("Click the video description to expand the full upload date, then run the bookmarklet again.");
    return;
  }

  function getTitle() {
    return document.querySelector("#title>h1").innerText;
  }

  const title = getTitle();

  function getAuthor() {
    return document.querySelector("#channel-name a").innerText;
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

    const includeTimestamp = confirm("Include current playback position?");

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
})();
