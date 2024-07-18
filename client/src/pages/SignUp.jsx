import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("모든 영역을 채워주세요!");
        }

        // 유효성 검사

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success == false) {
                return setErrorMessage(data.message);
            }

            setLoading(false);

            if (res.ok) {
                navigate("/sign-in");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-20">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        className="p-3 border"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        placeholder="email"
                        id="email"
                        className="p-3 border"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        className="p-3 border"
                        onChange={handleChange}
                    />
                </div>

                {errorMessage && (
                    <div className="p-2 px-4 mt-5 text-red-500 bg-red-200">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="p-3 mt-3 border"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="p-2">Loading...</span>
                    ) : (
                        "회원가입하기"
                    )}
                </button>
            </form>
            <div className="flex mt-10">
                <span>계정이 있나요?</span>
                <Link to="/sign-in" className="text-blue-500">
                    로그인하기
                </Link>
            </div>
        </div>
    );
}
