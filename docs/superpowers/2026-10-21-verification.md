# Readiness follow-up verification

## Changes

- Sidebar holds its exit frame until the native dialog closes. Mid-entry dismissal starts at its current transform. Cleanup restores scrolling and focus.
- Initial focus moves to the menu heading. The X retains a keyboard-only focus indicator, not an automatic ring on opening.
- Form boundaries have at least 3:1 contrast with surrounding surfaces in both themes.
- Event filters update local URL state without a server navigation.
- Three H.264/AAC fast-start video derivatives are used for playback; original download files are preserved.
- Scoped selector-parser override fixes its advisory without downgrading the framework tooling.

## Evidence

- 10 Node regression tests pass; lint and production build pass.
- Preview checks pass for 22 bilingual routes, security headers/CSP nonces, metadata, unknown routes, robots and sitemap.
- Chrome phone viewport checks: English 390px and Arabic 320px menu focus/close/scroll restoration; no horizontal overflow on the checked Arabic page. Initial focus is menu-title, X is not focus-visible; keyboard Tab reaches X with focus-visible. Light and dark menu states inspected.
- Event filters render 1 upcoming and 4 past results, updating the URL. Browser warning/error log empty for this session.
- Independent code review found no blocking issues.
- Production dependency audit reports zero findings. Full development audit still reports five high entries from the same unpatched braces 3.0.3 dependency chain in current eslint-config-next; no suppression or breaking downgrade applied.

## Limits

Not a security certification or universal device guarantee. Physical iOS/Android, Safari, screen readers, slow-network performance, and penetration testing remain unverified. Video audio is preserved but accurate reviewed captions remain outstanding; none were fabricated. Frame-by-frame animation capture was unavailable in the browser inspection API; exit ordering is covered by a regression test and normal dismissal was browser-checked.
