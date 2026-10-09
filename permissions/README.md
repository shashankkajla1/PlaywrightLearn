# AI Permissions

Use this folder to document project-specific permissions for AI assistants.

## Allowed

- Read project source files and test data.
- Modify files required for the requested task.
- Run the relevant npm test commands.

## Requires approval

- Installing or removing dependencies.
- Changing environment variables or secrets.
- Deleting files or generated reports.
- Making network requests outside the configured test services.

## Not allowed

- Commit or push changes without explicit approval.
- Read or expose `.env` files, credentials, tokens, or passwords.
- Modify unrelated files or generated output.