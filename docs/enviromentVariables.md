# Environment Variables

One way of easily supplying enviroment variables is to place an `.env` file in the root of the project. See [dotenv](https://www.npmjs.com/package/dotenv) for how the `.env` file is parsed.

- `DEV` Whether bomo is running in a development environment
- `PORT` The port used for the http server, defaults to 3000
- `LOG_LEVEL` Pino Logging level (trace, debug, info, warn, error, fatal, or silent), see [their docs](https://getpino.io/#/docs/api?id=loggerlevel-string-gettersetter) for more info 

### Templates

Development

```bash
DEV=true
PORT=3000
LOG_LEVEL="trace"
```

Production

```bash
PORT=80
LOG_LEVEL="info"
```
