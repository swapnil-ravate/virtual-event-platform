// Mock event data for the virtual event platform

export const mockEvents = [
    {
        id: 1,
        title: "AI & Machine Learning Summit 2026",
        description: "Join industry leaders as they explore the latest trends in AI, machine learning, and deep learning technologies. This summit brings together researchers, practitioners, and enthusiasts to share knowledge and innovations.",
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=600&fit=crop",
        date: "Feb 15, 2026",
        time: "10:00 AM - 6:00 PM EST",
        category: "Technology",
        type: "Upcoming",
        attendees: 2500,
        price: 0,
        location: "Virtual",
        speakers: [1, 2, 3],
        agenda: [
            { time: "10:00 AM", title: "Opening Keynote: The Future of AI" },
            { time: "11:30 AM", title: "Panel: Ethics in Machine Learning" },
            { time: "2:00 PM", title: "Workshop: Building Neural Networks" },
            { time: "4:00 PM", title: "Networking Session" }
        ]
    },
    {
        id: 2,
        title: "Web3 & Blockchain Conference",
        description: "Discover the decentralized future with blockchain experts, crypto innovators, and Web3 pioneers. Learn about DeFi, NFTs, and the future of digital ownership.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        date: "Feb 18, 2026",
        time: "9:00 AM - 5:00 PM PST",
        category: "Blockchain",
        type: "Upcoming",
        attendees: 1800,
        price: 4067,
        location: "Virtual",
        speakers: [2, 4],
        agenda: [
            { time: "9:00 AM", title: "State of Web3" },
            { time: "11:00 AM", title: "Building on Ethereum" },
            { time: "2:00 PM", title: "NFT Marketplace Strategies" }
        ]
    },
    {
        id: 3,
        title: "Digital Marketing Masterclass",
        description: "Master the art of digital marketing with hands-on workshops covering SEO, social media, content marketing, and analytics.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        date: "Feb 20, 2026",
        time: "1:00 PM - 7:00 PM GMT",
        category: "Marketing",
        type: "Upcoming",
        attendees: 3200,
        price: 0,
        location: "Virtual",
        speakers: [5],
        agenda: [
            { time: "1:00 PM", title: "SEO Best Practices 2026" },
            { time: "3:00 PM", title: "Social Media Strategy" },
            { time: "5:00 PM", title: "Analytics & ROI" }
        ]
    },
    {
        id: 4,
        title: "Startup Founders Networking Event",
        description: "Connect with fellow entrepreneurs, investors, and mentors. Share experiences, challenges, and opportunities in the startup ecosystem.",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
        date: "Feb 22, 2026",
        time: "6:00 PM - 9:00 PM EST",
        category: "Business",
        type: "Upcoming",
        attendees: 1500,
        price: 2075,
        location: "Virtual",
        speakers: [3, 6],
        agenda: [
            { time: "6:00 PM", title: "Welcome & Introductions" },
            { time: "7:00 PM", title: "Speed Networking" },
            { time: "8:00 PM", title: "Investor Panel" }
        ]
    },
    {
        id: 5,
        title: "UX/UI Design Workshop",
        description: "Learn modern design principles, prototyping tools, and user research methodologies from industry-leading designers.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        date: "Feb 25, 2026",
        time: "11:00 AM - 4:00 PM PST",
        category: "Design",
        type: "Upcoming",
        attendees: 2100,
        price: 0,
        location: "Virtual",
        speakers: [1, 5],
        agenda: [
            { time: "11:00 AM", title: "Design Thinking Workshop" },
            { time: "1:00 PM", title: "Figma Advanced Techniques" },
            { time: "3:00 PM", title: "Portfolio Review Session" }
        ]
    },
    {
        id: 6,
        title: "Cloud Computing Summit",
        description: "Explore AWS, Azure, and Google Cloud platforms. Learn about serverless architecture, containers, and cloud-native development.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        date: "Live Now",
        time: "Ongoing",
        category: "Technology",
        type: "Live",
        attendees: 4500,
        price: 0,
        location: "Virtual",
        speakers: [2, 3, 4],
        agenda: [
            { time: "Now", title: "Live Q&A with Cloud Experts" }
        ]
    },
    {
        id: 7,
        title: "Cybersecurity Best Practices",
        description: "Stay ahead of threats with expert insights on security protocols, penetration testing, and incident response strategies.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        date: "Mar 5, 2026",
        time: "2:00 PM - 6:00 PM EST",
        category: "Security",
        type: "Upcoming",
        attendees: 1900,
        price: 6557,
        location: "Virtual",
        speakers: [4, 6],
        agenda: [
            { time: "2:00 PM", title: "Threat Landscape 2026" },
            { time: "4:00 PM", title: "Zero Trust Architecture" }
        ]
    },
    {
        id: 8,
        title: "Data Science Bootcamp",
        description: "Intensive bootcamp covering Python, machine learning, data visualization, and statistical analysis for aspiring data scientists.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        date: "Available",
        time: "Self-paced",
        category: "Data Science",
        type: "On-Demand",
        attendees: 5600,
        price: 0,
        location: "Virtual",
        speakers: [1, 2],
        agenda: [
            { time: "Module 1", title: "Python Fundamentals" },
            { time: "Module 2", title: "Machine Learning Basics" },
            { time: "Module 3", title: "Real-world Projects" }
        ]
    }
];

