import React, { Component, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Login from "@/assets/login.svg";
import Bascket from "@/assets/bascket.svg";
import styles from "./navmenu.module.scss";
import { disableScroll } from "@/utils/javascript";

let registerComp: any;
let backgorundFilter: any;

function regLogBtn() {
  registerComp.style.display = "block";
  backgorundFilter.style.display = "block";
  disableScroll();
}

if (typeof window !== "undefined") {
  registerComp = document.querySelector("#navsection").previousSibling;
  backgorundFilter = registerComp.previousSibling;
}
const NavMenu = () => {
  return (
    <section id="navsection" className={styles.navMenu}>
      <div>
        <span className={styles.btnSpan}>
          <span className={styles.imgLogSpan}>
            <Image src={Login} alt="Login" width={20} height={20} />
          </span>
          <span className={styles.imgBascketSpan}>
            <Image src={Bascket} alt="Login" width={25} height={25} />
          </span>
          <span onClick={regLogBtn} className={styles.logBtn}>
            ورود | ثبت نام
          </span>
        </span>
      </div>

      <ul>
        <li>
          <Link href="/" legacyBehavior>
            <a>خانه</a>
          </Link>
        </li>
        <li>
          <Link href="/courses" legacyBehavior>
            <a>دوره ها</a>
          </Link>
        </li>
        <li>
          <Link href="/blogs" legacyBehavior>
            <a>وبلاگ</a>
          </Link>
        </li>
        <li>
          <Link href="/contact" legacyBehavior>
            <a>تماس</a>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default NavMenu;
