import Image from 'next/image';
import { Github, Linkedin, Mail, Phone, MapPin, Globe, Book, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'About Aylin Gürel | Meranda News',
    description: 'Learn more about Aylin Gürel, a Computer Engineering student and developer.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h1>

            {/* Profile section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="flex justify-center">
                    <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-gray-200 shadow-md">
                        <Image
                            src="/aylin.jpg"
                            alt="Aylin Gürel"
                            width={256}
                            height={256}
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-2">Aylin Gürel</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Computer Engineering Student & Software Developer
                    </p>

                    <div className="mb-4 space-y-2">
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-gray-600" />
                            <span>aylngurel@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 text-gray-600" />
                            <span>+905056931700</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                            <span>Edirne, Turkey</span>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-4">
                        <a
                            href="https://linkedin.com/in/aylin-gürela41974300/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 p-2 rounded-full text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="https://github.com/aylingurel1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* About me section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">About Me</h2>
                <div className="prose max-w-none">
                    <p className="mb-4">
                        I am currently studying Computer Engineering at Mersin University and will graduate this year. I am actively working to enhance my skills. Although I lack professional experience, I'm gaining hands-on experience in all stages of software development.
                    </p>
                    <p className="mb-4">
                        My strong communication skills, effective time management, and ability to collaborate well in team environments are among my strengths. My focus is on developing user-centric, high-quality, and user-friendly software solutions.
                    </p>
                    <p className="mb-4">
                        In backend development, I work with JavaScript and C#, focusing on the MVC architecture and database relationships. Additionally, I have gained experience in backend projects using Node.js. Furthermore, I am exploring artificial intelligence and machine learning concepts at an introductory level using Python.
                    </p>
                    <p>
                        I can easily adapt to flexible working hours and communicate directly with clients when necessary. I trust my communication skills and greatly value teamwork. In my projects, I strive to align with company goals while prioritizing time and cost efficiency.
                    </p>
                </div>
            </div>

            {/* Skills section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Technical Skills</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex flex-wrap gap-3">
                        {['ASP.NET Core', 'Node.js', 'JavaScript', 'C#', 'MSSQL', 'HTML/CSS', 'Python', 'React'].map((skill) => (
                            <span
                                key={skill}
                                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Education section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Education</h2>
                <div className="space-y-8">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center gap-2">
                            <Book className="text-blue-500" />
                            <h3 className="text-xl font-semibold">Mersin University</h3>
                        </div>
                        <p className="text-gray-600">Computer Science and Engineering</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>September 2021 - Present</span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Relevant coursework: Introduction to Computer Engineering, C Programming, Data Structures,
                            Object Oriented Programming, Numerical Methods, Operating Systems, Formal Languages and Automata,
                            Computer Organization, Database Systems, Digital Circuits, Software Engineering
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center gap-2">
                            <Book className="text-blue-500" />
                            <h3 className="text-xl font-semibold">Kesan Fen High School</h3>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Graduated 2019</span>
                        </div>
                        <div className="flex items-center mt-2 text-gray-600">
                            <Award className="w-4 h-4 mr-1 text-yellow-500" />
                            <span>Graduated with 3rd place honors</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Work Experience</h2>
                <div className="space-y-8">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="text-xl font-semibold">Intern Engineer</h3>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">BioCoder Teknoloji Sanayi ve Ticaret A.Ş.</span>
                            <span className="text-gray-500 text-sm">2024</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>Mersin, Turkey</span>
                        </div>
                        <p className="text-gray-600">
                            Completed a portion of my internship as determined by the university requirements.
                        </p>
                    </div>
                </div>
            </div>

            {/* Certificates section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Certificates</h2>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2">
                            <Award className="text-blue-500" />
                            <h3 className="text-lg font-semibold">BTK Academy Advanced Front-End Web Design</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact section */}
            <div>
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Get In Touch</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-600 mb-6">
                        I'm currently looking for new opportunities and would love to hear from you. Whether you have a question or just want to say hi, feel free to reach out!
                    </p>
                    <div className="flex justify-center">
                        <Button asChild className="px-8 py-6 text-lg">
                            <a href="mailto:aylngurel@gmail.com">
                                Contact Me
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}