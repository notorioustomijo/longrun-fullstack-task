export default function LoadingState() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-12 flex flex-col items-center gap-4 w-full max-w-sm">
                <div className="w-12 h-12 rounded-full border-4 border-[#CFE0FB] border-t-[#0163C6] animate-spin" />
                <p className="text-[#001324] font-medium text-lg">Loading products...</p>
                <p className="text-gray-400 text-sm text-center">Please wait while we fetch your inventory</p>
            </div>
        </div>
    )
}