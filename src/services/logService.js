//import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://371b563167a84fbe87d8d7f3ce985f31@o412125.ingest.sentry.io/5288390",
  // });
}

function log(error) {
  //Sentry.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
