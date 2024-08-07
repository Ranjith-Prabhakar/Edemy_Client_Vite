// import { ICategory } from '../../redux/interfaces/Course/getCategories';
import { Link } from 'react-router-dom';
import Courses from './Courses';

// type Props = {
//   categoryList: ICategory[];
// };
// {categoryList}: Props)
const Brand = () => {
  return (
    <div className="flex justify-between items-end 1200px:flex-3 ">
      <Link to={"/"}>
        <h1 className="text-sm 400px:text-2xl font-bold italic ">
          <span className="text-2xl 400px:text-4xl">E</span>demy
        </h1>
      </Link>
      <Courses />
    </div>
  );
};

export default Brand