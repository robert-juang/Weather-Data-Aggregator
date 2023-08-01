import React, { useState, useContext, useEffect } from 'react'
import TypeIt from "typeit-react";

export default function GPTSummary({payload}) {

    return (
        <>
            <div class="main-info">
                <h2 class="title">GPT Summary</h2>
                <div class="main-info-display">
                    <TypeIt options={{
                        strings: [payload],
                        speed: 30,
                        waitUntilVisible: true,
                    }} />
                </div>
            </div>
        </>
    )
}
