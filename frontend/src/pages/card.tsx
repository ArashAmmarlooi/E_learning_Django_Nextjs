import Link from "next/link";
import Image from "next/image";
import JsImg from "../assets/javascript.png";
import styles from "@/styles/pages/card.module.scss";
const Card = () => {
  return (
    <>
      <section className={styles.cardCont}>
        <div>
          <table>
            <thead>
              <tr>
                <th>محصول</th>
                <th>قیمت</th>
                <th>تعداد</th>
                <th>جمع</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <Image
                    src={JsImg}
                    alt="Picture of the author"
                    width={80}
                    height={50}
                  />
                </td>
                <td>۱۲۰۰</td>
                <td>۱</td>
                <td>۱۲۰۰</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.priceCont}>
          <div className={styles.priceCard}>
            <p>جمع کل سبد خرید</p>
            <span>
              <p>جمع جز</p>
              <p>جمع کل</p>
              <div className={styles.checkBtn}>ادامه جهت دریافت صورت حساب</div>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
