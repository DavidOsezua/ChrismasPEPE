import { useState } from "react";
import styles from "./Navbar.module.css";
import { logo, linkArrow } from "../assets";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const { open } = useWeb3Modal();
  const { address } = useAccount();

  const changeNavbarColor = () => {
    if (window.scrollY >= 55) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  window.addEventListener("scroll", changeNavbarColor);
  return (
    <header
      className={`${
        navbar ? `${styles.header} ${styles.active}` : styles.header
      }`}
    >
      <nav className={`${styles.navContainer}`}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className="flex items-center gap-[3px]">
          <a
            href="http://christmaspepe.com/"
            className="text-[#fff] text-[300]"
          >
            {" "}
            Back Home{" "}
          </a>
          <img src={linkArrow} />
        </div>
        <button
          className={` px-2 bg-white rounded-[3px] [background:linear-gradient(180deg,rgb(57,169,74)_0%,rgb(116.52,246.93,137.39)_100%)] text-[#fff] ${styles.btn}`}
          onClick={open}
        >
          {address ? shortenAddress(address) : "Connect Wallet"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
