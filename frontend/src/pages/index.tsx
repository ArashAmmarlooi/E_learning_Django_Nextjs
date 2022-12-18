import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux"
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { useGetCategoryQuery } from "../services/service";
import {
  eLearningApi,
  getCourse,
  getCategory,
  getBlog,
  getRunningOperationPromises,
} from "src/services/service";
import { Category, Course, Blog } from "@/types/types";
import Head from "next/head";
import { API_URL } from "@/config/index";
import { tabmenu } from "@/utils/javascript";
import styles from "@/styles/pages/home.module.scss";
import HeaderImg from "@/assets/undraw_online_ad_re_ol62.svg";

let tabItem: NodeListOf<Element>;
let tabContent: NodeListOf<Element>;

type CocGAny = Category & Course & Blog;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getCategory.initiate());
    const category = eLearningApi.endpoints.getCategory.select()(
      store.getState()
    );
    const course = await store.dispatch(getCourse.initiate());
    //  = eLearningApi.endpoints.getCourse.select()(store.getState());
    const blog = await store.dispatch(getBlog.initiate());

    await Promise.all(getRunningOperationPromises());

    return {
      props: { category, course, blog },
    };
  }
);

const tabContainer = (item: any) => (
  <>
    <div className={styles.imgTabCont}>
      <Image
        // loader={Head}
        src={item.image}
        alt="user cover image"
        fill
      />
    </div>

    <div className={styles.specCont}>
      <p>نام دوره : ‌{item.title}</p>
      <p>امتیاز : ‌{item.score}</p>
      <p>نظر : ‌{item.review}</p>
      <p>تعداد دوره : {item.courselentgh}</p>
    </div>
  </>
);

const Home: NextPage = ({ category, course, blog }: CocGAny) => {
  const router = useRouter();

  const {
    data: categoryData,
    isError: catError,
    isLoading: catLoading,
  } = category;
  const { data: courseData, isError: couError, isLoading: couLoading } = course;
  const { data: blogData, isError: blgError, isLoading: blgLoading } = blog;

  useEffect(() => {
    tabItem = document.querySelectorAll("#tabmenu p");
    tabContent = document.querySelectorAll("#tabContent");
    if (categoryData !== undefined) tabItem[0].classList.add("menuActive");
    if (courseData !== undefined) tabContent[0].classList.add("contentActive");
  });

  // console.log(category, "category client");
  // console.log(course, "course client");
  // console.log(blog, "blog ");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.imgContainer}>
          <div className={styles.imgContent}>
            <Image src={HeaderImg} alt="Picture of the author" fill />
          </div>
        </div>

        <div className={styles.titleCont}>
          <div className={styles.paragHeader}>
            <p>
              با دوره های جامع دیجیتال مارکتینگ از خونه کسب درامد میلیونی داشته
              باش
            </p>
            <p>اینجا بهترین مرجع آموزشی دوره های رسانه ای در ایرانه</p>
          </div>
        </div>
      </header>

      <br />
      <br />
      <br />

      <main className={styles.mainCont}>
        <h3>
          !با فراگیری دوره های جامع دیجیتال مارکتینگ به راحتی توی خونه درآمد
          داشته باش و دیگه نیازی به کار سخت در شرکت ها و مجموعه ها نداری چطوری
          ؟‌ برو ادامه مطلب
        </h3>

        <section>
          <div className={styles.tabmenu} id="tabmenu">
            {catLoading && <p>در حال بارگذاری</p>}
            {categoryData !== undefined ?
              categoryData.map((item: any, index: Number) => (
                <p
                  onClick={() => tabmenu(tabItem, tabContent, index)}
                  key={item.id}
                >
                  {item.title}
                </p>
              )) : <div>در حا بازگذاری</div>}
          </div>
          <br />

          <div className={styles.tabCont}>
            {catLoading && <p>در حال بارگذاری</p>}

            {categoryData !== undefined ?
              categoryData.map((catitem: any, index: Number) => {
                return (
                  <div
                    key={catitem.id}
                    id="tabContent"
                    className={styles.tabContent}
                  >
                    <div key={catitem.id} className={styles.descCont}>
                      <p>{catitem.desc}</p>
                      <div className={styles.cardCont}>
                        {couLoading && <p>در حال بارگذاری</p>}
                        {courseData !== undefined ?
                          courseData.map((coitem: any, index: any) => (
                            <div key={coitem.id}>
                              {catitem.title === coitem.category && (
                                <Link
                                  href={{
                                    pathname: "course/[slug]",
                                    query: { slug: coitem.slug },
                                  }}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div
                                    key={coitem.id}
                                    className={styles.tabCard}
                                  >
                                    {tabContainer(coitem)}
                                  </div>
                                </Link>
                              )}
                            </div>
                          )) : <div>در حال بارگذاری...</div>}
                      </div>
                    </div>
                  </div>
                )
              }) : <div>در حال بارگذاری...</div>}
          </div>
        </section>

        <br />
        <br />
        <br />
        <br />

        <section className={styles.blogCont}>
          <h3>مطالب مفید جهت فراگیری محتواهای رسا نه ای وبلاگ </h3>
          <br />
          <br />
          <div className={styles.cardCont}>
            {blgLoading && <p>در حال بارگذاری</p>}
            {blogData !== undefined  ?
              blogData.map((item: any, index: Number) => (
                <div key={item.id} className={styles.blogcard}>
                  <div className={styles.blogCardImg}>
                    <Image
                      src={item.image}
                      alt="Picture of the blog"
                      width={310}
                      height={150}
                    />
                  </div>
                  <div className={styles.blogCardContent}>
                    <h3>{item.title}</h3>
                    <p id="blogParag">{item.desc.substring(0, 160) + "..."}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      router.push({
                        pathname: "/blog/[slug]",
                        query: { slug: item.slug },
                      })
                    }
                  >
                    بیشتر بخوانید
                  </button>
                </div>
              )): <div>در حال بارگذاری...</div>}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
