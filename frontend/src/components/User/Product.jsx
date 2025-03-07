/* eslint-disable react/prop-types */


export default function Product({ name, category, brand, description }) {
    
    return(
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-2xl bg-white border">
        <div className="mb-4">
            <h2 className="text-2xl font-bold">
                {name}
            </h2>
        </div>
        <div>
            <p className="text-sm">
                {category}
            </p>
        </div>
        <div className="pt-5">
            <p className="text-xl">
                {brand}
            </p>
        </div>
        <div className="pt-3">
            <p className="text-gray-600 text-lg">
                {description}
            </p>
        </div>
      
    </div>
    )
}