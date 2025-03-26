import { useParams } from 'react-router-dom';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { blogs } from '../components/Blogs'; // Assuming you move blog data to a separate file

export default function ReadBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const selectedBlog = blogs.find(b => b.id === parseInt(id));
        setBlog(selectedBlog);
    }, [id]);

    if (!blog) {
        return <div className="text-center py-10 text-gray-500">Blog not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 text-slate-950">
            <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md" />
                <h1 className="text-3xl font-bold mt-4 mb-2 text-orange-600">{blog.title}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiUser className="mr-2" />
                    <span className="mr-4">{blog.author}</span>
                    <FiCalendar className="mr-2" />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                    <FiClock className="ml-4 mr-2" />
                    <span>{blog.readTime}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{blog.excerpt}</p>
                <p className="text-gray-600 mt-4">(Full blog content goes here...)</p>
            </div>
        </div>
    );
}
