---
name: merge-pr
description: Merge a GitHub pull request using gh, with required checks and safety steps. Use when the user asks to merge a PR or says to merge the current PR.
---

# Merge PR (gh)

## Workflow
1. Check `git status -sb` to ensure a clean working tree.
2. Confirm the PR number or URL. If not provided, ask for it.
3. Verify the PR is ready:
   - `gh pr view <PR> --json number,title,author,reviewDecision,mergeable,state,statusCheckRollup`
   - If `mergeable` is not `MERGEABLE` or required checks are failing, stop and report.
4. Merge using the preferred method (default: squash):
   - `gh pr merge <PR> --squash --delete-branch`
5. Report the merge result and PR link.

## Notes
- Do not merge if checks are failing or review decision is not approved unless the user explicitly says to proceed.
- If the user requests a specific merge method, use it: `--merge`, `--rebase`, or `--squash`.
