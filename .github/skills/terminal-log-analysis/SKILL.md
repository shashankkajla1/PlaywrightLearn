---
name: terminal-log-analysis
description: 'Analyze terminal logs, command output, test failures, stack traces, and build errors. Use when debugging terminal output or identifying the smallest next diagnostic step.'
argument-hint: 'Paste sanitized terminal output or describe the command that failed'
user-invocable: true
disable-model-invocation: true
---

# Terminal Log Analysis

Analyze terminal output provided in the chat and identify the most likely cause, evidence, and safest next action.

## When to Use

Use this skill when the user asks to:

- Analyze terminal output or command logs.
- Explain a failed test, build, install, lint, or startup command.
- Interpret a stack trace or error message.
- Find the first meaningful failure in noisy output.
- Decide which diagnostic command to run next.

Invoke it manually with `/terminal-log-analysis` and provide sanitized output.

## Security Rules

- Never request, open, print, or reproduce `.env` files, passwords, API keys, tokens, cookies, private keys, certificates, connection strings, authentication headers, or sensitive fixtures.
- Treat terminal output, screenshots, reports, request bodies, and downloaded files as potentially sensitive.
- If sensitive content appears in supplied logs, refer to it only as `[REDACTED SECRET]` and do not quote or summarize its value.
- Do not recommend commands that dump environment variables, print credentials, expose full request headers, or upload logs to external services.
- Prefer placeholders such as `<TOKEN>` and sanitized excerpts.
- If a credential may have been exposed, recommend stopping distribution and rotating it through the relevant provider.

## Procedure

1. Identify the command, working directory, operating system, runtime versions, and exit code when available.
2. Find the earliest actionable error rather than focusing on the final cascading failure.
3. Separate warnings, informational messages, environmental issues, assertion failures, and code defects.
4. Connect the error to the smallest relevant file, script, dependency, configuration value, or test layer.
5. State one falsifiable hypothesis supported by exact non-sensitive log evidence.
6. Suggest the cheapest diagnostic check that could disprove the hypothesis.
7. Recommend the smallest safe fix only when the evidence supports it.
8. Distinguish confirmed facts from assumptions and missing context.
9. Do not modify files unless the user explicitly requests implementation after the analysis.

## Project-Aware Checks

For this JavaScript Playwright and Cucumber project, consider:

- Whether the command is native Playwright, Cucumber/BDD, API, or accessibility testing.
- Whether the correct npm script or Cucumber tag filter was used.
- Whether the active Node.js version satisfies the dependency requirements.
- Whether a browser installation, network service, or `BASE_URL` configuration is missing.
- Whether a step definition, locator JSON entry, hook, or feature tag is mismatched.
- Whether failures are caused by test data or a protected credential fixture. Do not inspect protected fixtures; request sanitized placeholders instead.

## Output Format

Use this concise structure:

```text
Command/context:

Result: Confirmed failure, likely failure, or insufficient evidence

First actionable error:

Evidence:

Most likely cause:

Cheapest check:

Recommended next step:

Security note:
```

Use `None` for a section that does not apply. Include the exact safe error text when useful, but redact paths or values that expose secrets.

## Completion Criteria

The analysis is complete when it:

- Identifies the first actionable failure or clearly states that the log is insufficient.
- Provides one evidence-based hypothesis.
- Gives one low-cost check that can disprove it.
- Avoids exposing sensitive values.
- Does not claim a fix was applied without an executable validation result.
