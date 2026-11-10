import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { matchSlots, type AssetOffer, type RequireSlot } from "./wildcard.ts";

const alice = "alice";

const offer = (
  id: bigint,
  templateId: number,
  schema = "pixsch",
  owner = alice,
): AssetOffer => ({ assetId: id, templateId, schema, owner });

describe("matchSlots exact", () => {
  it("matches exact template multiset", () => {
    const slots: RequireSlot[] = [
      { templateId: 10, schema: "pixsch" },
      { templateId: 10, schema: "pixsch" },
      { templateId: 20, schema: "pixsch" },
    ];
    const ids = matchSlots(
      slots,
      [offer(1n, 10), offer(2n, 20), offer(3n, 10)],
      alice,
    );
    assert.deepEqual(ids, [1n, 3n, 2n]);
  });

  it("refuses wrong template on an exact slot", () => {
    assert.throws(
      () =>
        matchSlots(
          [{ templateId: 10, schema: "pixsch" }],
          [offer(1n, 99)],
          alice,
        ),
      /slot unmatched/,
    );
  });
});

describe("matchSlots wildcard", () => {
  it("accepts any template under the schema for -1", () => {
    const slots: RequireSlot[] = [
      { templateId: -1, schema: "pixsch" },
      { templateId: -1, schema: "pixsch" },
    ];
    const ids = matchSlots(
      slots,
      [offer(5n, 100), offer(6n, 200)],
      alice,
    );
    assert.equal(ids.length, 2);
    assert.ok(ids.includes(5n) && ids.includes(6n));
  });

  it("fills exact slots before wildcards", () => {
    const slots: RequireSlot[] = [
      { templateId: -1, schema: "pixsch" },
      { templateId: 50, schema: "pixsch" },
    ];
    const ids = matchSlots(
      slots,
      [offer(1n, 50), offer(2n, 99)],
      alice,
    );
    // slot0 wildcard gets 99; slot1 exact gets 50
    assert.deepEqual(ids, [2n, 1n]);
  });

  it("refuses wildcard when schema disagrees", () => {
    assert.throws(
      () =>
        matchSlots(
          [{ templateId: -1, schema: "pixsch" }],
          [offer(1n, 10, "othersch")],
          alice,
        ),
      /slot unmatched/,
    );
  });

  it("refuses exact slot when schema disagrees even if template matches", () => {
    assert.throws(
      () =>
        matchSlots(
          [{ templateId: 10, schema: "pixsch" }],
          [offer(1n, 10, "othersch")],
          alice,
        ),
      /slot unmatched/,
    );
  });
});

describe("matchSlots edges", () => {
  it("refuses empty recipe and count mismatch", () => {
    assert.throws(() => matchSlots([], [], alice), /empty recipe/);
    assert.throws(
      () => matchSlots([{ templateId: 1, schema: "pixsch" }], [], alice),
      /ingredient count/,
    );
  });

  it("refuses duplicate assets and non-owner", () => {
    assert.throws(
      () =>
        matchSlots(
          [
            { templateId: 1, schema: "pixsch" },
            { templateId: 1, schema: "pixsch" },
          ],
          [offer(1n, 1), offer(1n, 1)],
          alice,
        ),
      /duplicate/,
    );
    assert.throws(
      () =>
        matchSlots(
          [{ templateId: 1, schema: "pixsch" }],
          [offer(1n, 1, "pixsch", "bob")],
          alice,
        ),
      /not owner/,
    );
  });

  it("refuses templateId 0 and wildcard without valid schema shape", () => {
    assert.throws(
      () =>
        matchSlots(
          [{ templateId: 0, schema: "pixsch" }],
          [offer(1n, 1)],
          alice,
        ),
      /bad template id/,
    );
  });

  it("refuses more than MAX_SLOTS", () => {
    const slots = Array.from({ length: 21 }, () => ({
      templateId: 1,
      schema: "pixsch",
    }));
    const offers = slots.map((_, i) => offer(BigInt(i + 1), 1));
    assert.throws(() => matchSlots(slots, offers, alice), /bad asset batch/);
  });
});
