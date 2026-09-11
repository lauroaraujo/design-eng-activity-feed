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
- [x] Inconsistent currency format `$24,531.18` `$2500.00`;
    - Make sure to make currency consistent across the app.
- [x] Transactions list UI is hard to read; Items are too close to each other;
    - Potentially large work that may be broken down into multiple steps;
- [x] Transaction status is inconsistent (only PENDING shows up) and is hard to read

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
- [ ] Update currency formatter to allow `+` sign to be displayed.
    - Transaction UIs usually display `+` signs and omit `-` signs since negative values are more common.
- [ ] Overhaul Transactions List
- [ ] Loading state (out-of-scope, lowest priority)
- [ ] Error state (out-of-scope, lowest priority)

## Execution

### Inconsistent date format
This ended up taking more time than expected. Transaction values without timezone information are problematic;
I'd expect full timezone and time information in data coming from the backend, not a date.
This can be discussed further, but handling time has too many corner cases that don't fit this assignment.

**Assumed the plain dates are in the users's time zone for simplicity.**

### Inconsistent currency format
This was simple to ensure consistency. There were tweaks I'd like to make but having spent too much time
on the date format problem I decided against it. Logged as "Medium Priority" items for the future.

Tentative updates include displaying the `+` sign instead of the `-` sign since income is more rare to show
up in transactions and color coding positive values.

### Transactions list UI is hard to read
Due to time constraints we only made small improvements to the transactions list UI. These ensure the readability criteria I defined as a blocker. There's still a lot of room for improvement, so I added "Overhaul Transactions List" to the "Medium Priority" list.

I have also found another issue that I added to tbe blocker list: the `status` field does not display consistently.
Only `pending` shows up (and not in a good place); While we may want to suppress the `posted` status (most transactions),
the `failed` status is being completely omitted and that's incorrect information being displayed.

### Transaction status is inconsistent
Created a `StatusPill` component that encapsulates the status logic and displays it as a pill;

Moved the position of the status - it's now displayed beside the merchant name;

