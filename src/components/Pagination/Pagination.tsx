interface PaginationProps {
  currentPage: number;
  totalPage: number;

  onChangePage: (newPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPage,
  onChangePage,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) onChangePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) onChangePage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        className="w-[105px]"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {currentPage}/{totalPage}
      </span>
      <button
        className="w-[105px]"
        onClick={handleNext}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
