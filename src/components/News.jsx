import React, { useState, useEffect } from 'react'
import "./DisplayMainInfo.css"

function News({payload}) {

    const [newsData, setNewsData] = useState({}); 
    const [loaded, setLoaded] = useState(false); 

    useEffect(()=>{
        setNewsData(payload)
        setLoaded(true) 
    },[payload])
    //change

    return (
        <>
            <div class="main-info" id="news">
                <h2 class="title">Top News Stories</h2>
                <div class="main-info-display">
                    {
                        loaded && 
                        (newsData.map((data) => (
                            <div class="news-card">
                                <h2 id="subtitle" onClick={() => { () => window.open(data.url,"_blank", "nonreferrer"); }}>{data.title}</h2>
                                <img id='myimg' src={data.urlToImage} alt="picture" onClick={() => window.open(data.url, "_blank", "nonreferrer")} />
                            </div>
                        )))
                    }
                </div>
            </div>
        </>
    )
}

export default News