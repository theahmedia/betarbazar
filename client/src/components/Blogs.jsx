import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiUser, FiCalendar, FiSearch } from 'react-icons/fi';
import BlogImg1 from "../assets/blog/blog_1.jpg";
import BlogImg2 from "../assets/blog/blog_12.jpg";
import BlogImg3 from "../assets/blog/blog_6.jpg";
import BlogImg4 from "../assets/blog/blog_8.jpg";
import BlogImg5 from "../assets/blog/blog_2.jpg";
import BlogImg6 from "../assets/blog/blog_4.jpg";

const categories = [
    "All",
    "Delivery",
    "Product",
    "Safety",
    "Frash",
    "Authentic Service",
    "Customer Priority",
    "Hygienic",
    "Customer Identity and Security"
];

const blogs = [
    {
        id: 1,
        title: "Ensuring Fast and Reliable Delivery",
        excerpt: "Learn how we guarantee timely and secure deliveries for our customers.",
        category: "Delivery",
        image: BlogImg1,
        author: "Jane Doe",
        date: "2024-01-10",
        readTime: "6 min read",
        trending: true
    },
    {
        id: 2,
        title: "Top-Quality Products for Your Needs",
        excerpt: "Explore our range of high-quality products carefully curated for our customers.",
        category: "Product",
        image: BlogImg2,
        author: "John Smith",
        date: "2024-01-15",
        readTime: "8 min read",
        trending: true
    },
    {
        id: 3,
        title: "Safety Measures in E-commerce Shopping",
        excerpt: "Discover how we prioritize safety in every step of your online shopping journey.",
        category: "Safety",
        image: BlogImg3,
        author: "Emily Davis",
        date: "2024-01-18",
        readTime: "5 min read",
        trending: true
    },
    {
        id: 4,
        title: "Understanding Frash and Its Benefits",
        excerpt: "Learn about frash and its role in sustainable and eco-friendly shopping.",
        category: "Frash",
        image: BlogImg4,
        author: "Michael Lee",
        date: "2024-01-20",
        readTime: "7 min read"
    },
    {
        id: 5,
        title: "Authentic Service: Our Commitment to You",
        excerpt: "We strive to provide authentic and trustworthy service to all our customers.",
        category: "Authentic Service",
        image: BlogImg5,
        author: "Sophia Brown",
        date: "2024-01-25",
        readTime: "6 min read"
    },
    {
        id: 6,
        title: "Why Customer Priority Matters",
        excerpt: "We put customers first in everything we do. Learn more about our customer-first approach.",
        category: "Customer Priority",
        image: BlogImg6,
        author: "Chris Martin",
        date: "2024-01-28",
        readTime: "7 min read"
    }
];

const trendingPosts = [
    {
        id: 1,
        title: "How We Ensure Fast Shipping",
        excerpt: "A deep dive into our logistics and delivery systems.",
        category: "Delivery",
        image: BlogImg1,
        author: "David Johnson",
        date: "2024-02-01",
        readTime: "6 min read"
    },
    {
        id: 2,
        title: "Top Picks for This Season",
        excerpt: "Discover the must-have products trending now.",
        category: "Product",
        image: BlogImg2,
        author: "Lisa White",
        date: "2024-02-05",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "E-commerce Safety Tips",
        excerpt: "Protect yourself while shopping online with these key tips.",
        category: "Safety",
        image: BlogImg3,
        author: "Tom Harris",
        date: "2024-02-10",
        readTime: "5 min read"
    }
];

const recentPosts = [
    {
        id: 1,
        title: "Frash: A Sustainable Choice",
        excerpt: "Explore the benefits of frash and its role in eco-friendly shopping.",
        category: "Frash",
        image: BlogImg4,
        author: "Michael Lee",
        date: "2024-01-20",
        readTime: "7 min read"
    },
    {
        id: 2,
        title: "Authenticity at Its Best",
        excerpt: "We take pride in delivering genuine and reliable services to our valued customers.",
        category: "Authentic Service",
        image: BlogImg5,
        author: "Sophia Brown",
        date: "2024-01-25",
        readTime: "6 min read"
    },
    {
        id: 3,
        title: "Putting Customers First, Always",
        excerpt: "Find out how we ensure customer satisfaction remains our top priority.",
        category: "Customer Priority",
        image: BlogImg6,
        author: "Chris Martin",
        date: "2024-01-28",
        readTime: "7 min read"
    }
];

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredBlogs = blogs.filter(blog => {
        return (
            (selectedCategory === "All" || blog.category === selectedCategory) &&
            (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });
    const suggestions = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div
            className="container mx-auto px-4 py-8 text-slate-950"
        >
            {/* Search Bar */}
            <div className="mb-8">
                <div className="mb-8">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(e.target.value !== "");
                            }}
                            className="w-full pl-10 py-2 rounded-full bg-gray-100 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {/* Autocomplete Suggestions */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className='absolute bg-gray-500 text-gray-950 w-full mt-2 rounded shadow-lg z-10'>
                                {suggestions.map(suggestions => (
                                    <div key={suggestions.id} className='p-2 hover:bg-gray-700 cursor-pointer' onClick={()=>{setSearchQuery(suggestions.title); setShowSuggestions}}>
                                        {suggestions.title}
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {/* Categories */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm ${
                                selectedCategory === category
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBlogs.map(blog => (
                            <div
                                key={blog.id}
                                className="bg-gray-100 rounded-lg shadow-md overflow-hidden group"
                            >
                                <div
                                    className="relative overflow-hidden"
                                >
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="text-xs bg-orange-100 py-1 px-3 rounded-full text-orange-500 font-medium">{blog.category}</span>
                                    <h3 className="text-xl font-semibold mt-2 mb-2">{blog.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <FiUser className="mr-2" />
                                        <span className="mr-4">{blog.author}</span>
                                        <FiClock className="mr-2" />
                                        <span>{blog.readTime}</span>
                                    </div>
                                    <Link
                                        to={`/blog/${blog.id}`}
                                        className="text-orange-500 hover:text-orange-400 font-medium inline-flex items-center group"
                                    >
                                        Read More
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Trending Posts */}
                    <div className="bg-gray-100 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-orange-500">Trending Posts</h2>
                        <div className="space-y-4">
                            {trendingPosts.map(post => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.id}`}
                                    className="flex items-start hover:bg-orange-100 p-2 rounded"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="ml-4">
                                        <h3 className="font-medium text-sm mb-1 text-slate-950">{post.title}</h3>
                                        <p className="text-gray-400 text-xs">{post.readTime}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-gray-100 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-orange-500">Recent Posts</h2>
                        <div className="space-y-4">
                            {recentPosts.map(post => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.id}`}
                                    className="block hover:bg-orange-100 group p-2 rounded"
                                >
                                    <h3 className="font-medium group-hover:text-custom-orange text-sm mb-1 text-slate-950">{post.title}</h3>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <FiCalendar className="mr-1" />
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-gray-100 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-orange-500">Categories</h2>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="flex text-left w-full hover:bg-orange-100 rounded"
                                >
                                    <span
                                        className={`${
                                            selectedCategory === category
                                                ? 'text-orange-500 bg-orange-100 font-medium'
                                                : 'text-gray-900'
                                        } w-full p-2`}
                                    >
                                        {category}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
