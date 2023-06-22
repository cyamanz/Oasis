export const loadExtensions = () => {
  // gets extensions on load
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("extensions")) {
      // TODO: fetch a JSON file which will have data on what to load, and parse it into a class or something
    }
    resolve();
  });
};

export class Tab {
  constructor() {}
}
