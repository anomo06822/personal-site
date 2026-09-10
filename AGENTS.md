# Personal-site publishing

Heptabase owns editable knowledge, research and drafts. Codex produces reviewed zh-TW/en articles and final social text; this repository stores public artifacts and the direct publishing CLI. Content Studio / AIPW runtime was retired on 2026-09-11.

Read [docs/publishing.md](docs/publishing.md) for release operations and credential setup. Prepare/stage are local review steps. Actual commit/push and social posting use the version and destinations already authorized in the conversation; do not infer publication authorization from an implementation request.

Keep source deep links, evidence and receipts outside this public repository. Do not duplicate the editable content registry or add an API/database/queue/UI for publishing. Use Codex scheduling only when requested. Reuse Linear for tracked delivery, and send Slack messages only when authorized to a known destination.

Preserve existing posts and historical portfolio evidence. New release publication refuses existing article IDs/slugs; revise published posts through reviewed Git changes. Update or remove releaseHash when changing article content so deployment verification cannot accept a different version.

For publisher changes, run `pnpm test:publishing`, `pnpm typecheck`, and `pnpm build:publishing` as appropriate. Use temporary repos and simulated provider responses for write tests; never publish test content to real accounts. Credentials come from BWS/process environment.

For content preparation, use `skills/heptabase-publishing/SKILL.md`: generate and inspect the cover, assemble a private review packet with full text and destinations, and wait for the user's review confirmation before commit/push/CI/CD. Create review revisions before immutable release preparation; after confirmation, verify the recorded review hash and continue without another redundant approval.
