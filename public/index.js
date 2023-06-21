const $ = (e) => {
    return document.querySelector(e);
}

const id = (e) => {
    return document.getElementById(e);
}

const newUserOasis = () => {
    id("newuserui").style.opacity=1;
}

const delay = 3000;

const loadExtensions = async () => { // gets extensions on load
    return new Promise((resolve, reject) => {
        if (localStorage().getItem("extensions")) {
            // TODO: fetch a JSON file which will have data on what to load, and parse it into a class or something
        }
        resolve();
    });
}

const finishAndReload = (skid) => {
    if (skid) {
        localStorage.setItem("init", JSON.stringify({abCloak: true, browser: false}))
    } 
    var object = {abCloak: false, browser: false};
    var abCloak = id("abCloak");
    var webOS = id("webOS");
    var browser = id("browser");
    if (abCloak.checked) {
        object.abCloak = true;
    }
    if (webOS.checked) {
        object.browser = false;
    }
    if (browser.checked) {
        object.browser = true;
    }
}

const checkLocalStorage = () => {
    try {
      localStorage.getItem("x");
      return true;
    } catch {
      return false;
    }
}

const initOasis = async () => { // init script - sees if user has used oasis before and/or has picked a version or has gone back to change settings
    if (checkLocalStorage() == false) {
        id("loadText").innerText = "LocalStorage/Cookies are not enabled, Oasis will not work."
    }
    id("startcontain").style.opacity=0;
    if (localStorage.getItem("init")) {
        id("startcontain").style.opacity=1;
        id("loadText").innerText = "Loading Apps/Extensions..."
        await loadExtensions();
        startOasis();
        return;
    }
    newUserOasis();
    setTimeout(()=>{
        id("startcontain").remove()
    },500);
}

class App { // TODO
    constructor (options) {
    }
}

window.onload = () => {
    id("loadText").innerText="Loading Oasis...";
    window.setTimeout(() => {
        id("newuserui").style.display="block";
        window.setTimeout(()=>{initOasis();},500)
    }, delay-500)
}