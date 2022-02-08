const TransferButton = ({onClick}) => {
   return (
      <button className="my-4 bg-blue-600 flex items-center gap-x-3 rounded-lg flex flex-row justify-center items-center h-min py-3 w-full" onClick={onClick}>
         <p className="text-lg font-bold">Transfer</p>
      </button>
   )

}

export default TransferButton;