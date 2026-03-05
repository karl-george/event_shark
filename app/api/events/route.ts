import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import {v2 as cloudinary} from "cloudinary";

/**
 * Create a new event from multipart/form-data, upload its image to Cloudinary, and persist the event to the database.
 *
 * Expects form-data with event fields as entries, `tags` and `agenda` as JSON-encoded strings, and `image` as a file.
 * Responds with 201 and the created event on success, 400 for invalid input (invalid JSON format or missing image), or 500 on server error.
 *
 * @param req - Incoming NextRequest containing the multipart/form-data payload:
 *   - form fields for the event properties
 *   - `tags` and `agenda` as JSON strings
 *   - `image` as a File
 * @returns A JSON response:
 *   - Success: `{ message: "Event created successfully", event: <createdEvent> }`
 *   - Client error (400): `{ message: "Invalid JSON data format" }` or `{ message: "Image file is required" }`
 *   - Server error (500): `{ message: "Event Creation Failed", error: <errorMessage> }`
 */
export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const formData = await req.formData()

        let event;
        try {
            // Get event data from form data
            event = Object.fromEntries(formData.entries())
        } catch (e) {
            return NextResponse.json({message: "Invalid JSON data format"}, {status: 400})
        }

        let tags = JSON.parse(formData.get('tags') as string)
        let agenda = JSON.parse(formData.get('agenda') as string)

        // Get image file from form data
        const file = formData.get('image') as File;

        if (!file) return NextResponse.json({message: "Image file is required"}, {status: 400})

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: "image",
                folder: "DevEvent"
            }, (error, result) => {
                if (error) return reject(error);

                resolve(result)
            }).end(buffer)
        })

        // Add image URL to event object
        event.image = (uploadResult as { secure_url: string }).secure_url

        // Create a new event in the database
        const createdEvent = await Event.create({...event, tags: tags, agenda: agenda})
        return NextResponse.json({
            message: "Event created successfully",
            event: createdEvent
        }, {status: 201})
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message: 'Event Creation Failed',
            error: e instanceof Error ? e.message : 'Unknown'
        }, {status: 500})
    }
}

export async function GET() {
    try {
        await connectDB()
        const events = await Event.find().sort({createdAt: -1})
        return NextResponse.json({
            message: "Events fetched successfully",
            events
        }, {status: 200})
    } catch (e) {
        return NextResponse.json({
            message: "Event fetching failed",
            error: e
        }, {status: 500})
    }
}