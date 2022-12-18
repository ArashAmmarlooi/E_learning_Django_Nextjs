import styles from "./registerlogin.module.scss";

function closeModal(ref: any) {
  console.log(ref, "ref");
  ref.regRef.current.style.display = "none";
  ref.filterRef.current.style.display = "none";
  window.onscroll = function () {};
}
const RegisterLogin = ({ cmpref }: any) => {
  return (
    <div className={styles.registerContainer}>
      <span>
        <h1>آموزش آنلاین</h1>
        <span id="closeBtn" onClick={() => closeModal(cmpref)}>
          x
        </span>
      </span>

      <p>لطفا شماره تلفن همراه خود را وارد کنید </p>

      <form action="/send-data-here" method="post">
        <label htmlFor="number">شماره موبایل</label>
        <input
          type="text"
          id="number"
          name="number"
          required
          // minLength="10"
          // maxlength="20"
        />
        <button type="submit">ثبت نام</button>
      </form>
    </div>
  );
};

export default RegisterLogin;
