// made by code-alt
// meant to start up oasis, clean up the startup screens and let the app load extensions and apps well

import { startupExtensions } from "./tabs.mjs";

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
  id("oasis_core_loadText").innerText = "Loading Assets..."; // futureproofing, maybe oasis's icons need loading or something
  // init script - sees if user has used oasis before and/or has picked a version or has gone back to change settings
  if (checkLocalStorage() == false) {
    id("oasis_core_loadText").innerText =
      "LocalStorage/Cookies are not enabled, Oasis will not work.";
  }
  id("oasis_core_loadText").innerText = "Loading Apps/Extensions...";
  startupExtensions()
    .then(() => {
      id("oasis_core_loadText").innerText = "Ready!";
      setTimeout(() => {
        id("oasis_core_start").style.opacity = 0;
        setTimeout(() => {
          id("oasis_core_start").remove();
        }, 500);
      }, 500);
    })
    .catch((err) => {
      console.error(err); // this doesn't do anything (no reject from promise)
    });
};

window.onload = () => {
  id("oasis_core_loadText").innerText = "Loading Oasis...";
  window.setTimeout(() => {
    initOasis();
  }, delay); // short delay while oasis loads, then initOasis() is called. it's only for effect, but it's a nice effect. (github copilot wrote this comment)
};
