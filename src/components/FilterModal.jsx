import closeIcon from '../assets/closebtn.svg';

export default function FilterModal({ 
    isOpen, 
    onClose, 
    category, setCategory,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    stockFilter, setStockFilter
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
                        Filter Products
                    </h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <img src={closeIcon} className="h-[24px] w-[24px]" />
                    </button>
                </div>

                <div className="
                    flex 
                    flex-col
                    gap-2
                ">
                    <label className="
                        text-sm
                        font-medium
                    ">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="
                            border
                            rounded-lg
                            px-3
                            py-3
                            text-sm
                        "
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home & Garden">Home & Garden</option>
                        <option value="Sports">Sports</option>
                        <option value="Books">Books</option>
                    </select>
                </div>

                <div className="
                    flex
                    flex-col
                    gap-2
                ">
                    <label className="
                        text-sm
                        font-medium
                    ">
                        Price Range
                    </label>
                    <div className="
                        flex
                        gap-2
                        items-center
                    ">
                        <input 
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={e => setMinPrice(e.target.value)}
                            className="
                                border
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                w-full
                            "
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                            className="
                                border
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                w-full
                            "
                        />
                    </div>
                </div>

                <div className="
                    flex
                    flex-col
                    gap-2
                ">
                    <label className="text-sm font-medium">
                        Stock Availability
                    </label>
                    <div className="
                        flex
                        gap-1
                    ">
                        <button
                            onClick={() => setStockFilter(stockFilter === 'in_stock' ? '' : 'in_stock')}
                            className={`px-4 py-2 rounded-3xl border text-sm cursor-pointer ${stockFilter === 'in_stock' ? 'bg-[#F1F8FE] border-[#0163C6] text-[#0163C6]' : ''}`}
                        >
                            In Stock
                        </button>
                        <button
                            onClick={() => setStockFilter(stockFilter === 'out_of_stock' ? '' : 'out_of_stock')}
                            className={`px-4 py-2 rounded-3xl border text-sm cursor-pointer ${stockFilter === 'out_of_stock' ? 'bg-[#F1F8FE] border-[#0163C6] text-[#0163C6]' : ''}`}
                        >
                            Out of Stock
                        </button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setCategory('')
                            setMinPrice('')
                            setMaxPrice('')
                            setStockFilter('')
                        }}
                        className="
                            w-full
                            border
                            border-[#0163C6]
                            text-[#0163C6]
                            rounded-lg
                            py-2
                            text-base
                            font-medium
                            cursor-pointer
                        "
                    >
                        Clear Filters
                    </button>
                    <button
                        onClick={onClose}
                        className="
                            w-full
                            text-white
                            rounded-lg
                            py-2
                            text-base
                            font-medium
                            text-[#FAFCFE]
                            bg-[#0163C6]
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