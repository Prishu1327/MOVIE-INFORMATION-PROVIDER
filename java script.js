<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Popcorn Bits Cinemas</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
body{margin:0;background:black;color:white;font-family:Arial;}

.navbar{
    background:#000;
    padding:12px 28px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:2px solid #333;
}

.nav-left{
    display:flex;
    align-items:center;
    gap:40px;
}

.brand{
    font-size:24px;
    font-weight:bold;
    color:white;
    cursor:pointer;
}

.menu{
    list-style:none;
    display:flex;
    gap:25px;
    margin:0;
    padding:0;
}

.nav-item{
    cursor:pointer;
    font-size:18px;
    color:#ccc;
    position:relative;
}

.nav-item:hover{color:white;}

.dropdown-menu{
    position:absolute;
    top:28px;
    left:0;
    background:#111;
    padding:10px 0;
    border:1px solid #333;
    display:none;
    list-style:none;
    width:150px;
    z-index:99999;
}

.dropdown:hover .dropdown-menu{
    display:block;
}

.dropdown-menu li{
    padding:10px 15px;
    cursor:pointer;
    color:#ddd;
}
.dropdown-menu li:hover{
    background:#222;
    color:white;
}

.nav-right{display:flex;gap:10px;}
.searchInput{padding:7px 12px;border:none;outline:none;border-radius:3px;}
.searchBtn{padding:7px 12px;background:#fff;border:none;cursor:pointer;border-radius:3px;}

.container{max-width:1200px;margin:25px auto;padding:0 20px;}
#movieGenreLabel{font-size:45px;margin-bottom:25px;font-weight:bold;}

.grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:25px;
}

.eachMovie img{
    width:100%;border:3px solid white;cursor:pointer;transition:0.3s;
}
.eachMovie img:hover{transform:scale(1.05);}

#modalBackdrop{
    position:fixed;inset:0;background:rgba(0,0,0,.85);
    display:none;align-items:center;justify-content:center;z-index:2000;
}
.modal-box{
    width:850px;max-width:95%;background:white;color:black;
    display:flex;border-radius:6px;overflow:hidden;position:relative;
}
.modal-left img{width:100%;}
.modal-right{padding:20px;}

#closeModal{
    position:absolute;top:10px;right:10px;background:#222;color:white;
    padding:5px 12px;cursor:pointer;
}

.timeBtn{
    border:1px solid blue;color:blue;padding:5px 12px;
    display:inline-block;margin:5px;
}

