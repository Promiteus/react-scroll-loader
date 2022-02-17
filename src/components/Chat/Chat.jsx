import React, { useEffect, useRef, useState } from 'react';
import './Chat.styles.css';

function Chat() {
  const [data, setData] = useState({loading: false, items: 20});
  let myscroll = useRef(null);

  function loadMore() {
      console.log("loadMore()");

      if (!data.loading) {
        setData((prev) => ({...prev, loading: true}));
        setTimeout(() => {
          setData((prev) => ({...prev, items: prev.items+20}));
          setData((prev) => ({...prev, loading: false})); 
        }, 1000);
      }

  }

  //srollTop - меняется от 0 до N; clientHeight = css {height: 300px}; scrollHeight = (300 + N)
  useEffect(() => {
    myscroll.current.addEventListener("scroll", () => {
      if ((myscroll.current.scrollTop + myscroll.current.clientHeight) >= myscroll.current.scrollHeight) {
          loadMore();
      }     
    });
  }, []); 

  function showItems() {
      let items = [];
      for (let i = 0; i < data.items; i++) {        
        items.push(<li key={i}>Item {i}</li>);
      }

      return items;
  }

  return(
     <div ref={myscroll} className="scroller">
        <ul>
           {showItems()}
        </ul>
        {data.loading ? <p>Loading ... </p> : ''}
     </div>
  )
}


export default Chat;
