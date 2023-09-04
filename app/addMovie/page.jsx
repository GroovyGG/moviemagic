export default function addMovie() {
    return (
        <form className="flex flex-col gap-3">
            <input 
                className = 'border border-slate-200 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="text" 
                placeholder="Movie Title"
            />  
            <input 
                className = 'border border-slate-200 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="text" 
                placeholder="Movie Description"
            />  
            <button 
                className = 'bg-slate-600 hover:bg-slate-500 font-semibold text-white py-2 px-5 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400'>
                    Add Movie
            </button>
        </form>
    )
}
