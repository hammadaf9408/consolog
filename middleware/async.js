const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)

module.exports = asyncHandler;

// const asyncHandler = fn => {
//   console.log('fn :', fn);
//   return (req, res, next) => {
//     Promise
//       .resolve(fn(req, res, next))
//       .catch(next)
//   }
// }