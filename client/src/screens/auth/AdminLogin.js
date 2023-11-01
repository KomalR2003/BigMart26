import { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../store/services/authService";
import { setAdminToken } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleInputs = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const [login, response] = useAuthLoginMutation();        //user define hook
    console.log('my response', response);

    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];

    const AdminLoginFunction = e => {
        e.preventDefault();
        login(state);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if(response.isSuccess) {
            localStorage.setItem('admin-token', response?.data?.token);
            dispatch(setAdminToken(response?.data?.token));
            navigate('/dashboard/products');
        }
    }, [response.isSuccess])

    return (
        <>

            <div className="bg-black1 h-screen flex justify-center items-center">

                <form className="bg-slate1 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded"
                    onSubmit={AdminLoginFunction}>

                    <h3 className="mb-4 text-black1 capitalize font-semibold text-lg">dashboard Login</h3>

                    {errors.length > 0 && errors.map((error, key) => (
                        <div key={key}>
                            <p className="alert-danger">{error.msg}</p>
                        </div>
                    )) }

                    <div className="mb-4 mt-4">
                        <input type="email" name="email" className="w-full bg-gray-700 p-4 rounded outline-none text-white-600"
                            onChange={handleInputs} value={state.email} placeholder="Enter Email..." />
                    </div>

                    <div className="mb-4">
                        <input type="password" name="password" className="w-full bg-gray-700 p-4 rounded outline-none text-white"
                            onChange={handleInputs} value={state.password} placeholder="Enter Password..." />
                    </div>

                    <div className="mb-4">
                        <input type="submit" value={response.isLoading ? 'loading...' : 'sign-in'} className="bg-gray-900 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer " />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin;