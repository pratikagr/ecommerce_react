import React from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Headers() {
  return (
    <header>
      {/* <div className="menu">
        <IoMenu width={30} />
      </div> */}
      <div className="logo">
        <Link to="/">30DC Shop</Link>
      </div>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login or Register</Link>
        </li>
      </ul>
      <ul>
        {/* <li>
          <IoClose />
        </li> */}
        <div className="cart-icon">
          <span>0</span>
          <Link>
            <FaShoppingCart width={30} />
          </Link>
        </div>
      </ul>
    </header>
  );
}

export default Headers;
