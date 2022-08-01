const themeBtn = document.querySelector(".theme-btn");
const theme = document.querySelector("#theme-css");
const url = "https://api.github.com/users/";
const searchInput = document.querySelector("#search-input");
const searchError = document.querySelector("#search-error");
const searchBtn = document.querySelector("#search-btn");

//profile
const get = (param) => document.getElementById(`${param}`);
const avatar = get("avatar");
const name = get("name");
const username = get("username");
const date = get("date");
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const locate = get("location");
const twitter = get("twitter");
const website = get("website");
const company = get("company");

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

themeBtn.addEventListener("click", ()=>{
    if(theme.getAttribute("href")=="./light-theme.css"){
        theme.href="./dark-theme.css";
        themeBtn.innerHTML = "Light<img src='./assets/icon-sun.svg'>";
    }else{
        theme.href = "./light-theme.css";
        themeBtn.innerHTML = "Dark<img src='./assets/icon-moon.svg'>";
    }
})

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(url+searchInput.value);
    getUserData(url+searchInput.value);
})

function getUserData(githubURL){
    fetch(githubURL)
        .then((res)=>res.json())
        .then((data)=>{ updateProfile(data) })
        .catch((error)=>{ throw error; });
}

function updateProfile(user){
    if(user.message=="Not Found"){
        searchError.style.display = "block";
    }else{
        searchError.style.display = "none";
        avatar.src = user.avatar_url;
        name.innerHTML = user.name==null? "Not Available":user.name;
        username.innerHTML = `@${user.login}`;
        let dateArr = user.created_at.split("T")[0].split("-");
        let month = months[dateArr[1]-1];
        date.innerHTML = `Joined ${dateArr[2]} ${month} ${dateArr[0]}`;
        bio.innerHTML = user.bio==null? "This profile has no bio":user.bio;
        repos.innerHTML = user.public_repos;
        followers.innerHTML = user.followers;
        following.innerHTML = user.following;
        locate.innerHTML = checkData(user.location,locate);
        twitter.innerHTML = checkData(user.twitter_username,twitter);
        website.innerHTML = checkData(user.blog,website);
        company.innerHTML = checkData(user.company,company);
    }
    
}

function checkData(data, actual){
    if(data==="" || data===null){
        actual.style.opacity = 0.5;
        actual.previousElementSibling.style.opacity = 0.5;
        return "Not Available";
    }else{
        actual.style.opacity = 1;
        actual.previousElementSibling.style.opacity = 1;
        return data;
    }

}
