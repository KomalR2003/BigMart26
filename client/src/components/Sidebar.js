import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`} >   {/* ${side}= show sidebar  or sm: left-0 = hide sidebar in small screen*/}

      <i className="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg" onClick={closeSidebar}></i>

      <div className="bg-white p-4">
        <img src="/logo.svg" alt="logo" />
        {/* <h1 className="text-4xl text-slate1 font-bold border-2 border-black1 h-13 p-1 w-40" ><span className="bg-slate1 text-black1 h-9 w-40  ">Big</span> Mart</h1> */}
      </div>
      <div>
        <ul className="mt-4">
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-card-list mr-2 inline-block text-lg"></i><Link to="/dashboard/products"
              className="text-base capitalize">Products</Link>
          </li>

          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-bag-check mr-2 inline-block text-lg"></i><Link to="/dashboard/products"
              className="text-base capitalize">orders</Link>
          </li>

          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-people-fill mr-2 inline-block text-lg"></i><Link to="/dashboard/products"
              className="text-base capitalize">customers</Link>
          </li>

          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i><Link to="/dashboard/categories"
              className="text-base capitalize">categories</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;