$(document).ready(function() {
	$("form").submit(function(event) {
		// prevent page from reloading
		event.preventDefault();
		// clear old results
		$(".card-columns").empty();
		// search results
		search();
	});
});

function search() {
	var query = $("input[type='text']").val();
	$("input[type='text']").val("");
	var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&utf8=&srlimit=25&format=json&callback=?";

	getResults(url);
}

function getResults(url) {
	$.getJSON(url, function(data) {
		data.query.search.forEach(displayResults);
	});
}

function displayResults(result) {
	
	var articleLink = "https://en.wikipedia.org/wiki/" + result.title;
	var card = 	'<div class="card">' +
				'<a class="article" target="_blank" href="' + articleLink + '">' +
				'<div class="card-block">' +
				'<h4 class="card-title">' + result.title + '</h4>' +
				'<p class="card-text">' + result.snippet +
				'</p></div></a></div>';

	$(card).appendTo(".card-columns").hide().fadeIn(1000);
}