.pagination{text-align:center;margin-top:30px;}
.pgbtn{
    padding:10px 25px;background:white;color:black;border:none;
    cursor:pointer;font-size:18px;margin:10px;
}
.pgbtn:hover{background:#ddd;}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="navbar">
    <div class="nav-left">
        <span class="brand">Popcorn Bits Cinemas</span>

        <ul class="menu">
            <li class="nav-item nowPlayingBtn">Now Playing</li>

            <li class="nav-item dropdown">
                Genres ▾
                <ul class="dropdown-menu">
                    <li data-genre="action">Action</li>
                    <li data-genre="comedy">Comedy</li>
                    <li data-genre="drama">Drama</li>
                    <li data-genre="horror">Horror</li>
                    <li data-genre="romance">Romance</li>
                    <li data-genre="thriller">Thriller</li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="nav-right">
        <input type="text" class="searchInput" placeholder="Search movies...">
        <button class="searchBtn">Search</button>
    </div>
</div>

<!-- MOVIES -->
<div class="container">
    <h1 id="movieGenreLabel">NOW PLAYING</h1>

    <div id="movieGrid" class="grid"></div>

    <div class="pagination">
        <button class="pgbtn" id="prevBtn">Previous</button>
        <button class="pgbtn" id="nextBtn">Next</button>
    </div>
</div>

<!-- MODAL -->
<div id="modalBackdrop">
    <div class="modal-box">
        <span id="closeModal">X</span>
        <div class="modal-left"><img id="modalPoster"></div>
        <div class="modal-right">
            <h2 id="modalTitle"></h2>
            <p id="modalRelease"></p>
            <p id="modalRating"></p>
            <p id="modalOverview"></p>
            <div id="modalTimes"></div>
        </div>
    </div>
</div>

<script>
/* MOVIE DATABASE */
const pages = [

/* PAGE 1 */
[
{title:"Interstellar", genre:"drama", poster:"https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", release:"2014", rating:"8.6", overview:"Space-time travel."},
{title:"Joker", genre:"thriller", poster:"https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg", release:"2019", rating:"8.5", overview:"Arthur Fleck origin."},
{title:"RRR", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg", release:"2022", rating:"8.0", overview:"Friendship and revolution."},
{title:"Sanju", genre:"drama", poster:"https://upload.wikimedia.org/wikipedia/en/8/85/Sanju_poster.jpg", release:"2018", rating:"7.7", overview:"Sanjay Dutt biopic."},
{title:"3 Idiots", genre:"comedy", poster:"https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg", release:"2009", rating:"8.4", overview:"Engineering story."},
{title:"PK", genre:"comedy", poster:"https://upload.wikimedia.org/wikipedia/en/c/c3/PK_poster.jpg", release:"2014", rating:"8.1", overview:"Alien arrives on Earth."},
{title:"Dangal", genre:"drama", poster:"https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg", release:"2016", rating:"8.4", overview:"Wrestling family drama."},
],

/* PAGE 2 */
[
{title:"Avengers Infinity War", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg", release:"2018", rating:"8.4", overview:"Thanos vs Avengers."},
{title:"Avengers Endgame", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", release:"2019", rating:"8.4", overview:"Final MCU battle."},
{title:"Spider-Man No Way Home", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg", release:"2021", rating:"8.3", overview:"Multiverse chaos."},
{title:"Thor Ragnarok", genre:"comedy", poster:"https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg", release:"2017", rating:"7.9", overview:"Thor vs Hela."},
{title:"Captain America Civil War", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg", release:"2016", rating:"7.8", overview:"Team Cap vs Team Iron Man."},
{title:"John Wick", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg", release:"2014", rating:"7.4", overview:"Baba Yaga returns."},
{title:"Pacific Rim", genre:"action", poster:"https://upload.wikimedia.org/wikipedia/en/f/f3/Pacific_Rim_FilmPoster.jpeg", release:"2013", rating:"6.9", overview:"Jaegers vs Kaiju."},
{title:"IT", genre:"horror", poster:"https://upload.wikimedia.org/wikipedia/en/5/5a/It_%282017%29_poster.jpg", release:"2017", rating:"7.4", overview:"Horror clown."}
],

/* PAGE 3 */
[
{title:"Avatar", genre:"action", poster:"https://m.media-amazon.com/images/I/61OUGpUfAyL._AC_SY679_.jpg", release:"2009", rating:"7.8", overview:"Journey on Pandora."},
]
];

/* DISPLAY MOVIES */
let currentPage = 0;
const movieGrid = document.getElementById("movieGrid");

function loadMovies(){
    movieGrid.innerHTML="";

    pages[currentPage].forEach(m=>{
        let div=document.createElement("div");
        div.className="eachMovie";
        div.innerHTML=`<img src="${m.poster}">`;
        div.onclick=()=>openMovie(m);
        movieGrid.appendChild(div);
    });

    document.getElementById("prevBtn").style.display = currentPage===0 ? "none" : "inline-block";
    document.getElementById("nextBtn").style.display = currentPage===pages.length-1 ? "none" : "inline-block";
}

loadMovies();

/* PAGINATION */
document.getElementById("nextBtn").onclick=()=>{
    if(currentPage < pages.length-1){ currentPage++; loadMovies(); }
};
document.getElementById("prevBtn").onclick=()=>{
    if(currentPage > 0){ currentPage--; loadMovies(); }
};

/* MODAL OPEN */
const modal=document.getElementById("modalBackdrop");

function openMovie(m){
    modal.style.display="flex";
    document.getElementById("modalPoster").src=m.poster;
    document.getElementById("modalTitle").textContent=m.title;
    document.getElementById("modalRelease").textContent="Release: "+m.release;
    document.getElementById("modalRating").textContent="Rating: "+m.rating;
    document.getElementById("modalOverview").textContent=m.overview;

    document.getElementById("modalTimes").innerHTML=
        ["8:30 AM","10:00 AM","12:30 PM","3:00 PM","5:30 PM","8:00 PM","10:30 PM"]
        .map(t=>`<span class='timeBtn'>${t}</span>`).join("");
}
document.getElementById("closeModal").onclick=()=>modal.style.display="none";

/* ===================== GENRE FILTER ===================== */
document.querySelectorAll(".dropdown-menu li").forEach(item=>{
    item.onclick = () => {
        
        const genre = item.getAttribute("data-genre");
        let results = [];

        pages.forEach(page=>{
            page.forEach(movie=>{
                if(movie.genre === genre){
                    results.push(movie);
                }
            });
        });

        document.getElementById("movieGenreLabel").textContent = "Genre: " + item.innerText;
        movieGrid.innerHTML="";

        results.forEach(m=>{
            let div=document.createElement("div");
            div.className="eachMovie";
            div.innerHTML=`<img src="${m.poster}">`;
            div.onclick=()=>openMovie(m);
            movieGrid.appendChild(div);
        });

        // hide pagination when filtered
        document.getElementById("nextBtn").style.display="none";
        document.getElementById("prevBtn").style.display="none";
    }
});

/* RETURN TO NORMAL VIEW */
document.querySelector(".nowPlayingBtn").onclick = ()=>{
    currentPage=0;
    document.getElementById("movieGenreLabel").textContent="NOW PLAYING";
    loadMovies();
};

/* SEARCH */
document.querySelector(".searchBtn").onclick = () => {
    let term = document.querySelector(".searchInput").value.trim().toLowerCase();
    if(term===""){ alert("Search box empty!"); return; }

    let results = [];
    pages.forEach(page=>{
        page.forEach(movie=>{
            if(movie.title.toLowerCase().includes(term)){
                results.push(movie);
            }
        });
    });

    document.getElementById("movieGenreLabel").textContent="Search Results";
    movieGrid.innerHTML="";

    if(results.length===0){
        movieGrid.innerHTML="<h2>No movies found</h2>";
        return;
    }

    results.forEach(m=>{
        let div=document.createElement("div");
        div.className="eachMovie";
        div.innerHTML=`<img src="${m.poster}">`;
        div.onclick=()=>openMovie(m);
        movieGrid.appendChild(div);
    });

    document.getElementById("nextBtn").style.display="none";
    document.getElementById("prevBtn").style.display="none";
};
</script>

</body>
</html>