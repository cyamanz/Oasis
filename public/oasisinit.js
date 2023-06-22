// MADE BY CODE-ALT
// this is the init script for oasis, it loads extensions and apps and stuff

import { loadExtensions } from "./tabs.mjs";

const delay = 500;

const id = (e) => {
  return document.getElementById(e);
};

const checkLocalStorage = () => {
  try {
    localStorage.getItem("x");
    return true;
  } catch {
    return false;
  }
};

const initOasis = () => {
  // init script - sees if user has used oasis before and/or has picked a version or has gone back to change settings
  if (checkLocalStorage() == false) {
    id("loadText").innerText =
      "LocalStorage/Cookies are not enabled, Oasis will not work.";
  }
  id("loadText").innerText = "Loading Apps/Extensions...";
  loadExtensions()
    .then(() => {
      id("loadText").innerText = "Ready!";
      setTimeout(() => {
        id("start").style.opacity = 0;
        setTimeout(() => {
          id("start").remove();
        }, 500);
      }, 500);
    })
    .catch((err) => {
      console.error(err); // this doesn't do anything (no reject from promise)
    });
};

window.onload = () => {
  id("loadText").innerText = "Loading Oasis...";
  window.setTimeout(() => {
    initOasis();
  }, delay); // short delay while oasis loads, then initOasis() is called. it's only for effect, but it's a nice effect. (github copilot wrote this comment)
};
