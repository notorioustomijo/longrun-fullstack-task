import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import plus from '../assets/plusbtn.svg';
import ProductCard from '../components/ProductCard';
import ProductTable from '../components/ProductTable';
import FilterModal from '../components/FilterModal';
import SortModal from '../components/SortModal';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

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

    if (loading) return <LoadingState />
    if (error) return <ErrorState />

    const activeFilterCount = [
        category,
        minPrice,
        maxPrice,
        stockFilter
    ].filter(Boolean).length;


    return (
        <>
        <title>Product Inventory Application - LongRun HQ Interview Task</title>
        <section className="
            py-8
        ">
            <div className="
                flex
                items-center
                gap-4
                mb-6
            ">
                <h1 className="
                    text-3xl 
                    md:text-4xl 
                    font-semibold 
                    text-[#001324]
                ">
                    Inventory
                </h1>
                <button className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    md:px-4
                    md:py-3
                    bg-[#0163C6]
                    text-[#FAFCFE]
                    rounded
                    cursor-pointer
                ">
                    <img src={plus} className="h-[16px] w-[16px]" />
                    Add Product
                </button>
            </div>
            <div className="
                mb-10
                w-[100%]
                flex
                flex-col
                gap-4
                md:flex-row
                md:justify-between
                items-center
            ">
                <SearchBar 
                    value={search}
                    onChange={setSearch}
                />
                <div className="
                    w-[100%]
                    md:w-[30rem]
                    h-[3rem]
                    flex
                    gap-3
                ">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="
                            bg-white
                            text-[#0163C6]
                            px-4
                            py-3
                            w-[100%]
                            border
                            border-[#0163C6]
                            rounded-lg
                            relative
                            text-[#0163C6]
                            text-sm
                            cursor-pointer
                        "
                    >
                        Filter By {
                            activeFilterCount > 0 && (
                                <span className="
                                    ml-2 
                                    bg-[#0163C6] 
                                    text-white 
                                    text-xs 
                                    rounded-full 
                                    w-5 
                                    h-5 
                                    flex
                                    items-center
                                    justify-center
                                    absolute
                                    top-0
                                    right-0
                                ">
                                    {activeFilterCount}
                                </span>
                            )
                        }
                    </button>
                    <button
                        onClick={() => setIsSortModalOpen(true)}
                        className="
                            bg-white
                            text-[#0163C6]
                            px-4
                            py-3
                            w-[100%]
                            border
                            border-[#0163C6]
                            rounded-lg
                            cursor-pointer
                            text-sm
                        "
                    >
                        {sortBy === 'created_at' && sortOrder === 'desc' 
                            ? 'Sort By' 
                            : `Sort By: ${
                                sortBy === 'created_at' ? 'Date Added'
                                : sortBy === 'stock_quantity' ? 'Stock' 
                                : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} 
                                ${sortOrder === 'asc' ? '↑' : '↓'}`
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
                            cursor-pointer
                        "
                    >
                        View All Products
                    </button>
                </div>
            ): (
                <>
                    {/* Cards - visible on mobile, hidden on md and above */}
                    <div className="
                        grid
                        grid-cols-2
                        max-[600px]:grid-cols-1
                        gap-4
                        md:hidden
                    ">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <ProductTable products={products} />
                </>
            )}

            <Pagination 
                currentPage={currentPage}
                totalPages = {totalPages}
                totalCount={totalCount}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />

        </section>

        {isFilterModalOpen && (
            <FilterModal 
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                category={category} setCategory={setCategory}
                minPrice={minPrice} setMinPrice={setMinPrice}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                stockFilter={stockFilter} setStockFilter={setStockFilter}
            />
        )}
        {isSortModalOpen && (
            <SortModal 
                isOpen={isSortModalOpen}
                onClose={() => setIsSortModalOpen(false)}
                sortBy={sortBy} setSortBy={setSortBy}
                sortOrder={sortOrder} setSortOrder={setSortOrder}
            />
        )}
        </>
    )
}