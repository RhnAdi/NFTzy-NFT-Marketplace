export default function Input({title, required, onChange, type, placeholder, value, ...inputProps}) {
   return(
      <div className="flex flex-col gap-y-2">
         <label htmlFor="title" className="text-lg">{title} { required? <span className="text-red-400">*</span> : null }</label>
            <input 
               placeholder={placeholder} 
               className="px-4 py-2 placeholder-gray-500 text-gray-700 dark:placeholder-gray-500 dark:text-gray-400 rounded bg-gray-50 dark:bg-gray-800/20 outline-none focus:ring-2 ring-blue-800/70 border-2 border-white/50 dark:border-gray-700/10 shadow-sm"
               onChange={onChange} 
               type={type || "text"}
               required={required? true : false}
               id={title}
               value={value}
               { ...inputProps }
            />
      </div>
   )
}