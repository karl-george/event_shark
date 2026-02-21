export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events = [
    {
        title: "Global Tech Conference 2026",
        image: "/images/event1.png",
        slug: "global-tech-conference-2026",
        location: "San Francisco, CA",
        date: "March 15, 2026",
        time: "09:00 AM",
    },
    {
        title: "Web Dev Summit",
        image: "/images/event2.png",
        slug: "web-dev-summit",
        location: "New York, NY",
        date: "April 10, 2026",
        time: "10:30 AM",
    },
    {
        title: "AI & ML Hackathon",
        image: "/images/event3.png",
        slug: "ai-ml-hackathon",
        location: "Austin, TX",
        date: "May 22, 2026",
        time: "08:00 AM",
    },
    {
        title: "Future of Fintech",
        image: "/images/event4.png",
        slug: "future-of-fintech",
        location: "London, UK",
        date: "June 05, 2026",
        time: "11:00 AM",
    },
    {
        title: "Cloud Computing Expo",
        image: "/images/event5.png",
        slug: "cloud-computing-expo",
        location: "Berlin, Germany",
        date: "July 12, 2026",
        time: "09:30 AM",
    },
    {
        title: "Cyber Security Workshop",
        image: "/images/event6.png",
        slug: "cyber-security-workshop",
        location: "Tokyo, Japan",
        date: "August 20, 2026",
        time: "02:00 PM",
    }
];
