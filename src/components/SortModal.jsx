import closeIcon from '../assets/closebtn.svg';

export default function SortModal({ 
    isOpen, 
    onClose, 
    sortBy, setSortBy,
    sortOrder, setSortOrder
}) {
    if (!isOpen) return null

    return (
        <div
            onClick={onClose} 
            className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            "
        >
            <div
                onClick={e => e.stopPropagation()}
                className="
                    bg-white
                    rounded-2xl
                    p-6
                    w-full
                    max-w-md
                    mx-4
                    flex
                    flex-col
                    gap-12
                "
            >
                <div className="
                    flex
                    justify-between
                    items-center
                ">
                    <h2 className="
                        font-medium
                        text-[1.5rem]
                    ">
                        Sort Products
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <img src={closeIcon} className="h-[24px] w-[24px]" />
                    </button>
                </div>

                {/* Sort By */}
                <div className="
                    flex
                    flex-col
                    gap-2
                ">
                    <label className="
                        font-medium
                        text-sm
                    ">
                        Sort By
                    </label>
                    <div className="
                        flex
                        gap-1
                        flex-wrap
                    ">
                        {
                            [
                                {label: 'Name', value: 'name' },
                                { label: 'Price', value: 'price' },
                                { label: 'Stock Quantity', value: 'stock_quantity' },
                                { label: 'Date Added', value: 'created_at'}
                            ].map(option => (
                                <button 
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={
                                        `px-4
                                            py-2
                                            rounded-3xl
                                            border
                                            text-sm
                                            text-left
                                            cursor-pointer
                                            ${sortBy === option.value ? 'border-[#0163C6] bg-[#F1F8FE] text-[#0163C6]' : ''}
                                        `
                                    }
                                >
                                    {option.label}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* Sort Order */}
                <div className="
                    flex
                    flex-col
                    gap-2
                ">
                    <label className="
                        text-sm
                        font-medium
                    ">
                        Order
                    </label>
                    <div className="
                        flex
                        gap-2
                    ">
                        <button
                            onClick={() => setSortOrder('asc')}
                            className={
                                `px-4
                                    py-2
                                    rounded-3xl
                                    border
                                    text-sm
                                    w-full
                                    cursor-pointer
                                    ${sortOrder === 'asc' ? 'border-[#0163C6] bg-[#F1F8FE] text-[#0163C6]' : '' }
                                `
                            }
                        >
                            Ascending
                        </button>
                        <button
                            onClick={() => setSortOrder('desc')}
                            className={
                                `px-4
                                    py-2
                                    rounded-3xl
                                    border
                                    text-sm
                                    w-full
                                    cursor-pointer
                                    ${sortOrder === 'desc' ? 'border-[#0163C6] bg-[#F1F8FE] text-[#0163C6]' : '' }
                                `
                            }
                        >
                            Descending
                        </button>
                    </div>
                </div>

                <div className="
                    flex
                    gap-2
                ">
                    <button
                        onClick={() => {
                            setSortBy('created_at')
                            setSortOrder('desc')
                        }}
                        className="
                            w-full
                            border
                            border-[#0163C6]
                            rounded-lg
                            py-2
                            text-base
                            text-[#0163C6]
                            cursor-pointer
                        "
                    >
                        Clear Sort
                    </button>
                    <button
                        onClick={onClose}
                        className="
                            w-full
                            bg-[#0163C6]
                            text-[#FAFCFE]
                            rounded-lg
                            py-2
                            text-base
                            cursor-pointer
                        "
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}