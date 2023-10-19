javascript:(() => {
  function getTitle() {
    const scrapedTitle = document.querySelector("#title>h1").innerText;
    return scrapedTitle;
  }

  function getAuthor() {
    const scrapedAuthor = document.querySelector("#channel-name a").innerText;
    return scrapedAuthor;
  }

  function getDate() {
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

  function getURL() {
    const scrapedURL = window.location.href;
    const videoID = scrapedURL.match(/(?<=\?v=)[^&\n]+/)[0];
    const shortURL = `https://youtu.be/${videoID}`;
    return shortURL;
  }

  const title = getTitle();
  const author = getAuthor();
  const date = getDate();
  const url = getURL();

  if (date === "Invalid Date") {
    alert("Click the video description to expand the full upload date, then run the bookmarklet again.");
    return;
  }

  const citation = `"${title}" *YouTube*, uploaded by ${author}, ${date}, ${url}.`;

  navigator.clipboard.writeText(citation);

  alert(`Citation copied to clipboard:\n${citation}`);
})();
