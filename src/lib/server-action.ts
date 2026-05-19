export type ActionResponse<T = void> =
  | { ok: true; data?: T }
  | {
      ok: false;
      message: string;
      type: "validation";
      errors: Record<string, string[]>;
    }
  | { ok: false; message: string };
