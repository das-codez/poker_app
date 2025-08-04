import {mutation, query} from "./_generated/server"
import {ConvexError, v} from "convex/values";

export const getPlayer = query({
    handler: async(ctx) => {
       const players =  await ctx.db.query("players").order("desc").collect()
       return players
    }
})

export const addPlayer = mutation({
    args: {name: v.string(), buyIn: v.float64()},
    handler: async(ctx, args) => {
        const playerId = await ctx.db.insert("players", {
            name: args.name,
            buyIn: args.buyIn,
            buyOut: 0.00,
            sentMoney: false,
            sentWin: false, 

        });
        return playerId
    }
})

export const deletePlayer = mutation({
    args: {id: v.id("players")},
    handler: async (ctx,args) => {
        await ctx.db.delete(args.id);
    }
})
