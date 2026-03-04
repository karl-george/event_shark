import {notFound} from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsPage = async ({params}: { params: Promise<{ slug: string }> }) => {
    // Get slug from params
    const {slug} = await params;

    // Get event details from API
    const request = await fetch(`${BASE_URL}/api/events/${slug}`)
    const {event} = await request.json();

    if (!event) return notFound()

    return (
        <section id="event">
            <h1>Event Details: <br/> {slug}</h1>
        </section>
    )
}
export default EventDetailsPage
