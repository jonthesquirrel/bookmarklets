javascript:(function(){
  const url = window.location.href;
  const newUrl = url.replace(/https?:\/\/www\.amazon\.com\/.*?\/dp/, 'https://www.amazon.com/dp').split('?')[0];
  navigator.clipboard.writeText(newUrl);
})();
