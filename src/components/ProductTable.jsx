import ProductTableRow from "./ProductTableRow"

export default function ProductTable({ products }) {

    return (
        <table className="
            hidden 
            md:table 
            w-full
            bg-white
        ">
            <tr className="
                bg-[#CFE0FB] 
                text-[#01317D]
                text-sm
                font-medium
                tracking-[10%]
                text-left
            ">
                <th className="py-4 px-4">PRODUCTS</th>
                <th className="py-4 px-4">CATEGORY</th>
                <th className="py-4 px-4">PRICE</th>
                <th className="py-4 px-4">STOCK</th>
                <th className="py-4 px-4 whitespace-nowrap">STATUS</th>
                <th className="py-4 px-4"></th>
            </tr>
            {products.map(product => (
                <ProductTableRow product={product} />
            ))}
        
        </table>

    )
}