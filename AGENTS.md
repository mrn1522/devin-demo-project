# Agent Rules

## Rule: CodeRabbit PR Feedback Loop

### ACTIVATION CONDITION

Apply the following instructions ONLY when ALL of the following are true:

1. You are actively working on an open GitHub Pull Request.
2. You observe comments from `coderabbitai[bot]` or the repository root contains `.coderabbit.yaml`.
3. You are explicitly tasked with addressing PR review feedback.

Otherwise, completely ignore this rule.

### BEHAVIOR

- Read inline suggestions and warnings posted by @coderabbitai on the PR diff.
- Address legitimate runtime bugs, missing null checks, and security flaws in a new commit.
- Never engage in conversational chat with @coderabbitai. Only use commands:
  - If you need to stop review noise during multi-step edits, comment `@coderabbitai pause`.
  - When code is ready, comment `@coderabbitai resume` and `@coderabbitai review`.
  - Once all actionable feedback has been resolved, comment `@coderabbitai resolve`.
- Once resolved, stop execution and hand control back to the user.
