export default function FileDetails() {
  return (
    <div className=" rounded-2xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <span className=" font-bold text-lg">M</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className=" font-semibold text-lg">Mega Drive</h3>
        <span className=" text-sm">162 Files</span>
      </div>
    </div>
  );
}
