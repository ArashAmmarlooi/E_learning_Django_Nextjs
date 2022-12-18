import styles from "@/components/breadcromp/breadcrump.module.scss";
import Link from "next/link";
import IRoutes from "@/types/types";
import { match } from "assert";

const Breadcrump = (props: {
  title: string;
  routes: Array<any>;
  matchRoute: string;
  routerquery: string;
  pathname: string;
}) => {
  const { routes, matchRoute, routerquery, pathname } = props;

  return (
    <>
      <section className={styles.breadCrump}>
        <p>{props.title}</p>
        <span>
          <Link href="/">خانه</Link> /
          {routes.map((x, index) => {
            if (x.path === matchRoute)
              return (
                <Link key={x.id} href={`${x.path}`}>
                  {x.name}
                </Link>
              );
            if (x.path === pathname) {
              return (
                <>
                  <Link key={x.id} href={`${x.path.slice(0, -7)}s`}>
                    {x.name}
                  </Link>{" "}
                  /{routerquery}
                </>
              );
            }
          })}
        </span>
      </section>
    </>
  );
};

export default Breadcrump;
