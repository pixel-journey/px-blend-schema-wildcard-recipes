/**
 * Schema-wildcard blend matching (educational).
 * Slot templateId >= 1 = exact template.
 * Slot templateId === -1 = any template under the given schema.
 * Does not mint, burn, or read chain live — only the assignment rule.
 */

export const MAX_SLOTS = 20;
export const UINT64_MAX = 18446744073709551615n;

export type RequireSlot = {
  /** -1 = schema wildcard; otherwise exact template id (>= 1). */
  templateId: number;
  /** Schema name the asset must live under. Required for wildcards. */
  schema: string;
};

export type AssetOffer = {
  assetId: bigint;
  templateId: number;
  schema: string;
  owner: string;
};

const NAME = /^[a-z1-5.]{1,12}$/;
const SCHEMA = /^[a-z1-5.]{1,12}$/;

export function assertName(name: string): string {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad account name");
  }
  return name;
}

export function assertSchema(schema: string): string {
  if (!SCHEMA.test(schema) || schema.startsWith(".") || schema.endsWith(".")) {
    throw new Error("bad schema name");
  }
  return schema;
}

export function assertSlot(slot: RequireSlot): RequireSlot {
  assertSchema(slot.schema);
  if (!Number.isInteger(slot.templateId)) throw new Error("bad template id");
  if (slot.templateId === -1) return slot;
  if (slot.templateId < 1) throw new Error("bad template id");
  return slot;
}

export function assertOffer(offer: AssetOffer): AssetOffer {
  if (typeof offer.assetId !== "bigint" || offer.assetId < 1n || offer.assetId > UINT64_MAX) {
    throw new Error("bad asset id");
  }
  if (!Number.isInteger(offer.templateId) || offer.templateId < 1) {
    throw new Error("bad template id");
  }
  assertSchema(offer.schema);
  assertName(offer.owner);
  return offer;
}

/**
 * Assign each recipe slot to a unique offered asset.
 * Exact slots bind first; remaining assets fill schema wildcards.
 * Returns consumed asset ids in slot order.
 */
export function matchSlots(
  slots: readonly RequireSlot[],
  offers: readonly AssetOffer[],
  caller: string,
): bigint[] {
  assertName(caller);
  if (slots.length === 0) throw new Error("empty recipe");
  if (slots.length > MAX_SLOTS || offers.length > MAX_SLOTS) {
    throw new Error("bad asset batch");
  }
  if (slots.length !== offers.length) throw new Error("ingredient count mismatch");

  for (const s of slots) assertSlot(s);
  for (const o of offers) assertOffer(o);

  const seen = new Set<string>();
  for (const o of offers) {
    const key = o.assetId.toString();
    if (seen.has(key)) throw new Error("duplicate asset");
    seen.add(key);
    if (o.owner !== caller) throw new Error("not owner of ingredient");
  }

  const remaining = offers.map((o, i) => ({ o, i, used: false }));

  const pick = (pred: (o: AssetOffer) => boolean): AssetOffer => {
    const hit = remaining.find((r) => !r.used && pred(r.o));
    if (!hit) throw new Error("slot unmatched");
    hit.used = true;
    return hit.o;
  };

  const assigned: AssetOffer[] = new Array(slots.length);

  // Exact template slots first
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (slot.templateId === -1) continue;
    assigned[i] = pick(
      (o) => o.templateId === slot.templateId && o.schema === slot.schema,
    );
  }

  // Schema wildcards take any remaining asset under the schema
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (slot.templateId !== -1) continue;
    assigned[i] = pick((o) => o.schema === slot.schema);
  }

  if (remaining.some((r) => !r.used)) throw new Error("slot unmatched");

  return assigned.map((a) => a.assetId);
}
