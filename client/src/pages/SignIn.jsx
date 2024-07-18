import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function SignIn() {
    const [formData, setFormData] = useState();
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            dispatch(signInFailure("모든 영역을 채워주세요!"));
        }

        // 유효성 검사

        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success == false) {
                dispatch(signInFailure(data.message));
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            dispatch(signInFailure(errorMessage));
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-20">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" placeholder="email" id="email" className="p-3 border" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" placeholder="password" id="password" className="p-3 border" onChange={handleChange} />
                </div>

                {errorMessage && <div className="p-2 px-4 mt-5 text-red-500 bg-red-200">{errorMessage}</div>}
                <button type="submit" className="p-3 mt-3 border" disabled={loading}>
                    {loading ? <span className="p-2">Loading...</span> : "로그인하기"}
                </button>
            </form>
            <div className="flex mt-10">
                <span>계정이 없나요?</span>
                <Link to="/sign-up" className="text-blue-500">
                    회원가입
                </Link>
            </div>
        </div>
    );
}
