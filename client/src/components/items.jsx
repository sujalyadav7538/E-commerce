/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Items = ({ item }) => {

  const scrollTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <Link to={{ pathname: `/product/${item.id}` }} onClick={scrollTop()}>
      <div className="">
        <div className="flex max-w-64 md:min-h-[400px] lg:min-h-[480px] min-w-[100px] flex-col gap-4 m-3 shadow-md  ">
          <img src={item.image} alt="" className="h-[280px] hover:scale-105 object-dontain rounded-md shadow-gray-600 shadow-sm max-lg:h-[200px]" />
          <p className="p-2 md:text-lg sm:text-sm">{item.name}</p>
          <div className="flex gap-2 text-lg p-2">
            <div className="md:text-lg sm:text-sm"> Rs.{item.new_price}</div>
            <div className="line-through font-light md:text-lg sm:text-sm"> {item.old_price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Items;
