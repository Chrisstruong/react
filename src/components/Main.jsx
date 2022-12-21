import {Routes, Route} from 'react-router-dom'
import People from '../pages/People/People'
import Show from '../pages/Show'


function Main(props) {
    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<People />} />
                    <Route path="/people/:id" element={<Show />} />
                </Routes>
            </main>
        </div>
    )
}

export default Main