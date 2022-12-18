import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Category, Course, Blog } from "@/types/types";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { routes } from "@/utils/javascript";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import {
  eLearningApi,
  getCourse,
  getCategory,
  getBlog,
  getRunningOperationPromises,
} from "src/services/service";
import Breadcrump from "@/components/breadcromp/breadcrump";
import styles from "@/styles/pages/course.module.scss";

type CocGAny = Category & Course;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const category = await store.dispatch(getCategory.initiate());
    // const category = eLearningApi.endpoints.getCategory.select()(
    //   store.getState()
    // );
    const course = await store.dispatch(getCourse.initiate());
    // const course = eLearningApi.endpoints.getCourse.select()(store.getState());
    // const category = store.dispatch(getCategory.initiate());
    // const course = store.dispatch(getCourse.initiate());
    // const blog = store.dispatch(getBlog.initiate());
    // const { data: Category } = eLearningApi.endpoints.getCategory.select()(
    //   store.getState()
    // );

    await Promise.all(getRunningOperationPromises());

    return {
      props: { category, course },
    };
  }
);

const tabContainer = (item: any) => (
  <>
    <div className={styles.imgCont}>
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

const Courses: NextPage = ({ category, course }: CocGAny) => {
  const router = useRouter();
  const matchRoute = router.asPath;
  const routerquery =
    router.query.slug !== undefined && router.query.slug.toString();
  const pathname = router.pathname.toString();
  const {
    data: categoryData,
    isError: catError,
    isLoading: catLoading,
  } = category;
  const { data: courseData, isError: couError, isLoading: couLoading } = course;
  return (
    <>
      <Breadcrump
        title="دوره های کلی"
        routes={routes}
        matchRoute={matchRoute}
        routerquery={routerquery}
        pathname={pathname}
      />
      <br />
      <br />

      <section>
        {catLoading && <p>در حال بارگذاری</p>}

        {categoryData !== undefined &&
          categoryData.map((catitem: any, index: Number) => {
            return (
              <div key={catitem.id} className={styles.courseContainer}>
                <p className={styles.titleParag}>{catitem.title}</p>
                <div key={catitem.id} className={styles.cardContainer}>
                  {couLoading && <p>در حال بارگذاری</p>}
                  {courseData.length !== 0 &&
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
                            <div key={coitem.id} className={styles.courseCard}>
                              {tabContainer(coitem)}
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Courses;
