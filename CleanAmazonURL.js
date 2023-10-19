javascript:(() => {
  const scrapedURL = window.location.href;
  const productID = scrapedURL.match(/\/((product)|(dp))\/(?<productID>[a-zA-Z0-9]+)/).groups.productID;
  const shortURL = `https://amazon.com/dp/${productID}`;
  navigator.clipboard.writeText(shortURL);
  location.href = shortURL;
})();
