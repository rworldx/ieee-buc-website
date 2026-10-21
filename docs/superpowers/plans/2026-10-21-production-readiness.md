# Production readiness follow-up

Approved scope: repair the mobile menu exit and initial focus, improve field contrast and local event filtering, ship optimized video derivatives, and address compatible dependency security updates. Preserve content, source media, bilingual navigation, and keyboard accessibility.

1. Reproduce and regression-test menu exit ordering before implementation.
2. Close the native dialog before clearing its exit frame; start dismissal from its actual current visual position. Focus the menu heading initially, not the close button.
3. Improve field boundaries, use local History API filters, and select optimized media while retaining original downloads.
4. Run lint, tests, production build, and rendered mobile checks; obtain independent code review.
5. Commit and push verified changes under the user's standing authorization. Report unresolved audit and physical-device limitations without claiming total security.
