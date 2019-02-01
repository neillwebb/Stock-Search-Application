const stocks = ['KO', 'AAPL', 'TACO', 'GOOG'];

const showStockInfo = function () {


  const stock = $(this).attr('autoName');
  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,news&range=1m&last=1`;


  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    const stockDiv = $('<div>').addClass('stock');
    const companyName = response.quote.companyName;
    const nameSpace = $('<p>').text(`Company Name: ${companyName}`);
    stockDiv.append(nameSpace);
    const companyLogo = response.logo.url;
    const logoSpace = $(`<img src= ${companyLogo}>`);
    stockDiv.append(logoSpace);
    const stockSymbol = response.quote.symbol;
    const symbolSpace = $('<p>').text(`Stock Symbol: ${stockSymbol}`);
    stockDiv.append(symbolSpace);
    const stockPrice = response.quote.latestPrice;
    const priceSpace = $('<p>').text(`Stock Price: $${stockPrice}`);
    stockDiv.append(priceSpace);
    const companyNews = response.news[0].summary;
    const summarySpace = $('<p>').text(`News Headline: ${companyNews}`);
    stockDiv.append(summarySpace);
    $('#stocksDisplay').prepend(stockDiv);
  });

}

const render = function () {
  $('#buttonsDisplay').empty();
  for (let i = 0; i < stocks.length; i++) {
    const newBtn = $('<button>');
    newBtn.addClass('stockEvent');
    newBtn.attr('autoName', stocks[i]);
    newBtn.text(stocks[i]);
    $('#buttonsDisplay').append(newBtn);
  }
}

const addButton = function (event) {

  event.preventDefault();
  const stock = $('#stockInput').val().trim();
  stocks.push(stock);
  $('#stockInput').val('');

  render();
}

$('#newStock').on('click', addButton);

$('#buttonsDisplay').on('click', '.stockEvent', showStockInfo);

render();