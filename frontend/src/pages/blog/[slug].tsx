import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
// import { Blog } from "@/types/types";
import Link from "next/link";
import { makeStore } from "../../store/store";
import { wrapper } from "../../store/store";
import { routes } from "@/utils/javascript";
import styles from "./blog.module.scss";
import {
  eLearningApi,
  getBlogByName,
  getBlog,
  getCourse,
  getRunningOperationPromises,
} from "src/services/service";
import Breadcrump from "@/components/breadcromp/breadcrump";
import courseSlice from "src/store/slice/courseSlice";

export async function getStaticPaths() {
  const store = makeStore();

  await store.dispatch(getBlog.initiate());
  const blogs = eLearningApi.endpoints.getBlog.select()(store.getState());
  const paths = blogs.data.map((item: any) => ({
    params: { slug: item.id.toString() },
  }));
  console.log(paths, "paths");

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      console.log(params, "params");
      const courses = await store.dispatch(getCourse.initiate());

      const blog = await store.dispatch(
        getBlogByName.initiate(params.slug.toString())
      );
      await Promise.all(getRunningOperationPromises());
      console.log(blog.data, "blog");

      return {
        props: { blog, courses },
      };
    }
);

const Blog: NextPage = ({ blog, courses }: any) => {
  const router = useRouter();
  const matchRoute = router.asPath;
  const routerquery =
    router.query.slug !== undefined && router.query.slug.toString();
  const pathname = router.pathname.toString();

  return (
    <>
      <Breadcrump
        title={`${blog.data[0].title}`}
        routes={routes}
        matchRoute={matchRoute}
        routerquery={routerquery}
        pathname={pathname}
      />
      <br />
      <br />
      <main className={styles.mainContainer}>
        <section className={styles.blogsContainer}>
          <div className={styles.blogContent}>
            <div className={styles.imageContainer}>
              <Image
                src={blog.data[0].image}
                alt="Picture of the blog"
                width={310}
                height={150}
              />
            </div>

            <div className={styles.blogSpesc}>
              <span>تعداد نظر : {blog.data[0].review}</span>
              <span> امتیاز : {blog.data[0].score}</span>
              <span>تاریخ انتشار : {blog.data[0].created_at}</span>
            </div>
            <h1>{blog.data[0].title}</h1>
            <p>{blog.data[0].desc}</p>
          </div>
        </section>

        <section className={styles.courseSpecContainer}>
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
        </section>
      </main>
    </>
  );
};

export default Blog;
