module.exports = (address) => {
   const length = address.length;
   const fourFirst = address.slice(0, 6);
   const threeLast = address.slice(length - 4, length);
   address = `${fourFirst}****${threeLast}`;
   return address;
}