import React, { Component } from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import JsImg from "../../assets/javascript.png";

function Footer() {
  return (
    <footer className={styles.footerCont}>
      <div>
        <h3>همراه رسانه</h3>
        <p>
          هدف از تاسیس همراه رسانه کمک به و پیشرفت و کسب درآمد مردم دوستان عزیزی
          که قدم در راه پیشرفت و خود آشتغالی دارن . امیدواریم که بتونیم در این
          مسیر همراه شما باشیم و تا جایی که ممکنه علم خودمونو با شما اشتراک
          بگذاریم
        </p>
      </div>

      <div>
        <h3>منو </h3>
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
      </div>

      <div>
        <h3>درگاه امن</h3>
        <Image
          src={JsImg}
          alt="Picture of the author"
          width={100}
          height={100}
        />
      </div>
    </footer>
  );
}

export default Footer;
