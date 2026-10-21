# GreenLeaf Grocers — Software QA Capstone Portfolio

**Manual Testing · Defect Reporting · Playwright · SQL · Release Risk Assessment**

> **Project context:** This is a **Coursera training capstone**, not a commercial production assignment. Jira/Zephyr and pull-request artifacts shown here are **local lab simulations**, not records from hosted production systems. Evidence and limitations are distinguished below.

## Project overview

GreenLeaf Grocers is a simulated online grocery checkout application. This portfolio demonstrates a QA workflow from requirements and manual test design through defect documentation, browser automation, database validation, and a release recommendation.

**Release recommendation: NO-GO** — the training handoff documented two critical open issues. A successful happy-path test alone does not establish release readiness.

## Tech stack & methods

- **Manual QA:** functional test design, expected vs. actual results, defect reporting, severity and risk assessment
- **Playwright + JavaScript:** guest checkout end-to-end automation, executed with Chromium in the lab
- **SQL / SQLite:** validation that a guest order was saved in the database
- **HTTP API checks:** expired promotional code validation using a local API probe
- **Local lab equivalents:** simulated Jira/Zephyr test records and local pull request / issue linking

## Scope & test coverage

| Area | Coverage | Evidence |
| --- | --- | --- |
| Guest checkout (GL-101) | Manual scenario and automated happy path | [Test case](evidence/zephyr_testcase.png), [Playwright result](evidence/playwright_pass.png) |
| Expired promo (GL-102) | Invalid code API behavior; observed HTTP 500 | [API defect](evidence/bug_report_api.png) |
| Required form fields (GL-103) | Manual test case design | [Backlog / cases](evidence/jira_board.png) |
| Mobile checkout | Critical issue described in course handoff; **not independently reproduced** | [Documented issue](evidence/bug_report_ui.png) |
| Order persistence | SQLite query returned the guest order | [SQL validation](evidence/sql_validation.png) |
| Traceability | Simulated local story ↔ test ↔ PR linkage | [Local workflow](evidence/jira_pr_link.png) |

### Execution summary

| Metric | Outcome |
| --- | --- |
| Manual test cases documented | **3** |
| Critical defect records | **2** (1 independently observed API issue; 1 course-handoff mobile issue) |
| Executed Playwright guest-checkout test | **1 passed / 1 executed** |
| SQLite guest-order check | **Order found**, status `placed`, total `4.99` |
| Release recommendation | **NO-GO** pending remediation, retest, and release review |

## Notable defects

**GL-B02 — Expired promo returns HTTP 500 (directly verified)**

- **Request:** `POST /api/promo/validate` using expired code `EXPIRED20`
- **Expected:** Controlled validation rejection and comprehensible user feedback
- **Actual:** HTTP 500 Internal Server Error from the local lab API
- **Impact:** Avoidable server error during promotional-code validation

**GL-B01 — Mobile checkout controls overlap (handoff finding)**

- **Condition:** Viewports below 768 px (as supplied by the training handoff)
- **Issue:** 'Apply Promo' overlaps 'Submit Order'
- **Impact:** Potential obstruction of the mobile checkout action
- **Verification limitation:** The issue was documented from the course-provided handoff. The local environment did not yield an independent reproducible mobile screenshot. **No BrowserStack cloud run is claimed.**

## Evidence & detailed report

The full report covers requirements, test cases, both defect records, actual execution results, SQL validation, and the risk-based release decision:

**[Open the QA Portfolio (PDF)](docs/GreenLeaf_QA_Portfolio.pdf)**

Key evidence is available in the [`evidence/`](evidence/) folder. Some evidence screenshots are **composed from real recorded local test outputs**, and local Jira/PR records are **training simulations** rather than commercial tool screenshots.

## Source code: Playwright & SQL

- **[Playwright guest-checkout test](tests/checkout.spec.js)** — JavaScript E2E happy-path test using `getByTestId`, a guest checkout without an expired promo code, and assertions for successful checkout and a non-empty order ID. The published code is **reconstructed from the documented lab steps and selectors**, rather than claimed to be a byte-for-byte copy of the original VM file.
- **[SQL order validation](queries/order_validation.sql)** — the original SQL logic used to locate the latest saved order for `capstone.guest@example.test` by joining `orders` and `users`.

### Setup / reproduction notes

This is a **training portfolio**, not a self-contained app. The original GreenLeaf application, its test data, Playwright dependencies/configuration and SQLite database belong to the Coursera lab and are **not included**. Thus, uploading the source files does **not** mean a visitor can execute the test against this GitHub repository alone.

In the original lab environment, the guest-checkout Playwright test ran successfully (**1 test passed**) and the SQL query found the order. These historical results are documented in [`evidence/`](evidence/) and the [portfolio report](docs/GreenLeaf_QA_Portfolio.pdf); **no new GitHub execution is claimed**.

To review the work:
1. Read the [Playwright source](tests/checkout.spec.js) and [SQL query](queries/order_validation.sql).
2. Read the [portfolio report](docs/GreenLeaf_QA_Portfolio.pdf).
3. Inspect the [`evidence/`](evidence/) screenshots and documented execution limitations.

## QA takeaways

A single automated passing happy path and a confirmed database write are valuable, but they do not demonstrate that unrelated checkout failures have been fixed. Release decisions should consider documented defect severity, user impact, traceability, and retest evidence.

---

*Learning project · October 2026 · Prepared as a professional QA work sample.*
