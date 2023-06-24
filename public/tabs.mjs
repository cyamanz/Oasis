// made by code-alt
// meant to load extensions and tabs for oasis, and manage them.

// oasis v2.2.0 is real! will have have tabs that save to session storage, and will have extensions that can be loaded from a JSON file

const preinstalledExtensions = ["/assets/extensions/oasisdefault/"]; // THE THEME MUST BE FIRST IN THE ARRAY

export var loadedThemes = [];
export var currentTheme = null;

var totalFiles = 0;

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
          var c = false;
          var j = false;
          let css;
          let js;
          if (_data.theme.css) {
            c = true;
            css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = rlink + "/" + _data.theme.css.replace(/^\//, "");
            css.addEventListener("load", () => {
              numLoaded++;
              if (numLoaded == numFiles) {
                resolve();
              }
            });
            if (totalFiles == 0 && loadedThemes.length == 0) {
              document.head.appendChild(css);
            }
            numFiles++;
            totalFiles++;
          }
          // now do this with js
          if (_data.theme.js) {
            j = true;
            js = document.createElement("script");
            js.src = rlink + "/" + _data.theme.js.replace(/^\//, "");
            js.addEventListener("load", () => {
              numLoaded++;
              if (numLoaded == numFiles) {
                resolve();
              }
            });
            if (totalFiles == 1 && loadedThemes.length == 0) {
              document.head.appendChild(js);
            }
            numFiles++;
            totalFiles++;
          }

          if (
            (c == false && j == false && numFiles == 0) ||
            (c == true && j == false && numFiles == 1) ||
            (c == false && j == true && numFiles == 1) ||
            (c == true && j == true && numFiles == 2)
          ) {
            if (loadedThemes.length == 0) {
              currentTheme = {
                name: name,
                version: version,
                author: author,
                description: data.description,
                data: {
                  theme: {
                    css: css,
                    js: js,
                  },
                },
              };
            } else {
              loadedThemes.push({
                name: name,
                version: version,
                author: author,
                description: data.description,
                data: {
                  theme: {
                    css: css,
                    js: js,
                  },
                },
              });
            }
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
      preinstalledExtensions.forEach(async (extension) => {
        await loadExtension(extension); // protip use await it looks nicer than .then()
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
