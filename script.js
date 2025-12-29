//variables
let memes = [];
let scores = {};
let players = [];
let score_colors = [("radial-gradient(circle, var(--light_teal), var(--blue) 60%)"), ("radial-gradient(circle, var(--light_teal), #583E91FF 60%)"), ("radial-gradient(circle, var(--light_teal), #8C4BB3FF 60%)"), ("radial-gradient(circle, var(--light_teal), #CF5CDFFF 60%)"), ("radial-gradient(circle, var(--light_teal), #E863F0FF 60%)")
	];
const player_inputs = document.getElementById("input_player_names");
const upload_memes = document.getElementById("meme_uploads");
const upload_memes_button = document.getElementById("meme_upload_button");
const start_button = document.getElementById("start_button");
const scores_section = document.getElementById("player_scores");
const left_panel = document.getElementById("left_panel");
const middle_panel = document.getElementById("middle_panel");
const right_panel = document.getElementById("right_panel");
const next_meme = document.getElementById("next_meme_button");
const meme = document.getElementById("memeImage");
const title = document.getElementById("title");

player_inputs.addEventListener("change", (event) => {
    players = [];
    const players_given = document.querySelectorAll(".name_inputs");
    players_given.forEach(el => {
        if (el.value != "") {
            players.push(el.value);
        }
    });
    if (players.length > 2 && memes.length !== 0) {
        start_button.classList = "glowing_button";
    }
    if (players.length > 3) {
        add_new_player();
    }
})

function add_new_player() { 
    const new_player = document.createElement("input"); 
    new_player.type= "text"; 
    new_player.classList.add("name_inputs"); 
    new_player.placeholder = "Player " + (players.length + 1) + " ..."; 
    player_inputs.appendChild(new_player); 
    new_player.focus();
};

//upload meme image files
upload_memes.addEventListener("change", () => {
    upload_memes_button.classList= "button";
    const files = Array.from(upload_memes.files);
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        memes.push(url);
    });
    if (players.length > 2 && memes.length !== 0) {
        start_button.classList = "glowing_button";
    };
});

// start the game
start_button.addEventListener("click", () => {
    if (!start_button.classList.contains("glowing_button")) return;

    // 👉 Toggle two-columns if players > 8
    if (players.length > 8) {
        scores_section.classList.add("two-columns");
    } else {
        scores_section.classList.remove("two-columns");
    }

    players.forEach(name => {
        const el = document.createElement("span");
        scores[name] = 0;
        el.textContent = name + ":   " + scores[name];
        el.classList.add("names");
        el.id = name;

        // Adjust height for two-columns
				let numRows = players.length;
				el.style.height = 70/numRows + "vh";
        scores_section.appendChild(el);

        // click name to add points
        el.addEventListener("click", () => {
            scores[name] += 1;
						console.log(score_colors[scores[name]]);
						el.style.background = score_colors[scores[name]];
            next_meme.classList = "glowing_button";
            el.textContent = name + ":   " + scores[name];
        });
    });

    // hides all the startup stuff
    player_inputs.style.display = "none";
    upload_memes.style.display = "none";
    upload_memes_button.style.display = "none";
    start_button.style.display = "none";
    next_meme.style.display = "block";
    left_panel.append(title);
		left_panel.style.overflowY = "auto";

    // choosing the first random meme
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    meme.src = randomMeme;
    meme.style.display = "block";
    memes.splice(memes.indexOf(randomMeme), 1);
});

//next meme button
next_meme.addEventListener("click", () => {
    if (memes.length === 0) return;
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    meme.src = randomMeme;
    memes.splice(memes.indexOf(randomMeme),1);
    next_meme.classList = "button";
});