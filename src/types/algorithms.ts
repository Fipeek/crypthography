const KEY_TYPES = {
  NUMBER: "number",
  TEXT: "text",
} as const;
export type KeyTypes = typeof KEY_TYPES[keyof typeof KEY_TYPES];
