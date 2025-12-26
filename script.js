//variables
let memes = [];
let scores = {};
let players = [];
const players_given = document.querySelectorAll("name_inputs");
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

player_inputs.addEventListener("change", (event) =>{
	players = [];
	const players_given = document.querySelectorAll(".name_inputs");
	players_given.forEach(el => {
		console.log(el);
		if (el.value != "") {
			players.push(el.value);
		}
	});
	if (players.length > 2 && memes.length!==0) {
		start_button.classList = "glowing_button";}
	if (players.length > 3) {
		add_new_player();}
	})

function add_new_player(){ 
	const new_player = document.createElement("input"); 
	new_player.type= "text"; 
	new_player.classList.add("name_inputs"); 
	new_player.placeholder = "Player " + (String(players.length + 1)) + " ..."; 
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
	if (players.length > 2 && memes.length !== 0) {start_button.classList = "glowing_button";};
});

// start the game
start_button.addEventListener("click", () => {
  if (start_button.classList.contains("glowing_button")) {

    players.forEach(name => {
      const el = document.createElement("span");
      scores[name] = 0;
      el.textContent = name + ":   " + scores[name];
      el.classList.add("names");
      el.id = name;
			const height_name = 50/players.length
			el.style.height = String(height_name + "vh");
			el.style.fontSize = String(height_name/2 + "vh");
      scores_section.appendChild(el);

      // click name to add points
      el.addEventListener("click", () => {
        scores[name] += 1;
				next_meme.classList = "glowing_button";
        el.textContent = name + ":   " + scores[name];
      });
    });

    // hides all the startup stuff
    player_inputs.style.display = "none";
    upload_memes.style.display = "none";
    upload_memes_button.style.display = "none";
    start_button.style.display = "none";
    next_meme_button.style.display = "block";
    left_panel.append(title);

    // choosing the first random meme
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    meme.src = randomMeme;
    meme.style.display = "block";
    memes.splice(memes.indexOf(randomMeme), 1);
  }
});

//next meme button
document.getElementById("next_meme_button").addEventListener("click", () => {
  if (memes.length === 0) {
		return;
	}
	const randomMeme = memes[Math.floor(Math.random() * memes.length)];
	const meme = document.getElementById("memeImage");
  meme.src = randomMeme;
	memes.splice(memes.indexOf(randomMeme),1);
	next_meme.classList = "button";
});
