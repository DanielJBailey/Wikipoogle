$(document).ready(function () {
	var userInput = void 0;
	var degrees = 0;
	var limit = 20;

	//get input value from input box
	$("#search").on("keyup", function () {
		userInput = $("#search").val();
		console.log(userInput);
	});

	window.sr = ScrollReveal();

	sr.reveal(".normal", {
		duration: 500,
		distance: '50px',
		origin: 'bottom'
	});

	function getData() {
		var wikiURL = "https://en.wikipedia.org/w/api.php";
		wikiURL += "?" + $.param({
			action: "opensearch",
			search: userInput,
			prop: "revisions",
			rvprop: "content",
			format: "json",
			limit: limit
		});

		$.ajax({
			url: wikiURL,
			dataType: "jsonp",
			success: function success(data) {
				console.log(data);
				for (var i = 0; i <= 9; i++) {
					var searchContainer = document.getElementById('search-results');

					if (data[1][i] === undefined) {
						//do nothing and skip over this answer
					} else {

						var titleLink = document.createElement('a');
						var title = document.createTextNode(data[1][i]);
						titleLink.href = data[3][i];
						titleLink.className = 'title';
						titleLink.appendChild(title);

						var lineBreak = document.createElement('br');

						var newLine = document.createElement('li');

						var link = document.createElement('p');
						link.innerText = data[3][i];
						link.className = 'link';

						var description = document.createElement('p');
						description.className = 'description';
						description.innerText = data[2][i];

						newLine.appendChild(titleLink);
						newLine.appendChild(lineBreak);
						newLine.appendChild(link);
						newLine.appendChild(description);
						searchContainer.appendChild(newLine);
					}
				}
			}
		});
	}

	$("#user-input-form").submit(function (e) {
		$('#search-results').html('');
		e.preventDefault();
		getData();
	});

	$('.menu-open').click(function () {
		$('.cover').show();
		$('.slide-out-menu').animate({ "margin-left": '0' }, "slow");
	});

	$('.cover').click(function (event) {
		event.preventDefault();
		event.stopPropagation();
		$('.cover').fadeOut(500);
		$('.slide-out-menu').animate({ "margin-left": "-70vw" }, "slow");
	});
});