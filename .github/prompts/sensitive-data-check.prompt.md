---
name: Sensitive Data Check
description: Check planned actions and results for sensitive data exposure
argument-hint: "Paste the planned command, code change, or redacted result to review"
agent: ask
---

Perform a sensitive-data exposure check for the provided plan, command, code change, log, screenshot description, or result.

Check these two stages when applicable:

## Before execution

- Identify whether the action may read, print, upload, store, or transmit passwords, API keys, tokens, cookies, private keys, certificates, connection strings, authentication headers, .env files, user databases, or sensitive test fixtures.
- Identify commands that dump environment variables, print request headers, upload files, publish data, or write sensitive output to logs or reports.
- Recommend a sanitized or least-privilege alternative before execution.
- State clearly whether it is safe to proceed, unsafe, or needs human approval.

## After execution

- Inspect the provided output for possible secrets or private data.
- Never quote, repeat, or summarize a secret value. Replace any finding with `[REDACTED SECRET]`.
- Recommend stopping distribution of the output and rotating exposed credentials when exposure is suspected.
- Check logs, screenshots, reports, diffs, and generated files for accidental disclosure.

Use placeholders such as `<API_KEY>` in examples. Do not open or request sensitive files to perform this review. Keep the response concise and use this format:

- Stage: Before execution, After execution, or Both
- Risk: None, Low, Medium, High, or Critical
- Finding: Describe the risk without revealing sensitive values
- Action: The safest next step

This prompt is a review aid, not a technical access-control mechanism. It does not automatically run before or after commands.
