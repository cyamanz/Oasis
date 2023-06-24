# Oasis Default Theme

This is the default theme for Oasis. You can use it as a starting point for creating your own theme.

## How do I make my own theme?

Simply copy the folder, rename and configure the manifest file so it has a new name, new metadata, and most importantly, links to one CSS file and one JS file. You can then edit those files to your heart's content.
(small reminder that none of oasis's core css files effect the theme, this allows full freedom over the browser's appearance.)

## If I do make my own, how do I test it?

In your settings, you can load your own extensions via .zip files OR a folder. Simply zip up your theme and upload it to your Oasis settings. You can then select it in the settings. Alternatively you can clone the repo, place the theme in the folder, and set in the tabs.mjs file to load your theme first by setting it in the preinstalledExtensions array. It will then be loaded to wherever you run the repo from, and you can change the theme and test. If you want to share it as an official theme, you can send me a pull request or message me on Discord.

## How do I change the theme?

Click the gear icon (should be at the top right if you are using the default theme) and go to the themes section. You can then select the themes oasis has loaded that you want to use, in a dropdown. If you need more, go to the extensions section (should be like a puzzle icon in the sidebar) and click the "Get More Extensions" button. You can then download themes/extensions from there.

# Help! Help! I am an idiot!

No worries, I am too. 

Here's some things you can try:

* If the font suddenly changes when Oasis is ready, I'd recommend that you only apply fonts to #container.
  * Also, make sure the font is actually referenced and imported in the CSS file.
* If the theme doesn't load at all, make sure you have the correct file names in the manifest file.
* Is Oasis not even loading? It's probably my bad programming, but you can open the console and see the errors. If it's anything in oasisinit.js or tabs.mjs, it is most likely me. If it's anything else, it's probably your fault. (Sorry)
  * If you have errors

If none of these worked for you, feel free to message me on Discord and I will try to help you out. (My username can be found through the /README.md file)