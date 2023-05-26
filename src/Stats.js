import React from "react"
// import {nanoid} from "nanoid"

function Stats(props) {
    console.log(props.statsObject)
    const [allGamesPage, setAllGamesPage] = React.useState(true)
    const [lowestRollsPage, setLowestRollsPage] = React.useState(false)
    const [fastestTimesPage, setFastestTimesPage] = React.useState(false)
    const agp = {
        backgroundColor: allGamesPage ? "white" : "#5035FF"
    }
    const lrp = {
        backgroundColor: lowestRollsPage ? "white" : "#5035FF"
    }
    const ftp = {
        backgroundColor: fastestTimesPage ? "white" : "#5035FF"
    }

    function showAllGamesPage() {
        setAllGamesPage(true)
        setLowestRollsPage(false)
        setFastestTimesPage(false)
    }

    function showLowestRollsPage() {
        setAllGamesPage(false)
        setLowestRollsPage(true)
        setFastestTimesPage(false)
    }

    function showFastestTimesPage() {
        setAllGamesPage(false)
        setLowestRollsPage(false)
        setFastestTimesPage(true)
    }

    const allGamesRecords = props.statsObject.map(record => {
        return <div class="record">
                    <span class="roll-records">{record.rolls}</span> Rolls in
                    <span class="time-records">{record.time}</span> on
                    <span class="date">{record.date}</span>
                    <hr></hr>
               </div>
    })
    
    const lowestRollsRecords = props.statsObject.map(record => {
        return <div class="record">
                    <span class="roll-records">{record.rolls}</span> Rolls on
                    <span class="date">{record.date}</span>
                    <hr></hr>
               </div>
    })

    const fastestTimesRecords = props.statsObject.map(record => {
        return <div class="record">
                    <span class="time-records">{record.time}</span> on
                    <span class="date">{record.date}</span>
                    <hr></hr>
               </div>
    })

    return (
        <div>
            <div class="records-container">
                <div class="records-menu">
                    <div onClick={showAllGamesPage} style={agp} class="all-games-menu">All Games</div>
                    <div onClick={showLowestRollsPage} style={lrp} class="lowest-rolls-menu">Lowest Rolls</div>
                    <div onClick={showFastestTimesPage} style={ftp} class="fastest-times-menu">Fastest Times</div>
                </div>
                <div class="records-list">
                    {allGamesPage && allGamesRecords}
                    {lowestRollsPage && lowestRollsRecords}
                    {fastestTimesPage && fastestTimesRecords}
                </div>
            </div>
            <div onClick={() => props.handleRecordsPage[1](false)} className="back">Back to game</div>
        </div>
    )
}

export default Stats