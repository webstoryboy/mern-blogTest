import { Link } from "react-router-dom";
import { FiSun, FiLogOut } from "react-icons/fi";

export default function Header() {
    return (
        <section className="flex items-center justify-between py-3 mx-auto border-b max-w-7xl">
            <h1>
                <Link className="font-['Orbitron'] text-xl" to="/">
                    websloper
                </Link>
            </h1>
            <nav>
                <ul className="flex gap-4">
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/sign-up">signUp</Link>
                    </li>
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/sign-in">signIn</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button className="p-3 mr-1 border rounded-full hover:bg-slate-100">
                    <FiSun />
                </button>
                <button className="p-3 border rounded-full hover:bg-slate-100">
                    <FiLogOut />
                </button>
            </div>
        </section>
    );
}
