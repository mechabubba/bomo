# bomo

An open source take on the classic Mattel card game UNO, playable via web browser.

<!-- Features include a lobby browser, private lobbies, control over gameplay mechanics, per game chat, LetsEncrypt support, login via oauth, and a documented API.

To play, visit the public server at <url>, or setup your own. -->

## contributing

See our [issue tracker](https://github.com/mechabubba/bomo/issues) for feature requests, bug reports, etc.

If you want to contribute yourself, let us know on an issue or contact us in our discord:

<a href="https://discord.gg/xSSYc62ZRx">![discord.gg/xSSYc62ZRx](https://discordapp.com/api/guilds/525773944351883304/widget.png?style=shield)</a>

## install

- Install [node.js](https://nodejs.org), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [pnpm](https://pnpm.io/installation), and [git](https://git-scm.com/downloads)
- Clone via `git clone https://github.com/mechabubba/bomo.git`
- Run `npm install` or `pnpm install` in the root to install dependencies
- To change the port, make an `.env` file with the line `PORT=1234`, 1234 being the number you want
  - Refer to the [FAQ](./docs/faq.md) for a list of valid environment variables
- Run `node index.js` or `npm start` to start the server, the default port is 3000

## update

- Run `git pull origin`

<!-- ## documentation

Notes for when it gets written:

- @todo check if the above updating instruction with git checkout . is needed or not

- I make use of `@todo` to leave notes and tasks awaiting completion/resolution

- If you get `this.engines[options.ext] is not a function` and a 500 Internal Server Error, check your `res.render()` calls. You might have missed including the extension `.ejs` or misspelled the template's name

- `ctrl` + `shift` + `r` forces a complete page refresh in firefox, helpful for clearing cached css

- set DEV to true in your environment to have sirv files served fresh

- environment variables are strings, not json. so DEV=false wouldn't work and Boolean("false") is true, but DEV= and Boolean(process.env.dev) is false, simple solution is use process.env.dev === "true" which will be true if true and false if anything else

- Documentation
  - [tinyhttp](https://tinyhttp.v1rtl.site/docs)
    - [Details on route matching via regexparam](https://github.com/lukeed/regexparam)
  - [ejs](https://ejs.co/#docs)
  - [jsdoc](https://jsdoc.app/)

- [The Twelve-Factor App](https://12factor.net/), good guidance regarding app design
- [restfulapi.net](https://restfulapi.net/), good guidance regarding api design
- [stackoverflow.blog's Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/), good article on rest apis
-->

## disclaimer

This project is not associated with UNO, Mattel, or Ubisoft in any way.

## credits & attributions

- [UNO](https://www.mattelgames.com/en-us/cards/uno)® by Mattel, Inc for inspiration
- [Silk Icons](http://www.famfamfam.com/lab/icons/silk/), an icon set by [Mark James](https://github.com/markjames/)
- [Node.js](https://nodejs.org)® JavaScript runtime
- [npm](https://npmjs.com), JavaScript package manager
- [pnpm](https://pnpm.io/), fast & disk space efficient JavaScript package manager
- [eslint](https://eslint.org/), a configurable JavaScript linter
- [JSDoc](https://jsdoc.app/), inline JavaScript documentation & docs generation
- [boxy-jsdoc-template](https://github.com/grafluxe/boxy-jsdoc-template), a clean template theme for JSDoc 3
- [pngcrush](https://pmt.sourceforge.io/pngcrush/), an optimizer for PNG files
- [The Twelve-Factor App](https://12factor.net/), good guidance regarding app design
- [restfulapi.net](https://restfulapi.net/), good guidance regarding api design
- [stackoverflow.blog's Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/), good article on rest apis
- [TopHattWaffle](https://twitter.com/tophattwaffle) for [this photo](https://twitter.com/tophattwaffle/status/993234368540954625) of their [3D printed source engine errors](https://www.etsy.com/listing/597289214/developer-error-source-engine) (used on the 404 page)

Dependencies

- [tinyhttp](https://tinyhttp.v1rtl.site), a lightweight express-like web framework
- [@tinyhttp/cookie-parser](https://www.npmjs.com/package/@tinyhttp/cookie-parser), cookie parsing
- [@tinyhttp/rate-limit](https://www.npmjs.com/package/@tinyhttp/rate-limit), rate limiting
- [milliparsec](https://www.npmjs.com/package/milliparsec), body parsing
- [ws](https://www.npmjs.com/package/ws), websockets
- [ejs](https://ejs.co), embedded JavaScript templating
- [sirv](https://www.npmjs.com/package/sirv), lightweight middleware for serving static assets
- [Luxon](https://moment.github.io/luxon/), modern wrapper for JavaScript dates and times
- [chalk](https://www.npmjs.com/package/chalk), terminal colors
- [dotenv](https://www.npmjs.com/package/dotenv), zero-dependency module for `.env` file support
- [Google Fonts](https://fonts.google.com/), an open font cdn

Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), visual studio code extension by Dirk Baeumer
- [EJS language support](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support), visual studio code extension by DigitalBrainstem
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), an opinionated code formatter for visual studio code
