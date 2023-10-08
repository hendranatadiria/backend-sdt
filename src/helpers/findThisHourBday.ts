import { Prisma, User } from "@prisma/client"
import { db } from "../config/db"

export const findThisHourBday = async () => {
  const sql = Prisma.sql`
    SELECT * FROM "public"."User"
    WHERE EXTRACT(DAY FROM "User"."birthday") = EXTRACT (DAY FROM CURRENT_TIMESTAMP)
        AND EXTRACT(MONTH FROM "User"."birthday") = EXTRACT (MONTH FROM CURRENT_TIMESTAMP)
        AND EXTRACT (HOUR FROM CURRENT_TIMESTAMP AT TIME ZONE "User"."location") = 9
  `
  const query = await db.$queryRaw<User[]>(sql)
  return query;
}