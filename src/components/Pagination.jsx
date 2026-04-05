export default function Pagination({ 
    currentPage, 
    totalPages,
    totalCount,
    itemsPerPage,
    onPageChange
}) {

    return (
        <div className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
            mt-8
            w-[100%]
        ">
            <p className="
                text-base
                text-gray-500
            ">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} products
            </p>
            <div className="
                flex
                justify-end
                items-center
                gap-4
                w-[60%]
            ">
                <button 
                    onClick={() => onPageChange(prev => prev - 1)}
                    disabled={currentPage === 1}
                    className="
                        bg-white
                        text-[#0163C6]
                        px-4
                        py-2
                        w-[35%]
                        border
                        border-[#0163C6]
                        rounded-lg
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        text-center
                        cursor-pointer
                    "
                >
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="
                        bg-white
                        text-[#0163C6]
                        px-4
                        py-2
                        w-[35%]
                        border
                        border-[#0163C6]
                        rounded-lg
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        text-center
                        cursor-pointer
                    "
                >
                    Next
                </button>
            </div>
        </div>
    )
}