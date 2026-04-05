import editBtn from '../assets/edit-btn.svg';
import deleteBtn from '../assets/delete-btn.svg';

export default function ProductCard({ product }) {

    return (
        <div className="
            bg-white
            rounded-lg
            p-6
            flex
            flex-col
            gap-6
            shadow-[0_4px_14px_rgba(0,0,0,0.08)]
            w-[15.625rem]
            max-[670px]:w-[13.8rem]
            max-[600px]:w-full
        ">
            <div className="
                flex
                flex-col
                gap-1
            ">
                <h2 className="
                    font-semibold
                    text-[#001324]
                    text-[1.125rem]
                ">
                    {product.name}
                </h2>
                <p className="
                    text-[#40474D]
                    text-base
                ">
                    {product.category}
                </p>
            </div>
            <span className={`
                px-2
                py-2
                rounded
                text-sm
                font-medium
                w-[6.75rem]
                text-center
                ${product.stock_quantity > 0
                    ? 'bg-[#8BF6B2] text-[#006425]'
                    : 'bg-[#F88484] text-[#4E0303]'
                }    
            `}>
                {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <div className="
                flex
                items-center
                gap-2
            ">
                <span className="text-base text-[#001324] font-semibold">${product.price}</span>
                <span className="text-base text-[#40474D]">•</span>
                <span className="text-base text-[#40474D]">{product.stock_quantity} units</span>
            </div>
            <div className="
                flex
                gap-10
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
            </div>
        </div>
    )
}