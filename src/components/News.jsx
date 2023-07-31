import React, { useState, useContext, useEffect } from 'react'
import { MainData } from './Weather'
import "./DisplayMainInfo.css"

function News({payload}) {
    
    // Format: https://newsapi.org/v2/everything?q=bitcoin&sortBy=Relevancy&apiKey=1214f78502564b51af87ad880819bf32
    const data = useContext(MainData);
    const [newsData, setNewsData] = useState({}); 
    const [loaded, setLoaded] = useState(false); 

    useEffect(()=>{
        setNewsData(payload)
        setLoaded(true) 
    },[payload])

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
                                <p id="subtitle">By: {data.author}</p>
                                {/* <div id="subtitle">Description: {data.description}</div> */}
                            </div>
                        )))
                    }
                </div>
            </div>
        </>
    )
}

export default News