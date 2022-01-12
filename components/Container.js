export default function Container(props){
   return(
      <div className="lg:pl-72 md:px-10 pl-3 pr-3 pt-20 md:pt-24 lg:pt-28">
         { props.children }
      </div>
   )
}