import { describe, it, expect } from "@jest/globals";
import { findThisHourBday } from "../helpers/findThisHourBday";
import { User } from "@prisma/client";

describe('Testing DB Helper "findThisHourBday"', () => {
  it('should return users with birthday today and this hour', async () => {
    const res = await findThisHourBday();
    console.log(res);
    expect(res).toBeInstanceOf(Array<User>);
  })
});