# bomo

An open source multiplayer take on the classic Mattel card game UNO, playable via web browser.

<!-- Features include a lobby browser, private lobbies, control over gameplay mechanics, per game chat, login via oauth, and a documented API.

To play, visit the public server at <url>, or setup your own. -->

## install

- Install [node.js](https://nodejs.org), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [pnpm](https://pnpm.io/installation), and [git](https://git-scm.com/downloads)

- Clone via `git clone https://github.com/mechabubba/bomo.git`

- Run `npm install` or `pnpm install` in the root to install dependencies

- If you want, copy & rename `template.env` to `.env` to edit whatever variables you want before starting. If you don't, it'll do this for you without changing anything

- Run `node index.js` or `npm start` to start the server and you're good to go.

- To change the port or persist data to a database, edit your `.env` file
  - The `DB` variable is a [keyv](https://www.npmjs.com/package/keyv) connection string. Read up on usage there and make sure to install the appropriate storage adapter as a dependency

<!-- ## documentation

See <url> or the /docs/ folder -->

## credits & attributions

- [UNO](https://www.mattelgames.com/en-us/cards/uno)® by Mattel, Inc for inspiration
- [Silk Icons](http://www.famfamfam.com/lab/icons/silk/), an icon set by [Mark James](https://github.com/markjames/)
- [Node.js](https://nodejs.org)® JavaScript runtime
- [eslint](https://eslint.org/), a configurable JavaScript linter
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) visual studio code extension by Dirk Baeumer
- [Pngcrush](https://pmt.sourceforge.io/pngcrush/), an optimizer for PNG files
- [tinyhttp](https://tinyhttp.v1rtl.site), a lightweight express-like web framework
- [ejs](https://ejs.co), embedded JavaScript templating
  - [EJS language support](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support) visual studio code extension by DigitalBrainstem
- [keyv](https://www.npmjs.com/package/keyv), simple key-value storage with support for multiple backends
- [Luxon](https://moment.github.io/luxon/), modern wrapper for JavaScript dates and times
- [sirv](https://www.npmjs.com/package/sirv), lightweight middleware for serving static assets
- [dotenv](https://www.npmjs.com/package/dotenv), zero-dependency module for `.env` file support
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), an opinionated code formatter (visual studio code extension)
