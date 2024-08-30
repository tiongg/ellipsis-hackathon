export type SelfDto = {
  accountId: string;
  orgs: string[];
  /**
   * Undefined if not onboarded
   */
  name?: string | undefined;
};
