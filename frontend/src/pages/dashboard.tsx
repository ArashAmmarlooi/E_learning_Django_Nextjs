import { useSelector } from "react-redux";
import {
  eLearningApi,
} from "src/services/service";

const Dashboard = () => {
  const {data: categories} = useSelector(eLearningApi.endpoints.getCategory.select());
  console.log(categories,'dashboard category');
  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
