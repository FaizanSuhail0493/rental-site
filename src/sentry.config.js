import { withSentryConfig } from "@sentry/nextjs";

const moduleExports = {
  // Your existing module.exports
};

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

export default withSentryConfig(moduleExports, SentryWebpackPluginOptions);
