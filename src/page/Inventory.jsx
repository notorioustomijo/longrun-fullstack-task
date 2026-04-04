import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from('inventory').select('*')

            if (error) {
                setError(error.message)
            } else {
                setProducts(data)
            }

            setLoading(false)
        }

        fetchProducts()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

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
                    placeholder="Product name"
                />
                <div>
                    <button>Filter By</button>
                    <button>Sort By</button>
                </div>
            </div>

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
                            <span>{product.quantity} units</span>
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
        </section>
        </>
    )
}