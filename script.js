let bloki = document.querySelectorAll(".blok");
let wynik = document.getElementById("wynik");
let informacje = document.getElementById("informacje");
let timeout_id;
let i = 1,
	x = 0,
	o = 0;

if (
	localStorage.getItem("wynik-x") != null &&
	localStorage.getItem("wynik-o") != null &&
	localStorage.getItem("data") != null
) {
	if (localStorage.getItem("zabezpieczenie") == 1) {
		document.querySelectorAll(".blok").forEach((element, index) => {
			element.removeAttribute("onclick");
		});
	}
	wynik.innerHTML = localStorage.getItem("wynik-x");
	wynik.innerHTML = `<b style="color: #33c4fd">${localStorage.getItem(
		"wynik-x"
	)}</b> - <b style="color: #9b0ff8">${localStorage.getItem("wynik-o")}</b>`;
	informacje.innerHTML += `${localStorage.getItem("data")}`;
	for (let j = 0; j < bloki.length; j++) {
		const val = localStorage.getItem(`blok${j + 1}`);
		if (val === "X") {
			bloki[j].style.color = "#33c4fd";
			bloki[j].innerHTML = "X";
			bloki[j].removeAttribute("onclick");
			i++;
		} else if (val === "O") {
			bloki[j].style.color = "#9b0ff8";
			bloki[j].innerHTML = "O";
			bloki[j].removeAttribute("onclick");
			i++;
		}
	}
	if (localStorage.getItem("timer") !== null) {
		wygrana(localStorage.getItem("G"));
	}
} else {
	localStorage.setItem("wynik-x", "0");
	localStorage.setItem("wynik-o", "0");
	localStorage.setItem("data", "");
	localStorage.setItem("zabezpieczenie", 0);
	for (let i = 1; i <= 9; i++) {
		localStorage.setItem(`blok${i}`, "");
	}
}

function gra(X) {
	const now = new Date();
	for (let j = 0; j < bloki.length; j++) {
		if (X === j + 1) {
			if (i % 2 == 1) {
				bloki[j].style.color = "#33c4fd";
				bloki[j].innerHTML = "X";
				localStorage.setItem("blok" + (j + 1), "X");
			} else {
				bloki[j].style.color = "#9b0ff8";
				bloki[j].innerHTML = "O";
				localStorage.setItem("blok" + (j + 1), "O");
			}
			bloki[j].removeAttribute("onclick");
			i++;
			break;
		}
	}

	const wygrywajaceKombinacje = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < wygrywajaceKombinacje.length; i++) {
		const kombinacja = wygrywajaceKombinacje[i];
		if (
			bloki[kombinacja[0]].textContent === "X" &&
			bloki[kombinacja[1]].textContent === "X" &&
			bloki[kombinacja[2]].textContent === "X"
		) {
			x++;
			let G = 1;
			localStorage.setItem("G", G);
			localStorage.setItem("zabezpieczenie", 1);
			localStorage.setItem(
				"wynik-x",
				JSON.parse(localStorage.getItem("wynik-x")) + 1
			);
			localStorage.setItem(
				"data",
				localStorage.getItem("data") +
					`<ok style="color: #33c4fd">X</ok> - <ok style="color: #73ff00">${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} | ${now.getDate()}.${
						now.getMonth() + 1
					}.${now.getFullYear()} </ok><br>`
			);
			wyniki();
			wygrana(G);
			break;
		} else if (
			bloki[kombinacja[0]].textContent === "O" &&
			bloki[kombinacja[1]].textContent === "O" &&
			bloki[kombinacja[2]].textContent === "O"
		) {
			o++;
			let G = 2;
			localStorage.setItem("G", G);
			localStorage.setItem("zabezpieczenie", 1);
			localStorage.setItem(
				"wynik-o",
				JSON.parse(localStorage.getItem("wynik-o")) + 1
			);
			localStorage.setItem(
				"data",
				localStorage.getItem("data") +
					`<ok style="color: #9b0ff8">O</ok> - <ok style="color: #73ff00">${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} | ${now.getDate()}.${
						now.getMonth() + 1
					}.${now.getFullYear()} </ok><br>`
			);
			wyniki();
			wygrana(G);
			break;
		}
	}
}

function nowa_gra() {
	setTimeout(() => {
		clearTimeout(timeout_id);
	}, 1000);
	localStorage.removeItem("G");
	localStorage.removeItem("timer");
	reset();
}

function usuń_historię() {
	localStorage.setItem("wynik-x", "0");
	localStorage.setItem("wynik-o", "0");
	localStorage.setItem("data", "");
	x = 0;
	o = 0;
	informacje.innerHTML = `<p class="p">Historia zwycięstw:</p>`;
	wynik.innerHTML = `<b style="color: #33c4fd">0</b> - <b style="color: #9b0ff8">0</b>`;
}

function wyniki() {
	document.querySelectorAll(".blok").forEach((element, index) => {
		element.removeAttribute("onclick");
	});
	wynik.innerHTML = `<b style="color: #33c4fd">${localStorage.getItem(
		"wynik-x"
	)}</b> - <b style="color: #9b0ff8">${localStorage.getItem("wynik-o")}</b>`;
	informacje.innerHTML =
		`<p class="p">Historia zwycięstw:</p>` + localStorage.getItem("data");
}

function wygrana(G) {
	if (G == 1) {
		wynik.innerHTML = `Wygrał - <b style="color: #33c4fd">X</b>`;
	}
	else {
		wynik.innerHTML = `Wygrał - <b style="color: #9b0ff8">O</b>`;
	}
	localStorage.setItem("timer", timeout_id);
	timeout_id = setTimeout(() => {
		reset();
	}, 5000);
}

function reset() {
	document.querySelectorAll(".blok").forEach((element, index) => {
		element.innerHTML = "";
	});
	document.querySelectorAll(".blok").forEach((element, index) => {
		element.setAttribute("onclick", `gra(${index + 1})`);
	});
	for (let i = 1; i <= 9; i++) {
		localStorage.setItem(`blok${i}`, "");
	}
	localStorage.setItem("zabezpieczenie", 0);
	i = 1;
	wynik.innerHTML = `<b style="color: #33c4fd">${localStorage.getItem(
		"wynik-x"
	)}</b> - <b style="color: #9b0ff8">${localStorage.getItem("wynik-o")}</b>`;
	informacje.innerHTML =
		`<p class="p">Historia zwycięstw:</p>` + localStorage.getItem("data");
	localStorage.removeItem("timer");
	gra();
}