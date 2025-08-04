import {defineSchema, defineTable } from "convex/server";
import {v} from "convex/values";
export default defineSchema({
    players: defineTable({
        name: v.string(),
        buyIn: v.float64(),
        buyOut: v.float64(),
        sentMoney: v.boolean(),
        sentWin: v.boolean()
    })
})