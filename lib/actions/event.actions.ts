"use server"

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB()

        const event = await Event.findOne({ slug }).lean()
        if (!event || !Array.isArray(event.tags) || event.tags.length === 0) {
            return []
        }
        // Find events that do not have the same id as the event and have at least one tag in common with the current event
        return await Event.find({
            _id: {
                $ne: event._id
            },
            tags: {$in: event.tags}
        }).lean()
    } catch (e) {
        console.error("getSimilarEventsBySlug failed", e)
        return []
    }
}