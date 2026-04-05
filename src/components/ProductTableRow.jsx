import editBtn from '../assets/edit-btn.svg';
import deleteBtn from '../assets/delete-btn.svg';

export default function ProductTableRow({ product }) {
    return (
        <tr className="border-b-2 border-[#F3F8FD]">
            <td className="px-4 py-4">{product.name}</td>
            <td className="px-4 py-4">{product.category}</td>
            <td className="px-4 py-4">${product.price}</td>
            <td className="px-4 py-4">{product.stock_quantity}</td>
            <td className="px-4 py-4">
                <span className={`
                    px-2
                    py-2
                    rounded
                    text-sm
                    font-medium
                    w-[6.75rem]
                    text-center
                    whitespace-nowrap
                    ${product.stock_quantity > 0
                        ? 'bg-[#8BF6B2] text-[#006425]'
                        : 'bg-[#F88484] text-[#4E0303]'
                    }    
                `}>
                    {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </td>
            <td className="
                flex
                gap-10
                px-4
                py-4
            ">
                <button className="
                    bg-transparent
                    flex
                    items-center
                    justify-center
                    h-[2.5rem]
                    w-[2.5rem]
                    rounded
                    cursor-pointer
                ">
                    <img src={editBtn} 
                        className="
                        h-[1.5rem] 
                        w-[1.5rem]
                    " 
                    />
                </button>
                <button className="
                    bg-transparent
                    flex
                    items-center
                    justify-center
                    h-[2.5rem]
                    w-[2.5rem]
                    rounded
                    cursor-pointer
                ">
                    <img src={deleteBtn} 
                        className="
                        h-[1.5rem] 
                        w-[1.5rem]
                    " 
                    />
                </button>
            </td>
        </tr>
    )
}