import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { AppStore, makeStore } from "../../store/store";
import { wrapper } from "../../store/store";
import { routes } from "@/utils/javascript";
import styles from "./course.module.scss";
import Note from "@/assets/note.svg";
import Scoreboard from "@/assets/scoreboard.svg";
import Category from "@/assets/category.svg";
import Avatar from "@/assets/avatar.svg";
import Download from "@/assets/download.svg";

import {
  eLearningApi,
  getCourse,
  getCourseByName,
  getRunningOperationPromises,
} from "src/services/service";
import Breadcrump from "@/components/breadcromp/breadcrump";
import courseSlice from "src/store/slice/courseSlice";

export async function getStaticPaths() {
  const store = makeStore();

  await store.dispatch(getCourse.initiate());
  const course = eLearningApi.endpoints.getCourse.select()(store.getState());
  const paths = course.data.map((course: any) => ({
    params: { slug: course.slug.toString() },
  }));
  console.log(paths, "paths");

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const course = await store.dispatch(
        getCourseByName.initiate(params.slug.toString())
      );
      await Promise.all(getRunningOperationPromises());
      return {
        props: { course },
      };
    }
);

const Coursedetail = ({ course }) => {
  const router = useRouter();
  const matchRoute = router.asPath;
  const pathname = router.pathname.toString();

  const routerquery =
    router.query.slug !== undefined && router.query.slug.toString();

  return (
    <>
      <Breadcrump
        title={` دوره ${course.data[0].title}`}
        routes={routes}
        matchRoute={matchRoute}
        routerquery={routerquery}
        pathname={pathname}
      />
      <br />
      <br />
      <main className={styles.mainContainer}>
        <section className={styles.coursecontainer}>
          <div className={styles.imageContainer}>
            <Image src={course.data[0].image} alt="user cover image" fill />
          </div>
          <div className={styles.courseTitle}>{course.data[0].title}</div>
          <div className={styles.courseDesc}>{course.data[0].desc}</div>
        </section>

        <section className={styles.priceSpecContainer}>
          <div className={styles.priceContainer}>
            <div>خرید دوره</div>
            <div>قیمت : {course.data[0].price} تومان</div>
            <div> افزودن به سبد خرید</div>
          </div>

          <div className={styles.courseSpecContainer}>
            <div>مشخصات دوره</div>
            <div className={styles.specparag}>
              <span>
                <Image
                  src={Scoreboard}
                  alt="Scoreboard"
                  width={20}
                  height={20}
                />
              </span>
              <span>امتیاز : {course.data[0].score}</span>
            </div>
            <div className={styles.specparag}>
              <span>
                <Image src={Avatar} alt="Avatar" width={20} height={20} />
              </span>
              <span>تعداد نظر : {course.data[0].review}</span>
            </div>
            <div className={styles.specparag}>
              <span>
                <Image src={Note} alt="Note" width={20} height={20} />
              </span>
              <span>بیش نیاز : {course.data[0].prerequisite}</span>
            </div>
            <div className={styles.specparag}>
              <span>
                <Image src={Category} alt="Category" width={20} height={20} />
              </span>
              <span>دسته بندی : {course.data[0].category}</span>
            </div>
            <div className={styles.specparag}>
              <span>
                <Image src={Download} alt="Download" width={20} height={20} />
              </span>
              <span>تعداد خرید : {course.data[0].coursedownload}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Coursedetail;