export const mockSpeakers = [
    {
        id: 1,
        name: "Dr. Priya Sharma",
        title: "AI Research Lead",
        company: "TCS Research & Innovation",
        bio: "Dr. Sharma is a leading researcher in artificial intelligence with over 15 years of experience. She has published 50+ papers and holds multiple patents in machine learning. Based in Bangalore, she leads AI initiatives across India.",
        image: "/images/speakers/priya_sharma.png",
        expertise: ["Machine Learning", "Deep Learning", "AI Ethics"],
        social: {
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
            website: "https://example.com"
        }
    },
    {
        id: 2,
        name: "Rahul Mehta",
        title: "Blockchain Architect",
        company: "Infosys Finacle",
        bio: "Rahul is a pioneer in blockchain technology, having worked on major DeFi protocols and NFT platforms. Based in Mumbai, he's passionate about Web3 education and India's digital transformation.",
        image: "/images/speakers/rahul_mehta.png",
        expertise: ["Blockchain", "Smart Contracts", "DeFi"],
        social: {
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com"
        }
    },
    {
        id: 3,
        name: "Anjali Desai",
        title: "Startup Mentor & Investor",
        company: "Sequoia Capital India",
        bio: "Anjali has founded 3 successful startups and now helps early-stage companies scale. She's invested in over 40 Indian startups and mentors emerging entrepreneurs across the country.",
        image: "/images/speakers/anjali_desai.png",
        expertise: ["Entrepreneurship", "Venture Capital", "Growth Strategy"],
        social: {
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com"
        }
    },
    {
        id: 4,
        name: "Arjun Singh",
        title: "Security Engineer",
        company: "Wipro Cybersecurity",
        bio: "Arjun specializes in cybersecurity and cloud infrastructure. He's a certified ethical hacker and cloud architect, protecting India's digital infrastructure.",
        image: "/images/speakers/arjun_singh.png",
        expertise: ["Cybersecurity", "Cloud Security", "Penetration Testing"],
        social: {
            linkedin: "https://linkedin.com"
        }
    },
    {
        id: 5,
        name: "Kavya Reddy",
        title: "Creative Director",
        company: "Flipkart Design",
        bio: "Award-winning designer with a passion for creating user-centered experiences. Kavya has worked with leading Indian companies and startups, shaping digital experiences for millions.",
        image: "/images/speakers/kavya_reddy.png",
        expertise: ["UX Design", "Product Design", "Design Systems"],
        social: {
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
            website: "https://example.com"
        }
    },
    {
        id: 6,
        name: "Vikram Khanna",
        title: "Business Strategist",
        company: "Bain & Company India",
        bio: "Vikram helps companies achieve exponential growth through innovative strategies and data-driven decision making. He specializes in scaling Indian businesses for global markets.",
        image: "/images/speakers/vikram_khanna.png",
        expertise: ["Business Strategy", "Marketing", "Analytics"],
        social: {
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com"
        }
    }
];

export const mockExhibitors = [
    {
        id: 1,
        name: "TechCorp Solutions",
        description: "Leading provider of enterprise AI and cloud solutions. We help businesses transform through technology.",
        logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop",
        category: "Technology",
        website: "https://example.com",
        resources: [
            { title: "AI Whitepaper 2024", type: "PDF" },
            { title: "Cloud Migration Guide", type: "PDF" }
        ]
    },
    {
        id: 2,
        name: "DesignMasters",
        description: "Creative agency specializing in UX/UI design, branding, and digital experiences.",
        logo: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=300&h=300&fit=crop",
        category: "Design",
        website: "https://example.com",
        resources: [
            { title: "Design System Template", type: "Figma" },
            { title: "UI Kit 2024", type: "Sketch" }
        ]
    },
    {
        id: 3,
        name: "SecureCloud Inc",
        description: "Cybersecurity and cloud infrastructure experts. Protecting your digital assets.",
        logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=300&fit=crop",
        category: "Security",
        website: "https://example.com",
        resources: [
            { title: "Security Checklist", type: "PDF" },
            { title: "Compliance Guide", type: "PDF" }
        ]
    }
];

export const categories = [
    "All",
    "Technology",
    "Business",
    "Design",
    "Marketing",
    "Blockchain",
    "Data Science",
    "Security"
];

export const eventTypes = [
    "All",
    "Live",
    "Upcoming",
    "On-Demand"
];
