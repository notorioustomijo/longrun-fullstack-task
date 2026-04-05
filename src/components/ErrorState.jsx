export default function ErrorState({ message }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-12 flex flex-col items-center gap-4 w-full max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#FFEDED] flex items-center justify-center">
                    <span className="text-[#CC0000] text-2xl">!</span>
                </div>
                <p className="text-[#001324] font-medium text-lg">Something went wrong</p>
                <p className="text-gray-400 text-sm text-center">{message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-6 py-2 bg-[#0163C6] text-white rounded-lg text-sm cursor-pointer"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}