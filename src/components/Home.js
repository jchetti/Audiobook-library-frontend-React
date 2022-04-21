import {useEffect} from "react";


function Home() {
    useEffect(() => {
        document.title = "Audiobooks library"
    })

    return (
        <div>
            <h1>Audiobooks library</h1>
        </div>
    );
}

export default Home;