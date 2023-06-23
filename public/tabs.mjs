// made by code-alt
// meant to load extensions and tabs for oasis, and manage them.

// oasis v2.2.0 is real! will have have tabs that save to session storage, and will have extensions that can be loaded from a JSON file

var preinstalledExtensions = ["/assets/extensions/oasisdefault/"];

export const loadExtension = (link) => {
  let mlink =
    link.replace(/\/manifest\.json$/, "").replace(/\/+$/, "") +
    "/manifest.json";
  let rlink = link.replace("/manifest.json", "");
  if (rlink.endsWith("/")) {
    rlink = rlink.slice(0, -1);
  }
  return new Promise((resolve, reject) => {
    let numFiles = 0;
    let numLoaded = 0;
    fetch(mlink)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          reject("Extension not found");
        }
      })
      .then((data) => {
        let name = data.name;
        let version = data.version;
        let author = data.author;
        console.log(`Loading extension/theme ${name} v${version} by ${author}`);
        let _data = data.data;
        let type = data.type;
        if (type == "theme") {
          if (_data.theme.css) {
            let css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = rlink + "/" + _data.theme.css.replace(/^\//, "");
            css.addEventListener("load", () => {
              numLoaded++;
              if (numLoaded == numFiles) {
                resolve();
              }
            });
            document.head.appendChild(css);
            numFiles++;
          }
          // now do this with js
          if (_data.theme.js) {
            let js = document.createElement("script");
            js.src = rlink + "/" + _data.theme.js.replace(/^\//, "");
            js.addEventListener("load", () => {
              numLoaded++;
              if (numLoaded == numFiles) {
                resolve();
              }
            });
            document.head.appendChild(js);
            numFiles++;
          }
        } else if (type == "extension") {
          return; // this for later!
        }
        if (numFiles == 0) {
          resolve();
        }
      });
  });
};

export const startupExtensions = async () => {
  return new Promise((resolve, reject) => {
    if (preinstalledExtensions) {
      preinstalledExtensions.forEach((extension) => {
        loadExtension(extension);
      });
    }

    if (localStorage.getItem("extensions")) {
      let extensions = JSON.parse(localStorage.getItem("extensions"));
      extensions.forEach((extension) => {
        loadExtension(extension);
      });
    }
    resolve();
  });
};

export class Tab {
  constructor() {}
}
