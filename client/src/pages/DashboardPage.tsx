import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutDashboard, ExternalLink } from 'lucide-react';

const DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [key, setKey] = useState<string | null>(null);

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        setKey(connectionKey);

        if (!connectionKey) {
            // Optional: Redirect to auth page if no key is found
            // navigate('/auth');
        }
    }, [searchParams]);

    const routes = [
        { name: "IFL Match Control", path: "/ifl/match-control" },
        { name: "IFL Match Overlay", path: "/ifl/match-overlay" },
        { name: "Tag Team Control", path: "/tag/match-control" },
        { name: "Tag Team Overlay", path: "/tag/match-overlay" },
    ];

    return (
        <div className="bg-[#121212] min-h-screen p-8 text-gray-200 font-archivo">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-[#DAA520] uppercase tracking-widest border-b-2 border-[#DAA520] inline-block pb-2">
                    <LayoutDashboard className="inline-block mr-4 h-10 w-10" />
                    Overlay Dashboard
                </h1>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-100 border-l-4 border-[#DAA520] pl-4 mb-6">
                    Quick Access Routes
                </h2>
                <ul className="space-y-3">
                    {routes.map(route => (
                        <li key={route.path}>
                            <Link 
                                to={`${route.path}?key=${key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg text-[#DAA520] hover:text-[#F0C350] transition-colors flex items-center"
                            >
                                {route.name}
                                <ExternalLink className="ml-2 h-5 w-5" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-100 border-l-4 border-[#DAA520] pl-4 mb-6">
                    Embedded Previews
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {routes.map(route => (
                        <div key={`iframe-${route.path}`} className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold text-gray-100 mb-4">{route.name}</h3>
                            <iframe
                                src={`${route.path}?key=${key}`}
                                className="w-full h-96 border-2 border-gray-800 rounded-md"
                                title={route.name}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
