import { useEffect } from "react";
import { useSearchParams } from "react-router";

const Pagination = ({
  itemsNumber,
  itemsPerPage
}: {
  itemsNumber: number;
  itemsPerPage: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page");

  const paginatedItems = Array.from(
    { length: Math.ceil(itemsNumber / itemsPerPage) },
    (_, i) => i + 1
  );

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  function addQuery(num: number) {
    searchParams.set("page", num.toString());
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center gap-4 justify-center  ">
      {paginatedItems.map((page, index) => (
        <button
          onClick={() => addQuery(index + 1)}
          className={`cursor-pointer px-2 ${
            +currentPage! === index + 1 ? "bg-gray-100" : ""
          } `}
          key={index}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
