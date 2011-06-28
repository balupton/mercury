# Todo

## Completed

1. Consolidated mercury files into vendor directory. Including scripts, styles, images, templates.
1. Renamed `.js.coffee` to `.coffee` to clean things up
1. Added `src/` directory and empty `mercury.css` and `mercury.js` loader files
	- This allows for inclusion of uncompiled/individual files for development, and compiled/bundled files for production

1. Implement the load files
1. Port over the original `mercury.js` and `mercury_loader.js` files
1. <ove styles over from SCSS to LESS to support node.js and client-side compilation better

## Upcoming

1. Allow the template urls to be customisable / loaded in dynamically
1. Move the `vendor/mercury` directory to root and delete other project files
	1. In another clone, implement the mercury submodule and rename project to mercury-rails
1. Create a mercury-node repository which will have a node implementation of mercury-rails

## Minor

1. Change indentations from spaces to tabs