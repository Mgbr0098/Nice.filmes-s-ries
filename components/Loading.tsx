export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-red-500 rounded-full"></div>
      </div>
    </div>
  )
}
