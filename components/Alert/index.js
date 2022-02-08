export default function Alert ({type, message, notice, onDelete}) {
   return (
      <div className="fixed right-0 z-50 w-full flex items-center justify-center">
         <div className="bg-gray-50 w-80 md:w-96 rounded-lg pl-2 pr-4 py-2 shadow-lg border-2 border-white/50 flex gap-x-2 items-center">
            { type == "success" && <SuccessText notice={notice} /> }
            { type == "danger" && <DangerText notice={notice} /> }
            { type == "warning" && <WarningText notice={notice} /> }
            { type == "info" && <InfoText notice={notice} /> }
            <p className="text-gray-700 flex-grow">{message}</p>
            <button onClick={onDelete} className="text-lg">&#215;</button>
         </div>
      </div>
   )
}

const SuccessText = ({notice}) => {
   return <p className="font-bold text-green-600 bg-green-200 px-2 py-1 rounded">{notice || "Success"}</p>
}
const DangerText = ({notice}) => {
   return <p className="font-bold text-red-600 bg-red-200 px-2 py-1 rounded">{notice || "Danger"}</p>
}
const WarningText = ({notice}) => {
   return <p className="font-bold text-yellow-600 bg-yellow-200 px-2 py-1 rounded">{notice || "Warning"}</p>
}
const InfoText = ({notice}) => {
   return <p className="font-bold text-blue-600 bg-blue-200 px-2 py-1 rounded">{notice || "Info"}</p>
}