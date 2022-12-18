import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrump from "@/components/breadcromp/breadcrump";
import { routes } from "@/utils/javascript";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { AppStore, makeStore, wrapper } from "../store/store";
import {
  eLearningApi,
  getCourse,
  getCourseByName,
  getBlog,
  getRunningOperationPromises,
} from "src/services/service";
import { Blog } from "@/types/types";
import styles from "@/styles/pages/blogs.module.scss";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const courses = await store.dispatch(getCourse.initiate());
    const blogs = await store.dispatch(getBlog.initiate());
    await Promise.all(getRunningOperationPromises());
    return {
      props: { courses, blogs },
    };
  }
);

const Blogs: NextPage = ({ courses, blogs }: Blog) => {
  const router = useRouter();
  const matchRoute = router.asPath;
  const pathname = router.pathname.toString();
  const routerquery =
    router.query.slug !== undefined && router.query.slug.toString();
  return (
    <>
      <Breadcrump
        title={`وب لاگ`}
        routes={routes}
        matchRoute={matchRoute}
        routerquery={routerquery}
        pathname={pathname}
      />
      <br />
      <br />
      <main className={styles.mainContainer}>
        <section className={styles.blogsContainer}>
          {blogs.data.map((item: any, index: any) => (
            <div className={styles.blogContent}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt="Picture of the blog"
                  width={310}
                  height={150}
                />
              </div>

              <div className={styles.blogSpesc}>
                <span>تعداد نظر : {item.review}</span>
                <span> امتیاز : {item.score}</span>
                <span>تاریخ انتشار : {item.created_at}</span>
              </div>
              <h1>{item.title}</h1>
              <p>{item.desc.substring(0, 300) + "..."}</p>
              <button
                type="button"
                onClick={() =>
                  router.push({
                    pathname: "/blog/[slug]",
                    query: { slug: item.slug },
                  })
                }
                className={styles.blogBtn}
              >
                ادامه مطلب
              </button>
            </div>
          ))}
        </section>

        <div className={styles.courseSpecContainer}>
          <div className={styles.courseContainer}>
            <div className={styles.courseContainerTitle}>دوره های کلی </div>
            {courses.data.map((item: any, index: any) => (
              <Link
                href={{
                  pathname: "/course/[slug]",
                  query: { slug: item.slug },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.courseContent}>
                  <div className={styles.courseImgCont}>
                    <Image src={item.image} alt="Picture of the course" fill />
                  </div>
                  <span>
                    <p>{item.title}</p>
                    <div>
                      <p>امتیاز : {item.score}</p>
                      <p>نظر : {item.review}</p>
                    </div>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Blogs;
