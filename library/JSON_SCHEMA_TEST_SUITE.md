JSON_SCHEMA_TEST_SUITE

Table of contents
1. Repository purpose and structure
2. Test case JSON schema format
3. How to use the test-suite for validator/diff verification
4. Selecting relevant tests for Draft-07
5. Implementation notes for integrating with unit tests
6. Detailed digest and attribution

1. Repository purpose and structure
- The JSON-Schema-Test-Suite is a canonical collection of test cases that exercise validator behaviour across draft versions and keyword semantics.
- Typical layout: directories for drafts and for keyword groups; files are JSON arrays or objects describing individual test scenarios.

2. Test case JSON schema format (canonical shape used by the suite)
- Each test file contains one or more test groups. A test group object usually contains:
  - description: textual description of the group
  - schema: the JSON Schema object under test
  - tests: array of test cases where each test case has:
    - description: textual description
    - data: an instance value to validate against the group's schema
    - valid: boolean indicating whether the data should be accepted (true) or rejected (false)

3. How to use the test-suite for validator/diff verification
- To validate a JSON Schema validator, run each test group's schema through the validator and assert that each test case's data yields the expected boolean result.
- For a schema diff tool, use the suite to validate that dereferencing and schema semantics used by the diff are consistent with Draft-07 validators: ensure the dereferenced resolved schema validates instances in the same way.

4. Selecting relevant tests for Draft-07
- Filter test files by draft version or by keyword directories that correspond to Draft-07 semantics (array, object, ref, combining, definitions, etc.).
- Prioritise tests covering required, properties, items, allOf/oneOf/anyOf, and $ref resolution because these directly affect diff classification rules.

5. Implementation notes for integrating with unit tests
- Use the test-suite as a source of ground-truth behaviour: run tests to validate that the pre-resolution and post-resolution schemas produce identical validation results.
- When a schema change is reported as breaking by the diff tool, cross-check representative test cases from the suite illustrating the breaking change to build unit tests that assert expected behaviour.

6. Detailed digest and attribution
- Source: https://github.com/json-schema-org/JSON-Schema-Test-Suite
- Retrieval date: 2026-03-23T00:59:51Z
- Bytes downloaded: 415942

Attribution: summary and usage guidance based on the JSON-Schema-Test-Suite repository.