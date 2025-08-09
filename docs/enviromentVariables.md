# Environment Variables

One method to supply enviroment variables is to write an `.env` file in the root of the project. See [dotenv](https://www.npmjs.com/package/dotenv) for how the `.env` file is parsed.

- `BOMO_DEV` Whether bomo is running in a development environment
- `BOMO_PORT` The port used for the http server, defaults to 3000
- `BOMO_LOG_LEVEL` Pino Logging level (trace, debug, info, warn, error, fatal, or silent), see [their docs](https://getpino.io/#/docs/api?id=loggerlevel-string-gettersetter) for more info 

### Templates

Development

```bash
BOMO_DEV=true
BOMO_PORT=3000
BOMO_LOG_LEVEL="trace"
```

Production

```bash
BOMO_PORT=80
BOMO_LOG_LEVEL="info"
```
