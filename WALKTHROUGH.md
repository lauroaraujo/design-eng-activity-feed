# Walkthrough

## Planning
I've come up with a few categories to help triage the issues and features:

- **Correctness and Readability**: Any issue that displays inaccurate information to the user. These are usually the highest priority because we don't want to break user trust, especially in a financial setting. Readability is important in this context because if the data it correct, but is presented in a way that causes confusion, the same user trust issues can arise.
- **Accessibility and Performance**: Any issue that prevents the user (or a subset of users) from interacting with the application.
- **Polish**: Any issues that make the application look unprofessional or harder to use.

### Issues and Features

Issues and features grouped by priority; I have not added any potential improvements here (e.g. search/filters) because they would not fit the time budget; At the end of the exercise I'll explore these topics if possible.

#### Blockers
These are correctness or readability issues that can cause loss of trust. We want to make sure these are addressed first;

- [x] Inconsistent date format (`2026-05-10` vs `May 8, 2026`);
    - Make sure to make date consistent across the app.
- [ ] Inconsistent currency format `$24,531.18` `$2500.00`;
    - Make sure to make currency consistent across the app.
- [ ] Transactions list UI is hard to read; Items are too close to each other;
    - Potentially large work that may be broken down into multiple steps;

#### High Priority
These are accessibility and performance issues along with high priority feature work.

- [ ] List is not accessible (screen readers cannot read it);
- [ ] List items `key` prop - currently using index when we have an `id`;
    - This was put above the performance issues because it's a small lift that should be done even if we decide not to make changes to the list.
- [ ] Potential performance issues with large lists;
    - [ ] Investigate impact and potential solutions;
    - [ ] Implement improvements
- [ ] (new feature) Transaction Detail view;
    - Since the dispute flow is out of scope, the `Dispute` button will be included in the main Transaction Detail view work;
    - Ensure the

#### Medium Priority
Issues in the "polish" category;

- [ ] Empty list shows only heading;
    - This may be confused with a broken page. Needs visual indication that the list is empty (at least a message).
- [ ] Loading state (out-of-scope, lowest priority)
- [ ] Error state (out-of-scope, lowest priority)
