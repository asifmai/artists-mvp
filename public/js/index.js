$(document).ready(function () {
  $('.btn-scrapeYoutube').click(function (e) { 
    e.preventDefault();
    $(this).text('Scraping');
    document.querySelector('.btn-scrapeYoutube').disabled = true;
    const inputVal = $('input#youtubeLink').val().trim();
    
    if (inputVal == '') {
      $('.error-youtube').css('display', 'block');
    } else {
      $('.error-youtube').css('display', 'none');
      
      fetch('/scrapeyoutube', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: inputVal}),
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        $('input#youtuberesult').val(data.data);
        document.querySelector('.btn-scrapeYoutube').disabled = false;
        $(this).text('Scrape Youtube');
      }).catch(function (error) {
        $('input#youtuberesult').val(error);
        document.querySelector('.btn-scrapeYoutube').disabled = false;
        $(this).text('Scrape Youtube');
      })
    }

  });
});