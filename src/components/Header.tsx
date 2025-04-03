import Link from "next/link";
import Menu from "./Menu";


export default function Header() {
    return (
      <>
      <div className="navbar border-b-2 bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
<Menu count={50}/>
      </ul>
    </div>
    <Link href={'/'} className="btn btn-ghost text-xl">GameMonetize</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <Menu count={10}/>
    </ul>
  </div>
 
</div>
      
      </>
    );
  }
  