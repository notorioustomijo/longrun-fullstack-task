import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 10;

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [stockFilter, setStockFilter] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {

            const fromRow = (currentPage - 1) * ITEMS_PER_PAGE;
            const toRow = fromRow + ITEMS_PER_PAGE - 1;

            let query = supabase
                .from('inventory')
                .select('*', { count: 'exact' })

            // Search by name
            if (search) {
                query = query.ilike('name', `%${search}%`)
            }

            // Filter by category
            if (category) {
                query = query.eq('category', category)
            }

            // Filter by min price
            if (minPrice) {
                query = query.gte('price', minPrice)
            }

            // Filter by max price
            if (maxPrice) {
                query = query.lte('price', maxPrice)
            }

            // Filter by stock
            if (stockFilter === 'in_stock') {
                query = query.gt('stock_quantity', 0)
            } else if (stockFilter === 'out_of_stock') {
                query = query.eq('stock_quantity', 0)
            }

            query = query.order(sortBy, { ascending: sortOrder === 'asc' });

            // Apply pagination last
            query = query.range(fromRow, toRow);

            const { data, error, count} = await query;

            if (error) {
                setError(error.message)
            } else {
                setProducts(data)
                setTotalCount(count)
            }

            setLoading(false)
        }

        fetchProducts()
    }, [currentPage, search, category, minPrice, maxPrice, stockFilter, sortBy, sortOrder])

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, minPrice, maxPrice, stockFilter, sortBy, sortOrder])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const activeFilterCount = [
        category,
        minPrice,
        maxPrice,
        stockFilter
    ].filter(Boolean).length;


    return (
        <>
        <title>Product Inventory Application - LongRun HQ Interview Task</title>
        <section>
            <div>
                <h1>Inventory</h1>
                <button>Add Product</button>
            </div>
            <div>
                <input 
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    placeholder="Product name"
                    onChange={e => setSearch(e.target.value)}
                />
                <div>
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                    >
                        Filter By {
                            activeFilterCount > 0 && (
                                <span className="
                                    ml-2 
                                    bg-black 
                                    text-white 
                                    text-xs 
                                    rounded-full 
                                    w-5 
                                    h-5 
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    {activeFilterCount}
                                </span>
                            )
                        }
                    </button>
                    <button
                        onClick={() => setIsSortModalOpen(true)}
                    >
                        {sortBy === 'created_at' && sortOrder === 'desc' 
                            ? 'Sort By' 
                            : `Sort By: ${
                                sortBy === 'created_at' ? 'Date Added'
                                : sortBy === 'stock_quantity' ? 'Stock' 
                                : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} 
                                ${sortOrder === 'asc' ? '⬆️' : '⬇️'}`
                            }
                    </button>
                </div>
            </div>

            

            {products.length === 0 && !loading ? (
                <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    py-16
                    gap-3
                ">
                    <p className="
                        text-lg
                        font-medium
                    ">
                        No products found
                    </p>
                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        Try adjusting your search or filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearch('')
                            setCategory('')
                            setMinPrice('')
                            setMaxPrice('')
                            setStockFilter('')
                        }}
                        className="
                            px-4
                            py-2
                            border
                            rounded-lg
                            text-sm
                            mt-2
                        "
                    >
                        View All Products
                    </button>
                </div>
            ): (
                <>
                
                    {/* Cards - visible on mobile, hidden on md and above */}
                    <div className="
                        flex
                        flex-col
                        gap-4
                        md:hidden
                    ">
                        {products.map(product => (
                            <div className="
                                border
                                border-gray-200
                                rounded-xl
                                p-4
                                flex
                                flex-col
                                gap-2
                            ">
                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                ">
                                    <h2 className="
                                        font-medium
                                    ">
                                        {product.name}
                                    </h2>
                                    <span>{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {product.category}
                                </p>
                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                ">
                                    <span>${product.price}</span>
                                    <span>{product.stock_quantity} units</span>
                                </div>
                                <div className="
                                    flex
                                    gap-2
                                ">
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="
                        hidden 
                        md:table 
                        w-full
                    ">
                        <tr>
                            <th>PRODUCTS</th>
                            <th>CATEGORY</th>
                            <th>PRICE</th>
                            <th>STOCK</th>
                            <th>STATUS</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {products.map(product => (
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.stock_quantity}</td>
                                <td>{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    
                    </table>
                </>
            )}

            <div className="
                flex
                items-center
                justify-between
                mt-4
            ">
                <p className="
                    text-sm
                    text-gray-500
                ">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} products
                </p>
                <div>
                    <button 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
        {isFilterModalOpen && (
            <div 
                onClick={() => setIsFilterModalOpen(false)}
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
                        gap-6
                    "
                >
                    <div className="
                        flex
                        justify-between
                        items-center
                    ">
                        <h2 className="
                            font-medium
                            text-lg
                        ">
                            Filter Products
                        </h2>
                        <button onClick={() => setIsFilterModalOpen(false)}>
                            x
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
                                py-2
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
                            gap-2
                        ">
                            <button
                                onClick={() => setStockFilter(stockFilter === 'in_stock' ? '' : 'in_stock')}
                                className={`px-4 py-2 rounded-lg border text-sm ${stockFilter === 'in_stock' ? 'bg-black text-white border-black' : ''}`}
                            >
                                In Stock
                            </button>
                            <button
                                onClick={() => setStockFilter(stockFilter === 'out_of_stock' ? '' : 'out_of_stock')}
                                className={`px-4 py-2 rounded-lg border text-sm ${stockFilter === 'out_of_stock' ? 'bg-black text-white border-black' : ''}`}
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
                                rounded-lg
                                py-2
                                text-sm
                            "
                        >
                            Clear Filters
                        </button>
                        <button
                            onClick={() => setIsFilterModalOpen(false)}
                            className="
                                w-full
                                bg-black
                                text-white
                                rounded-lg
                                py-2
                                text-sm
                            "
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        )}
        {isSortModalOpen && (
            <div
               onClick={() => setIsSortModalOpen(false)} 
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
                        gap-6
                    "
                >
                    <div className="
                        flex
                        justify-between
                        items-center
                    ">
                        <h2 className="
                            font-medium
                            text-lg
                        ">
                            Sort Products
                        </h2>
                        <button
                            onClick={() => setIsSortModalOpen(false)}
                        >
                            x
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
                        <div>
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
                                             rounded-lg
                                             border
                                             text-sm
                                             text-left
                                             ${sortBy === option.value ? 'bg-black text-white border-black' : ''}
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
                                     rounded-lg
                                     border
                                     text-sm
                                     w-full
                                     ${sortOrder === 'asc' ? 'bg-black text-white border-black' : '' }
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
                                     rounded-lg
                                     border
                                     text-sm
                                     w-full
                                     ${sortOrder === 'desc' ? 'bg-black text-white border-black' : '' }
                                    `
                                }
                            >
                                Descending
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => {
                                setSortBy('created_at')
                                setSortOrder('desc')
                            }}
                            className="
                                w-full
                                border
                                rounded-lg
                                py-2
                                text-sm
                            "
                        >
                            Clear Sort
                        </button>
                        <button
                            onClick={() => setIsSortModalOpen(false)}
                            className="
                                w-full
                                bg-black
                                text-white
                                rounded-lg
                                py-2
                                text-sm
                            "
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}