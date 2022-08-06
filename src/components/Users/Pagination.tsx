import React, { useState } from "react";
import s from "./Users.module.css";

// const Pagination = (props) => {
//   let amountPages = Math.ceil(props.totalCount / props.countUsers);
//   let pages = [];
//   for (let i = 1; i <= amountPages; i++) {
//     pages.push(i);
//   }

//   let portionCount = Math.ceil(amountPages / 10);
//   let [portionNumber, setPortionNumber] = useState(1);
//   let leftPortionPageNumber = (portionNumber - 1) * 10 + 1;
//   let rightPortionPageNumber = portionNumber * 10;
//   // debugger
//   return (
//     <div>
//       <div className={s.pagination}>
//         {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
//         {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((page) => {
//           return (
//             <span
//               key={page}
//               onClick={() => props.onPaginationClick(page)}
//               className={props.currentPage === page ? s.selected : ""}
//             >
//               {page}
//             </span>
//           );
//         })}
//         {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
//       </div>
//     </div>
//   );
// };

type PropsType = {
  totalCount: number
  countUsers: number
  onPaginationClick: (numberPage: number) => void
  currentPage: number
}

const Pagination: React.FC<PropsType> = (props: PropsType) => {
  let amountPages = Math.ceil(props.totalCount / props.countUsers);
  let pages = [];
  for (let i = 1; i <= amountPages; i++) {
    pages.push(i);
  }

  let firstFivePage = pages.filter(p => p >= 1 && p <= 5);
  let anotherPage = props.currentPage <= 5 ? pages.filter(p => p >= 6 && p <= 10) : pages.filter(p => p >= (props.currentPage) && p <= (((props.totalCount - props.currentPage) >= 10) ? (props.currentPage + 10) : (props.totalCount - props.currentPage)))
  let pagination = [...firstFivePage, ...anotherPage]

  // debugger
  return (
    <div>
      <div className={s.pagination}>
        {pagination.map((page) => {
          return (
            <span
              key={page}
              onClick={() => props.onPaginationClick(page)}
              className={props.currentPage === page ? s.selected : ""}
            >
              {page}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
