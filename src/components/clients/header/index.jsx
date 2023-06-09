import styles from "./styles.module.css";
import { BsSearch } from "react-icons/bs";
import { BiPhoneCall, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import Nav from "../nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authAsyncDecodeToken,
  isCookie,
  logout,
} from "../../../redux/features/authSlice";
import TimeClock from "../timeClock";
const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const location = useLocation();
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onToggle = () => {
    setActiveNav(!activeNav);
  };
  useEffect(() => {
    dispatch(isCookie());
    dispatch(authAsyncDecodeToken({ token: accessToken }));
  }, [accessToken]);
  useEffect(() => {
    if (location.pathname == "/") {
      setActiveNav(true);
    } else {
      setActiveNav(false);
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <header>
        <div className={styles.header__top}>
          <div className={styles.logo}>
            <NavLink to="/">Phone Store</NavLink>
            <div>
              <TimeClock />
            </div>
          </div>
          <div className={styles.hotline}>
            <div className={styles.hotline_icon}>
              <BiPhoneCall />
            </div>
            <div className={styles.hotline_info}>
              <p>1800 9999</p>
              <p>Tổng đài hỗ trợ</p>
            </div>
          </div>
          <form className={styles.search}>
            <input type="text" placeholder="Bạn muốn tìm gì?" />
            <div className={styles.btn_icon}>
              <BsSearch />
            </div>
          </form>
          <div className={styles.cart}>
            <NavLink to="/cart">
              <div className={styles.cart_icon}>
                <AiOutlineShoppingCart />
              </div>
              <p>Giỏ hàng</p>
            </NavLink>
          </div>
          {user == null ? (
            <NavLink to="/login" className={styles.account}>
              <p>Đăng nhập</p>
            </NavLink>
          ) : (
            <div className={styles.account__login}>
              <p>{user.name}</p>
              <div className={styles.sub_account__login}>
                <p onClick={() => handleLogout()}>Đăng xuất</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.header__nav}>
          <div className={styles.header__nav_container}>
            <div
              className={styles.header__nav_categories}
              onClick={() => onToggle()}
            >
              <div className={styles.header__nav_categories_icon}>
                <BiCategoryAlt />
              </div>
              <p>Danh mục sản phẩm</p>
            </div>
            <Nav activeNav={activeNav} />
          </div>
          <div className={styles.categories_hot}>
            <p>Sản phẩm hot: </p>
            <div className={styles.categories_hot_link}>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
              <NavLink to={`#`}>iPhone 14</NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
