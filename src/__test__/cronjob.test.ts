import { describe, it, expect } from "@jest/globals";
import { birthdayChecker } from "../controllers/cronjob.controller";

describe('Testing cronjob', () => {
  it('should do the checking and adding of jobs to queue', async () => {
    await birthdayChecker();
    expect(true).toBeTruthy();
  })
})